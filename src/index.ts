import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import middleware
import {
  rateLimiter,
  antiScraping,
  isAdmin,
  isAuthenticated,
  optionalAuth,
} from './middleware/auth.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

// Import controllers
import storeController from './controllers/store.controller';
import productController from './controllers/product.controller';
import categoryController from './controllers/category.controller';
import userController from './controllers/user.controller';

// Create Express app
const app = express();

// ==================== GLOBAL MIDDLEWARE ====================

// Security
app.use(helmet());

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api/', rateLimiter);

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
  console.log(`🏥 Health check requested from: ${req.ip || req.connection.remoteAddress}`);
  res.json({
    success: true,
    message: 'Qbazz Core API is running',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  });
});

// ==================== API ROUTES ====================

const router = express.Router();

// ===== USER ROUTES =====
router.post('/users', userController.upsertUser);
router.get('/users/me', isAuthenticated, userController.getCurrentUser);
router.get('/users/:id', userController.getUser);
router.get('/users/telegram/:telegramId', userController.getUserByTelegramId);
router.post('/users/:id/ban', isAdmin, userController.banUser);
router.post('/users/:id/unban', isAdmin, userController.unbanUser);

// ===== CATEGORY ROUTES =====
router.get('/categories', categoryController.listCategories);
router.get('/categories/root', categoryController.getRootCategories);
router.get('/categories/tree', categoryController.getCategoryTree);
router.get('/categories/:id', categoryController.getCategory);
router.get('/categories/slug/:slug', categoryController.getCategoryBySlug);
router.post('/categories', isAdmin, categoryController.createCategory);
router.put('/categories/:id', isAdmin, categoryController.updateCategory);
router.delete('/categories/:id', isAdmin, categoryController.deleteCategory);

// ===== STORE ROUTES =====
router.get('/stores', antiScraping, optionalAuth, storeController.listStores);
router.get('/stores/pending', isAdmin, storeController.getPendingStores);
router.get('/stores/:id', antiScraping, storeController.getStore);
router.get('/stores/slug/:slug', antiScraping, storeController.getStoreBySlug);
router.post('/stores', isAuthenticated, storeController.createStore);
router.put('/stores/:id', isAuthenticated, storeController.updateStore);
router.delete('/stores/:id', isAuthenticated, storeController.deleteStore);
router.post('/stores/:id/approve', isAdmin, storeController.approveStore);
router.post('/stores/:id/reject', isAdmin, storeController.rejectStore);

// ===== PRODUCT ROUTES =====
router.get('/products', antiScraping, productController.listProducts);
router.get('/products/search', antiScraping, productController.searchProducts);
router.get('/products/:id', antiScraping, productController.getProduct);
router.get('/products/slug/:slug', antiScraping, productController.getProductBySlug);
router.get('/stores/:storeId/products', antiScraping, productController.getProductsByStore);
router.post('/products', productController.createProduct); // From Telegram bot
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.post('/products/:id/publish', productController.publishProduct);
router.post('/products/:id/unpublish', productController.unpublishProduct);

// Mount API routes
app.use('/api', router);

// ==================== ERROR HANDLING ====================

// 404 Handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ==================== START SERVER ====================

const PORT = Number(process.env.PORT) || 3000;

// Test database connection on startup
import prisma from './config/database';

// Start server first, then test database
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log(`🚀 Qbazz Core API Server`);
  console.log('='.repeat(60));
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server running on port: ${PORT}`);
  console.log(`🔗 API Base URL: http://0.0.0.0:${PORT}/api`);
  console.log(`💚 Health Check: http://0.0.0.0:${PORT}/health`);
  console.log('='.repeat(60));

  // Test database connection after server starts
  prisma
    .$connect()
    .then(() => {
      console.log('✅ Database connected successfully');
      console.log(`🗄️  Database: PostgreSQL`);
    })
    .catch((error) => {
      console.error('⚠️  Database connection failed:', error.message);
      console.error('⚠️  API will run but database operations will fail');
      console.error('⚠️  Please check your DATABASE_URL environment variable');
    });

  console.log('='.repeat(60));
  console.log('📚 Available Routes:');
  console.log('  - GET    /health (no database required)');
  console.log('  - POST   /api/users');
  console.log('  - GET    /api/users/me');
  console.log('  - GET    /api/categories');
  console.log('  - POST   /api/stores');
  console.log('  - GET    /api/stores');
  console.log('  - POST   /api/stores/:id/approve (Admin)');
  console.log('  - POST   /api/products');
  console.log('  - GET    /api/products');
  console.log('='.repeat(60));
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`🛑 ${signal} received, shutting down gracefully...`);
  
  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed');
      await prisma.$disconnect();
      console.log('✅ Database disconnected');
      process.exit(0);
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
      console.error('⚠️ Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    await prisma.$disconnect();
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in production, just log
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // In production, log and try to stay alive
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

export default app;

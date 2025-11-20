"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Import middleware
const auth_middleware_1 = require("./middleware/auth.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
// Import controllers
const store_controller_1 = __importDefault(require("./controllers/store.controller"));
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const category_controller_1 = __importDefault(require("./controllers/category.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
// Create Express app
const app = (0, express_1.default)();
// ==================== GLOBAL MIDDLEWARE ====================
// Security
app.use((0, helmet_1.default)());
// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Compression
app.use((0, compression_1.default)());
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// Rate limiting
app.use('/api/', auth_middleware_1.rateLimiter);
// ==================== HEALTH CHECK ====================
app.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Qbazz Core API is running',
        timestamp: new Date().toISOString(),
    });
});
// ==================== API ROUTES ====================
const router = express_1.default.Router();
// ===== USER ROUTES =====
router.post('/users', user_controller_1.default.upsertUser);
router.get('/users/me', auth_middleware_1.isAuthenticated, user_controller_1.default.getCurrentUser);
router.get('/users/:id', user_controller_1.default.getUser);
router.get('/users/telegram/:telegramId', user_controller_1.default.getUserByTelegramId);
router.post('/users/:id/ban', auth_middleware_1.isAdmin, user_controller_1.default.banUser);
router.post('/users/:id/unban', auth_middleware_1.isAdmin, user_controller_1.default.unbanUser);
// ===== CATEGORY ROUTES =====
router.get('/categories', category_controller_1.default.listCategories);
router.get('/categories/root', category_controller_1.default.getRootCategories);
router.get('/categories/tree', category_controller_1.default.getCategoryTree);
router.get('/categories/:id', category_controller_1.default.getCategory);
router.get('/categories/slug/:slug', category_controller_1.default.getCategoryBySlug);
router.post('/categories', auth_middleware_1.isAdmin, category_controller_1.default.createCategory);
router.put('/categories/:id', auth_middleware_1.isAdmin, category_controller_1.default.updateCategory);
router.delete('/categories/:id', auth_middleware_1.isAdmin, category_controller_1.default.deleteCategory);
// ===== STORE ROUTES =====
router.get('/stores', auth_middleware_1.antiScraping, auth_middleware_1.optionalAuth, store_controller_1.default.listStores);
router.get('/stores/pending', auth_middleware_1.isAdmin, store_controller_1.default.getPendingStores);
router.get('/stores/:id', auth_middleware_1.antiScraping, store_controller_1.default.getStore);
router.get('/stores/slug/:slug', auth_middleware_1.antiScraping, store_controller_1.default.getStoreBySlug);
router.post('/stores', auth_middleware_1.isAuthenticated, store_controller_1.default.createStore);
router.put('/stores/:id', auth_middleware_1.isAuthenticated, store_controller_1.default.updateStore);
router.delete('/stores/:id', auth_middleware_1.isAuthenticated, store_controller_1.default.deleteStore);
router.post('/stores/:id/approve', auth_middleware_1.isAdmin, store_controller_1.default.approveStore);
router.post('/stores/:id/reject', auth_middleware_1.isAdmin, store_controller_1.default.rejectStore);
// ===== PRODUCT ROUTES =====
router.get('/products', auth_middleware_1.antiScraping, product_controller_1.default.listProducts);
router.get('/products/search', auth_middleware_1.antiScraping, product_controller_1.default.searchProducts);
router.get('/products/:id', auth_middleware_1.antiScraping, product_controller_1.default.getProduct);
router.get('/products/slug/:slug', auth_middleware_1.antiScraping, product_controller_1.default.getProductBySlug);
router.get('/stores/:storeId/products', auth_middleware_1.antiScraping, product_controller_1.default.getProductsByStore);
router.post('/products', product_controller_1.default.createProduct); // From Telegram bot
router.put('/products/:id', product_controller_1.default.updateProduct);
router.delete('/products/:id', product_controller_1.default.deleteProduct);
router.post('/products/:id/publish', product_controller_1.default.publishProduct);
router.post('/products/:id/unpublish', product_controller_1.default.unpublishProduct);
// Mount API routes
app.use('/api', router);
// ==================== ERROR HANDLING ====================
// 404 Handler
app.use(error_middleware_1.notFoundHandler);
// Global error handler
app.use(error_middleware_1.errorHandler);
// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;
// Test database connection on startup
const database_1 = __importDefault(require("./config/database"));
// Start server first, then test database
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log(`🚀 Qbazz Core API Server`);
    console.log('='.repeat(60));
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Server running on port: ${PORT}`);
    console.log(`🔗 API Base URL: http://0.0.0.0:${PORT}/api`);
    console.log(`💚 Health Check: http://0.0.0.0:${PORT}/health`);
    console.log('='.repeat(60));
    // Test database connection after server starts
    database_1.default.$connect()
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
process.on('SIGINT', async () => {
    await database_1.default.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await database_1.default.$disconnect();
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=index.js.map
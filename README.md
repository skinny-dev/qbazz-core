# Qbazz Core API

🚀 Backend REST API for Qbazz e-commerce platform - Iranian fashion marketplace with Telegram integration.

[![Deploy with Docker](https://img.shields.io/badge/Docker-Deploy-2496ED?logo=docker&logoColor=white)](https://hub.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)

## Features

✅ **Store Management** - Create, approve, update, delete stores based on Telegram channels
✅ **Product Management** - Auto-extract products from Telegram bot with SEO optimization  
✅ **Category System** - Hierarchical categories with parent-child relationships  
✅ **User Management** - Telegram-based authentication and user profiles  
✅ **Admin Panel** - Store approval workflow with Telegram notifications  
✅ **QR Code Generation** - Automatic QR code creation for approved stores  
✅ **SEO Optimized** - Meta tags, keywords, descriptions for all entities  
✅ **Iranian Validation** - National code validation, Persian text support  
✅ **Anti-Scraping** - Rate limiting and bot detection  
✅ **Comprehensive API** - RESTful endpoints with pagination and filtering  

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **QR Codes**: qrcode library
- **Telegram Integration**: Axios for bot communication

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# DATABASE_URL, TELEGRAM_BOT_TOKEN, etc.

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## Database Setup

```bash
# Create PostgreSQL database
createdb qbazz_db

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## API Endpoints

### Users
- `POST /api/users` - Create/update user
- `GET /api/users/me` - Get current user (auth required)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/telegram/:telegramId` - Get user by Telegram ID
- `POST /api/users/:id/ban` - Ban user (admin)
- `POST /api/users/:id/unban` - Unban user (admin)

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/root` - Get root categories
- `GET /api/categories/tree` - Get category tree
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Stores
- `GET /api/stores` - List stores (with pagination & filters)
- `GET /api/stores/pending` - Get pending stores (admin)
- `GET /api/stores/:id` - Get store by ID
- `GET /api/stores/slug/:slug` - Get store by slug
- `POST /api/stores` - Create store (auth required)
- `PUT /api/stores/:id` - Update store (owner or admin)
- `DELETE /api/stores/:id` - Delete store (owner or admin)
- `POST /api/stores/:id/approve` - Approve store (admin)
- `POST /api/stores/:id/reject` - Reject store (admin)

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/stores/:storeId/products` - Get store products
- `POST /api/products` - Create product (from Telegram bot)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/publish` - Publish product
- `POST /api/products/:id/unpublish` - Unpublish product

## Authentication

API uses Telegram-based authentication via headers:

```
X-Telegram-Id: <user_telegram_id>
```

For admin endpoints, the Telegram ID must belong to an admin user in the database.

## Example Requests

### Create Store
```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Id: 123456789" \
  -d '{
    "title": "My Fashion Store",
    "description": "Best fashion products",
    "socials": {
      "telegram": {
        "id": "-1002740169087",
        "username": "my_store_channel"
      }
    },
    "identity": {
      "nationalCode": "1234567890",
      "location": {
        "city": "Tehran",
        "country": "Iran"
      }
    },
    "categoryIds": [1, 2]
  }'
```

### Approve Store (Admin)
```bash
curl -X POST http://localhost:3000/api/stores/1/approve \
  -H "X-Telegram-Id: <admin_telegram_id>"
```

### List Products
```bash
curl "http://localhost:3000/api/products?page=1&limit=10&isPublished=true&categoryId=1"
```

## Environment Variables

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/qbazz_db"
PORT=3000
NODE_ENV=development
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_BOT_URL=http://localhost:3001
API_SECRET_KEY=your_secret_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
QR_CODE_BASE_URL=https://qbazz.com
```

## Project Structure

```
qbazz-core/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── database.ts        # Prisma client
│   ├── controllers/           # Route controllers
│   │   ├── category.controller.ts
│   │   ├── product.controller.ts
│   │   ├── store.controller.ts
│   │   └── user.controller.ts
│   ├── services/              # Business logic
│   │   ├── category.service.ts
│   │   ├── product.service.ts
│   │   ├── store.service.ts
│   │   ├── telegram.service.ts
│   │   └── user.service.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── utils/                 # Helper functions
│   │   ├── errors.util.ts
│   │   ├── helpers.util.ts
│   │   ├── qrcode.util.ts
│   │   └── response.util.ts
│   ├── validators/            # Zod schemas
│   │   └── index.ts
│   └── index.ts               # Main app entry
├── package.json
├── tsconfig.json
└── .env.example
```

## Telegram Bot Integration

The API communicates with the Telegram bot for:
- Notifying admins about new store submissions
- Sending approval/rejection notifications to store owners
- Receiving product data extractions
- Sending store updates

Bot endpoints (on bot server):
- `POST /api/send-message` - Send message to user
- `POST /api/notify-admins` - Notify admins with inline buttons
- `POST /api/store-created` - Receive store creation confirmation
- `POST /api/store-error` - Receive error notifications

## Development

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npm run prisma:reset
```

## Security

- ✅ Helmet for security headers
- ✅ CORS protection
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Anti-scraping middleware
- ✅ Iranian national code validation
- ✅ Telegram ID authentication
- ✅ Input validation with Zod

## License

MIT

## Support

For questions or issues, contact the development team.

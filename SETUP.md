# Qbazz Core API - Setup Guide

## Quick Start

### 1. Install Dependencies

```powershell
cd c:\Users\cybor\qbazz\qbazz-core
npm install
```

### 2. Setup Database

Create a PostgreSQL database:

```powershell
# Using PostgreSQL command line
psql -U postgres
CREATE DATABASE qbazz_db;
\q
```

Or use a GUI tool like pgAdmin or TablePlus.

### 3. Configure Environment

```powershell
# Copy example env file
Copy-Item .env.example .env

# Edit .env with your settings
notepad .env
```

Update these variables:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/qbazz_db"
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_from_botfather
TELEGRAM_BOT_URL=http://localhost:3001
```

### 4. Run Database Migrations

```powershell
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# Seed initial data (categories, sample admin/user)
npm run prisma:seed
```

### 5. Start Development Server

```powershell
npm run dev
```

The API will be running at `http://localhost:3000`

### 6. Test the API

Open your browser or use curl:

```powershell
# Health check
curl http://localhost:3000/health

# Get categories
curl http://localhost:3000/api/categories

# Get category tree
curl http://localhost:3000/api/categories/tree
```

## Database Management

### View Database with Prisma Studio

```powershell
npm run prisma:studio
```

This opens a visual database editor at `http://localhost:5555`

### Create New Migration

```powershell
npm run prisma:migrate
```

### Reset Database (⚠️ Deletes all data)

```powershell
npm run prisma:reset
```

## Testing API Endpoints

### Create User

```powershell
curl -X POST http://localhost:3000/api/users `
  -H "Content-Type: application/json" `
  -d '{\"telegramId\":\"987654321\",\"firstName\":\"علی\",\"lastName\":\"محمدی\"}'
```

### Create Store (Requires Authentication)

```powershell
curl -X POST http://localhost:3000/api/stores `
  -H "Content-Type: application/json" `
  -H "X-Telegram-Id: 987654321" `
  -d '{
    \"title\": \"فروشگاه مد و پوشاک\",
    \"description\": \"بهترین محصولات پوشاک\",
    \"socials\": {
      \"telegram\": {
        \"id\": \"-1002740169087\",
        \"username\": \"my_store\"
      }
    },
    \"identity\": {
      \"nationalCode\": \"1234567890\",
      \"location\": {
        \"city\": \"تهران\",
        \"country\": \"ایران\"
      }
    },
    \"categoryIds\": [1]
  }'
```

### Approve Store (Admin Only)

```powershell
curl -X POST http://localhost:3000/api/stores/1/approve `
  -H "X-Telegram-Id: 123456789"
```

### List Stores

```powershell
curl "http://localhost:3000/api/stores?page=1&limit=10&isApproved=true"
```

## Project Structure

```
qbazz-core/
├── config/
│   └── qrcode-style.json      # QR code styling
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Initial data seed
├── src/
│   ├── config/
│   │   └── database.ts        # Prisma client config
│   ├── controllers/           # API route controllers
│   │   ├── category.controller.ts
│   │   ├── product.controller.ts
│   │   ├── store.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── services/              # Business logic layer
│   │   ├── category.service.ts
│   │   ├── product.service.ts
│   │   ├── store.service.ts
│   │   ├── telegram.service.ts
│   │   └── user.service.ts
│   ├── utils/                 # Helper utilities
│   │   ├── errors.util.ts
│   │   ├── helpers.util.ts
│   │   ├── qrcode.util.ts
│   │   └── response.util.ts
│   ├── validators/            # Zod validation schemas
│   │   └── index.ts
│   └── index.ts               # Main application entry
├── .env                       # Environment variables
├── .env.example               # Example environment file
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # Documentation
```

## Common Issues

### Database Connection Error

```
Error: Can't reach database server
```

**Solution**: Make sure PostgreSQL is running:

```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# Start PostgreSQL if needed
Start-Service postgresql-x64-14  # Replace with your version
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Change PORT in `.env` or kill the process using port 3000:

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Prisma Client Not Generated

```
Error: Cannot find module '@prisma/client'
```

**Solution**: Generate Prisma Client:

```powershell
npm run prisma:generate
```

## Production Deployment

### Build for Production

```powershell
npm run build
```

### Start Production Server

```powershell
# Set NODE_ENV to production
$env:NODE_ENV="production"

# Run built application
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@production-host:5432/qbazz_db
PORT=3000
TELEGRAM_BOT_TOKEN=production_bot_token
TELEGRAM_BOT_URL=https://bot.qbazz.com
ALLOWED_ORIGINS=https://qbazz.com,https://www.qbazz.com
QR_CODE_BASE_URL=https://qbazz.com
```

## Next Steps

1. ✅ Database setup complete
2. ✅ API running locally
3. 📱 Integrate with Telegram bot
4. 🎨 Build frontend application
5. 🚀 Deploy to production

## Support

For issues or questions:
- Check the README.md
- Review API documentation
- Test endpoints with Postman or curl

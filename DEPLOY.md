# Qbazz Core API - Deployment Guide

## 🚀 Quick Deploy with Docker

### Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (can be cloud-hosted)
- Telegram Bot Token

### Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Telegram Bot
TELEGRAM_BOT_TOKEN="your_bot_token_here"
TELEGRAM_BOT_URL="https://your-bot-url.com"

# Security
JWT_SECRET="your_secure_random_string_here"

# Server
PORT=3000
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
```

### Deploy with Docker Compose

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Deploy with Docker (Standalone)

```bash
# Build image
docker build -t qbazz-core .

# Run container
docker run -d \
  --name qbazz-api \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  qbazz-core

# View logs
docker logs -f qbazz-api
```

## ☁️ Cloud Deployment

### Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Connect your GitHub repository
2. Add PostgreSQL database from Railway marketplace
3. Set environment variables in Railway dashboard
4. Railway will auto-deploy on push to main

### Deploy to Render

1. Create new Web Service
2. Connect repository: `https://github.com/skinny-dev/qbazz-core`
3. Build Command: `npm install && npx prisma generate && npm run build`
4. Start Command: `npx prisma migrate deploy && npm start`
5. Add PostgreSQL database from Render dashboard
6. Set environment variables

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create qbazz-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Set environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy to DigitalOcean App Platform

1. Create new App
2. Connect GitHub repository
3. Select branch: `main`
4. Add PostgreSQL database component
5. Set environment variables
6. Deploy

### Deploy to Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Launch app
flyctl launch

# Add PostgreSQL
flyctl postgres create

# Attach database
flyctl postgres attach <postgres-app-name>

# Set secrets
flyctl secrets set TELEGRAM_BOT_TOKEN=your_token
flyctl secrets set JWT_SECRET=your_secret

# Deploy
flyctl deploy
```

## 🗄️ Database Setup

### PostgreSQL Cloud Providers

**Railway**

```
DATABASE_URL="postgresql://user:pass@containers-us-west-xxx.railway.app:port/railway"
```

**Supabase**

```
DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"
```

**Neon**

```
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb"
```

**ElephantSQL**

```
DATABASE_URL="postgres://user:pass@castor.db.elephantsql.com/xxx"
```

### Run Migrations

Migrations run automatically on container start. To run manually:

```bash
# Inside container
docker exec -it qbazz-api npx prisma migrate deploy

# Or locally
npx prisma migrate deploy
```

### Seed Database

```bash
# Inside container
docker exec -it qbazz-api npx prisma db seed

# Or locally
npx prisma db seed
```

## 🔧 Configuration

### Health Check Endpoint

The API includes a health check at `GET /health` for monitoring:

```bash
curl http://localhost:3000/health
# Response: {"status":"ok","timestamp":"2024-11-20T..."}
```

### CORS Configuration

Update `src/index.ts` to configure allowed origins:

```typescript
app.use(
  cors({
    origin: ['https://your-frontend.com', 'https://www.your-frontend.com'],
    credentials: true,
  })
);
```

### Rate Limiting

Adjust in `.env`:

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=1000  # requests per window
```

## 📊 Monitoring

### View Logs

```bash
# Docker Compose
docker-compose logs -f api

# Docker
docker logs -f qbazz-api

# Last 100 lines
docker logs --tail 100 qbazz-api
```

### Database Monitoring

```bash
# Open Prisma Studio
npx prisma studio
```

## 🔒 Security Checklist

- [ ] Set strong `JWT_SECRET` (min 32 characters)
- [ ] Use SSL for database connection
- [ ] Enable database connection pooling
- [ ] Set up database backups
- [ ] Configure CORS for production domains only
- [ ] Enable rate limiting
- [ ] Use environment variables for all secrets
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Set up logging and monitoring
- [ ] Use HTTPS for API endpoints

## 🔄 Updates

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Database Migrations

```bash
# Create new migration (development)
npx prisma migrate dev --name description

# Deploy to production
docker exec -it qbazz-api npx prisma migrate deploy
```

## 🆘 Troubleshooting

### Connection Errors

```bash
# Test database connection
docker exec -it qbazz-api npx prisma db pull
```

### Migration Issues

```bash
# Reset database (CAUTION: deletes all data)
docker exec -it qbazz-api npx prisma migrate reset

# Check migration status
docker exec -it qbazz-api npx prisma migrate status
```

### Container Issues

```bash
# Restart container
docker-compose restart api

# Rebuild from scratch
docker-compose down
docker-compose up --build -d
```

## 📞 Support

For issues and questions:

- GitHub Issues: [github.com/skinny-dev/qbazz-core/issues](https://github.com/skinny-dev/qbazz-core/issues)
- Documentation: See `README.md` and `SETUP.md`

## 📝 License

MIT License - See LICENSE file for details

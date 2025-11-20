# Runflare Deployment Guide

## Prerequisites

1. **Database**: Set up a PostgreSQL database (recommended providers below)
2. **Telegram Bot Token**: Get from [@BotFather](https://t.me/botfather)
3. **Runflare Account**: Sign up at [runflare.com](https://runflare.com)

## Recommended Database Providers

### Neon (Free Tier Available)
```
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb"
```
- Free tier: 0.5GB storage
- Serverless, auto-scaling
- Sign up: [neon.tech](https://neon.tech)

### Supabase (Free Tier Available)
```
DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"
```
- Free tier: 500MB storage
- Includes admin dashboard
- Sign up: [supabase.com](https://supabase.com)

### Railway (Free Tier Available)
```
DATABASE_URL="postgresql://user:pass@containers-us-west-xxx.railway.app:port/railway"
```
- $5 free credit monthly
- Easy setup
- Sign up: [railway.app](https://railway.app)

## Deployment Steps

### 1. Create PostgreSQL Database

Choose a provider above and create a database. Copy the `DATABASE_URL` connection string.

### 2. Configure Runflare

In Runflare dashboard, add these environment variables:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_URL=https://your-bot-domain.com
JWT_SECRET=your_secure_random_32char_string
ALLOWED_ORIGINS=https://your-frontend-domain.com
QR_CODE_BASE_URL=https://your-api-domain.com
NODE_ENV=production
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
```

### 3. Deploy

Runflare will automatically:
1. Clone the repository
2. Build the Docker image
3. Run database migrations
4. Start the API server
5. Configure health checks

### 4. Verify Deployment

Check these endpoints:
```bash
# Health check
curl https://your-api-domain.com/health

# Categories
curl https://your-api-domain.com/api/categories

# API info
curl https://your-api-domain.com/
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `TELEGRAM_BOT_TOKEN` | ✅ Yes | Bot token from BotFather | `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz` |
| `JWT_SECRET` | ✅ Yes | Secret for JWT tokens (32+ chars) | `your_secure_random_string_here` |
| `NODE_ENV` | ✅ Yes | Environment mode | `production` |
| `PORT` | ✅ Yes | Server port | `3000` |
| `TELEGRAM_BOT_URL` | ⚠️ Optional | Telegram bot webhook URL | `https://bot.example.com` |
| `ALLOWED_ORIGINS` | ⚠️ Optional | CORS allowed origins | `https://qbazz.com` |
| `QR_CODE_BASE_URL` | ⚠️ Optional | Base URL for QR codes | `https://qbazz.com` |
| `RATE_LIMIT_MAX_REQUESTS` | ⚠️ Optional | Rate limit per window | `1000` |

## Troubleshooting

### Build Fails

**Issue**: Docker build errors

**Solution**: Check that:
- `package.json` has all dependencies
- `Dockerfile` syntax is correct
- `.dockerignore` exists

### Database Connection Fails

**Issue**: Cannot connect to database

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Ensure IP whitelist includes Runflare IPs
4. Test connection locally:
   ```bash
   npx prisma db pull
   ```

### Migrations Fail

**Issue**: Database migrations error on startup

**Solution**:
1. Check database is empty/fresh
2. Run migrations manually:
   ```bash
   npx prisma migrate deploy
   ```
3. Verify schema is compatible with PostgreSQL

### Health Check Fails

**Issue**: Runflare marks service as unhealthy

**Solution**:
1. Ensure `/health` endpoint returns 200
2. Check application is listening on `PORT` env var
3. Verify no crashes in logs

### CORS Errors

**Issue**: Frontend cannot access API

**Solution**: Add frontend domain to `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com
```

## Post-Deployment

### Seed Database

After first deployment, seed the database with categories:

```bash
# SSH into Runflare container (if available) or use database client
npx prisma db seed
```

Or use Prisma Studio to manually add data:
```bash
npx prisma studio
```

### Monitor Logs

Check Runflare dashboard for:
- Application logs
- Health check status
- Resource usage
- Request metrics

### Update Deployment

Push changes to GitHub main branch. Runflare auto-deploys on push:

```bash
git add .
git commit -m "Update API"
git push origin main
```

## Security Best Practices

- ✅ Use strong `JWT_SECRET` (32+ random characters)
- ✅ Enable SSL/TLS for database connection
- ✅ Set `NODE_ENV=production`
- ✅ Configure CORS for specific domains only
- ✅ Use environment variables for all secrets
- ✅ Enable rate limiting
- ✅ Keep dependencies updated
- ✅ Monitor logs for suspicious activity

## Support

- GitHub Issues: [github.com/skinny-dev/qbazz-core/issues](https://github.com/skinny-dev/qbazz-core/issues)
- Runflare Docs: [docs.runflare.com](https://docs.runflare.com)
- Documentation: See `DEPLOY.md` for more deployment options

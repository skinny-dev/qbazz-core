# Managing Production Database with Prisma Studio

## Option 1: Connect Locally to Production Database (Recommended)

### Setup
1. **Get Production Database URL** from Runflare environment variables:
   ```
   postgresql://postgres:s68mmmThGAUNknsS3Myg@qbazz-db-hit-service:5432/qbazz-dbzku_db
   ```

2. **Create `.env.studio` file** in qbazz-core:
   ```env
   DATABASE_URL=postgresql://postgres:s68mmmThGAUNknsS3Myg@qbazz-db-hit-service:5432/qbazz-dbzku_db
   ```

3. **Run Prisma Studio**:
   ```bash
   cd qbazz-core
   npx prisma studio --env-file .env.studio
   ```

4. **Access at**: http://localhost:5555

### Important Notes
- ⚠️ Be careful - you're editing production data!
- ✅ Changes are instant and permanent
- 🔒 Connection is secure (PostgreSQL uses SSL)
- 📊 Full visual interface for all tables

---

## Option 2: Use Runflare Database Dashboard

If Runflare provides a database management interface:
1. Go to Runflare dashboard
2. Navigate to your PostgreSQL database service
3. Look for "Database Management" or "phpPgAdmin" link
4. Access built-in database browser

---

## Option 3: Run Prisma Studio in Development with Production Data

### One-Time Connection Test
```bash
cd c:\Users\cybor\qbazz\qbazz-core

# Set environment variable for this session only
$env:DATABASE_URL="postgresql://postgres:s68mmmThGAUNknsS3Myg@qbazz-db-hit-service:5432/qbazz-dbzku_db"

# Run Prisma Studio
npx prisma studio
```

Visit: http://localhost:5555

---

## Option 4: Port Forwarding via Runflare (If Supported)

Some platforms allow port forwarding to database:
```bash
# Example (check Runflare docs)
runflare db:forward qbazz-db 5432:5432
```

Then connect locally:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/qbazz-dbzku_db"
npx prisma studio
```

---

## Option 5: Database Seeding Script

Create management scripts instead of using Studio:

### Create seed script for categories
```bash
cd qbazz-core
npm run seed:production
```

This uses your existing `prisma/seed.ts` but with production DATABASE_URL.

---

## Recommended Approach

**Use Option 1** - it's the safest and most direct:

```powershell
# In qbazz-core directory
cd c:\Users\cybor\qbazz\qbazz-core

# Create studio environment file
@"
DATABASE_URL=postgresql://postgres:s68mmmThGAUNknsS3Myg@qbazz-db-hit-service:5432/qbazz-dbzku_db
"@ | Out-File -FilePath .env.studio -Encoding UTF8

# Add to .gitignore
Add-Content .gitignore "`n.env.studio"

# Run Prisma Studio
npx prisma studio --env-file .env.studio
```

Then open http://localhost:5555 and manage your production database visually!

---

## Safety Tips

1. **Backup First**: 
   ```bash
   # Export data before making changes
   npx prisma db pull
   ```

2. **Test Locally**: Always test queries on development database first

3. **Use Transactions**: For bulk operations, use Prisma transactions

4. **Monitor**: Watch application logs while making changes

5. **Read-Only User** (Optional): Create a separate read-only database user for viewing data

---

## Common Tasks

### View All Products
```bash
npx prisma studio --env-file .env.studio
# Navigate to "Product" table
```

### Seed Categories
```bash
DATABASE_URL="postgresql://..." npm run seed
```

### Check Database Status
```bash
npx prisma migrate status --env-file .env.studio
```

### Generate Prisma Client for Production
```bash
npx prisma generate --env-file .env.studio
```

---

## Quick Access Script

Create `studio.ps1` in qbazz-core:
```powershell
# studio.ps1
$env:DATABASE_URL="postgresql://postgres:s68mmmThGAUNknsS3Myg@qbazz-db-hit-service:5432/qbazz-dbzku_db"
npx prisma studio
```

Run with: `.\studio.ps1`

---

No need for extra Runflare services - just connect directly from your local machine! 🎉

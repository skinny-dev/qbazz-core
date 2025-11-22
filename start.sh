#!/bin/sh
set -e

echo "================================"
echo "Qbazz Core API Starting"
echo "================================"
echo "NODE_ENV: ${NODE_ENV}"
echo "PORT: ${PORT}"
echo "DATABASE_URL: ${DATABASE_URL:0:50}..."
echo "================================"

# Run database migrations (production)
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma Client (ensure it's up to date)
echo "Generating Prisma Client..."
npx prisma generate

# Seed categories if needed (non-blocking)
echo "Seeding database (if needed)..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    const count = await prisma.category.count();
    if (count === 0) {
      console.log('No categories found, run seed manually if needed');
    } else {
      console.log(\`Found \${count} categories, skipping seed\`);
    }
  } catch (e) {
    console.log('Could not check categories:', e.message);
  } finally {
    await prisma.\$disconnect();
  }
})();
" || true

echo "================================"
echo "Starting API server..."
echo "================================"

# Start server
exec node dist/index.js

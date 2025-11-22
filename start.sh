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
npx prisma migrate deploy || {
  echo "WARNING: Migrations failed, attempting to continue..."
}

# Generate Prisma Client (ensure it's up to date)
echo "Generating Prisma Client..."
npx prisma generate || {
  echo "WARNING: Prisma generate failed, using existing client..."
}

echo "================================"
echo "Starting API server..."
echo "================================"

# Start server
exec node dist/index.js

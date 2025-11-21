#!/bin/sh
set -e

echo "================================"
echo "Starting Qbazz Core API"
echo "================================"

echo "Environment Check:"
echo "NODE_ENV: ${NODE_ENV}"
echo "PORT: ${PORT}"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..." 

echo ""
echo "Running Prisma Migrations..."
npx prisma migrate deploy 2>&1 || {
    echo "Migration failed! Continuing anyway..."
}

echo ""
echo "Starting Server..."
node dist/index.js

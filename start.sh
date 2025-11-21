#!/bin/sh
set +e

echo "================================"
echo "Qbazz Core API Starting"
echo "================================"
echo "NODE_ENV: ${NODE_ENV}"
echo "PORT: ${PORT}"
echo "DATABASE_URL: ${DATABASE_URL:0:50}..."
echo "================================"

# Start server
exec node dist/index.js

#!/bin/sh

echo "================================"
echo "Starting Qbazz Core API"
echo "================================"

echo "Environment: ${NODE_ENV}"
echo "Port: ${PORT}"

echo ""
echo "Starting Server..."
node dist/index.js

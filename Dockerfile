# Use Node.js 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Install dependencies for sharp and other native modules
RUN apk add --no-cache \
    dumb-init \
    python3 \
    make \
    g++ \
    vips-dev

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (needed for TypeScript build)
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production && \
    npm rebuild sharp --platform=linuxmusl --arch=x64

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Set ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run migrations and start server with dumb-init
CMD ["dumb-init", "sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

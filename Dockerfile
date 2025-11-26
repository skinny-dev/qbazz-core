# Use Node.js 19 (matching Runflare)
FROM node:19-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for build)
# Add --no-optional to speed up and force cache bust
RUN npm ci --include=dev

# Copy source code and config
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build && ls -la dist/

# Verify dist exists
RUN test -f dist/index.js || (echo "ERROR: dist/index.js not found!" && exit 1)

# Remove dev dependencies after build to reduce image size
RUN npm prune --omit=dev

# Make start script executable
RUN chmod +x start.sh

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run migrations and start
CMD ["./start.sh"]

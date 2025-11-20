"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Create a singleton instance of Prisma Client
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
exports.default = prisma;
// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=database.js.map
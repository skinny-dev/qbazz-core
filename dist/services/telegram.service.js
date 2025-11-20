"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const axios_1 = __importDefault(require("axios"));
const TELEGRAM_BOT_URL = process.env.TELEGRAM_BOT_URL || 'http://localhost:3001';
class TelegramService {
    /**
     * Send message to store owner via Telegram bot
     */
    async sendMessageToStoreOwner(telegramId, message) {
        try {
            const response = await axios_1.default.post(`${TELEGRAM_BOT_URL}/api/send-message`, {
                chatId: telegramId,
                message,
            });
            return response.data;
        }
        catch (error) {
            console.error('Failed to send Telegram message:', error);
            throw new Error('Failed to send notification to store owner');
        }
    }
    /**
     * Notify admins about new store submission (with inline buttons)
     */
    async notifyAdminsAboutNewStore(storeData) {
        const message = `
🏪 **New Store Submission**

**Store Name:** ${storeData.title}
**Owner:** ${storeData.ownerName || storeData.ownerTelegramId}
**Categories:** ${storeData.categoryNames.join(', ')}
**Store ID:** ${storeData.id}

Please review and approve/reject this store.
    `.trim();
        try {
            const response = await axios_1.default.post(`${TELEGRAM_BOT_URL}/api/notify-admins`, {
                message,
                storeId: storeData.id,
                inlineButtons: [
                    {
                        text: '✅ Approve',
                        callbackData: `approve_store_${storeData.id}`,
                    },
                    {
                        text: '❌ Reject',
                        callbackData: `reject_store_${storeData.id}`,
                    },
                ],
            });
            return response.data;
        }
        catch (error) {
            console.error('Failed to notify admins:', error);
            // Don't throw error - notification failure shouldn't block store creation
        }
    }
    /**
     * Notify store owner about approval
     */
    async notifyStoreApproval(storeData) {
        const message = `
🎉 **Congratulations!** Your store has been approved!

**Store Name:** ${storeData.title}
**Store URL:** https://qbazz.com/store/${storeData.slug}
**QR Code:** ${storeData.qrCodeLink}

Your store is now live and ready to accept products!
    `.trim();
        return this.sendMessageToStoreOwner(storeData.ownerTelegramId, message);
    }
    /**
     * Notify store owner about rejection
     */
    async notifyStoreRejection(storeData) {
        const message = `
❌ **Store Submission Rejected**

**Store Name:** ${storeData.title}
**Reason:** ${storeData.reason}

Please contact support if you have any questions.
    `.trim();
        return this.sendMessageToStoreOwner(storeData.ownerTelegramId, message);
    }
    /**
     * Notify store owner about store update
     */
    async notifyStoreUpdate(storeData) {
        const message = `
📝 **Store Updated**

**Store Name:** ${storeData.title}
**Updated Fields:** ${storeData.updatedFields.join(', ')}

Your store information has been successfully updated.
    `.trim();
        return this.sendMessageToStoreOwner(storeData.ownerTelegramId, message);
    }
    /**
     * Notify store owner about store deletion
     */
    async notifyStoreDeletion(storeData) {
        const message = `
🗑️ **Store Deleted**

**Store Name:** ${storeData.title}
${storeData.reason ? `**Reason:** ${storeData.reason}` : ''}

Your store has been removed from Qbazz.
    `.trim();
        return this.sendMessageToStoreOwner(storeData.ownerTelegramId, message);
    }
    /**
     * Send store data back to Telegram bot (after successful creation)
     */
    async sendStoreDataToBot(storeData) {
        try {
            const response = await axios_1.default.post(`${TELEGRAM_BOT_URL}/api/store-created`, {
                success: true,
                store: storeData,
            });
            return response.data;
        }
        catch (error) {
            console.error('Failed to send store data to bot:', error);
            // Don't throw - this is just a notification
        }
    }
    /**
     * Send error message back to Telegram bot
     */
    async sendErrorToBot(chatId, error) {
        try {
            const response = await axios_1.default.post(`${TELEGRAM_BOT_URL}/api/store-error`, {
                success: false,
                chatId,
                error,
            });
            return response.data;
        }
        catch (err) {
            console.error('Failed to send error to bot:', err);
        }
    }
    /**
     * Send QR code photo to user
     */
    async sendQRCode(telegramId, qrCodeDataURL, caption) {
        try {
            const response = await axios_1.default.post(`${TELEGRAM_BOT_URL}/api/send-photo`, {
                chatId: telegramId,
                photo: qrCodeDataURL,
                caption,
            });
            return response.data;
        }
        catch (error) {
            console.error('Failed to send QR code:', error);
            throw new Error('Failed to send QR code notification');
        }
    }
}
exports.TelegramService = TelegramService;
exports.default = new TelegramService();
//# sourceMappingURL=telegram.service.js.map
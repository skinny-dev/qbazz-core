import axios from 'axios';

const TELEGRAM_BOT_URL = process.env.TELEGRAM_BOT_URL || 'http://localhost:3001';

export class TelegramService {
  /**
   * Send message to store owner via Telegram bot
   */
  async sendMessageToStoreOwner(telegramId: string, message: string) {
    try {
      const response = await axios.post(`${TELEGRAM_BOT_URL}/api/send-message`, {
        chatId: telegramId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      throw new Error('Failed to send notification to store owner');
    }
  }

  /**
   * Notify admins about new store submission (with inline buttons)
   */
  async notifyAdminsAboutNewStore(storeData: {
    id: number;
    title: string;
    ownerTelegramId: string;
    ownerName?: string;
    categoryNames: string[];
  }) {
    const message = `
🏪 **New Store Submission**

**Store Name:** ${storeData.title}
**Owner:** ${storeData.ownerName || storeData.ownerTelegramId}
**Categories:** ${storeData.categoryNames.join(', ')}
**Store ID:** ${storeData.id}

Please review and approve/reject this store.
    `.trim();

    try {
      const response = await axios.post(`${TELEGRAM_BOT_URL}/api/notify-admins`, {
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
    } catch (error) {
      console.error('Failed to notify admins:', error);
      // Don't throw error - notification failure shouldn't block store creation
    }
  }

  /**
   * Notify store owner about approval
   */
  async notifyStoreApproval(storeData: {
    ownerTelegramId: string;
    title: string;
    slug: string;
    qrCodeLink: string;
  }) {
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
  async notifyStoreRejection(storeData: {
    ownerTelegramId: string;
    title: string;
    reason: string;
  }) {
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
  async notifyStoreUpdate(storeData: {
    ownerTelegramId: string;
    title: string;
    updatedFields: string[];
  }) {
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
  async notifyStoreDeletion(storeData: {
    ownerTelegramId: string;
    title: string;
    reason?: string;
  }) {
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
  async sendStoreDataToBot(storeData: any) {
    try {
      const response = await axios.post(`${TELEGRAM_BOT_URL}/api/store-created`, {
        success: true,
        store: storeData,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send store data to bot:', error);
      // Don't throw - this is just a notification
    }
  }

  /**
   * Send error message back to Telegram bot
   */
  async sendErrorToBot(chatId: string, error: string) {
    try {
      const response = await axios.post(`${TELEGRAM_BOT_URL}/api/store-error`, {
        success: false,
        chatId,
        error,
      });
      return response.data;
    } catch (err) {
      console.error('Failed to send error to bot:', err);
    }
  }

  /**
   * Send QR code photo to user
   */
  async sendQRCode(telegramId: string, qrCodeDataURL: string, caption: string) {
    try {
      const response = await axios.post(`${TELEGRAM_BOT_URL}/api/send-photo`, {
        chatId: telegramId,
        photo: qrCodeDataURL,
        caption,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send QR code:', error);
      throw new Error('Failed to send QR code notification');
    }
  }
}

export default new TelegramService();

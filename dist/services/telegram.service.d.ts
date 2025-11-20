export declare class TelegramService {
    /**
     * Send message to store owner via Telegram bot
     */
    sendMessageToStoreOwner(telegramId: string, message: string): Promise<any>;
    /**
     * Notify admins about new store submission (with inline buttons)
     */
    notifyAdminsAboutNewStore(storeData: {
        id: number;
        title: string;
        ownerTelegramId: string;
        ownerName?: string;
        categoryNames: string[];
    }): Promise<any>;
    /**
     * Notify store owner about approval
     */
    notifyStoreApproval(storeData: {
        ownerTelegramId: string;
        title: string;
        slug: string;
        qrCodeLink: string;
    }): Promise<any>;
    /**
     * Notify store owner about rejection
     */
    notifyStoreRejection(storeData: {
        ownerTelegramId: string;
        title: string;
        reason: string;
    }): Promise<any>;
    /**
     * Notify store owner about store update
     */
    notifyStoreUpdate(storeData: {
        ownerTelegramId: string;
        title: string;
        updatedFields: string[];
    }): Promise<any>;
    /**
     * Notify store owner about store deletion
     */
    notifyStoreDeletion(storeData: {
        ownerTelegramId: string;
        title: string;
        reason?: string;
    }): Promise<any>;
    /**
     * Send store data back to Telegram bot (after successful creation)
     */
    sendStoreDataToBot(storeData: any): Promise<any>;
    /**
     * Send error message back to Telegram bot
     */
    sendErrorToBot(chatId: string, error: string): Promise<any>;
    /**
     * Send QR code photo to user
     */
    sendQRCode(telegramId: string, qrCodeDataURL: string, caption: string): Promise<any>;
}
declare const _default: TelegramService;
export default _default;
//# sourceMappingURL=telegram.service.d.ts.map
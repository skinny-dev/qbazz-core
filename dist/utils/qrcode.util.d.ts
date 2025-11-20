interface QRCodeStyle {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    type: 'image/png' | 'image/jpeg';
    quality: number;
    margin: number;
    width: number;
    color: {
        dark: string;
        light: string;
    };
}
/**
 * Generate QR Code for store
 * @param storeData - Store telegram ID and additional data
 * @param customStyle - Optional custom QR code style
 * @returns QR code data URL and link
 */
export declare function generateStoreQRCode(storeData: {
    telegramId: string;
    slug?: string;
}, customStyle?: Partial<QRCodeStyle>): Promise<{
    link: string;
    data: string;
}>;
/**
 * Save QR Code to file system
 */
export declare function saveQRCodeToFile(qrDataURL: string, filename: string, directory?: string): Promise<string>;
/**
 * Load QR Code style from JSON file
 */
export declare function loadQRCodeStyle(styleFilePath: string): Promise<QRCodeStyle>;
export {};
//# sourceMappingURL=qrcode.util.d.ts.map
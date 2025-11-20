"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreQRCode = generateStoreQRCode;
exports.saveQRCodeToFile = saveQRCodeToFile;
exports.loadQRCodeStyle = loadQRCodeStyle;
// import QRCode from 'qrcode'; // Disabled for Node 19 compatibility
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Default Qbazz QR Code Style
const DEFAULT_QR_STYLE = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.95,
    margin: 1,
    width: 300,
    color: {
        dark: '#000000',
        light: '#FFFFFF',
    },
};
/**
 * Generate QR Code for store
 * @param storeData - Store telegram ID and additional data
 * @param customStyle - Optional custom QR code style
 * @returns QR code data URL and link
 */
async function generateStoreQRCode(storeData, customStyle) {
    const baseUrl = process.env.QR_CODE_BASE_URL || 'https://qbazz.com';
    const link = `${baseUrl}/${storeData.telegramId}`;
    // const style = { ...DEFAULT_QR_STYLE, ...customStyle }; // Disabled
    try {
        // QR code generation disabled for Node 19 compatibility
        // TODO: Re-enable when upgraded to Node 20+
        const qrDataURL = ''; // Placeholder
        return {
            link,
            data: qrDataURL,
        };
    }
    catch (error) {
        throw new Error(`Failed to generate QR code: ${error}`);
    }
}
/**
 * Save QR Code to file system
 */
async function saveQRCodeToFile(qrDataURL, filename, directory = 'uploads/qrcodes') {
    try {
        // Ensure directory exists
        await promises_1.default.mkdir(directory, { recursive: true });
        // Extract base64 data
        const base64Data = qrDataURL.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        // Save to file
        const filePath = path_1.default.join(directory, `${filename}.png`);
        await promises_1.default.writeFile(filePath, buffer);
        return filePath;
    }
    catch (error) {
        throw new Error(`Failed to save QR code to file: ${error}`);
    }
}
/**
 * Load QR Code style from JSON file
 */
async function loadQRCodeStyle(styleFilePath) {
    try {
        const styleData = await promises_1.default.readFile(styleFilePath, 'utf-8');
        const customStyle = JSON.parse(styleData);
        return { ...DEFAULT_QR_STYLE, ...customStyle };
    }
    catch (error) {
        console.warn(`Failed to load QR style from ${styleFilePath}, using default`);
        return DEFAULT_QR_STYLE;
    }
}
//# sourceMappingURL=qrcode.util.js.map
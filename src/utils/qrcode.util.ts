import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

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

// Default Qbazz QR Code Style
const DEFAULT_QR_STYLE: QRCodeStyle = {
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
export async function generateStoreQRCode(
  storeData: {
    telegramId: string;
    slug?: string;
  },
  _customStyle?: Partial<QRCodeStyle> // Unused for now
): Promise<{ link: string; data: string }> {
  const baseUrl = process.env.QR_CODE_BASE_URL || 'https://qbazz.com';
  const link = `${baseUrl}/${storeData.telegramId}`;

  const style = { ...DEFAULT_QR_STYLE, ..._customStyle };

  try {
    // Generate QR code with qrcode library (works with Node 19)
    const qrDataURL = await QRCode.toDataURL(link, {
      errorCorrectionLevel: style.errorCorrectionLevel,
      margin: style.margin,
      width: style.width,
      color: style.color,
      type: 'image/png',
    });

    return {
      link,
      data: qrDataURL,
    };
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error}`);
  }
}

/**
 * Save QR Code to file system
 */
export async function saveQRCodeToFile(
  qrDataURL: string,
  filename: string,
  directory: string = 'uploads/qrcodes'
): Promise<string> {
  try {
    // Ensure directory exists
    await fs.mkdir(directory, { recursive: true });

    // Extract base64 data
    const base64Data = qrDataURL.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Save to file
    const filePath = path.join(directory, `${filename}.png`);
    await fs.writeFile(filePath, buffer);

    return filePath;
  } catch (error) {
    throw new Error(`Failed to save QR code to file: ${error}`);
  }
}

/**
 * Load QR Code style from JSON file
 */
export async function loadQRCodeStyle(styleFilePath: string): Promise<QRCodeStyle> {
  try {
    const styleData = await fs.readFile(styleFilePath, 'utf-8');
    const customStyle = JSON.parse(styleData);
    return { ...DEFAULT_QR_STYLE, ...customStyle };
  } catch (error) {
    console.warn(`Failed to load QR style from ${styleFilePath}, using default`);
    return DEFAULT_QR_STYLE;
  }
}

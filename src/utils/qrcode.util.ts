import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

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
  customStyle?: Partial<QRCodeStyle>
): Promise<{ link: string; data: string }> {
  const baseUrl = process.env.QR_CODE_BASE_URL || 'https://qbazz.com';
  const link = `${baseUrl}/${storeData.telegramId}`;

  const style = { ...DEFAULT_QR_STYLE, ...customStyle };

  try {
    // Generate QR code as buffer
    const qrBuffer = await QRCode.toBuffer(link, {
      errorCorrectionLevel: style.errorCorrectionLevel,
      margin: style.margin,
      width: style.width,
      color: style.color,
      type: 'png',
    });

    // Load logo
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    
    // Calculate logo size (25% of QR code size)
    const logoSize = Math.floor(style.width * 0.25);
    
    // Resize logo
    const resizedLogo = await sharp(logoPath)
      .resize(logoSize, logoSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();
    
    // Calculate position to center the logo
    const position = Math.floor((style.width - logoSize) / 2);
    
    // Composite logo onto QR code
    const qrWithLogo = await sharp(qrBuffer)
      .composite([{
        input: resizedLogo,
        top: position,
        left: position,
      }])
      .png()
      .toBuffer();
    
    // Convert to data URL
    const qrDataURL = `data:image/png;base64,${qrWithLogo.toString('base64')}`;

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

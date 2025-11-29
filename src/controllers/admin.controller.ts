import { Request, Response } from 'express';
import prisma from '../config/database';

/**
 * Protected admin endpoint to ensure default fallback categories exist.
 * Protection: requires `ADMIN_SECRET` env var to match `x-admin-secret` header.
 */
export async function ensureDefaultCategories(req: Request, res: Response) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const provided = (req.headers['x-admin-secret'] || req.query.admin_secret || '').toString();

    if (!adminSecret) {
      return res.status(500).json({ success: false, message: 'ADMIN_SECRET not configured on server' });
    }

    if (!provided || provided !== adminSecret) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const ops = [
      {
        slug: 'lebass-zanane',
        data: {
          title: 'لباس زنانه',
          slug: 'lebass-zanane',
          icon: '👗',
          description: 'دسته‌بندی پوشاک زنانه (پیش‌فرض)',
          metaKeywords: JSON.stringify(['لباس زنانه', 'پوشاک زنانه']),
          isActive: true,
          sortOrder: 10,
        },
      },
      {
        slug: 'lebass-mardane',
        data: {
          title: 'لباس مردانه',
          slug: 'lebass-mardane',
          icon: '👔',
          description: 'دسته‌بندی پوشاک مردانه (پیش‌فرض)',
          metaKeywords: JSON.stringify(['لباس مردانه', 'پوشاک مردانه']),
          isActive: true,
          sortOrder: 11,
        },
      },
      {
        slug: 'lebass-bache-gane',
        data: {
          title: 'لباس بچگانه',
          slug: 'lebass-bache-gane',
          icon: '👶',
          description: 'دسته‌بندی پوشاک بچگانه (پیش‌فرض)',
          metaKeywords: JSON.stringify(['لباس بچگانه', 'پوشاک کودک']),
          isActive: true,
          sortOrder: 12,
        },
      },
      {
        slug: 'bags-shoes',
        data: {
          title: 'کیف و کفش',
          slug: 'bags-shoes',
          icon: '👜',
          description: 'کیف، کفش و لوازم جانبی',
          metaKeywords: JSON.stringify(['کیف', 'کفش', 'اکسسوری']),
          isActive: true,
          sortOrder: 13,
        },
      },
      {
        slug: 'misc',
        data: {
          title: 'متفرقه',
          slug: 'misc',
          icon: '📦',
          description: 'دسته‌بندی متفرقه - پیش‌فرض زمانی که دسته‌بندی شناسایی نشده',
          metaKeywords: JSON.stringify(['متفرقه', 'سایر']),
          isActive: true,
          sortOrder: 999,
        },
      },
    ];

    const results: any = {};

    for (const op of ops) {
      const cat = await prisma.category.upsert({
        where: { slug: op.slug },
        update: { title: op.data.title, isActive: true },
        create: op.data,
      });
      results[op.slug] = { id: cat.id, slug: cat.slug, title: cat.title };
    }

    return res.json({ success: true, categories: results });
  } catch (err: any) {
    console.error('Error ensuring default categories:', err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
}

export default { ensureDefaultCategories };

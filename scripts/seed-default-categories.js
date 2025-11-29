#!/usr/bin/env node
/**
 * One-off JS seed script to upsert default categories.
 * Runs with `node scripts/seed-default-categories.js` (no ts-node required).
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔁 Running one-off JS seed: default categories');

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

  try {
    const results = {};

    for (const op of ops) {
      const cat = await prisma.category.upsert({
        where: { slug: op.slug },
        update: { title: op.data.title, isActive: true },
        create: op.data,
      });
      results[op.slug] = { id: cat.id, slug: cat.slug, title: cat.title };
      console.log(`  ✓ upserted ${op.slug} => id=${cat.id}`);
    }

    console.log('\n✅ Default categories upserted successfully');
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error('❌ Error running seed:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();

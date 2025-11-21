import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Delete all existing categories first for clean slate
  console.log('Clearing existing categories...');
  await prisma.category.deleteMany({});

  // Create Root Categories
  console.log('Creating root categories...');

  const womensFashion = await prisma.category.create({
    data: {
      title: 'پوشاک زنانه',
      slug: 'womens-fashion',
      icon: '👗',
      description: 'لباس، کفش و لوازم جانبی زنانه',
      metaTitle: 'پوشاک زنانه - خرید آنلاین',
      metaDescription: 'خرید انواع پوشاک، لباس، کفش و اکسسوری زنانه',
      metaKeywords: JSON.stringify(['پوشاک زنانه', 'لباس زنانه', 'مد زنانه']),
      isActive: true,
      sortOrder: 1,
    },
  });

  const mensFashion = await prisma.category.create({
    data: {
      title: 'پوشاک مردانه',
      slug: 'mens-fashion',
      icon: '👔',
      description: 'لباس، کفش و لوازم جانبی مردانه',
      metaTitle: 'پوشاک مردانه - خرید آنلاین',
      metaDescription: 'خرید انواع پوشاک، لباس، کفش و اکسسوری مردانه',
      metaKeywords: JSON.stringify(['پوشاک مردانه', 'لباس مردانه', 'مد مردانه']),
      isActive: true,
      sortOrder: 2,
    },
  });

  const kidsFashion = await prisma.category.create({
    data: {
      title: 'پوشاک بچگانه',
      slug: 'kids-fashion',
      icon: '👶',
      description: 'لباس و لوازم کودک و نوزاد',
      metaTitle: 'پوشاک بچگانه - خرید آنلاین',
      metaDescription: 'خرید انواع پوشاک و لوازم کودک و نوزاد',
      metaKeywords: JSON.stringify(['پوشاک بچگانه', 'لباس کودک', 'لباس نوزاد']),
      isActive: true,
      sortOrder: 3,
    },
  });

  const beautyCategory = await prisma.category.create({
    data: {
      title: 'آرایشی بهداشتی',
      slug: 'beauty-health',
      icon: '💄',
      description: 'محصولات آرایشی، بهداشتی و مراقبت',
      metaTitle: 'آرایشی بهداشتی - خرید آنلاین',
      metaDescription: 'خرید انواع محصولات آرایشی، بهداشتی و مراقبت',
      metaKeywords: JSON.stringify(['آرایشی', 'بهداشتی', 'مراقبت پوست', 'مراقبت مو']),
      isActive: true,
      sortOrder: 4,
    },
  });

  // Create Women's Fashion Subcategories
  console.log('Creating womens fashion subcategories...');

  await prisma.category.create({
    data: {
      title: 'تاپ و بلوز',
      slug: 'womens-tops-blouses',
      icon: '👚',
      parentId: womensFashion.id,
      description: 'تاپ، بادی، شومیز، پیراهن',
      metaKeywords: JSON.stringify(['تاپ', 'بلوز', 'بادی', 'شومیز', 'پیراهن', 'زنانه']),
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.category.create({
    data: {
      title: 'شلوار',
      slug: 'womens-pants',
      icon: '👖',
      parentId: womensFashion.id,
      description: 'شلوار راحتی، اسپرت، پارچه‌ای، لگ',
      metaKeywords: JSON.stringify(['شلوار', 'شلوار زنانه', 'شلوار راحتی', 'شلوار اسپرت', 'لگ']),
      isActive: true,
      sortOrder: 2,
    },
  });

  await prisma.category.create({
    data: {
      title: 'پیراهن و سارافون',
      slug: 'womens-dresses',
      icon: '👗',
      parentId: womensFashion.id,
      description: 'تونیک، دامن، سارافون، پیراهن مجلسی',
      metaKeywords: JSON.stringify(['پیراهن', 'سارافون', 'تونیک', 'دامن', 'زنانه']),
      isActive: true,
      sortOrder: 3,
    },
  });

  await prisma.category.create({
    data: {
      title: 'پالتو و کاپشن',
      slug: 'womens-coats-jackets',
      icon: '🧥',
      parentId: womensFashion.id,
      description: 'بارانی، بافت، پافر، پالتو، کاپشن',
      metaKeywords: JSON.stringify(['پالتو', 'کاپشن', 'بارانی', 'بافت', 'پافر', 'زنانه']),
      isActive: true,
      sortOrder: 4,
    },
  });

  await prisma.category.create({
    data: {
      title: 'سویشرت و هودی',
      slug: 'womens-hoodies-sweatshirts',
      icon: '👕',
      parentId: womensFashion.id,
      description: 'دورس، هودی، بلوز دورس، سویشرت، بلرسوت',
      metaKeywords: JSON.stringify(['سویشرت', 'هودی', 'دورس', 'بلوز دورس', 'بلرسوت', 'زنانه']),
      isActive: true,
      sortOrder: 5,
    },
  });

  await prisma.category.create({
    data: {
      title: 'لباس خواب و زیر',
      slug: 'womens-underwear-sleepwear',
      icon: '👙',
      parentId: womensFashion.id,
      description: 'لباس خواب، سوتین، لباس زیر',
      metaKeywords: JSON.stringify(['لباس خواب', 'سوتین', 'لباس زیر', 'زنانه']),
      isActive: true,
      sortOrder: 6,
    },
  });

  await prisma.category.create({
    data: {
      title: 'ست',
      slug: 'womens-sets',
      icon: '🎽',
      parentId: womensFashion.id,
      description: 'ست شومیز، ست راحتی، ست اسپرت',
      metaKeywords: JSON.stringify(['ست', 'ست زنانه', 'ست شومیز', 'ست راحتی', 'ست اسپرت']),
      isActive: true,
      sortOrder: 7,
    },
  });

  await prisma.category.create({
    data: {
      title: 'کیف و کفش',
      slug: 'womens-bags-shoes',
      icon: '👜',
      parentId: womensFashion.id,
      description: 'کیف، کفش، کتانی، صندل',
      metaKeywords: JSON.stringify(['کیف', 'کفش', 'کتانی', 'صندل', 'زنانه']),
      isActive: true,
      sortOrder: 8,
    },
  });

  await prisma.category.create({
    data: {
      title: 'اکسسوری',
      slug: 'womens-accessories',
      icon: '🧣',
      parentId: womensFashion.id,
      description: 'شال، کلاه، دستکش، زیورآلات',
      metaKeywords: JSON.stringify(['اکسسوری', 'شال', 'کلاه', 'دستکش', 'زیورآلات', 'زنانه']),
      isActive: true,
      sortOrder: 9,
    },
  });

  // Create Men's Fashion Subcategories
  console.log('Creating mens fashion subcategories...');

  await prisma.category.create({
    data: {
      title: 'پیراهن و تی‌شرت',
      slug: 'mens-shirts-tshirts',
      icon: '👕',
      parentId: mensFashion.id,
      description: 'پیراهن، تی‌شرت، پولو',
      metaKeywords: JSON.stringify(['پیراهن', 'تی شرت', 'پولو', 'مردانه']),
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.category.create({
    data: {
      title: 'شلوار',
      slug: 'mens-pants',
      icon: '👖',
      parentId: mensFashion.id,
      description: 'جین، کتان، اسپرت، پارچه‌ای',
      metaKeywords: JSON.stringify([
        'شلوار',
        'جین',
        'کتان',
        'شلوار اسپرت',
        'شلوار پارچه ای',
        'مردانه',
      ]),
      isActive: true,
      sortOrder: 2,
    },
  });

  await prisma.category.create({
    data: {
      title: 'کاپشن و پالتو',
      slug: 'mens-coats-jackets',
      icon: '🧥',
      parentId: mensFashion.id,
      description: 'کاپشن، پالتو، بارانی، کت',
      metaKeywords: JSON.stringify(['کاپشن', 'پالتو', 'بارانی', 'کت', 'مردانه']),
      isActive: true,
      sortOrder: 3,
    },
  });

  await prisma.category.create({
    data: {
      title: 'هودی و سویشرت',
      slug: 'mens-hoodies-sweatshirts',
      icon: '👕',
      parentId: mensFashion.id,
      description: 'هودی، سویشرت، بلوز گرم',
      metaKeywords: JSON.stringify(['هودی', 'سویشرت', 'بلوز', 'مردانه']),
      isActive: true,
      sortOrder: 4,
    },
  });

  await prisma.category.create({
    data: {
      title: 'لباس راحتی و خواب',
      slug: 'mens-loungewear-sleepwear',
      icon: '🩳',
      parentId: mensFashion.id,
      description: 'لباس راحتی، لباس خواب، شلوارک',
      metaKeywords: JSON.stringify(['لباس راحتی', 'لباس خواب', 'شلوارک', 'مردانه']),
      isActive: true,
      sortOrder: 5,
    },
  });

  await prisma.category.create({
    data: {
      title: 'ست',
      slug: 'mens-sets',
      icon: '🎽',
      parentId: mensFashion.id,
      description: 'ست ورزشی، ست راحتی، ست اسپرت',
      metaKeywords: JSON.stringify(['ست', 'ست ورزشی', 'ست راحتی', 'ست اسپرت', 'مردانه']),
      isActive: true,
      sortOrder: 6,
    },
  });

  await prisma.category.create({
    data: {
      title: 'کفش',
      slug: 'mens-shoes',
      icon: '👞',
      parentId: mensFashion.id,
      description: 'کفش، کتانی، کفش رسمی، صندل',
      metaKeywords: JSON.stringify(['کفش', 'کتانی', 'کفش رسمی', 'صندل', 'مردانه']),
      isActive: true,
      sortOrder: 7,
    },
  });

  await prisma.category.create({
    data: {
      title: 'اکسسوری',
      slug: 'mens-accessories',
      icon: '🧢',
      parentId: mensFashion.id,
      description: 'کلاه، کیف، کمربند، ساعت',
      metaKeywords: JSON.stringify(['اکسسوری', 'کلاه', 'کیف', 'کمربند', 'ساعت', 'مردانه']),
      isActive: true,
      sortOrder: 8,
    },
  });

  // Create Kids Fashion Subcategories
  console.log('Creating kids fashion subcategories...');

  await prisma.category.create({
    data: {
      title: 'تی‌شرت و پولوشرت',
      slug: 'kids-tshirts-polos',
      icon: '👕',
      parentId: kidsFashion.id,
      description: 'تی‌شرت، پولو، بلوز',
      metaKeywords: JSON.stringify(['تی شرت', 'پولو', 'بلوز', 'بچگانه']),
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.category.create({
    data: {
      title: 'شلوار',
      slug: 'kids-pants',
      icon: '👖',
      parentId: kidsFashion.id,
      description: 'جین، اسپرت، شلوارک',
      metaKeywords: JSON.stringify(['شلوار', 'جین', 'اسپرت', 'شلوارک', 'بچگانه']),
      isActive: true,
      sortOrder: 2,
    },
  });

  await prisma.category.create({
    data: {
      title: 'پیراهن و دامن',
      slug: 'kids-dresses-skirts',
      icon: '👗',
      parentId: kidsFashion.id,
      description: 'پیراهن، دامن، لباس مجلسی دخترانه',
      metaKeywords: JSON.stringify(['پیراهن', 'دامن', 'لباس مجلسی', 'دخترانه', 'بچگانه']),
      isActive: true,
      sortOrder: 3,
    },
  });

  await prisma.category.create({
    data: {
      title: 'کاپشن و بافت',
      slug: 'kids-jackets-sweaters',
      icon: '🧥',
      parentId: kidsFashion.id,
      description: 'کاپشن، بافت، پالتو، بارانی',
      metaKeywords: JSON.stringify(['کاپشن', 'بافت', 'پالتو', 'بارانی', 'بچگانه']),
      isActive: true,
      sortOrder: 4,
    },
  });

  await prisma.category.create({
    data: {
      title: 'هودی و سویشرت',
      slug: 'kids-hoodies-sweatshirts',
      icon: '👕',
      parentId: kidsFashion.id,
      description: 'هودی، سویشرت، بلوز گرم',
      metaKeywords: JSON.stringify(['هودی', 'سویشرت', 'بلوز', 'بچگانه']),
      isActive: true,
      sortOrder: 5,
    },
  });

  await prisma.category.create({
    data: {
      title: 'لباس راحتی و خواب',
      slug: 'kids-loungewear-sleepwear',
      icon: '🩳',
      parentId: kidsFashion.id,
      description: 'لباس راحتی، لباس خواب، پیژامه',
      metaKeywords: JSON.stringify(['لباس راحتی', 'لباس خواب', 'پیژامه', 'بچگانه']),
      isActive: true,
      sortOrder: 6,
    },
  });

  await prisma.category.create({
    data: {
      title: 'ست',
      slug: 'kids-sets',
      icon: '🎽',
      parentId: kidsFashion.id,
      description: 'ست ورزشی، ست مهمانی، ست راحتی',
      metaKeywords: JSON.stringify(['ست', 'ست ورزشی', 'ست مهمانی', 'ست راحتی', 'بچگانه']),
      isActive: true,
      sortOrder: 7,
    },
  });

  await prisma.category.create({
    data: {
      title: 'کفش',
      slug: 'kids-shoes',
      icon: '👟',
      parentId: kidsFashion.id,
      description: 'کفش، کتانی، صندل',
      metaKeywords: JSON.stringify(['کفش', 'کتانی', 'صندل', 'بچگانه']),
      isActive: true,
      sortOrder: 8,
    },
  });

  await prisma.category.create({
    data: {
      title: 'اکسسوری',
      slug: 'kids-accessories',
      icon: '🧸',
      parentId: kidsFashion.id,
      description: 'کلاه، کیف، اسباب بازی',
      metaKeywords: JSON.stringify(['اکسسوری', 'کلاه', 'کیف', 'اسباب بازی', 'بچگانه']),
      isActive: true,
      sortOrder: 9,
    },
  });

  // Create Beauty & Health Subcategories
  console.log('Creating beauty & health subcategories...');

  await prisma.category.create({
    data: {
      title: 'آرایش',
      slug: 'makeup',
      icon: '💅',
      parentId: beautyCategory.id,
      description: 'رژ، ریمل، کرم پودر، سایه',
      metaKeywords: JSON.stringify(['آرایش', 'رژ', 'ریمل', 'کرم پودر', 'سایه', 'خط چشم']),
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.category.create({
    data: {
      title: 'مراقبت پوست',
      slug: 'skincare',
      icon: '🧴',
      parentId: beautyCategory.id,
      description: 'کرم، سرم، ماسک، کرم ضد آفتاب',
      metaKeywords: JSON.stringify(['مراقبت پوست', 'کرم', 'سرم', 'ماسک', 'ضد آفتاب']),
      isActive: true,
      sortOrder: 2,
    },
  });

  await prisma.category.create({
    data: {
      title: 'مراقبت مو',
      slug: 'haircare',
      icon: '💇',
      parentId: beautyCategory.id,
      description: 'شامپو، نرم‌کننده، ماسک مو، رنگ مو',
      metaKeywords: JSON.stringify(['مراقبت مو', 'شامپو', 'نرم کننده', 'ماسک مو', 'رنگ مو']),
      isActive: true,
      sortOrder: 3,
    },
  });

  await prisma.category.create({
    data: {
      title: 'بهداشتی',
      slug: 'hygiene',
      icon: '🪒',
      parentId: beautyCategory.id,
      description: 'خمیر دندان، شامپو بدن، عطر، دئودورانت',
      metaKeywords: JSON.stringify(['بهداشتی', 'خمیر دندان', 'شامپو بدن', 'عطر', 'دئودورانت']),
      isActive: true,
      sortOrder: 4,
    },
  });

  await prisma.category.create({
    data: {
      title: 'سلامت و دارو',
      slug: 'health-medicine',
      icon: '💊',
      parentId: beautyCategory.id,
      description: 'مکمل، ویتامین، دارو، ماسک',
      metaKeywords: JSON.stringify(['سلامت', 'دارو', 'مکمل', 'ویتامین', 'ماسک']),
      isActive: true,
      sortOrder: 5,
    },
  });

  await prisma.category.create({
    data: {
      title: 'لوازم آرایشی',
      slug: 'makeup-tools',
      icon: '🧴',
      parentId: beautyCategory.id,
      description: 'براش، اسفنج، پنکیک، لوازم ناخن',
      metaKeywords: JSON.stringify(['لوازم آرایشی', 'براش', 'اسفنج', 'پنکیک', 'لوازم ناخن']),
      isActive: true,
      sortOrder: 6,
    },
  });

  // Create Sample Admin
  console.log('Creating sample admin...');

  // Create your actual admin account
  await prisma.admin.upsert({
    where: { telegramId: '7786012860' },
    update: {},
    create: {
      phoneNumber: '+989000000000',
      telegramId: '7786012860',
      telegramName: 'SKINNY',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // Keep sample admin too
  await prisma.admin.upsert({
    where: { telegramId: '123456789' },
    update: {},
    create: {
      phoneNumber: '+989123456789',
      telegramId: '123456789',
      telegramName: 'Admin User',
      telegramAvatar: 'https://via.placeholder.com/150',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // Create Sample User
  console.log('Creating sample user...');

  await prisma.user.upsert({
    where: { telegramId: '987654321' },
    update: {},
    create: {
      telegramId: '987654321',
      telegramUsername: 'sample_user',
      firstName: 'علی',
      lastName: 'محمدی',
      phoneNumber: '+989121234567',
      isActive: true,
      isBanned: false,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`
📊 Created:
  - ${await prisma.category.count()} Categories
  - ${await prisma.admin.count()} Admins
  - ${await prisma.user.count()} Users

🔑 Test Credentials:
  Admin Telegram ID: 123456789
  User Telegram ID: 987654321
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

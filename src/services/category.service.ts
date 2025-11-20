import prisma from '../config/database';
import { NotFoundError } from '../utils/errors.util';
import { getPaginationParams, getPaginationMeta } from '../utils/helpers.util';
import { CreateCategoryInput, UpdateCategoryInput } from '../validators';

export class CategoryService {
  /**
   * Create category
   */
  async createCategory(data: CreateCategoryInput) {
    const category = await prisma.category.create({
      data: {
        title: data.title,
        slug: data.slug,
        icon: data.icon,
        description: data.description,
        parentId: data.parentId,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription,
        metaKeywords: JSON.stringify(data.metaKeywords || []),
      },
    });

    return category;
  }

  /**
   * Update category
   */
  async updateCategory(categoryId: number, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const updateData: any = { ...data };
    if (updateData.metaKeywords) {
      updateData.metaKeywords = JSON.stringify(updateData.metaKeywords);
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: updateData as any,
    });

    return updatedCategory;
  }

  /**
   * Delete category
   */
  async deleteCategory(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        children: true,
        storeCategories: true,
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    // Check if category has children or is being used
    if (category.children.length > 0) {
      throw new Error('Cannot delete category with subcategories');
    }

    if (category.storeCategories.length > 0 || category.products.length > 0) {
      throw new Error('Cannot delete category that is being used by stores or products');
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return category;
  }

  /**
   * Get category by ID
   */
  async getCategoryById(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  /**
   * List all categories
   */
  async listCategories(params?: { page?: number; limit?: number; parentId?: number | null }) {
    if (params?.page || params?.limit) {
      const { skip, take, page, limit } = getPaginationParams(params.page, params.limit);

      const where: any = {
        isActive: true,
      };

      if (params.parentId !== undefined) {
        where.parentId = params.parentId;
      }

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          where,
          skip,
          take,
          include: {
            parent: true,
            children: true,
          },
          orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
        }),
        prisma.category.count({ where }),
      ]);

      const meta = getPaginationMeta(total, page, limit);

      return { categories, meta };
    }

    // Return all categories without pagination
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        parent: true,
        children: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });

    return { categories };
  }

  /**
   * Get root categories (no parent)
   */
  async getRootCategories() {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
        isActive: true,
      },
      include: {
        children: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });

    return categories;
  }

  /**
   * Get category tree (hierarchical structure)
   */
  async getCategoryTree() {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });

    // Filter to get only root categories (parentId is null)
    const rootCategories = categories.filter((cat) => cat.parentId === null);

    return rootCategories;
  }
}

export default new CategoryService();

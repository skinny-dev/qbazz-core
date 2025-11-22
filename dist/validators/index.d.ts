import { z } from 'zod';
/**
 * Validate Iranian National Code (کد ملی)
 * 10-digit code with specific checksum algorithm
 */
export declare function validateIranianNationalCode(nationalCode: string): boolean;
/**
 * Validate Telegram ID format
 */
export declare function validateTelegramId(telegramId: string): boolean;
/**
 * Validate phone number (international format)
 */
export declare function validatePhoneNumber(phone: string): boolean;
/**
 * Validate slug format
 */
export declare function validateSlug(slug: string): boolean;
export declare const createStoreSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    longDescription: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    socials: z.ZodObject<{
        telegram: z.ZodObject<{
            id: z.ZodEffects<z.ZodString, string, string>;
            avatar: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            username: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        }, {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        }>;
        instagram: z.ZodOptional<z.ZodString>;
        whatsapp: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    }, {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    }>;
    identity: z.ZodObject<{
        nationalCode: z.ZodEffects<z.ZodString, string, string>;
        location: z.ZodObject<{
            city: z.ZodString;
            country: z.ZodDefault<z.ZodString>;
            coordinates: z.ZodOptional<z.ZodObject<{
                lat: z.ZodNumber;
                lng: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lat: number;
                lng: number;
            }, {
                lat: number;
                lng: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }, {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodString>;
        phones: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        nationalCode: string;
        location: {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    }, {
        nationalCode: string;
        location: {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    }>;
    avatar: z.ZodOptional<z.ZodString>;
    coverImage: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    categoryIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    socials: {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    };
    identity: {
        nationalCode: string;
        location: {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    };
    categoryIds: number[];
    description?: string | null | undefined;
    longDescription?: string | null | undefined;
    avatar?: string | undefined;
    coverImage?: string | undefined;
    tags?: string[] | undefined;
}, {
    title: string;
    socials: {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    };
    identity: {
        nationalCode: string;
        location: {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    };
    categoryIds: number[];
    description?: string | null | undefined;
    longDescription?: string | null | undefined;
    avatar?: string | undefined;
    coverImage?: string | undefined;
    tags?: string[] | undefined;
}>;
export declare const updateStoreSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    longDescription: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    socials: z.ZodOptional<z.ZodObject<{
        telegram: z.ZodObject<{
            id: z.ZodEffects<z.ZodString, string, string>;
            avatar: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            username: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        }, {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        }>;
        instagram: z.ZodOptional<z.ZodString>;
        whatsapp: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    }, {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    }>>;
    identity: z.ZodOptional<z.ZodObject<{
        nationalCode: z.ZodEffects<z.ZodString, string, string>;
        location: z.ZodObject<{
            city: z.ZodString;
            country: z.ZodDefault<z.ZodString>;
            coordinates: z.ZodOptional<z.ZodObject<{
                lat: z.ZodNumber;
                lng: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lat: number;
                lng: number;
            }, {
                lat: number;
                lng: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }, {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodString>;
        phones: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        nationalCode: string;
        location: {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    }, {
        nationalCode: string;
        location: {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    }>>;
    avatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coverImage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    categoryIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | null | undefined;
    longDescription?: string | null | undefined;
    socials?: {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    } | undefined;
    avatar?: string | undefined;
    identity?: {
        nationalCode: string;
        location: {
            city: string;
            country: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    } | undefined;
    coverImage?: string | undefined;
    tags?: string[] | undefined;
    categoryIds?: number[] | undefined;
}, {
    title?: string | undefined;
    description?: string | null | undefined;
    longDescription?: string | null | undefined;
    socials?: {
        telegram: {
            id: string;
            avatar?: string | undefined;
            bio?: string | undefined;
            username?: string | undefined;
        };
        instagram?: string | undefined;
        whatsapp?: string | undefined;
        website?: string | undefined;
    } | undefined;
    avatar?: string | undefined;
    identity?: {
        nationalCode: string;
        location: {
            city: string;
            country?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        address?: string | undefined;
        phones?: string[] | undefined;
    } | undefined;
    coverImage?: string | undefined;
    tags?: string[] | undefined;
    categoryIds?: number[] | undefined;
}>;
export declare const createProductSchema: z.ZodObject<{
    storeId: z.ZodNumber;
    categoryId: z.ZodOptional<z.ZodNumber>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    longDescription: z.ZodOptional<z.ZodString>;
    properties: z.ZodRecord<z.ZodString, z.ZodAny>;
    pricing: z.ZodRecord<z.ZodString, z.ZodAny>;
    colors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    colorVariations: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    availability: z.ZodDefault<z.ZodEnum<["available", "out_of_stock", "pre_order"]>>;
    stockQuantity: z.ZodOptional<z.ZodNumber>;
    brand: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    condition: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    images: z.ZodArray<z.ZodString, "many">;
    sourceMetadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    storeId: number;
    properties: Record<string, any>;
    pricing: Record<string, any>;
    availability: "available" | "out_of_stock" | "pre_order";
    images: string[];
    description?: string | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    categoryId?: number | undefined;
    colors?: string[] | undefined;
    colorVariations?: any[] | undefined;
    stockQuantity?: number | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    condition?: string | undefined;
    sourceMetadata?: Record<string, any> | undefined;
}, {
    title: string;
    storeId: number;
    properties: Record<string, any>;
    pricing: Record<string, any>;
    images: string[];
    description?: string | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    categoryId?: number | undefined;
    colors?: string[] | undefined;
    colorVariations?: any[] | undefined;
    availability?: "available" | "out_of_stock" | "pre_order" | undefined;
    stockQuantity?: number | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    condition?: string | undefined;
    sourceMetadata?: Record<string, any> | undefined;
}>;
export declare const updateProductSchema: z.ZodObject<{
    storeId: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    longDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    pricing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    colors: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    colorVariations: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>>;
    availability: z.ZodOptional<z.ZodDefault<z.ZodEnum<["available", "out_of_stock", "pre_order"]>>>;
    stockQuantity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    brand: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    manufacturer: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    condition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sourceMetadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    storeId?: number | undefined;
    categoryId?: number | undefined;
    properties?: Record<string, any> | undefined;
    pricing?: Record<string, any> | undefined;
    colors?: string[] | undefined;
    colorVariations?: any[] | undefined;
    availability?: "available" | "out_of_stock" | "pre_order" | undefined;
    stockQuantity?: number | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    condition?: string | undefined;
    images?: string[] | undefined;
    sourceMetadata?: Record<string, any> | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    storeId?: number | undefined;
    categoryId?: number | undefined;
    properties?: Record<string, any> | undefined;
    pricing?: Record<string, any> | undefined;
    colors?: string[] | undefined;
    colorVariations?: any[] | undefined;
    availability?: "available" | "out_of_stock" | "pre_order" | undefined;
    stockQuantity?: number | undefined;
    brand?: string | undefined;
    manufacturer?: string | undefined;
    condition?: string | undefined;
    images?: string[] | undefined;
    sourceMetadata?: Record<string, any> | undefined;
}>;
export declare const createCategorySchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    icon: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNumber>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    metaKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    slug: string;
    description?: string | undefined;
    icon?: string | undefined;
    parentId?: number | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    metaKeywords?: string[] | undefined;
}, {
    title: string;
    slug: string;
    description?: string | undefined;
    icon?: string | undefined;
    parentId?: number | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    metaKeywords?: string[] | undefined;
}>;
export declare const updateCategorySchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    parentId: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaKeywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    icon?: string | undefined;
    parentId?: number | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    metaKeywords?: string[] | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    icon?: string | undefined;
    parentId?: number | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    metaKeywords?: string[] | undefined;
}>;
export declare const createUserSchema: z.ZodObject<{
    telegramId: z.ZodEffects<z.ZodString, string, string>;
    telegramAvatar: z.ZodOptional<z.ZodString>;
    telegramUsername: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    telegramId: string;
    telegramAvatar?: string | undefined;
    telegramUsername?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phoneNumber?: string | undefined;
}, {
    telegramId: string;
    telegramAvatar?: string | undefined;
    telegramUsername?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phoneNumber?: string | undefined;
}>;
export declare const createAdminSchema: z.ZodObject<{
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
    telegramId: z.ZodEffects<z.ZodString, string, string>;
    telegramAvatar: z.ZodOptional<z.ZodString>;
    telegramName: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["SUPER_ADMIN", "ADMIN", "MODERATOR"]>>;
}, "strip", z.ZodTypeAny, {
    telegramId: string;
    phoneNumber: string;
    telegramName: string;
    role: "SUPER_ADMIN" | "ADMIN" | "MODERATOR";
    telegramAvatar?: string | undefined;
}, {
    telegramId: string;
    phoneNumber: string;
    telegramName: string;
    telegramAvatar?: string | undefined;
    role?: "SUPER_ADMIN" | "ADMIN" | "MODERATOR" | undefined;
}>;
export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
//# sourceMappingURL=index.d.ts.map
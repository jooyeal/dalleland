import { z } from "zod";

export const inputCreateProduct = z.object({
  images: z
    .object({
      uri: z.string(),
      isThumbnail: z.boolean(),
    })
    .array(),
  name: z.string(),
  categories: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
  stock: z.number(),
  size: z
    .object({
      name: z.string(),
      stock: z.number(),
    })
    .array(),
  price: z.number(),
  isDiscount: z.boolean(),
  discountRate: z.number().optional(),
  additionalInfos: z
    .object({
      name: z.string(),
      content: z.string(),
    })
    .array(),
});

export const inputGetProductsByPage = z.object({
  page: z.number().optional(),
  searchTarget: z.string().optional(),
});

export const inputDeleteProduct = z.object({
  id: z.string(),
});

export type TInputCreateProduct = z.infer<typeof inputCreateProduct>;

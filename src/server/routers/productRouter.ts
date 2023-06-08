import { inputCreateProduct } from "../scheme/productScheme";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const productRouter = router({
  createProduct: authenticatedProcedure
    .input(inputCreateProduct)
    .mutation(async ({ input, ctx }) => {
      try {
        const { images, categories, additionalInfos, size, ...rest } = input;

        if (!rest.name) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product name is required",
          });
        }

        if (!categories || categories.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product category is required",
          });
        }

        if (!rest.stock) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product stock is required",
          });
        }

        if (!rest.price) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product price is required",
          });
        }

        /** create new product */
        const newProduct = await ctx.prisma.product.create({
          data: {
            ...rest,
            categories: {
              connect: categories.map((category) => ({ id: category.id })),
            },
            size: {
              createMany: {
                data: size,
              },
            },
            images: {
              createMany: {
                data: images,
              },
            },
            additionalInfos: {
              createMany: {
                data: additionalInfos,
              },
            },
          },
        });

        return newProduct;
      } catch (e) {
        /** if error is occured by TRPC */
        if (e instanceof TRPCError) {
          throw new TRPCError({
            code: e.code,
            message: e.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server error",
        });
      }
    }),
});

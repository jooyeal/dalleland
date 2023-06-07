import { inputCreateProduct } from "../scheme/productScheme";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const productRouter = router({
  createProduct: authenticatedProcedure
    .input(inputCreateProduct)
    .mutation(async ({ input, ctx }) => {
      try {
        const { images, categories, size, ...rest } = input;

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
          },
        });

        return newProduct;

        // /** create new images and link to product */
        // await Promise.all(
        //   images.map(
        //     async (image) =>
        //       await ctx.prisma.productImage.create({
        //         data: {
        //           ...image,
        //           productId: newProduct.id,
        //         },
        //       })
        //   )
        // );

        // /** create new sizes and link to product */
        // await Promise.all(
        //   size.map(
        //     async (s) =>
        //       await ctx.prisma.size.create({
        //         data: {
        //           ...s,
        //           productId: newProduct.id,
        //         },
        //       })
        //   )
        // );
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

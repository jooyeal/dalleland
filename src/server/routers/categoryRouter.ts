import { inputCreateCategory } from "../scheme/categoryScheme";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const categoryRouter = router({
  /** Create new category */
  createCategory: authenticatedProcedure
    .input(inputCreateCategory)
    .mutation(async ({ input, ctx }) => {
      try {
        const { name, parentId, parentDepth } = input;

        /** maximum depth is 6 */
        if (parentDepth < 6) {
          const newCategory = await ctx.prisma.category.create({
            data: { name, parentId, depth: parentId ? parentDepth + 1 : 0 },
          });
          return newCategory;
        }

        /** throw error when depth is exceeded maximum number */
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Exceeded the maximum depth allowed for selection",
        });
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
  /** Get categories */
  getCategories: publicProcedure.query(async ({ ctx }) => {
    try {
      /** categories maximum depth 6 */
      const categories = await ctx.prisma.category.findMany({
        include: {
          child: {
            select: {
              child: {
                select: {
                  child: {
                    select: {
                      child: {
                        select: {
                          child: {
                            select: {
                              child: {
                                select: {
                                  child: true,
                                  id: true,
                                  parentId: true,
                                  name: true,
                                  comment: true,
                                  isPromotion: true,
                                  createdAt: true,
                                  updatedAt: true,
                                  depth: true,
                                },
                              },
                              id: true,
                              parentId: true,
                              name: true,
                              comment: true,
                              isPromotion: true,
                              createdAt: true,
                              updatedAt: true,
                              depth: true,
                            },
                          },
                          id: true,
                          parentId: true,
                          name: true,
                          comment: true,
                          isPromotion: true,
                          createdAt: true,
                          updatedAt: true,
                          depth: true,
                        },
                      },
                      id: true,
                      parentId: true,
                      name: true,
                      comment: true,
                      isPromotion: true,
                      createdAt: true,
                      updatedAt: true,
                      depth: true,
                    },
                  },
                  id: true,
                  parentId: true,
                  name: true,
                  comment: true,
                  isPromotion: true,
                  createdAt: true,
                  updatedAt: true,
                  depth: true,
                },
              },
              id: true,
              parentId: true,
              name: true,
              comment: true,
              isPromotion: true,
              createdAt: true,
              updatedAt: true,
              depth: true,
            },
          },
        },
      });
      return categories;
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

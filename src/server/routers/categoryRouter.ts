import {
  inputCreateCategory,
  inputDeleteCategory,
  inputGetCategory,
  inputUpdateCategory,
} from "../scheme/categoryScheme";
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
  /** get category by id */
  getCategory: authenticatedProcedure
    .input(inputGetCategory)
    .query(async ({ input, ctx }) => {
      try {
        const { id } = input;
        if (!id) return null;
        const category = await ctx.prisma.category.findUnique({
          where: { id },
          include: {
            parent: {
              select: {
                name: true,
              },
            },
          },
        });
        return category;
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
  /** update category */
  updateCategory: authenticatedProcedure
    .input(inputUpdateCategory)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, parentId, name, comment, depth, isPromotion } = input;
        /** throw error when move to self */
        if (id === parentId)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Can not move to same category",
          });

        /** maximum depth is 6 */
        if (depth < 7) {
          const category = await ctx.prisma.category.update({
            where: {
              id,
            },
            data: {
              parentId,
              name,
              comment,
              depth,
              isPromotion,
            },
          });
          return category;
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
  /** delete category */
  deleteCategory: authenticatedProcedure
    .input(inputDeleteCategory)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id } = input;
        if (!id)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Please select category",
          });

        const category = await ctx.prisma.category.delete({
          where: {
            id,
          },
        });
        return category;
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

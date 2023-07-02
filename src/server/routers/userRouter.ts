import { authenticatedProcedure, publicProcedure, router } from "../trpc";
import { inputGetUser, inputGetUserByEmail, inputGetUsersByPage } from "../scheme/userScheme";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUserByEmail: publicProcedure
    .input(inputGetUserByEmail)
    .query(async ({ input, ctx }) => {
      try {
        const { email } = input;
        const user = await ctx.prisma.user.findUnique({ where: { email } });
        return user;
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

  getUsersByPage: authenticatedProcedure
    .input(inputGetUsersByPage)
    .query(async ({ input, ctx }) => {
      try {
        const PER_PAGE = 10;
        const { page, searchTarget } = input;

        const users = await ctx.prisma.user.findMany({
          skip: !page ? 0 : PER_PAGE * page - 1,
          take: PER_PAGE,
          where: {
            name: {
              contains: searchTarget,
            },
          },
          include: {
            grade: {
              select: {
                id: true,
                name: true,
              },
            }
          },
        });
        return users;
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

  /** get user by id */
  getUser: authenticatedProcedure
    .input(inputGetUser)
    .query(async ({ input, ctx }) => {
      try {
        const { id } = input;
        if (!id) return null;
        const user = await ctx.prisma.user.findUnique({
          where: { id },
          include: {
            grade: {
              select: {
                name: true,
              },
            },
          },
        });
        return user;
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

import { publicProcedure, router } from "../trpc";
import { inputGetUserByEmail } from "../scheme/userScheme";
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
});

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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server error",
        });
      }
    }),
});

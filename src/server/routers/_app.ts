import { router } from "../trpc";
import { categoryRouter } from "./categoryRouter";
import { userRouter } from "./userRouter";
export const appRouter = router({
  user: userRouter,
  category: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { router } from "../trpc";
import { categoryRouter } from "./categoryRouter";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";
export const appRouter = router({
  user: userRouter,
  category: categoryRouter,
  product: productRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

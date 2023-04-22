import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";

export default trpc.withTRPC(function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
});

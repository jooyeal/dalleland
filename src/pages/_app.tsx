import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "black",
      },
    },
  },
});

export default trpc.withTRPC(function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
});

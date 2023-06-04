import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/common/layout/Layout";
import AdminLayout from "@/components/admin/Layout";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {router.pathname.includes("admin") ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
});

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer autoClose={1000} pauseOnHover={false} />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

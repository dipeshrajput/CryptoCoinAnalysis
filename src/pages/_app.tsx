import "@/styles/globals.css";
import "@/styles/nprogress.css";

import type { AppProps } from "next/app";
import { Fira_Code } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStore from "@/context/globalContext";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-firacode" });
const queryClient = new QueryClient();

// NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <GlobalStore>
      <>
        <style jsx global>
          {`
            html {
              font-family: ${firaCode.style.fontFamily};
            }
          `}
        </style>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </>
    </GlobalStore>
  );
}

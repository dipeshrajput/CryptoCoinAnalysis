import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fira_Code } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStore from "@/context/globalContext";

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-firacode" });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStore>
      <QueryClientProvider client={queryClient}>
        <>
          <style jsx global>
            {`
              html {
                font-family: ${firaCode.style.fontFamily};
              }
            `}
          </style>
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </GlobalStore>
  );
}

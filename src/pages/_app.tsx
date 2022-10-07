import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, chain, defaultChains } from "wagmi";
import { wagmiClient } from "@/ethereum/wagmiClient";
import PageLayout from "@/components/Layout/PageLayout";

const MyDApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  </WagmiConfig>
);

export default MyDApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
} from "wagmi";
import PageLayout from "@/components/Layout/PageLayout";

// wagmi config
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const chains = defaultChains;

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "Create-Next-Dapp",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

const MyDApp = ({ Component, pageProps }: AppProps) => (
  <Provider autoConnect connectors={connectors}>
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  </Provider>
);

export default MyDApp;

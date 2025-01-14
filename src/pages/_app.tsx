import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  APP_NETWORK,
  DOMAIN,
  PAPER_CLIENT_ID,
  RELAYER_URL,
} from "@/lib/environment-variables";
import theme from "@/theme";
import { ChakraProvider, Container } from "@chakra-ui/react";
import {
  ThirdwebAuthConfig,
  paperWallet,
  SDKOptions,
  ThirdwebProvider,
  Wallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const paperWalletConfig = paperWallet({
  clientId: PAPER_CLIENT_ID,
});
paperWalletConfig.meta.name = "Email";
paperWalletConfig.meta.iconURL = "https://ipfs.thirdwebcdn.com/ipfs/QmUUoZxPuAgxKHeT5cCY4vwmN8sZRiV9ptzBhuM47Y24NY/email%20wallet%20shopify.png";

export default function App({ Component, pageProps }: AppProps) {
  const supportedWallets: Wallet[] = [
    ...(PAPER_CLIENT_ID
      ? [
        paperWalletConfig,
      ]
      : []),
  ];

  const authConfig: ThirdwebAuthConfig = {
    domain: DOMAIN,
    authUrl: "/api/auth",
  };

  const sdkOptions: SDKOptions | undefined = RELAYER_URL
    ? {
      gasless: {
        openzeppelin: { relayerUrl: RELAYER_URL },
      },
    }
    : undefined;

  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider
        supportedWallets={supportedWallets}
        authConfig={authConfig}
        sdkOptions={sdkOptions}
        activeChain={APP_NETWORK || "mumbai"}
      >
        <Head>
          <title>Commerce Reimagined</title>
        </Head>
        <Navbar />
        <Container maxW="container.page">
          <Component {...pageProps} />
        </Container>
        <Sidebar/>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}
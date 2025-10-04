import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/global.css";
import Layout from "../components/Layout";

type PagePropsWithSession = AppProps["pageProps"] & {
  session?: unknown;
};

function AppContent({ Component, pageProps }: { Component: AppProps["Component"]; pageProps: PagePropsWithSession }) {
  const { data: session, status } = useSession({ required: false });
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-6">Cargando...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

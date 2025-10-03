import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/Layout';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

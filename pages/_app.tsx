import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/global.css';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  );
}

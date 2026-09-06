import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#22c55e" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
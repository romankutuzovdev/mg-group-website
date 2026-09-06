import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDictionary } from '@/lib/dictionary';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  // Ensure we always have a dictionary
  const dictionary = pageProps.dictionary || getDictionary();

  return (
    <div className={inter.className}>
      <Header dictionary={dictionary} />
      <Component {...pageProps} />
      <Footer dictionary={dictionary} />
    </div>
  );
}
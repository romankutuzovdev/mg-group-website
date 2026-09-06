import Head from 'next/head';
import type { Dictionary } from '@/lib/dictionary';

interface SEOProps {
  dictionary: Dictionary;
  lang: string;
}

const SEO = ({ dictionary, lang }: SEOProps) => {
  const { metadata } = dictionary;

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />

      <link rel="canonical" href="https://www.multiglobalgroup.com/" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
  );
}

export default SEO;
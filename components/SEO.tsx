import Head from 'next/head';
import type { Dictionary } from '@/lib/dictionary';

const SITE_ORIGIN = 'https://www.multiglobalgroup.com';

interface SEOProps {
  dictionary: Dictionary;
  lang: string;
}

const SEO = ({ dictionary }: SEOProps) => {
  const { metadata } = dictionary;
  const ogImage = metadata.ogImage.startsWith('http')
    ? metadata.ogImage
    : `${SITE_ORIGIN}${metadata.ogImage.startsWith('/') ? metadata.ogImage : `/${metadata.ogImage}`}`;

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph — absolute image URL required for Telegram / messengers */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="MG GROUP" />
      <meta property="og:url" content={`${SITE_ORIGIN}/`} />
      <meta property="og:site_name" content="MG GROUP" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={`${SITE_ORIGIN}/`} />

      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  );
}

export default SEO;

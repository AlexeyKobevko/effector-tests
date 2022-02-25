import React, { FC } from 'react';
import { DefaultSeoProps, SeoProps } from './types';
import { Helmet } from 'react-helmet-async';
import { seoTags } from './seo-tags';

import appleTouchIcon from 'assets/favicons/apple-touch-icon.png';
import appleTouchIconPrecomposed from 'assets/favicons/apple-touch-icon-precomposed.png';
import appleTouchIconOne from 'assets/favicons/apple-touch-icon-57x57.png';
import appleTouchIcon114 from 'assets/favicons/apple-touch-icon-114x114.png';
import appleTouchIcon72 from 'assets/favicons/apple-touch-icon-72x72.png';
import appleTouchIcon144 from 'assets/favicons/apple-touch-icon-144x144.png';
import appleTouchIcon60 from 'assets/favicons/apple-touch-icon-60x60.png';
import appleTouchIcon120 from 'assets/favicons/apple-touch-icon-120x120.png';
import appleTouchIcon76 from 'assets/favicons/apple-touch-icon-76x76.png';
import appleTouchIcon152 from 'assets/favicons/apple-touch-icon-152x152.png';
import appleTouchIcon180 from 'assets/favicons/apple-touch-icon-180x180.png';
import appleTouchIcon32 from 'assets/favicons/favicon-32x32.png';
import appleTouchIcon96 from 'assets/favicons/favicon-96x96.png';
import appleTouchIcon16 from 'assets/favicons/favicon-16x16.png';
import favicon from 'assets/favicons/favicon.ico';
import android from 'assets/favicons/android-chrome-192x192.png';

const Seo: FC<SeoProps> = ({
  schema,
  title,
  description,
  canonical,
  openGraph,
  facebook,
  twitter,
  titleTemplate,
  languageAlternates,
  additionalMetaTags,
  additionalLinkTags,
  googleSite,
  defaultOpenGraphImageWidth,
  defaultOpenGraphImageHeight,
  defaultOpenGraphVideoWidth,
  defaultOpenGraphVideoHeight,
  style,
  bodyClass,
}) => {
  return (
    <Helmet>
      {seoTags({
        schema,
        title,
        description,
        canonical,
        openGraph,
        facebook,
        twitter,
        titleTemplate,
        languageAlternates,
        additionalMetaTags,
        additionalLinkTags,
        googleSite,
        defaultOpenGraphImageWidth,
        defaultOpenGraphImageHeight,
        defaultOpenGraphVideoWidth,
        defaultOpenGraphVideoHeight,
        style,
        bodyClass,
      })}
    </Helmet>
  );
};

interface Props {
  config: () => SeoProps;
}

export const SEO: FC<Props> = ({ config }) => {
  const conf = config();
  return <Seo {...conf} />;
};

export const config: DefaultSeoProps = {
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      href: appleTouchIcon,
    },
    {
      rel: 'apple-touch-icon-precomposed',
      href: appleTouchIconPrecomposed,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      href: appleTouchIconOne,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      href: appleTouchIcon114,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      href: appleTouchIcon72,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      href: appleTouchIcon144,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      href: appleTouchIcon60,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      href: appleTouchIcon120,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: appleTouchIcon76,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: appleTouchIcon152,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: appleTouchIcon180,
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: appleTouchIcon32,
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: appleTouchIcon96,
      sizes: '96x96',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: appleTouchIcon16,
      sizes: '16x16',
    },
    {
      rel: 'icon',
      href: favicon,
      type: 'image/x-icon',
    },
    {
      rel: 'shortcut icon',
      href: favicon,
      type: 'image/x-icon',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: android,
      sizes: '192x192',
    },
  ],
};

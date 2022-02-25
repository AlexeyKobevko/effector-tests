interface BaseMetaTag {
  content: string;
}

interface OpenGraphImages {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

interface OpenGraphVideos {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}
export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  publisher?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImages>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}

interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
}

interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
}

type MetaTag = HTML5MetaTag | RDFaMetaTag;

interface LanguageAlternate {
  hrefLang: string;
  href: string;
}

interface LinkTag {
  sizes?: string;
  href: string;
  type?: string;
  rel?: string;
  as?: string;
  media?: string;
}

interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
  description?: string;
  title?: string;
  images?: ReadonlyArray<string>;
  imagesSrc?: ReadonlyArray<string>;
}

export interface SeoProps {
  schema?: ReadonlyArray<string>;
  title?: string;
  titleTemplate?: string;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  facebook?: { appId: string };
  twitter?: Twitter;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  googleSite?: ReadonlyArray<string>;
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
  style?: string;
  bodyClass?: string;
}

export interface DefaultSeoProps extends SeoProps {
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
}

export interface BuildTagsParams extends DefaultSeoProps, SeoProps {}

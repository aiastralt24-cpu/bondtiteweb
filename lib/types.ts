export type NavItem = {
  label: string;
  href: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  chemistry: string;
  label: string;
  meta: string;
  image: string;
  imageAlt: string;
  imageTone?: "pack" | "box" | "tube" | "spray" | "square";
  reason: string;
  bestFor: string[];
};

export type FinderOption = {
  id: string;
  label: string;
};

export type FinderGroup = {
  id: "material" | "environment" | "speed";
  label: string;
  options: FinderOption[];
};

export type FinderRule = {
  material: string;
  environment: string;
  speed: string;
  productId: string;
};

export type BondFinderData = {
  title: string;
  intro: string;
  groups: FinderGroup[];
  rules: FinderRule[];
  fallbackProductId: string;
};

export type HeroData = {
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  body: string;
  cta: Cta;
  proof: Array<{
    title: string;
    detail: string;
  }>;
};

export type Chemistry = {
  name: string;
  accent: string;
  description: string;
  bullets: string[];
  productId: string;
};

export type Application = {
  titleBefore: string;
  titleAccent: string;
  body: string;
};

export type Resource = {
  code: string;
  title: string;
  body: string;
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export type HomepageData = {
  navigation: NavItem[];
  headerCta: Cta;
  hero: HeroData;
  bondFinder: BondFinderData;
  products: Product[];
  chemistries: Chemistry[];
  applications: Application[];
  resources: Resource[];
  stats: Stat[];
  faqs: Faq[];
  footer: {
    columns: FooterColumn[];
  };
};

import { withSeo } from "@/lib/seo";
import type { Metadata } from 'next';
import { PolicyPage } from '@/components/policy-page';
import { policies } from '@/lib/policies';
export const metadata:Metadata=withSeo({title:policies['privacy-policy'].title+' | Bondtite',description:policies['privacy-policy'].summary,alternates:{canonical:'/privacy-policy'}});
export default function Page(){return <PolicyPage slug="privacy-policy"/>;}

import { withSeo } from "@/lib/seo";
import type { Metadata } from 'next';
import { PolicyPage } from '@/components/policy-page';
import { policies } from '@/lib/policies';
export const metadata:Metadata=withSeo({title:policies['cookie-policy'].title+' | Bondtite',description:policies['cookie-policy'].summary,alternates:{canonical:'/cookie-policy'}});
export default function Page(){return <PolicyPage slug="cookie-policy"/>;}

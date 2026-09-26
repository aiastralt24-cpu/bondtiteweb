import { withSeo } from "@/lib/seo";
import type { Metadata } from 'next';
import { PolicyPage } from '@/components/policy-page';
import { policies } from '@/lib/policies';
export const metadata:Metadata=withSeo({title:policies['terms-and-conditions'].title+' | Bondtite',description:policies['terms-and-conditions'].summary,alternates:{canonical:'/terms-and-conditions'}});
export default function Page(){return <PolicyPage slug="terms-and-conditions"/>;}

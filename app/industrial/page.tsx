import type { Metadata } from "next";
import { ComplexShowcase } from "@/components/ComplexShowcase";
import { complexPages } from "@/content/site";

export const metadata: Metadata = { title: "Промышленный комплекс", description: complexPages.industrial.lead };
export default function Page() { return <ComplexShowcase kind="industrial" />; }

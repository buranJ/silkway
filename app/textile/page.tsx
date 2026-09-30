import type { Metadata } from "next";
import { ComplexShowcase } from "@/components/ComplexShowcase";
import { complexPages } from "@/content/site";

export const metadata: Metadata = { title: "Тканевый комплекс", description: complexPages.textile.lead };
export default function Page() { return <ComplexShowcase kind="textile" />; }

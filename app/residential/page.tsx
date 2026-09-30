import type { Metadata } from "next";
import { ComplexPage } from "@/components/ComplexPage";
import { complexPages } from "@/content/site";

export const metadata: Metadata = { title: "Жилой комплекс", description: complexPages.residential.lead };
export default function Page() { return <ComplexPage data={complexPages.residential} />; }

import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Soluvia Design, our story, values, and the talented team behind our success.",
}

export default function AboutPage() {
  return <AboutPageClient />
}


import { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works | Soluvia",
  description: "Learn about our human-centered, AI-enhanced approach that delivers exceptional digital solutions.",
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
} 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { Impact } from "@/components/sections/Impact";
import { FAQ } from "@/components/sections/FAQ";
import { Chatbot } from "@/components/ui/Chatbot";
import { useSEO } from "@/hooks/useSEO";
import { SchemaMarkup } from "@/components/SchemaMarkup";

export default function Home() {
  useSEO({
    title: "Digital Marketing & Web Development Indianapolis | Alynthe",
    description: "Alynthe is a premier digital solutions agency in Indianapolis specializing in AI marketing automation, enterprise cloud solutions, and ecommerce growth.",
    keywords: "digital marketing agency Indianapolis, web development Indianapolis, AI solutions Indianapolis, marketing automation Indianapolis, Indianapolis SEO services, AI marketing automation, small business digital transformation",
    canonicalUrl: "https://alynthe.com/",
    ogImage: "https://alynthe.com/opengraph.jpg"
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <SchemaMarkup type="home" />
      <Navbar />
      <main>
        <Hero />
        <ServicePillars />
        <Impact />
        <FAQ />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

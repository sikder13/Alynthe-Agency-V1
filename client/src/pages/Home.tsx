import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { Impact } from "@/components/sections/Impact";
import { FAQ } from "@/components/sections/FAQ";
import { Chatbot } from "@/components/ui/Chatbot";

export default function Home() {
  useEffect(() => {
    document.title = "Alynthe | The Infrastructure of Growth";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
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

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <Capabilities />
      <Footer />
    </main>
  );
}

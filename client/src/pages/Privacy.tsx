import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | Alynthe",
    description: "Privacy Policy and Terms of Service for Alynthe LLC.",
    canonicalUrl: "https://alynthe.com/privacy"
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600">
          <p className="mb-4">Last Updated: January 21, 2026</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information Collection</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form, initiate a chat, or communicate with us. This may include your name, email, and phone number.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. SMS & Mobile Policy</h2>
          <p>By providing your phone number, you consent to receive text messages from Alynthe LLC regarding your inquiries, project updates, or requested services. Message and data rates may apply. You can reply STOP at any time to opt-out.</p>

          <p className="font-bold mt-4 p-4 bg-gray-50 border-l-4 border-indigo-500">
            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Contact Us</h2>
          <p>If you have questions about this policy, please contact us at info@alynthe.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

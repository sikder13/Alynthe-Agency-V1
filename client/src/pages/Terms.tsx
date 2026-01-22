import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 container mx-auto max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: January 1, 2026</p>
        
        <div className="prose prose-lg text-gray-600 space-y-6">
          <h3 className="text-xl font-medium text-gray-900">1. Agreement to Terms</h3>
          <p>By accessing our website and services, you agree to be bound by these Terms of Service.</p>
          
          <h3 className="text-xl font-medium text-gray-900">2. Messaging Terms (A2P 10DLC)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>You agree to receive recurring automated promotional and personalized marketing text (e.g., SMS and MMS) messages from Alynthe LLC.</li>
            <li>Consent is not a condition of any purchase.</li>
            <li><strong>Message frequency varies.</strong></li>
            <li><strong>Message and data rates may apply.</strong></li>
            <li>Reply <strong>HELP</strong> for help and <strong>STOP</strong> to cancel.</li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-900">3. Contact</h3>
          <p>Questions about these Terms should be sent to us at info@alynthe.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
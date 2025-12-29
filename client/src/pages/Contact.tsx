import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Alynthe";
  }, []);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    challenge: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Transmission Received",
          description: "We've received your data. Expect a blueprint shortly.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          projectType: "",
          challenge: ""
        });
      } else {
        toast({
          title: "Transmission Failed",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Trust Signals */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-8 leading-tight">
                  Start the <br />
                  <span className="font-medium">Transformation.</span>
                </h1>
                
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-16 max-w-lg border-l-2 border-indigo-500 pl-6">
                  We don't do "discovery calls" to waste time. We do "strategy sessions" to solve problems.
                </p>

                <div className="space-y-8 mb-16">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-1">Email</p>
                      <a href="mailto:alyntheinfo@gmail.com" className="text-lg text-gray-900 hover:text-indigo-600 transition-colors">
                        alyntheinfo@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-1">Phone</p>
                      <a href="tel:+19293508374" className="text-lg text-gray-900 hover:text-indigo-600 transition-colors">
                        +1 929 350 8374
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-1">Office</p>
                      <p className="text-lg text-gray-900">
                        Indianapolis, IN (Global Operations)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abstract Grid Graphic */}
              <div className="relative h-48 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 hidden lg:block">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-1 p-4">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ 
                        duration: Math.random() * 3 + 2, 
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      className={`rounded-sm ${i % 3 === 0 ? 'bg-indigo-200' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
                    <span className="text-xs font-mono text-indigo-600">OPERATIONAL_STATUS: ACTIVE</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Intake Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/50 backdrop-blur-xl border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10 lg:p-12 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-100 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Who are we speaking with?
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/60 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-gray-300 rounded-t-lg"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Where should we send the blueprint?
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/60 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-gray-300 rounded-t-lg"
                        placeholder="name@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="projectType" className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Project Type
                      </label>
                      <div className="relative">
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full appearance-none bg-white/60 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all rounded-t-lg"
                        >
                          <option value="" disabled>Select an option</option>
                          <option value="Custom AI Agent">Custom AI Agent</option>
                          <option value="Web Infrastructure">Web Infrastructure</option>
                          <option value="Process Automation">Process Automation</option>
                          <option value="Full Audit">Full Audit</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="challenge" className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Briefly describe the chaos you want to automate.
                      </label>
                      <textarea
                        id="challenge"
                        name="challenge"
                        required
                        value={formData.challenge}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-white/60 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-gray-300 resize-none rounded-t-lg"
                        placeholder="Tell us about your current bottlenecks..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group bg-neutral-900 hover:bg-black text-white text-lg font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>INITIALIZE PROJECT</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}

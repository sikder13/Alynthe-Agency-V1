import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, CheckCircle2, XCircle, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- Visual Components ---

const BeforeAfterVisual = () => (
  <div className="grid md:grid-cols-2 gap-8 my-16 w-full max-w-5xl mx-auto px-4">
    {/* The "Before" Side */}
    <div className="border-4 border-red-100 rounded-xl p-6 bg-gray-50 relative opacity-80">
      <div className="absolute -top-3 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
        <XCircle className="w-3 h-3" /> OLD & OUTDATED
      </div>
      <div className="h-6 bg-gray-300 w-1/3 mb-6 rounded"></div>
      <div className="space-y-3">
        <div className="h-40 bg-gray-200 rounded w-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
          Slow Loading Image...
        </div>
        <div className="h-4 bg-gray-300 w-full rounded"></div>
        <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
        <div className="h-4 bg-gray-300 w-4/6 rounded"></div>
      </div>
      <p className="text-center mt-6 text-sm text-red-600 font-bold bg-red-50 p-2 rounded">
        ❌ No "Book Now" Button = Lost Customers
      </p>
    </div>

    {/* The "After" Side */}
    <div className="border-4 border-green-100 rounded-xl p-6 bg-white shadow-2xl relative transform md:-translate-y-6 md:scale-105 transition-all">
      <div className="absolute -top-3 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
        <CheckCircle2 className="w-3 h-3" /> ALYNTHE MODERN UPGRADE
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-blue-900 w-1/3 rounded"></div>
        <div className="h-10 bg-orange-500 w-1/3 rounded shadow-md animate-pulse"></div>
      </div>
      <div className="space-y-4">
        <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded w-full border border-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
          <div className="z-10 h-3 bg-blue-200 w-1/2 mb-3 rounded"></div>
          <div className="z-10 h-10 bg-blue-600 text-white rounded-md px-6 flex items-center font-bold text-sm shadow-lg">
            Click to Call Now
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
            <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
            <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
            <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
        </div>
      </div>
      <p className="text-center mt-6 text-sm text-green-700 font-bold bg-green-50 p-2 rounded">
        ✅ Auto-Lead Capture & Instant Booking
      </p>
    </div>
  </div>
);

const ReviewCard = ({ name, role, text }: { name: string; role: string; text: string }) => (
  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-1 mb-3 text-orange-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">"{text}"</p>
    <div>
      <p className="font-bold text-gray-900 text-sm">{name}</p>
      <p className="text-xs text-gray-500">{role}</p>
    </div>
  </div>
);

// --- Main Page Component ---

export default function TradesLanding() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "", 
      projectType: "Trade/Home Services",
      challenge: "Interested in 50% off setup deal",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Redirecting you to book your demo...",
        duration: 3000,
      });
      // THE REDIRECT: Sends them to your Calendly
      setTimeout(() => {
        window.location.href = "https://calendly.com/alynthe-info/30min";
      }, 1500);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-8 border border-blue-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Clients in Indiana
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Stop Losing Jobs to <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Ugly Websites
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            We build high-conversion websites specifically for <strong>Plumbers, HVAC, and Electricians</strong>. 
            Get a modern site that captures leads while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-7 text-lg shadow-lg hover:shadow-orange-200/50 transition-all rounded-full w-full sm:w-auto">
                  Show Demo & Get Pricing
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Unlock Your Offer</DialogTitle>
                  <DialogDescription>
                    Fill this out to see our demo and lock in your <span className="font-bold text-green-600">50% OFF Setup</span> discount.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(317) 555-0123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-6 text-lg" disabled={mutation.isPending}>
                      {mutation.isPending ? "Redirecting..." : "See Demo & Book Call"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <a href="tel:+19293508374" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="px-8 py-7 text-lg rounded-full border-2 w-full">
                <Phone className="w-5 h-5 mr-2" /> Call Now: (929) 350-8374
                </Button>
            </a>
          </div>

          <BeforeAfterVisual />
        </div>
      </section>

      {/* Social Proof / Why Us */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Tradesmen Trust Alynthe</h2>
            <p className="text-gray-500 mt-2">Real results from local businesses in Indiana.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ReviewCard 
                name="Mike R." 
                role="HVAC Business Owner" 
                text="I was hesitant to spend money on a website, but Alynthe's setup paid for itself in the first month. The lead form actually works."
            />
            <ReviewCard 
                name="Sarah Jenkins" 
                role="General Contractor" 
                text="The veteran discount was a nice touch, but the speed of the site is what impressed me. My old site took forever to load."
            />
            <ReviewCard 
                name="David T." 
                role="Plumbing Services" 
                text="Simple process. I didn't have to write any code. They just handed me a site that brings in calls. Highly recommended."
            />
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-20 bg-blue-600 text-white">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Exclusive Offers for New Clients</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                    <div className="text-5xl font-bold text-white mb-2">50%</div>
                    <div className="font-bold text-blue-100 text-lg">OFF Setup Fee</div>
                    <p className="text-sm text-blue-100/80 mt-4">For all new trade websites started this month.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                    <div className="text-5xl font-bold text-white mb-2">FREE</div>
                    <div className="font-bold text-blue-100 text-lg">Website Audit</div>
                    <p className="text-sm text-blue-100/80 mt-4">We'll tell you exactly why your current site is failing.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                    <div className="text-5xl font-bold text-white mb-2">10%</div>
                    <div className="font-bold text-blue-100 text-lg">Veteran Discount</div>
                    <p className="text-sm text-blue-100/80 mt-4">Thank you for your service. Applicable on all plans.</p>
                </div>
            </div>
         </div>
      </section>

      {/* Sticky Mobile Footer for Quick Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
         <a href="tel:+19293508374" className="flex-1">
            <Button variant="outline" className="w-full h-12 text-lg font-bold border-gray-300">Call Now</Button>
         </a>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 h-12 text-lg font-bold">Show Demo</Button>
            </DialogTrigger>
         </Dialog>
      </div>

      <Footer />
    </div>
  );
}
import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollManager } from "@/components/ScrollManager";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const Home = lazy(() => import("@/pages/Home"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const TradesLanding = lazy(() => import("@/pages/TradesLanding"));
const Services = lazy(() => import("@/pages/Services"));
const UseCases = lazy(() => import("@/pages/UseCases"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const BlogIndex = lazy(() => import("@/pages/blog/Index"));
const AgencyDead = lazy(() => import("@/pages/blog/AgencyDead"));
const SalesEngineBlueprint = lazy(() => import("@/pages/blog/SalesEngineBlueprint"));
const ROISilence = lazy(() => import("@/pages/blog/ROISilence"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/use-cases" component={UseCases} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/agency-dead" component={AgencyDead} />
        <Route path="/blog/sales-engine-blueprint" component={SalesEngineBlueprint} />
        <Route path="/blog/roi-of-silence" component={ROISilence} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/trades-upgrade" component={TradesLanding} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollManager />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollManager } from "@/components/ScrollManager";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import UseCases from "@/pages/UseCases";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import BlogIndex from "@/pages/blog/Index";
import AgencyDead from "@/pages/blog/AgencyDead";
import SalesEngineBlueprint from "@/pages/blog/SalesEngineBlueprint";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/agency-dead" component={AgencyDead} />
      <Route path="/blog/sales-engine-blueprint" component={SalesEngineBlueprint} />
      <Route component={NotFound} />
    </Switch>
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

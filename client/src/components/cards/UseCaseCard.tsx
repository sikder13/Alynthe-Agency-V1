import { motion } from "framer-motion";
import { 
  Phone, Bot, CalendarCheck, 
  ShoppingBag, Mail, DollarSign,
  Database, Server, Network, Layers, ArrowRight
} from "lucide-react";

type UseCase = {
  id: string;
  tag: string;
  challenge: string;
  fix: string;
  metric: string;
  visual: React.ReactNode;
};

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Visual Top - Scenario Diagram */}
      <div className="bg-neutral-50 p-8 md:p-12 min-h-[280px] flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 w-full flex items-center justify-center">
          {useCase.visual}
        </div>
      </div>

      {/* Text Bottom */}
      <div className="p-8 flex flex-col gap-6">
        <div>
          <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
            {useCase.tag}
          </span>
          <div className="space-y-2">
            <div className="flex gap-2 items-start">
              <span className="text-red-500 font-medium text-xs uppercase tracking-wide mt-1">Challenge</span>
              <p className="text-gray-500 font-light leading-relaxed">{useCase.challenge}</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-blue-600 font-medium text-xs uppercase tracking-wide mt-1">Fix</span>
              <p className="text-gray-900 font-medium leading-relaxed">{useCase.fix}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Impact</span>
            <span className="text-3xl font-light text-gray-900 tracking-tight">{useCase.metric}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Visual Components for each scenario
const VisualScenario1 = () => (
  <div className="flex items-center gap-4 md:gap-8">
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
        <Phone className="w-6 h-6 text-gray-400" />
      </div>
      <span className="text-xs text-gray-400 font-medium">Inbound</span>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-300" />
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <span className="text-xs text-indigo-600 font-bold">AI Agent</span>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-300" />
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
        <CalendarCheck className="w-6 h-6 text-green-600" />
      </div>
      <span className="text-xs text-green-600 font-medium">Booked</span>
    </div>
  </div>
);

const VisualScenario2 = () => (
  <div className="flex items-center gap-4 md:gap-8">
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
        <ShoppingBag className="w-6 h-6 text-gray-400" />
      </div>
      <span className="text-xs text-gray-400 font-medium">Order</span>
    </div>
    <div className="relative">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-dashed border-gray-300 rounded-t-full" />
      <ArrowRight className="w-5 h-5 text-gray-300" />
    </div>
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
        <Mail className="w-6 h-6 text-blue-600" />
      </div>
      <span className="text-xs text-blue-600 font-medium">Nurture</span>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-300" />
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
        <DollarSign className="w-6 h-6 text-green-600" />
      </div>
      <span className="text-xs text-green-600 font-medium">Revenue</span>
    </div>
  </div>
);

const VisualScenario3 = () => (
  <div className="relative w-64 h-48 flex items-center justify-center">
    {/* Center Node */}
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-xl">
        <Database className="w-8 h-8 text-white" />
      </div>
      <span className="text-xs text-black font-bold uppercase tracking-wider">Unified Core</span>
    </div>

    {/* Satellite Nodes */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex flex-col items-center gap-1 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
        <Server className="w-4 h-4 text-gray-400" />
      </div>
      <div className="h-8 w-[1px] bg-gray-300" />
    </div>

    <div className="absolute bottom-4 left-4 flex gap-1 items-center animate-pulse">
      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
        <Network className="w-4 h-4 text-gray-400" />
      </div>
      <div className="w-8 h-[1px] bg-gray-300 rotate-[-30deg] origin-right translate-y-[-10px]" />
    </div>

    <div className="absolute bottom-4 right-4 flex gap-1 items-center flex-row-reverse animate-pulse">
      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
        <Layers className="w-4 h-4 text-gray-400" />
      </div>
      <div className="w-8 h-[1px] bg-gray-300 rotate-[30deg] origin-left translate-y-[-10px]" />
    </div>
  </div>
);

export { UseCaseCard, VisualScenario1, VisualScenario2, VisualScenario3 };

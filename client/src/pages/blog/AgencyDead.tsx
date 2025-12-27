import ArticleLayout from "@/components/layout/ArticleLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Year 1', headcount: 10, revenue: 100 },
  { name: 'Year 2', headcount: 15, revenue: 140 },
  { name: 'Year 3 (Traditional)', headcount: 25, revenue: 210 },
  { name: 'Year 3 (Our Model)', headcount: 12, revenue: 350 },
];

export default function AgencyDead() {
  return (
    <ArticleLayout
      title="Why 'Full-Service' Agencies Are Dead: The Rise of the Solutions Architect."
      excerpt="Most agencies sell hours. We sell efficiency. Why hiring a marketing firm for automation problems is costing you 30% of your revenue."
      date="OCT 24"
      tag="STRATEGY"
    >
      <p className="lead text-xl text-gray-600 mb-8 font-light">
        The agency model is broken. For decades, the equation was simple: more growth equals more people. If you wanted to double your output, you doubled your headcount. But in the age of AI and automation, this logic is not just outdated—it's dangerous.
      </p>

      <h3>The Efficiency Trap</h3>
      <p>
        Traditional "full-service" agencies are built on a billable-hours model. Their incentive structure is fundamentally misaligned with yours. They profit from complexity, manual processes, and extended timelines. If they solve your problem too quickly, they lose revenue.
      </p>
      <p>
        We call this the "Efficiency Trap." You hire them to streamline your operations, but they build dependencies. You get a larger team to manage, more meetings on your calendar, and a bloated payroll—without a proportional increase in profit.
      </p>

      <div className="my-12 p-8 bg-gray-50 rounded-xl border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">Headcount vs. Revenue: The Divergence</h4>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="headcount" fill="#9ca3af" name="Headcount Cost" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#4f46e5" name="Revenue Impact" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-center text-gray-400 mt-4 italic">Figure 1: Traditional scaling vs. The Architecture model</p>
      </div>

      <h3>Enter the Solutions Architect</h3>
      <p>
        The new model is 'better code,' not 'more people.' A Solutions Architect doesn't throw bodies at a problem; they build systems that eliminate the problem entirely.
      </p>
      <p>
        Instead of hiring three SDRs to manually qualify leads, we build an intelligent agent that engages, qualifies, and schedules appointments 24/7. Instead of a team of data analysts manually compiling reports, we build a unified dashboard that visualizes your entire business in real-time.
      </p>
      
      <h3>Stop Hiring Retainers. Start Building Assets.</h3>
      <p>
        When you pay a retainer, you're renting capability. When you stop paying, the capability leaves.
      </p>
      <p>
        When you build software infrastructure, you are investing in an asset. That asset works for you indefinitely, without sick days, without burnout, and without monthly overhead. It becomes a permanent part of your company's valuation.
      </p>
      <p>
        <strong>This is the shift from service to equity.</strong> And it's the only way to scale in the modern economy without collapsing under your own weight.
      </p>

    </ArticleLayout>
  );
}

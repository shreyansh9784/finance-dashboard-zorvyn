import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, Category } from "@/data/mockData";

export default function SpendingChart() {
  const { transactions, totalExpenses } = useFinance();

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, pct: totalExpenses > 0 ? Math.round((value / totalExpenses) * 100) : 0 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, totalExpenses]);

  return (
    <div className="dashboard-card fade-in fade-in-delay-3 p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Spending Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">By category</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-[180px] w-full max-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} cornerRadius={4}>
                {data.map(d => (
                  <Cell key={d.name} fill={CATEGORY_COLORS[d.name as Category] || "#888"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "10px",
                  color: "hsl(var(--card-foreground))",
                  fontSize: "13px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [`$${value}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full space-y-2 mt-4">
          {data.slice(0, 5).map(d => (
            <div key={d.name} className="flex items-center gap-3 group">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[d.name as Category] }} />
              <span className="text-sm text-muted-foreground flex-1 truncate group-hover:text-card-foreground transition-colors">{d.name}</span>
              <span className="text-xs text-muted-foreground">{d.pct}%</span>
              <span className="text-sm font-semibold tabular-nums">${d.value}</span>
            </div>
          ))}
          {data.length > 5 && (
            <p className="text-xs text-muted-foreground text-center pt-1">+{data.length - 5} more categories</p>
          )}
        </div>
      </div>
    </div>
  );
}

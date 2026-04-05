import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function BalanceChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    const monthly: Record<string, { income: number; expense: number }> = {};
    sorted.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
      if (t.type === "income") monthly[month].income += t.amount;
      else monthly[month].expense += t.amount;
    });
    let balance = 0;
    return Object.entries(monthly).map(([month, v]) => {
      balance += v.income - v.expense;
      return {
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
        balance,
        income: v.income,
        expenses: v.expense,
      };
    });
  }, [transactions]);

  return (
    <div className="dashboard-card fade-in fade-in-delay-2 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Balance Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Income vs expenses over time</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Balance</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-income" />Income</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-expense" />Expenses</span>
        </div>
      </div>
      <div className="h-[260px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                color: "hsl(var(--card-foreground))",
                fontSize: "13px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--card))" }} />
            <Line type="monotone" dataKey="income" stroke="hsl(var(--income))" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="hsl(var(--expense))" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

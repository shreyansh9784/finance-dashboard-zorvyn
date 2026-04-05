import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb } from "lucide-react";

export default function InsightsPanel() {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    
    // Highest spending category
    const catMap: Record<string, number> = {};
    expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const monthly: Record<string, { income: number; expense: number }> = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!monthly[m]) monthly[m] = { income: 0, expense: 0 };
      if (t.type === "income") monthly[m].income += t.amount;
      else monthly[m].expense += t.amount;
    });
    const months = Object.keys(monthly).sort();
    let monthComparison = null;
    if (months.length >= 2) {
      const curr = monthly[months[months.length - 1]];
      const prev = monthly[months[months.length - 2]];
      const expChange = curr.expense - prev.expense;
      const pct = prev.expense > 0 ? Math.round((expChange / prev.expense) * 100) : 0;
      monthComparison = { expChange, pct };
    }

    // Savings rate
    const totalInc = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExp = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalInc > 0 ? Math.round(((totalInc - totalExp) / totalInc) * 100) : 0;

    return { topCat, monthComparison, savingsRate, totalExp };
  }, [transactions]);

  const items = [
    {
      icon: AlertCircle,
      title: "Top Spending Category",
      value: insights.topCat ? `${insights.topCat[0]} — $${insights.topCat[1]}` : "No data",
      color: "text-chart-4" as const,
    },
    {
      icon: insights.monthComparison && insights.monthComparison.expChange > 0 ? TrendingUp : TrendingDown,
      title: "Monthly Expenses Trend",
      value: insights.monthComparison
        ? `${insights.monthComparison.expChange > 0 ? "Up" : "Down"} ${Math.abs(insights.monthComparison.pct)}% vs last month`
        : "Need more data",
      color: insights.monthComparison && insights.monthComparison.expChange > 0 ? "text-expense" as const : "text-income" as const,
    },
    {
      icon: Lightbulb,
      title: "Savings Rate",
      value: `${insights.savingsRate}% of income saved`,
      color: insights.savingsRate >= 20 ? "text-income" as const : "text-chart-4" as const,
    },
  ];

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <item.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${item.color}`} />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

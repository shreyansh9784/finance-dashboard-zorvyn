import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { TrendingUp, TrendingDown, PieChart, Lightbulb, Target } from "lucide-react";

export default function InsightsPanel() {
  const { transactions, totalIncome, totalExpenses } = useFinance();

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
    const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

    // Avg transactions
    const avgExpense = expenses.length > 0 ? Math.round(totalExpenses / expenses.length) : 0;

    return { topCat, monthComparison, savingsRate, avgExpense };
  }, [transactions, totalIncome, totalExpenses]);

  const items = [
    {
      icon: PieChart,
      title: "Top Spending",
      value: insights.topCat ? insights.topCat[0] : "—",
      detail: insights.topCat ? `$${insights.topCat[1]} total` : "",
      colorClass: "bg-chart-4/10 text-chart-4",
    },
    {
      icon: insights.monthComparison && insights.monthComparison.expChange > 0 ? TrendingUp : TrendingDown,
      title: "Monthly Trend",
      value: insights.monthComparison
        ? `${insights.monthComparison.expChange > 0 ? "↑" : "↓"} ${Math.abs(insights.monthComparison.pct)}%`
        : "—",
      detail: insights.monthComparison
        ? `Expenses ${insights.monthComparison.expChange > 0 ? "increased" : "decreased"}`
        : "Need more data",
      colorClass: insights.monthComparison && insights.monthComparison.expChange > 0 ? "bg-expense/10 text-expense" : "bg-income/10 text-income",
    },
    {
      icon: Target,
      title: "Savings Rate",
      value: `${insights.savingsRate}%`,
      detail: "of income saved",
      colorClass: insights.savingsRate >= 20 ? "bg-income/10 text-income" : "bg-chart-4/10 text-chart-4",
    },
    {
      icon: Lightbulb,
      title: "Avg. Expense",
      value: `$${insights.avgExpense}`,
      detail: "per transaction",
      colorClass: "bg-primary/10 text-primary",
    },
  ];

  return (
    <div className="dashboard-card fade-in fade-in-delay-4 p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-card-foreground">Insights</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Key financial metrics</p>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors group cursor-default">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.colorClass} transition-transform group-hover:scale-105`}>
              <item.icon className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{item.title}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

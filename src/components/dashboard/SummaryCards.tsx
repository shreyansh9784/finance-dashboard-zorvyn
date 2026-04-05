import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      label: "Total Balance",
      value: totalBalance,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      gradientClass: "stat-card-gradient-primary",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      gradientClass: "stat-card-gradient-income",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "+3.1%",
      trendUp: false,
      gradientClass: "stat-card-gradient-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
      {cards.map(({ label, value, icon: Icon, trend, trendUp, gradientClass }, i) => (
        <div
          key={label}
          className={`fade-in fade-in-delay-${i + 1} ${gradientClass} rounded-2xl p-5 sm:p-6 text-primary-foreground relative overflow-hidden group cursor-default`}
        >
          {/* Decorative circle */}
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-foreground/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-primary-foreground/5" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-primary-foreground/80">{label}</span>
              <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight">{fmt(value)}</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary-foreground/70">
              {trendUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              <span>{trend} vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const cards = [
  { key: "balance" as const, label: "Total Balance", icon: DollarSign, colorClass: "text-primary" },
  { key: "income" as const, label: "Total Income", icon: TrendingUp, colorClass: "text-income" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, colorClass: "text-expense" },
];

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();
  const values = { balance: totalBalance, income: totalIncome, expenses: totalExpenses };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ key, label, icon: Icon, colorClass }, i) => (
        <Card key={key} className="card-hover fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className={`text-2xl font-bold mt-1 ${colorClass}`}>{fmt(values[key])}</p>
              </div>
              <div className={`p-3 rounded-xl bg-secondary ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

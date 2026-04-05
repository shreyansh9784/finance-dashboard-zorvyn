import { FinanceProvider } from "@/context/FinanceContext";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingChart from "@/components/dashboard/SpendingChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import RoleToggle from "@/components/dashboard/RoleToggle";
import { Wallet } from "lucide-react";

export default function Index() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="glass-header sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl stat-card-gradient-primary flex items-center justify-center">
                <Wallet className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold tracking-tight text-card-foreground">
                Fin<span className="text-primary">Dash</span>
              </span>
            </div>
            <RoleToggle />
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 space-y-5 sm:space-y-6">
          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
            <div className="lg:col-span-3">
              <BalanceChart />
            </div>
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
            <div className="lg:col-span-3">
              <TransactionsTable />
            </div>
            <div className="lg:col-span-2">
              <InsightsPanel />
            </div>
          </div>
        </main>
      </div>
    </FinanceProvider>
  );
}

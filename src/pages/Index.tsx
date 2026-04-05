import { FinanceProvider } from "@/context/FinanceContext";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingChart from "@/components/dashboard/SpendingChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import RoleToggle from "@/components/dashboard/RoleToggle";

export default function Index() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-primary">Fin</span>Dashboard
            </h1>
            <RoleToggle />
          </div>
        </header>

        {/* Content */}
        <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceChart />
            </div>
            <SpendingChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionsTable />
            </div>
            <InsightsPanel />
          </div>
        </main>
      </div>
    </FinanceProvider>
  );
}

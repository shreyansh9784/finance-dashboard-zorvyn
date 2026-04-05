import { useState, useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction, CATEGORIES, Category, TransactionType } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowUpDown, Plus, Pencil, Trash2, ChevronDown } from "lucide-react";
import TransactionDialog from "./TransactionDialog";

export default function TransactionsTable() {
  const { transactions, role, deleteTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");
  const [catFilter, setCatFilter] = useState<"all" | Category>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | undefined>();
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (typeFilter !== "all") list = list.filter(t => t.type === typeFilter);
    if (catFilter !== "all") list = list.filter(t => t.category === catFilter);
    list.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortBy === "date") return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });
    return list;
  }, [transactions, search, typeFilter, catFilter, sortBy, sortDir]);

  const displayed = showAll ? filtered : filtered.slice(0, 8);

  const toggleSort = (field: "date" | "amount") => {
    if (sortBy === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir("desc"); }
  };

  return (
    <div className="dashboard-card fade-in fade-in-delay-3">
      <div className="p-5 sm:p-6 pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Transactions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} total transactions</p>
        </div>
        {role === "admin" && (
          <Button size="sm" className="rounded-xl gap-1.5" onClick={() => { setEditTx(undefined); setDialogOpen(true); }}>
            <Plus className="h-4 w-4" /> Add Transaction
          </Button>
        )}
      </div>

      <div className="p-5 sm:p-6 pt-4 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl h-9 text-sm" />
          </div>
          <Select value={typeFilter} onValueChange={v => setTypeFilter(v as any)}>
            <SelectTrigger className="w-full sm:w-[130px] rounded-xl h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={catFilter} onValueChange={v => setCatFilter(v as any)}>
            <SelectTrigger className="w-full sm:w-[150px] rounded-xl h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile card list */}
        <div className="block sm:hidden space-y-2">
          {displayed.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">No transactions found.</div>
          ) : (
            displayed.map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 group hover:bg-secondary/70 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${t.type === "income" ? "bg-income/10 text-income" : "bg-expense/10 text-expense"}`}>
                  {t.type === "income" ? "+" : "−"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()} · {t.category}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold tabular-nums ${t.type === "income" ? "text-income" : "text-expense"}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </p>
                </div>
                {role === "admin" && (
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditTx(t); setDialogOpen(true); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteTransaction(t.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider" onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></span>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Description</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Category</TableHead>
                <TableHead className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider" onClick={() => toggleSort("amount")}>
                  <span className="flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></span>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Type</TableHead>
                {role === "admin" && <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={role === "admin" ? 6 : 5} className="text-center py-12 text-muted-foreground text-sm">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map(t => (
                  <TableRow key={t.id} className="group hover:bg-secondary/20 transition-colors">
                    <TableCell className="text-muted-foreground text-sm">{new Date(t.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium text-sm">{t.description}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs rounded-lg font-normal">{t.category}</Badge></TableCell>
                    <TableCell className={`font-semibold text-sm tabular-nums ${t.type === "income" ? "text-income" : "text-expense"}`}>
                      {t.type === "income" ? "+" : "-"}${t.amount}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        t.type === "income" 
                          ? "bg-income/10 text-income" 
                          : "bg-expense/10 text-expense"
                      }`}>
                        {t.type}
                      </span>
                    </TableCell>
                    {role === "admin" && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditTx(t); setDialogOpen(true); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteTransaction(t.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filtered.length > 8 && (
          <button
            onClick={() => setShowAll(s => !s)}
            className="w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1"
          >
            {showAll ? "Show less" : `View all ${filtered.length} transactions`}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <TransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} transaction={editTx} />
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Transaction, Role, TransactionType, Category, initialTransactions } from "@/data/mockData";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

const STORAGE_KEY = "finance-dashboard-data";

function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return initialTransactions;
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [role, setRole] = useState<Role>("admin");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions(prev => [...prev, { ...t, id: crypto.randomUUID() }]);
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions(prev => prev.map(x => x.id === t.id ? t : x));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(x => x.id !== id));
  }, []);

  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    const inc = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome: inc, totalExpenses: exp, totalBalance: inc - exp };
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole,
      addTransaction, updateTransaction, deleteTransaction,
      totalBalance, totalIncome, totalExpenses,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}

import { useState, useEffect } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction, CATEGORIES, Category, TransactionType } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction;
}

export default function TransactionDialog({ open, onOpenChange, transaction }: Props) {
  const { addTransaction, updateTransaction } = useFinance();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    date: "", description: "", amount: "", type: "expense" as TransactionType, category: "Food" as Category,
  });

  useEffect(() => {
    if (transaction) {
      setForm({ date: transaction.date, description: transaction.description, amount: String(transaction.amount), type: transaction.type, category: transaction.category });
    } else {
      setForm({ date: new Date().toISOString().slice(0, 10), description: "", amount: "", type: "expense", category: "Food" });
    }
  }, [transaction, open]);

  const handleSubmit = () => {
    const amount = parseFloat(form.amount);
    if (!form.date || !form.description || isNaN(amount) || amount <= 0) return;
    const data = { date: form.date, description: form.description, amount, type: form.type, category: form.category };
    if (isEdit && transaction) updateTransaction({ ...data, id: transaction.id });
    else addTransaction(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Date</Label>
            <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Grocery Shopping" />
          </div>
          <div className="grid gap-2">
            <Label>Amount ($)</Label>
            <Input type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0.00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as TransactionType }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Category }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEdit ? "Update" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type TransactionType = "income" | "expense";
export type Category = "Salary" | "Freelance" | "Food" | "Transport" | "Shopping" | "Entertainment" | "Bills" | "Health" | "Investment" | "Other";
export type Role = "viewer" | "admin";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Food", "Transport", "Shopping",
  "Entertainment", "Bills", "Health", "Investment", "Other"
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: "hsl(199, 89%, 48%)",
  Freelance: "hsl(160, 84%, 39%)",
  Food: "hsl(35, 92%, 55%)",
  Transport: "hsl(262, 83%, 58%)",
  Shopping: "hsl(330, 80%, 55%)",
  Entertainment: "hsl(45, 93%, 47%)",
  Bills: "hsl(0, 84%, 60%)",
  Health: "hsl(180, 70%, 45%)",
  Investment: "hsl(210, 70%, 50%)",
  Other: "hsl(220, 9%, 46%)",
};

export const initialTransactions: Transaction[] = [
  { id: "1", date: "2024-01-05", description: "Monthly Salary", amount: 5000, type: "income", category: "Salary" },
  { id: "2", date: "2024-01-08", description: "Grocery Shopping", amount: 120, type: "expense", category: "Food" },
  { id: "3", date: "2024-01-10", description: "Freelance Project", amount: 800, type: "income", category: "Freelance" },
  { id: "4", date: "2024-01-12", description: "Uber Rides", amount: 45, type: "expense", category: "Transport" },
  { id: "5", date: "2024-01-15", description: "Netflix Subscription", amount: 15, type: "expense", category: "Entertainment" },
  { id: "6", date: "2024-01-18", description: "Electricity Bill", amount: 85, type: "expense", category: "Bills" },
  { id: "7", date: "2024-01-20", description: "New Sneakers", amount: 95, type: "expense", category: "Shopping" },
  { id: "8", date: "2024-01-22", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
  { id: "9", date: "2024-01-25", description: "Stock Purchase", amount: 500, type: "expense", category: "Investment" },
  { id: "10", date: "2024-01-28", description: "Side Project Income", amount: 350, type: "income", category: "Freelance" },
  { id: "11", date: "2024-02-05", description: "Monthly Salary", amount: 5000, type: "income", category: "Salary" },
  { id: "12", date: "2024-02-07", description: "Restaurant Dinner", amount: 65, type: "expense", category: "Food" },
  { id: "13", date: "2024-02-10", description: "Phone Bill", amount: 50, type: "expense", category: "Bills" },
  { id: "14", date: "2024-02-14", description: "Valentine's Gift", amount: 75, type: "expense", category: "Shopping" },
  { id: "15", date: "2024-02-18", description: "Freelance Design Work", amount: 600, type: "income", category: "Freelance" },
  { id: "16", date: "2024-02-20", description: "Gas Station", amount: 55, type: "expense", category: "Transport" },
  { id: "17", date: "2024-02-23", description: "Concert Tickets", amount: 120, type: "expense", category: "Entertainment" },
  { id: "18", date: "2024-02-26", description: "Dentist Visit", amount: 200, type: "expense", category: "Health" },
  { id: "19", date: "2024-03-05", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "20", date: "2024-03-08", description: "Online Course", amount: 30, type: "expense", category: "Other" },
  { id: "21", date: "2024-03-12", description: "Groceries", amount: 95, type: "expense", category: "Food" },
  { id: "22", date: "2024-03-15", description: "Freelance Consulting", amount: 1200, type: "income", category: "Freelance" },
  { id: "23", date: "2024-03-18", description: "Internet Bill", amount: 60, type: "expense", category: "Bills" },
  { id: "24", date: "2024-03-22", description: "Movie Night", amount: 25, type: "expense", category: "Entertainment" },
];

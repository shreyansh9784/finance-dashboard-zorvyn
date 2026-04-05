import { useFinance } from "@/context/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye } from "lucide-react";
import { Role } from "@/data/mockData";

export default function RoleToggle() {
  const { role, setRole } = useFinance();
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
        role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
      }`}>
        {role === "admin" ? <Shield className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </div>
      <Select value={role} onValueChange={v => setRole(v as Role)}>
        <SelectTrigger className="w-[110px] h-8 text-sm rounded-xl border-border/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

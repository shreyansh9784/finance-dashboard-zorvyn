import { useFinance } from "@/context/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye } from "lucide-react";
import { Role } from "@/data/mockData";

export default function RoleToggle() {
  const { role, setRole } = useFinance();
  return (
    <div className="flex items-center gap-2">
      {role === "admin" ? <Shield className="h-4 w-4 text-primary" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      <Select value={role} onValueChange={v => setRole(v as Role)}>
        <SelectTrigger className="w-[120px] h-8 text-sm">
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminService, type AdminUser } from "./adminService";
import { toast } from "sonner";

interface UsersSectionProps {
  users: AdminUser[];
   allUsers: AdminUser[];
  meta: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  loading: boolean;
  search: string;
  setSearch: (v: string) => void;
  page: number;
  setPage: (n: number) => void;
  limit: number;
  setLimit: (n: number) => void;
  role: string;
  setRole: (v: string) => void;
  setUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
}

export const UsersSection = ({
  users,
  meta,
  loading,
  search,
  setSearch,
  page,
  setPage,
  limit,
  setLimit,
  role,
  setRole,
  setUsers,
}: UsersSectionProps) => {



    const handleToggleActive = async (userId: string, newStatus: "ACTIVE" | "INACTIVE" | "BLOCKED") => {
      try {
        await AdminService.updateUser(userId, { isActive: newStatus });
        toast.success(`User marked as ${newStatus}`);
        setUsers(prev =>
          prev.map(u => (u._id === userId ? { ...u, isActive: newStatus } : u))
        );
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    const handleBlockUser = async (userId: string) => {
      try {
        await AdminService.updateUser(userId, { isActive: "BLOCKED" });
        toast.success("User blocked");
        setUsers(prev =>
          prev.map(u => (u._id === userId ? { ...u, isActive: "BLOCKED" } : u))
        );
      } catch (err: any) {
        toast.error(err.message);
      }
    };



  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 items-center flex-wrap">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SENDER">Sender</SelectItem>
            <SelectItem value="RECEIVER">Receiver</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading…
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    {u.role === "ADMIN" || u.role === "SUPER_ADMIN" ? (
                      "-"
                    ) : (
                      u.isActive ? u.isActive : "-" 
                    )}
                  </TableCell>

                  <TableCell>{u.phone || "—"}</TableCell>
                  
                  <TableCell>
                {/* শুধু Sender/Receiver হলে action দেখাবে */}
                {u.role === "SENDER" || u.role === "RECEIVER" ? (
                  <div className="flex gap-2">
                    {u.isActive === "ACTIVE" ? (
                      <button
                        onClick={() => handleToggleActive(u._id, "INACTIVE")}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleActive(u._id, "ACTIVE")}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Active
                      </button>
                    )}

                    {u.isActive !== "BLOCKED" && (
                      <button
                        onClick={() => handleBlockUser(u._id)}  
                        className="bg-gray-500 text-white px-2 py-1 rounded" 
                      >
                        Block
                      </button>
                    )}

                  </div>
                    ) : (
                      "-" 
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          disabled={page >= meta.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

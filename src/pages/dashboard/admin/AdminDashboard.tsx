/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UsersSection } from "./UsersSection";
import { AdminService } from "./adminService";

const PAGE_LIMIT_DEFAULT = 10;

export const AdminDashboard = () => {
  const [tab, setTab] = useState<"users" | "parcels">("users");

  // 🔹 Users state
  const [users, setUsers] = useState<any[]>([]);
  console.log(users)
  const [usersLoading, setUsersLoading] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("ALL");

  const [userPage, setUserPage] = useState(1);
  const [userLimit, setUserLimit] = useState(PAGE_LIMIT_DEFAULT);

  // 🚀 Fetch users (only once per change)
  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const response = await AdminService.getAllUsers({});
        setUsers(response.data || []);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Frontend filter + pagination
  const getFilteredPaginatedUsers = (
    users: any[],
    {
      search,
      role,
      page,
      limit,
    }: {
      search: string;
      role: string;
      page: number;
      limit: number;
    }
  ) => {
    const filtered = users.filter((u) => {
      const matchRole = role === "ALL" || u.role === role;
      const matchSearch =
        !search ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());

      return matchRole && matchSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = page > totalPages ? 1 : page;

    const start = (safePage - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      meta: {
        page: safePage,
        totalPages,
        totalItems: filtered.length,
      },
    };
  };

  const { data: filteredUsers, meta: filteredMeta } =
    getFilteredPaginatedUsers(users, {
      search: userSearch,
      role: userRole,
      page: userPage,
      limit: userLimit,
    });

  // 🔁 Auto reset page if overflow
  useEffect(() => {
    if (userPage !== filteredMeta.page) {
      setUserPage(filteredMeta.page);
    }
  }, [filteredMeta.page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="parcels">Parcels</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={tab}>
        <TabsContent value="users">
          <UsersSection
            users={filteredUsers}
            allUsers={users}
            meta={filteredMeta}
            loading={usersLoading}
            search={userSearch}
            setSearch={setUserSearch}
            page={userPage}
            setPage={setUserPage}
            limit={userLimit}
            setLimit={setUserLimit}
            role={userRole}
            setRole={setUserRole}
            setUsers={setUsers}
          />
        </TabsContent>

        <TabsContent value="parcels">
          <p className="text-muted-foreground">Parcel section later…</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

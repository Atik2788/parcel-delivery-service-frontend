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
import { ParcelsSection } from "./ParcelsSection";

const PAGE_LIMIT_DEFAULT = 10;

export const AdminDashboard = () => {
  const [tab, setTab] = useState<"users" | "parcels">("users");

  // 🔹 Users state
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userMeta, setUserMeta] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("ALL");

  const [userPage, setUserPage] = useState(1);
  const [userLimit, setUserLimit] = useState(PAGE_LIMIT_DEFAULT);

    // 🔹 Parcels state
  const [parcels, setParcels] = useState<any[]>([]);
  const [parcelMeta, setParcelMeta] = useState<any>({ page: 1, totalPages: 1 });
  const [parcelSearch, setParcelSearch] = useState("");
  console.log(parcelSearch)
  const [parcelPage, setParcelPage] = useState(1);
  const [parcelLimit, setParcelLimit] = useState(PAGE_LIMIT_DEFAULT);
  const [parcelsLoading, setParcelsLoading] = useState(false);

  // const debouncedParcelSearch = useDebounce(parcelSearch, 400);

  // 🚀 Fetch users (only once per change)
  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const response = await AdminService.getAllUsers({});
        setUsers(response.data || []);
        setUserMeta(response.meta as any);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);


    // 🚀 Load parcels
  useEffect(() => {
    setParcelsLoading(true);
    AdminService.getAllParcels({ search: parcelSearch, page: parcelPage, limit: parcelLimit })
      .then((response) => {
        setParcels(response.data || []);
        setParcelMeta(response.meta);
      })
      .catch(() => {
        toast.error("Failed to load parcels");
      })
      .finally(() => {
        setParcelsLoading(false);
      });
  }, [parcelSearch, parcelPage, parcelLimit]);


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
            userMeta = {userMeta}
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
          <ParcelsSection
            parcels={parcels}
            meta={parcelMeta}
            loading={parcelsLoading}
            search={parcelSearch}
            setSearch={setParcelSearch}
            page={parcelPage}
            setPage={setParcelPage}
            limit={parcelLimit}
            setLimit={setParcelLimit}
            onToggleBlocked={async (id, toBlocked) => {
              try {
                const res = await AdminService.updateParcelBlocked(id, toBlocked);

                // ✅ backend success check
                if (res?.success) {
                  const updatedParcel = res.data;
                  

                  setParcels((prev) =>
                    prev.map((p) => (p._id === id ? updatedParcel : p))
                  );

                  toast.success("Parcel updated ✅");
                }
              } catch (err: any) {
                toast.error(err?.response?.data?.message || "Failed to update parcel");
              }
            }
          
          }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// src/components/admin/ParcelsSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { AdminParcel } from "./adminService";
import { ParcelChart } from "./ParcelChart";

interface ParcelsSectionProps {
  parcels: AdminParcel[];
  meta: any;
  loading: boolean;
  search: string;
  setSearch: (v: string) => void;
  parcelMeta2: any
  page: number;
  setPage: (n: number) => void;
  limit: number;
  setLimit: (n: number) => void;
  onToggleBlocked: (id: string, toBlocked: boolean) => Promise<void>;
}

export const ParcelsSection = ({
  parcels,
  meta,
  loading,
  parcelMeta2,
  search,
  setSearch,
  page,
  setPage,
  limit,
  setLimit,
  onToggleBlocked,
}: ParcelsSectionProps) => {

  return (
    <div className="space-y-4">

<div className="mb-16 flex justify-center">
  <div className="w-full max-w-md h-96">
    <ParcelChart meta={parcelMeta2} />
  </div>
</div>

      {/* Search + Limit */}
      <div>
          <div className="flex gap-3 items-center">
          <Input
            placeholder="Search parcels (tracking, type, sender/receiver, status)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Page {meta?.page} of {meta?.totalPages}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-5">
              <Button variant="outline">
                Total Parcels: {meta?.totalParcels}
              </Button>
              <Button variant="outline">
                Approved Parcels: {meta?.approvedParcels}
              </Button>
              <Button variant="outline">
                Delivered Parcels: {meta?.deliveredlParcels}
              </Button>
              <Button variant="outline">
                Returned Parcels: {meta?.returnedParcels}
              </Button>
              <Button variant="outline">
                Blocked Parcels: {meta?.blockedParcels}
              </Button>
              <Button variant="outline">
                Cancelled Parcels: {meta?.cancelledParcels}
              </Button>
              
              <Button variant="outline">
                Processing Parcels: {meta?.processingParcels}
              </Button>
              <Button variant="outline">
                Unclaimed Parcels: {meta?.unclaimedParcels}
              </Button>
            </div>

        </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : parcels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  No parcels found
                </TableCell>
              </TableRow>
            ) : (
              parcels.filter(Boolean).map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.trackingId ?? "N A"}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.sender?.name || "N A"}</TableCell>
                  <TableCell>{p.receiver?.name || "N A"}</TableCell>
                  <TableCell>{p.weight} kg</TableCell>
                  <TableCell>৳ {p.fee}</TableCell>
                  <TableCell>{p.currentStatus}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {p.currentStatus !== "DELIVERED" &&
                        p.currentStatus !== "CANCELLED" ? (
                        <>
                          <Switch
                            checked={!!p.isBlocked}
                            onCheckedChange={(checked) =>
                              onToggleBlocked(p._id, checked)
                            }
                          />
                          <Label className="text-sm">
                            {p.isBlocked ? "Blocked" : "Active"}
                          </Label>
                        </>
                      ) : (
                        <Label className="text-sm text-muted-foreground">
                          
                        </Label>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <Button
          variant="outline"
          disabled={page >= (meta?.totalPages || 1)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};


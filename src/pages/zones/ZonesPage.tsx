import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { EFormMode, ERoles } from "../../assets/enums";
import ZonesModal from "./components/ZonesModal";
import { ZonesResponseDTO } from "../../types/location-configuration";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";

const columns = [
  { key: "name", header: "Zone" },
  { key: "city", header: "City" },
  {
    key: "createdDateTime",
    header: "Created At",
    render: (val: string) => formatDate(val),
  },
  { key: "createdBy", header: "Created By" },
  {
    key: "modifiedDateTime",
    header: "Modified At",
    render: (val: string) => formatDate(val),
  },
  { key: "modifiedBy", header: "Modified By" },
];

export default function ZonesPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ZonesResponseDTO | null>(
    null,
  );
  const tableRef = useRef<BaseTableRef<ZonesResponseDTO>>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === ERoles.Admin;

  const onAddClick = () => {
    setSelectedZone(null);
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  const onEditClick = (row: ZonesResponseDTO) => {
    setSelectedZone(row);
    setDialogOpen(true);
    setFormMode(EFormMode.Edit);
  };

  return (
    <>
      <BaseTable<ZonesResponseDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.zones.getAll}
        columns={columns}
        renderActions={(row) =>
          isAdmin && (
            <DropdownMenuItem
              onClick={() => onEditClick(row)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </DropdownMenuItem>
          )
        }
        addButton={
          <Button
            onClick={onAddClick}
            style={{
              width: "fit-content",
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Zone
          </Button>
        }
      />
      {formMode && (
        <ZonesModal
          key={selectedZone?.id ?? "create"}
          open={dialogOpen}
          onOpenChange={(open) => {
            if (!open) setFormMode(null);
            setDialogOpen(open);
          }}
          onSave={() => {
            tableRef.current?.refresh();
            setDialogOpen(false);
            setFormMode(null);
          }}
          formMode={formMode}
          defaultValues={selectedZone}
        />
      )}
    </>
  );
}

import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { StreetsResponseDTO } from "../../types/location-configuration";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import StreetsModal from "./components/StreetsModal";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const columns = [
  { key: "name", header: "Street" },
  { key: "zone", header: "Zone" },
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

export default function StreetsPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStreet, setSelectedStreet] =
    useState<StreetsResponseDTO | null>(null);
  const tableRef = useRef<BaseTableRef<StreetsResponseDTO>>(null);

  const onAddClick = () => {
    setSelectedStreet(null);
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  const onEditClick = (row: StreetsResponseDTO) => {
    setSelectedStreet(row);
    setDialogOpen(true);
    setFormMode(EFormMode.Edit);
  };

  return (
    <>
      <BaseTable<StreetsResponseDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.streets.getAll}
        columns={columns}
        renderActions={(row) => (
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-muted"
            onClick={() => onEditClick(row)}
          >
            <Pencil size={14} />
            Edit
          </DropdownMenuItem>
        )}
        addButton={
          <Button
            onClick={onAddClick}
            style={{
              width: "fit-content",
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Street
          </Button>
        }
      />
      {formMode && (
        <StreetsModal
          key={selectedStreet?.id ?? "create"}
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
          defaultValues={selectedStreet}
        />
      )}
    </>
  );
}

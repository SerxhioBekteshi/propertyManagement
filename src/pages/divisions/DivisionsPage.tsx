import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { DivisionsResponseDTO } from "../../types/location-configuration";
import DivisionsModal from "./components/DivisionsModal";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const columns = [
  { key: "name", header: "Division" },
  { key: "country", header: "Country" },
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

export default function DivisionsPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] =
    useState<DivisionsResponseDTO | null>(null);
  const tableRef = useRef<BaseTableRef<DivisionsResponseDTO>>(null);

  const onAddClick = () => {
    setSelectedDivision(null);
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  const onEditClick = (row: DivisionsResponseDTO) => {
    setSelectedDivision(row);
    setDialogOpen(true);
    setFormMode(EFormMode.Edit);
  };

  return (
    <>
      <BaseTable<DivisionsResponseDTO>
        ref={tableRef}
        controller={ENDPOINTS.division.getAll}
        columns={columns}
        onAddClick={onAddClick}
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
            Add Division
          </Button>
        }
      />
      {formMode && (
        <DivisionsModal
          key={selectedDivision?.id ?? "create"}
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
          defaultValues={selectedDivision}
        />
      )}
    </>
  );
}

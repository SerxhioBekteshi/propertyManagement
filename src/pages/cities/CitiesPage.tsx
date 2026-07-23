import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { CitiesResponseDTO } from "../../types/location-configuration";
import CitiesModal from "./components/CitiesModal";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import { DropdownMenuItem } from "../../components/ui/dropdown";

const columns = [
  { key: "name", header: "City" },
  { key: "division", header: "Division" },
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

export default function CitiesPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableRef = useRef<BaseTableRef<CitiesResponseDTO>>(null);
  const [selectedCity, setSelectedCity] = useState<CitiesResponseDTO | null>(
    null,
  );

  const onAddClick = () => {
    setSelectedCity(null);
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  const onEditClick = (row: CitiesResponseDTO) => {
    setSelectedCity(row);
    setDialogOpen(true);
    setFormMode(EFormMode.Edit);
  };

  return (
    <>
      <BaseTable<CitiesResponseDTO>
        ref={tableRef}
        controller={ENDPOINTS.cities.getAll}
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
            Add City
          </Button>
        }
      />
      {formMode && (
        <CitiesModal
          key={selectedCity?.id ?? "create"}
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
          defaultValues={selectedCity}
        />
      )}
    </>
  );
}

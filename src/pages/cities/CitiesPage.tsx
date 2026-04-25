import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { CitiesResponseDTO } from "../../types/location-configuration";
import CitiesModal from "./components/CitiesModal";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";

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

  const onAddClick = () => {
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  return (
    <>
      <BaseTable<CitiesResponseDTO>
        ref={tableRef}
        controller={ENDPOINTS.cities.getAll}
        columns={columns}
        onAddClick={onAddClick}
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
          key={"create"}
          open={dialogOpen}
          onOpenChange={(open) => {
            if (open) setFormMode(null);
            setDialogOpen(open);
          }}
          onSave={() => {
            tableRef.current?.refresh();
            setDialogOpen(false);
            setFormMode(null);
          }}
          formMode={formMode}
          defaultValues={null}
        />
      )}
    </>
  );
}

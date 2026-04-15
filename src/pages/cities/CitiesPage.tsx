import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { CitiesResponseDTO } from "../../types/main-location-configuration";
import CitiesModal from "./components/CitiesModal";

export interface PaymentsFiltersInterface {
  paymentCategory: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "City" },
  { key: "division", header: "Division" },
];

export default function CitiesPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableRef = useRef<BaseTableRef<CitiesResponseDTO>>(null);

  return (
    <>
      <BaseTable<CitiesResponseDTO>
        ref={tableRef}
        controller="Zones"
        columns={columns}
        filterMappings={[]}
        showFiltersButton={false}
        addButton={
          <Button
            onClick={() => {
              setDialogOpen(true);
              setFormMode(EFormMode.Create);
            }}
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

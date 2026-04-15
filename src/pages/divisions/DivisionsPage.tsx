import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { DivisionsResponseDTO } from "../../types/main-location-configuration";
import DivisionsModal from "./components/DivisionsModal";

export interface PaymentsFiltersInterface {
  paymentCategory: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Division" },
  { key: "country", header: "Country" },
];

export default function DivisionsPage() {
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableRef = useRef<BaseTableRef<DivisionsResponseDTO>>(null);

  return (
    <>
      <BaseTable<DivisionsResponseDTO>
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
            Add Division
          </Button>
        }
      />
      {formMode && (
        <DivisionsModal
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

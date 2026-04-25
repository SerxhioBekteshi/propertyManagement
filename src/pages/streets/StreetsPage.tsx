import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { EFormMode } from "../../assets/enums";
import { StreetsResponseDTO } from "../../types/location-configuration";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import StreetsModal from "./components/StreetsModal";

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
  const tableRef = useRef<BaseTableRef<StreetsResponseDTO>>(null);

  const onAddClick = () => {
    setDialogOpen(true);
    setFormMode(EFormMode.Create);
  };

  return (
    <>
      <BaseTable<StreetsResponseDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.streets.getAll}
        columns={columns}
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
        />
      )}
    </>
  );
}

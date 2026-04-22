import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import { ProperyOwnerDTO } from "../../types/properties";
import PropertyOwnerDrawer from "../dashboard/components/PropertyOwnerDrawer";

const columns = [
  { key: "firstName", header: "First Name" },
  { key: "lastName", header: "Last Name" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "email", header: "Email" },
  { key: "nationality", header: "Nationality" },
  { key: "assignedToName", header: "Assigned To" },
  { key: "mainLeadSource", header: "Lead Source" },
  { key: "ssn", header: "SSN" },
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

export default function ContactsPage() {
  const [open, setOpen] = useState(false);
  const tableRef = useRef<BaseTableRef<ProperyOwnerDTO>>(null);

  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <>
      <BaseTable<ProperyOwnerDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.properties.contacts}
        columns={columns}
        addButton={
          <Button
            onClick={onAddClick}
            style={{
              width: "fit-content",
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Property Owner
          </Button>
        }
      />
      <PropertyOwnerDrawer
        key={"createOwner"}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        open={open}
        onSave={() => {
          tableRef.current?.refresh();
          setOpen(false);
        }}
      />
    </>
  );
}

import { useRef, useState } from "react";
import { BaseTable, BaseTableRef, ColumnConfig } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import PropertyOwnerDrawer from "../dashboard/components/PropertyOwnerDrawer";
import { useAuth } from "../../contexts/AuthContext";
import { ERoles } from "../../assets/enums";
import { CountryFlag } from "../../components/flags/CountryFlag";
import { ProperyOwnerDTO } from "../../types/properties/propertyOwner";

const columns: ColumnConfig[] = [
  { key: "firstName", header: "First Name" },
  { key: "lastName", header: "Last Name" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "email", header: "Email" },
  {
    key: "nationality",
    header: "Nationality",
    render: (_, row) => <CountryFlag code={row.nationality} />,
  },
  { key: "assignedToName", header: "Assigned To" },
  { key: "mainLeadSource", header: "Lead Source" },
  { key: "ssn", header: "Personal ID" },
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

  const { user } = useAuth();
  const isAdmin = user?.role === ERoles.Admin;

  const visibleColumns = columns.filter(
    (col) => col.key !== "assignedToName" || isAdmin,
  );
  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <>
      <BaseTable<ProperyOwnerDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.properties.contacts}
        columns={visibleColumns}
        addButton={
          <Button
            onClick={onAddClick}
            style={{
              width: "fit-content",
            }}
          >
            <Plus className=" h-4 w-4" />
            Add Contact
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

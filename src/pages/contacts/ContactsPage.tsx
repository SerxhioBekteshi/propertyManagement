import { useRef, useState } from "react";
import { BaseTable, BaseTableRef, ColumnConfig } from "../../components/table";
import { Button } from "../../components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { ENDPOINTS } from "../../lib/axios";
import { formatDate } from "../../utils";
import PropertyOwnerDrawer from "../dashboard/components/PropertyOwnerDrawer";
import { useAuth } from "../../contexts/AuthContext";
import { EFormMode, ERoles } from "../../assets/enums";
import { ProperyOwnerDTO } from "../../types/properties/propertyOwner";
import CountryFlag from "../../components/flags/CountryFlag";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

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
  const [formMode, setFormMode] = useState<EFormMode | null>(null);
  const [selectedContact, setSelectedContact] =
    useState<ProperyOwnerDTO | null>(null);

  const tableRef = useRef<BaseTableRef<ProperyOwnerDTO>>(null);

  const { user } = useAuth();
  const isAdmin = user?.role === ERoles.Admin;

  const visibleColumns = columns.filter(
    (col) => col.key !== "assignedToName" || isAdmin,
  );

  const onAddClick = () => {
    setSelectedContact(null);
    setFormMode(EFormMode.Create);
    setOpen(true);
  };

  const onEditClick = (row: ProperyOwnerDTO) => {
    setSelectedContact(row);
    setFormMode(EFormMode.Edit);
    setOpen(true);
  };

  return (
    <>
      <BaseTable<ProperyOwnerDTO>
        ref={tableRef}
        controller={ENDPOINTS.properties.contacts}
        columns={visibleColumns}
        onAddClick={onAddClick}
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
          <Button onClick={onAddClick} style={{ width: "fit-content" }}>
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        }
      />

      {formMode && (
        <PropertyOwnerDrawer
          key={selectedContact?.id ?? "createOwner"}
          open={open}
          formMode={formMode}
          defaultValues={selectedContact}
          onOpenChange={(open) => {
            if (!open) setFormMode(null);
            setOpen(open);
          }}
          onSave={() => {
            tableRef.current?.refresh();
            setOpen(false);
            setFormMode(null);
          }}
        />
      )}
    </>
  );
}

import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { ENDPOINTS } from "../../lib/axios";
import { Button } from "../../components/ui/button";
import { Eye, Plus } from "lucide-react";
import ModalOpportunity from "./components/OpportunityModal";
import { OpportunityResponseDTO } from "../../types/opportunities";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ERoles } from "../../assets/enums";
import { columns } from "./helpers";

const OpportunitiesPage = () => {
  //   const [filters, setFilters] =
  //     useState<OpportunitiesFiltersDTO>(INITIAL_FILTERS);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const tableRef = useRef<BaseTableRef<OpportunityResponseDTO>>(null);
  const isAdmin = user?.role === ERoles.Admin;

  const visibleColumns = columns.filter(
    (col) => col.key !== "agentName" || isAdmin,
  );
  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <BaseTable<OpportunityResponseDTO>
        ref={tableRef}
        onAddClick={onAddClick}
        controller={ENDPOINTS.opportunities.getAll}
        columns={visibleColumns}
        renderActions={(row) => (
          <>
            <DropdownMenuItem
              onClick={() => navigate(`/opportunities/${row.id}/details`)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-md cursor-pointer hover:bg-slate-100 focus:bg-slate-100 outline-none"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              Details
            </DropdownMenuItem>
          </>
        )}
        addButton={
          <Button
            onClick={onAddClick}
            style={{
              width: "fit-content",
            }}
          >
            <Plus className=" h-4 w-4" />
            Add New Opportunity
          </Button>
        }
      />
      {open && (
        <ModalOpportunity
          key={"create"}
          onOpenChange={(open) => {
            setOpen(open);
          }}
          open={open}
          onSave={() => {
            setOpen(false);
            tableRef.current?.refresh();
          }}
        />
      )}
    </div>
  );
};

export default OpportunitiesPage;

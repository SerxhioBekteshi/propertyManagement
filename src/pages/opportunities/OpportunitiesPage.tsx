import { useRef, useState } from "react";
import { BaseTable, BaseTableRef } from "../../components/table";
import { ENDPOINTS } from "../../lib/axios";
import { Button } from "../../components/ui/button";
import { Eye, Plus } from "lucide-react";
import ModalOpportunity from "./components/OpportunityModal";
import {
  OpportunitiesFiltersDTO,
  OpportunityResponseDTO,
} from "../../types/opportunities";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ERoles } from "../../assets/enums";
import { columns, filterMappings, INITIAL_FILTERS } from "./helpers";
import OpportunityFilters from "./components/OpportunitiesFilter";
import { useLocationConfigBase } from "../../hooks/useLocationConfiguration";

const OpportunitiesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const zoneFilter = searchParams.get("zone") ?? undefined;

  const [open, setOpen] = useState(false);
  const tableRef = useRef<BaseTableRef<OpportunityResponseDTO>>(null);
  const isAdmin = user?.role === ERoles.Admin;

  const visibleColumns = columns.filter(
    (col) => col.key !== "agentName" || isAdmin,
  );

  const {
    cities,
    zones,
    loading: loadingFilters,
  } = useLocationConfigBase({
    fetch: {
      cities: true,
      zones: true,
      agents: true,
      propertyOwners: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 mb-6">
      <BaseTable<OpportunityResponseDTO, OpportunitiesFiltersDTO>
        ref={tableRef}
        onAddClick={() => setOpen(true)}
        controller={ENDPOINTS.opportunities.getAll(zoneFilter ?? "")}
        columns={visibleColumns}
        initialFilters={INITIAL_FILTERS}
        filterMappings={filterMappings}
        showSearch={false}
        renderFilters={(filters, onChange) => (
          <OpportunityFilters
            filters={filters}
            onChange={onChange}
            cities={cities}
            zones={zones}
            loading={loadingFilters}
          />
        )}
        renderActions={(row) => (
          <DropdownMenuItem
            onClick={() => navigate(`/opportunities/${row.id}/details`)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-md cursor-pointer hover:bg-slate-100 focus:bg-slate-100 outline-none"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            Details
          </DropdownMenuItem>
        )}
        addButton={
          <Button
            onClick={() => setOpen(true)}
            style={{ width: "fit-content" }}
          >
            <Plus className="h-4 w-4" />
            Add New Opportunity
          </Button>
        }
      />

      {open && (
        <ModalOpportunity
          key="create"
          onOpenChange={setOpen}
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

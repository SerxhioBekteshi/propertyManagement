import { useState, useEffect, useRef } from "react";
import PropertyFilters from "./components/PropertyFilters";
import PropertyCard from "./components/PropertyCard";
import { Building2, Loader2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import ModalProperty from "./components/PropertyModal";
import {
  PropertyFiltersDTO,
  PropertyResponseDTO,
} from "../../types/properties";
import { usePagedList } from "../../hooks/usePagedList";
import { ENDPOINTS } from "../../lib/axios";
import { LocationConfigurationService } from "../../lib/LocationConfiguration";
import { IOption } from "../../types";
import { filterMappings, INITIAL_FILTERS } from "./components/filterMappings";

export default function DashboardPage() {
  const [filters, setFilters] = useState<PropertyFiltersDTO>(INITIAL_FILTERS);
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [cities, setCities] = useState<IOption<number>[]>([]);
  const [agents, setAgents] = useState<IOption<number>[]>([]);
  const [zones, setZones] = useState<IOption<number>[]>([]);

  const [filterLoading, setFilterLoading] = useState(false);

  const {
    items: properties,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    loadMore,
    refresh,
    applyFilters,
  } = usePagedList<PropertyResponseDTO, PropertyFiltersDTO>({
    controller: ENDPOINTS.properties.getAll,
    filterMappings: filterMappings,
  });

  const fetchAgentsAndCities = async () => {
    setFilterLoading(true);
    try {
      const [res, resAgents, resZones] = await Promise.all([
        LocationConfigurationService.getCities(),
        LocationConfigurationService.getAgents(),
        LocationConfigurationService.getZones(),
      ]);

      setCities(res.data);
      setAgents(resAgents.data);
      setZones(resZones.data);
    } catch (err) {
      console.log("Error fetching filters:", err);
    } finally {
      setFilterLoading(false);
    }
  };
  useEffect(() => {
    fetchAgentsAndCities();
  }, []);

  // infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="sticky top-0 z-40 bg-white flex justify-between items-center py-3">
        <h1 className="text-lg font-semibold text-slate-900">Properties</h1>
        <Button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <PropertyFilters
        filters={filters}
        onChange={(newFilters) => {
          setFilters(newFilters);
          applyFilters(newFilters);
        }}
        zones={zones}
        cities={cities}
        agents={agents}
        loading={filterLoading}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
            >
              <div className="h-52 bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                <div className="flex gap-3 pt-1">
                  <div className="h-3 bg-slate-100 rounded-lg w-16" />
                  <div className="h-3 bg-slate-100 rounded-lg w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No properties found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            No listings match your current filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => console.log(property)}
              />
            ))}
          </div>

          <div
            ref={sentinelRef}
            className="flex items-center justify-center py-8 mt-2"
          >
            {loadingMore && (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading more...</span>
              </div>
            )}
            {!hasMore && properties.length > 0 && (
              <p className="text-sm text-slate-400">
                All {totalCount} listings loaded
              </p>
            )}
          </div>
        </>
      )}

      {uploadOpen && (
        <ModalProperty
          onClose={() => setUploadOpen(false)}
          open={uploadOpen}
          onSave={() => {
            setUploadOpen(false);
            refresh();
          }}
          model={null}
        />
      )}
    </div>
  );
}

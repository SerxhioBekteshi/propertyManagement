/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search } from "lucide-react";
import {
  PROPERTY_AVAILABILITY_OPTIONS,
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../../assets/enums/constants/property";
import { PropertyFiltersDTO } from "../../../types/properties";
import Modal from "../../../components/modal";
import { IOption } from "../../../types";
import { INITIAL_FILTERS } from "./filterMappings";
import Label from "../../../components/label";
import { SingleSelect } from "../../../components/single-select";
import { Button } from "../../../components/ui/button";

interface PropertyFiltersProps {
  filters: PropertyFiltersDTO;
  onChange: (filters: PropertyFiltersDTO) => void;
  cities: IOption<number>[];
  agents: IOption<number>[];
  zones: IOption<number>[];
  owners: IOption<number>[];
  loading: boolean;
}

export default function PropertyFilters({
  filters,
  onChange,
  zones,
  cities,
  agents,
  owners,
}: PropertyFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Local draft — only applied when user taps "Apply Filters"
  const [draft, setDraft] = useState<PropertyFiltersDTO>(filters);

  function update(key: keyof PropertyFiltersDTO, value: any) {
    onChange({ ...filters, [key]: value });
  }

  function updateDraft(key: keyof PropertyFiltersDTO, value: any) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  const countActiveFilters = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (value === "" || value === null || value === undefined) return false;
      if (key === "orderBy") return false;
      return true;
    }).length;
  };

  const clearFilters = () => {
    onChange(INITIAL_FILTERS);
  };

  const inputStyle =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm";

  // Desktop fields — apply immediately on change
  const desktopFilterFields = (
    <>
      <div>
        <Label>Business Type</Label>
        <SingleSelect
          options={PROPERTY_BUSINESS_TYPE_OPTIONS}
          value={filters.businessType}
          onChange={(val) => update("businessType", val)}
        />
      </div>
      <div>
        <Label>Min Price</Label>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Max Price</Label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Bedrooms</Label>
        <input
          type="number"
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Bathrooms</Label>
        <input
          type="number"
          value={filters.bathrooms}
          onChange={(e) => update("bathrooms", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Property Type</Label>
        <SingleSelect
          options={PROPERTY_TYPE_OPTIONS}
          value={filters.propertyType}
          onChange={(val) => update("propertyType", val)}
        />
      </div>
      <div>
        <Label>City</Label>
        <SingleSelect
          options={cities}
          value={filters.cityId}
          onChange={(val) => update("cityId", val)}
        />
      </div>
      <div>
        <Label>Zone</Label>
        <SingleSelect<number>
          options={zones}
          value={filters.zoneId}
          onChange={(val) => update("zoneId", val)}
        />
      </div>
      <div>
        <Label>Availability</Label>
        <SingleSelect
          options={PROPERTY_AVAILABILITY_OPTIONS}
          value={filters.availability}
          onChange={(val) => update("availability", val)}
        />
      </div>
      <div>
        <Label>Assigned To</Label>
        <SingleSelect
          options={agents}
          value={filters.agentId}
          onChange={(val) => update("agentId", val)}
        />
      </div>
      <div>
        <Label>Owner</Label>
        <SingleSelect
          options={owners}
          value={filters.propertyOwnerId}
          onChange={(val) => update("propertyOwnerId", val)}
        />
      </div>
    </>
  );

  // Mobile fields — update draft only, not applied until "Apply Filters"
  const mobileFilterFields = (
    <>
      <div>
        <Label>Business Type</Label>
        <SingleSelect
          options={PROPERTY_BUSINESS_TYPE_OPTIONS}
          value={draft.businessType}
          onChange={(val) => updateDraft("businessType", val)}
        />
      </div>
      <div>
        <Label>Min Price</Label>
        <input
          type="number"
          value={draft.minPrice}
          onChange={(e) => updateDraft("minPrice", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Max Price</Label>
        <input
          type="number"
          value={draft.maxPrice}
          onChange={(e) => updateDraft("maxPrice", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Bedrooms</Label>
        <input
          type="number"
          value={draft.bedrooms}
          onChange={(e) => updateDraft("bedrooms", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Bathrooms</Label>
        <input
          type="number"
          value={draft.bathrooms}
          onChange={(e) => updateDraft("bathrooms", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Property Type</Label>
        <SingleSelect
          options={PROPERTY_TYPE_OPTIONS}
          value={draft.propertyType}
          onChange={(val) => updateDraft("propertyType", val)}
        />
      </div>
      <div>
        <Label>City</Label>
        <SingleSelect
          options={cities}
          value={draft.cityId}
          onChange={(val) => updateDraft("cityId", val)}
        />
      </div>
      <div>
        <Label>Zone</Label>
        <SingleSelect<number>
          options={zones}
          value={draft.zoneId}
          onChange={(val) => updateDraft("zoneId", val)}
        />
      </div>
      <div>
        <Label>Availability</Label>
        <SingleSelect
          options={PROPERTY_AVAILABILITY_OPTIONS}
          value={draft.availability}
          onChange={(val) => updateDraft("availability", val)}
        />
      </div>
      <div>
        <Label>Assigned To</Label>
        <SingleSelect
          options={agents}
          value={draft.agentId}
          onChange={(val) => updateDraft("agentId", val)}
        />
      </div>
      <div>
        <Label>Owner</Label>
        <SingleSelect
          options={owners}
          value={draft.propertyOwnerId}
          onChange={(val) => updateDraft("propertyOwnerId", val)}
        />
      </div>
    </>
  );

  return (
    <div className="relative z-10 bg-white/95 backdrop-blur-md p-2 shadow-sm border-b border-slate-200 rounded-2xl border">
      <div className="max-w-screen p-4 mx-auto">
        {/* MOBILE FILTER + CLEAR BUTTONS */}
        <div className="md:hidden flex items-center gap-2 mb-3 ">
          <Button
            onClick={() => {
              setDraft(filters); // sync draft with current applied filters
              setFiltersOpen(true);
            }}
            className="flex-1  flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm"
          >
            <Search className="w-4 h-4" />
            Filters
          </Button>

          {countActiveFilters() > 0 && ( // ✅ Add this condition
            <Button
              onClick={clearFilters}
              className="relative  px-4 flex items-center justify-center rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
            >
              Clear
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                {countActiveFilters()}
              </span>
            </Button>
          )}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {desktopFilterFields}

          {countActiveFilters() > 0 && ( // ✅ Add this condition
            <div className="flex items-end gap-2">
              <Button
                onClick={clearFilters}
                className="relative  px-4 flex items-center justify-center rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
              >
                Clear
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                  {countActiveFilters()}
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* ORDER BY */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-800 uppercase mb-1">
              Order By
            </label>
            <select
              value={filters.orderBy}
              onChange={(e) => update("orderBy", e.target.value)}
              className="text-sm bg-white border border-slate-300 rounded-md px-3 py-2 min-w-[200px]"
            >
              <option value="newest">Newest listings</option>
              <option value="oldest">Oldest listings</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* MOBILE MODAL */}
      <Modal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        description="Refine your property search"
        submitTitle="Apply Filters"
        onSave={() => {
          onChange(draft); // commit draft to real filters
          setFiltersOpen(false);
        }}
        fitContentHeight={false}
        footerActions={
          countActiveFilters() > 0 && (
            <Button
              onClick={() => {
                setDraft(INITIAL_FILTERS);
                onChange(INITIAL_FILTERS);
                setFiltersOpen(false);
              }}
              className="relative px-4 flex items-center justify-center rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
            >
              Clear
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                {countActiveFilters()}
              </span>
            </Button>
          )
        }
      >
        <div className="grid grid-cols-1 gap-4">{mobileFilterFields}</div>
      </Modal>
    </div>
  );
}

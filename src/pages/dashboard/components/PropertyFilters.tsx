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

interface PropertyFiltersProps {
  filters: PropertyFiltersDTO;
  onChange: (filters: PropertyFiltersDTO) => void;
  cities: IOption<number>[];
  agents: IOption<number>[];
  zones: IOption<number>[];

  loading: boolean;
}

export default function PropertyFilters({
  filters,
  onChange,
  zones,
  cities,
  agents,
  loading,
}: PropertyFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  function update(key: keyof PropertyFiltersDTO, value: string) {
    onChange({ ...filters, [key]: value });
  }

  const countActiveFilters = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (value === "" || value === null || value === undefined) return false;
      if (key === "orderBy") return false; // ignore sorting
      return true;
    }).length;
  };

  const clearFilters = () => {
    onChange({
      ...filters,
      businessType: "",
      propertyType: "",
      cityId: 0,
      zoneId: 0,
      availability: "",
      owner: "",
    });
  };

  const inputStyle =
    "w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm";
  const labelStyle =
    "block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1";

  // ✅ REUSABLE FILTER FIELDS
  const filterFields = (
    <>
      <div>
        <label className={labelStyle}>Business Type</label>
        <select
          value={filters.businessType}
          onChange={(e) => update("businessType", e.target.value)}
          className={inputStyle}
        >
          {PROPERTY_BUSINESS_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Min Price</label>
        <input
          type="number"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Max Price</label>
        <input
          type="number"
          placeholder="No limit"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Bedrooms</label>
        <input
          type="number"
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Bathrooms</label>
        <input
          type="number"
          value={filters.bathrooms}
          onChange={(e) => update("bathrooms", e.target.value)}
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Property Type</label>
        <select
          value={filters.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
          className={inputStyle}
        >
          {PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>City</label>
        <select
          disabled={loading}
          value={filters.cityId}
          onChange={(e) => update("cityId", e.target.value)}
          className={inputStyle}
        >
          <option value="">— Select City —</option>
          {cities.map((city, index) => (
            <option key={index} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Zone</label>
        <select
          disabled={loading}
          value={filters.zoneId}
          onChange={(e) => update("zoneId", e.target.value)}
          className={inputStyle}
        >
          <option value="">— Select zone —</option>
          {zones.map((zone, index) => (
            <option key={index} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Availability</label>
        <select
          value={filters.availability}
          onChange={(e) => update("availability", e.target.value)}
          className={inputStyle}
        >
          {PROPERTY_AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Assigned To</label>
        <select
          disabled={loading}
          value={filters.agentId}
          onChange={(e) => update("agentId", e.target.value)}
          className={inputStyle}
        >
          <option value="">— Select agent —</option>
          {agents.map((city, index) => (
            <option key={index} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Owner</label>
        <input
          type="text"
          value={filters.owner}
          onChange={(e) => update("owner", e.target.value)}
          className={inputStyle}
        />
      </div>
    </>
  );

  return (
    <div className=" bg-white/95 backdrop-blur-md p-2 shadow-sm border-b border-slate-200 rounded-2xl border">
      <div className="max-w-screen p-4 mx-auto">
        {/* MOBILE FILTER BUTTON */}
        <div className="md:hidden flex items-center mb-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="w-full h-[38px] flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm"
          >
            <Search className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {filterFields}

          <div className="flex items-end gap-2">
            {/* SEARCH (kept as placeholder / no action) */}
            {/* <button className="h-[38px] w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all">
              <Search className="w-4 h-4" />
              Search
            </button> */}

            {/* CLEAR WITH BADGE */}
            <button
              onClick={clearFilters}
              className="relative h-[38px] px-4 flex items-center justify-center rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
            >
              Clear
              {/* BADGE */}
              {countActiveFilters() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                  {countActiveFilters()}
                </span>
              )}
            </button>
          </div>
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
      {/* MOBILE MODAL (USING YOUR MODAL COMPONENT) */}
      <Modal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        description="Refine your property search"
        submitTitle="Apply Filters"
        onSave={() => setFiltersOpen(false)}
        fitContentHeight={false}
      >
        <div className="grid grid-cols-1 gap-4">{filterFields}</div>
      </Modal>
    </div>
  );
}

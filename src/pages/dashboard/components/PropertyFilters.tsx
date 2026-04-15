import { useState } from "react";
import { Search } from "lucide-react";
import {
  PROPERTY_AVAILABILITY_OPTIONS,
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../../assets/enums/constants/property";
import { PropertyFiltersDTO } from "../../../types/properties";
import Modal from "../../../components/modal";

interface PropertyFiltersProps {
  filters: PropertyFiltersDTO;
  onChange: (filters: PropertyFiltersDTO) => void;
  totalCount: number;
}

export default function PropertyFilters({
  filters,
  onChange,
  totalCount,
}: PropertyFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  function update(key: keyof PropertyFiltersDTO, value: string) {
    onChange({ ...filters, [key]: value });
  }

  const allCities = [].sort();

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
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          className={inputStyle}
        >
          <option value="">— Select City —</option>
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelStyle}>Zone</label>
        <input
          type="text"
          value={filters.zone}
          onChange={(e) => update("zone", e.target.value)}
          className={inputStyle}
        />
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
        <input
          type="text"
          value={filters.agentId}
          onChange={(e) => update("agentId", e.target.value)}
          className={inputStyle}
        />
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
    <div className=" bg-white/95 backdrop-blur-md p-2 shadow-sm border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto">
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

          {/* SEARCH BUTTON */}
          <div className="flex items-end">
            <button className="h-[38px] w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all">
              <Search className="w-4 h-4" />
              Search
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

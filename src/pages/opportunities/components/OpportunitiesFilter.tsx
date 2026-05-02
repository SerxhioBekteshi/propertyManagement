/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../../assets/enums/constants/property";
import { IOption } from "../../../types";
import Label from "../../../components/label";
import { SingleSelect } from "../../../components/single-select";
import { OpportunitiesFiltersDTO } from "../../../types/opportunities";
import { SALES_STAGE_OPTIONS } from "../../../assets/enums/constants/opportunity";
import { useIsTablet } from "../../../hooks/useBreakpoint";

interface OpportunityFiltersProps {
  filters: OpportunitiesFiltersDTO;
  onChange: (filters: OpportunitiesFiltersDTO) => void;
  cities: IOption<number>[];
  zones: IOption<number>[];
  loading: boolean;
  onReset?: () => void;
}

export default function OpportunityFilters({
  filters,
  onChange,
  zones,
  cities,
}: OpportunityFiltersProps) {
  const isTablet = useIsTablet();

  function update(key: keyof OpportunitiesFiltersDTO, value: any) {
    onChange({ ...filters, [key]: value });
  }

  const inputStyle =
    "w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm";

  const containerClass = isTablet
    ? "flex flex-col gap-3"
    : "grid grid-cols-3 ;g:grid-cols-5 gap-x-3 gap-y-2";
  // 9 inputs + 1 clear = 10 items, 5 cols x 2 rows
  return (
    <div className={containerClass}>
      <div>
        <Label>Business Type</Label>
        <SingleSelect
          options={PROPERTY_BUSINESS_TYPE_OPTIONS}
          value={filters.businessType}
          onChange={(val) => update("businessType", val)}
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
        <Label>Price From</Label>
        <input
          type="number"
          value={filters.priceFrom ?? ""}
          onChange={(e) => update("priceFrom", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Price To</Label>
        <input
          type="number"
          value={filters.priceTo ?? ""}
          onChange={(e) => update("priceTo", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Bedrooms From</Label>
        <input
          type="number"
          value={filters.bedroomsFrom ?? ""}
          onChange={(e) => update("bedroomsFrom", e.target.value)}
          className={inputStyle}
        />
      </div>
      <div>
        <Label>Sales Stage</Label>
        <SingleSelect
          options={SALES_STAGE_OPTIONS}
          value={filters.salesStage}
          onChange={(val) => update("salesStage", val)}
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
        <Label>Order By</Label>
        <select
          value={filters.orderBy}
          onChange={(e) => update("orderBy", e.target.value)}
          className={inputStyle}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
      </div>
    </div>
  );
}

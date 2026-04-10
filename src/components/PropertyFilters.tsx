import { X, SlidersHorizontal } from 'lucide-react';
import type { PropertyFilters } from '../types';

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  totalCount: number;
}

const typologyOptions = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'studio', label: 'Studio' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
];

const transactionOptions = [
  { value: '', label: 'Sale & Rent' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'albania', label: '🇦🇱 Albania' },
  { value: 'greece', label: '🇬🇷 Greece' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: '', label: 'All Status' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' },
  { value: 'inactive', label: 'Inactive' },
];

const bedroomsOptions = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

const empty: PropertyFilters = {
  typology: '',
  transaction_type: '',
  country: '',
  location_city: '',
  status: 'active',
  min_price: '',
  max_price: '',
  bedrooms: '',
};

function hasActiveFilters(filters: PropertyFilters) {
  return (
    filters.typology !== '' ||
    filters.transaction_type !== '' ||
    filters.country !== '' ||
    filters.location_city !== '' ||
    filters.status !== 'active' ||
    filters.min_price !== '' ||
    filters.max_price !== '' ||
    filters.bedrooms !== ''
  );
}

export default function PropertyFilters({ filters, onChange, totalCount }: PropertyFiltersProps) {
  function update(key: keyof PropertyFilters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  function reset() {
    onChange(empty);
  }

  const active = hasActiveFilters(filters);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-slate-500 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium text-slate-700">
              {totalCount.toLocaleString()} {totalCount === 1 ? 'listing' : 'listings'}
            </span>
          </div>

          <div className="w-px h-5 bg-slate-200 shrink-0" />

          <div className="flex items-center gap-2 flex-wrap flex-1">
            <select
              value={filters.country}
              onChange={(e) => update('country', e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {countryOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <select
              value={filters.typology}
              onChange={(e) => update('typology', e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {typologyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <select
              value={filters.transaction_type}
              onChange={(e) => update('transaction_type', e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {transactionOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <select
              value={filters.bedrooms}
              onChange={(e) => update('bedrooms', e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {bedroomsOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <input
              type="text"
              value={filters.location_city}
              onChange={(e) => update('location_city', e.target.value)}
              placeholder="City or area..."
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 w-36 placeholder-slate-400"
            />

            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) => update('min_price', e.target.value)}
                placeholder="Min €"
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 w-24 placeholder-slate-400"
              />
              <span className="text-slate-300 text-xs">—</span>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) => update('max_price', e.target.value)}
                placeholder="Max €"
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 w-24 placeholder-slate-400"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => update('status', e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {active && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg px-3 py-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

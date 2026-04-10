import { BedDouble, Bath, Maximize2, MapPin, User, Phone, PhoneOff } from 'lucide-react';
import type { PropertyWithAgent } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PropertyCardProps {
  property: PropertyWithAgent;
  onClick: () => void;
}

const typologyColors: Record<string, string> = {
  apartment: 'bg-blue-50 text-blue-700 border-blue-100',
  house: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  villa: 'bg-amber-50 text-amber-700 border-amber-100',
  commercial: 'bg-orange-50 text-orange-700 border-orange-100',
  land: 'bg-lime-50 text-lime-700 border-lime-100',
  office: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  studio: 'bg-rose-50 text-rose-700 border-rose-100',
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500',
  sold: 'bg-slate-500',
  rented: 'bg-blue-500',
  inactive: 'bg-slate-300',
};

const countryFlag: Record<string, string> = {
  albania: '🇦🇱',
  greece: '🇬🇷',
};

const placeholderImages = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function getPlaceholder(id: string) {
  const idx = id.charCodeAt(0) % placeholderImages.length;
  return placeholderImages[idx];
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const { profile } = useAuth();
  const canSeePhone = profile?.role === 'admin' || profile?.id === property.agent_id;
  const imageUrl = property.images?.[0] || getPlaceholder(property.id);
  const typologyClass = typologyColors[property.typology] || 'bg-slate-50 text-slate-700 border-slate-100';

  const formattedPrice = property.price
    ? new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: property.currency || 'EUR',
        maximumFractionDigits: 0,
      }).format(property.price)
    : 'Price on request';

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border backdrop-blur-sm ${typologyClass}`}>
            {property.typology.charAt(0).toUpperCase() + property.typology.slice(1)}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border backdrop-blur-sm ${
            property.transaction_type === 'sale'
              ? 'bg-slate-900/80 text-white border-transparent'
              : 'bg-white/90 text-slate-700 border-white/50'
          }`}>
            {property.transaction_type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
            {countryFlag[property.country]} {property.country.charAt(0).toUpperCase() + property.country.slice(1)}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className={`flex items-center gap-1.5`}>
            <div className={`w-2 h-2 rounded-full ${statusColors[property.status]}`} />
            <span className="text-xs text-white font-medium capitalize">{property.status}</span>
          </div>
          <span className="text-white font-bold text-base drop-shadow-sm">{formattedPrice}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1.5 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs truncate">
            {[property.location_area, property.location_city].filter(Boolean).join(', ')}
          </span>
        </div>

        {(property.bedrooms || property.bathrooms || property.area_sqm) ? (
          <div className="flex items-center gap-4 text-slate-600 mb-3 pb-3 border-b border-slate-100">
            {property.bedrooms != null && property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium">{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms != null && property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium">{property.bathrooms} bath</span>
              </div>
            )}
            {property.area_sqm && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium">{property.area_sqm} m²</span>
              </div>
            )}
          </div>
        ) : (
          <div className="border-b border-slate-100 mb-3 pb-3" />
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
              <User className="w-3 h-3 text-slate-500" />
            </div>
            <span className="text-xs text-slate-500 truncate">
              {property.agent?.full_name || 'Unknown agent'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {canSeePhone ? (
              <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1">
                <Phone className="w-3 h-3 text-emerald-600" />
                <span className="text-xs text-emerald-700 font-medium">{property.owner_phone}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <PhoneOff className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">Hidden</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

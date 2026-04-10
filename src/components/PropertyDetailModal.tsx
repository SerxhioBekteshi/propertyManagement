// import { X, MapPin, BedDouble, Bath, Maximize2, User, Phone, PhoneOff, Calendar, Layers, Home, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useState } from 'react';
// import type { PropertyWithAgent } from '../types';
// import { useAuth } from '../contexts/AuthContext';

// interface PropertyDetailModalProps {
//   property: PropertyWithAgent;
//   onClose: () => void;
// }

// const countryFlag: Record<string, string> = {
//   albania: '🇦🇱',
//   greece: '🇬🇷',
// };

// const statusColors: Record<string, string> = {
//   active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
//   sold: 'bg-slate-50 text-slate-600 border-slate-200',
//   rented: 'bg-blue-50 text-blue-700 border-blue-100',
//   inactive: 'bg-slate-50 text-slate-400 border-slate-200',
// };

// const placeholderImages = [
//   'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
//   'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
//   'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
//   'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
// ];

// export default function PropertyDetailModal({ property, onClose }: PropertyDetailModalProps) {
//   const { profile } = useAuth();
//   const canSeePhone = profile?.role === 'admin' || profile?.id === property.agent_id;
//   const [imgIdx, setImgIdx] = useState(0);

//   const images = property.images?.length
//     ? property.images
//     : [placeholderImages[property.id.charCodeAt(0) % placeholderImages.length]];

//   const formattedPrice = property.price
//     ? new Intl.NumberFormat('en-EU', {
//         style: 'currency',
//         currency: property.currency || 'EUR',
//         maximumFractionDigits: 0,
//       }).format(property.price)
//     : 'Price on request';

//   const formattedDate = new Date(property.created_at).toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative bg-white rounded-3xl w-full max-w-3xl shadow-2xl my-4 overflow-hidden">
//         <div className="relative h-72 sm:h-96 bg-slate-100">
//           <img
//             src={images[imgIdx]}
//             alt={property.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//           {images.length > 1 && (
//             <>
//               <button
//                 onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeft className="w-4 h-4 text-slate-700" />
//               </button>
//               <button
//                 onClick={() => setImgIdx((i) => (i + 1) % images.length)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRight className="w-4 h-4 text-slate-700" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//                 {images.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setImgIdx(i)}
//                     className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white w-4' : 'bg-white/50'}`}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
//           >
//             <X className="w-4 h-4 text-slate-700" />
//           </button>

//           <div className="absolute bottom-4 left-4 right-14">
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-xs font-medium bg-white/90 text-slate-700 px-2.5 py-1 rounded-lg backdrop-blur-sm capitalize">
//                 {property.typology}
//               </span>
//               <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border backdrop-blur-sm ${statusColors[property.status]}`}>
//                 {property.status}
//               </span>
//               <span className="text-xs font-medium bg-black/50 text-white px-2.5 py-1 rounded-lg backdrop-blur-sm">
//                 {countryFlag[property.country]} {property.country}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 sm:p-8">
//           <div className="flex items-start justify-between gap-4 mb-4">
//             <div>
//               <h2 className="text-xl font-bold text-slate-900 mb-1">{property.title}</h2>
//               <div className="flex items-center gap-1.5 text-slate-500">
//                 <MapPin className="w-4 h-4 shrink-0" />
//                 <span className="text-sm">
//                   {[property.location_address, property.location_area, property.location_city]
//                     .filter(Boolean)
//                     .join(', ')}
//                 </span>
//               </div>
//             </div>
//             <div className="text-right shrink-0">
//               <p className="text-2xl font-bold text-slate-900">{formattedPrice}</p>
//               {property.transaction_type === 'rent' && (
//                 <p className="text-xs text-slate-400 mt-0.5">per month</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//             {property.bedrooms != null && property.bedrooms > 0 && (
//               <div className="bg-slate-50 rounded-xl p-3 text-center">
//                 <BedDouble className="w-4 h-4 text-slate-400 mx-auto mb-1" />
//                 <p className="text-sm font-semibold text-slate-900">{property.bedrooms}</p>
//                 <p className="text-xs text-slate-400">Bedrooms</p>
//               </div>
//             )}
//             {property.bathrooms != null && property.bathrooms > 0 && (
//               <div className="bg-slate-50 rounded-xl p-3 text-center">
//                 <Bath className="w-4 h-4 text-slate-400 mx-auto mb-1" />
//                 <p className="text-sm font-semibold text-slate-900">{property.bathrooms}</p>
//                 <p className="text-xs text-slate-400">Bathrooms</p>
//               </div>
//             )}
//             {property.area_sqm && (
//               <div className="bg-slate-50 rounded-xl p-3 text-center">
//                 <Maximize2 className="w-4 h-4 text-slate-400 mx-auto mb-1" />
//                 <p className="text-sm font-semibold text-slate-900">{property.area_sqm}</p>
//                 <p className="text-xs text-slate-400">m²</p>
//               </div>
//             )}
//             {property.floor != null && (
//               <div className="bg-slate-50 rounded-xl p-3 text-center">
//                 <Layers className="w-4 h-4 text-slate-400 mx-auto mb-1" />
//                 <p className="text-sm font-semibold text-slate-900">
//                   {property.floor}{property.total_floors ? `/${property.total_floors}` : ''}
//                 </p>
//                 <p className="text-xs text-slate-400">Floor</p>
//               </div>
//             )}
//           </div>

//           {property.description && (
//             <div className="mb-6">
//               <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
//               <p className="text-sm text-slate-500 leading-relaxed">{property.description}</p>
//             </div>
//           )}

//           <div className="border-t border-slate-100 pt-5 grid sm:grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                 Property Owner
//               </h3>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Home className="w-4 h-4 text-slate-400" />
//                   <span className="text-sm text-slate-700 font-medium">{property.owner_name}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {canSeePhone ? (
//                     <>
//                       <Phone className="w-4 h-4 text-emerald-500" />
//                       <a
//                         href={`tel:${property.owner_phone}`}
//                         className="text-sm text-emerald-600 font-medium hover:underline"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {property.owner_phone}
//                       </a>
//                     </>
//                   ) : (
//                     <>
//                       <PhoneOff className="w-4 h-4 text-slate-300" />
//                       <span className="text-sm text-slate-400">Phone number restricted</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                 Listed By
//               </h3>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
//                     <User className="w-3 h-3 text-slate-500" />
//                   </div>
//                   <span className="text-sm text-slate-700 font-medium">
//                     {property.agent?.full_name || 'Unknown'}
//                   </span>
//                   {property.agent?.role === 'admin' && (
//                     <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">Admin</span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-slate-400" />
//                   <span className="text-sm text-slate-500">Listed {formattedDate}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

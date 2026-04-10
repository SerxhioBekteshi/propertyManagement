// import { useState, FormEvent } from "react";
// import { X, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import type { PropertyInsert } from "../types";

// interface UploadPropertyModalProps {
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const typologyOptions = [
//   "apartment",
//   "house",
//   "villa",
//   "studio",
//   "office",
//   "commercial",
//   "land",
// ];

// const initialForm: Partial<PropertyInsert> = {
//   title: "",
//   description: "",
//   typology: "apartment",
//   transaction_type: "sale",
//   price: undefined,
//   currency: "EUR",
//   area_sqm: undefined,
//   bedrooms: 0,
//   bathrooms: 0,
//   floor: undefined,
//   total_floors: undefined,
//   location_city: "",
//   location_area: "",
//   location_address: "",
//   country: "albania",
//   owner_name: "",
//   owner_phone: "",
//   images: [],
//   status: "active",
// };

// export default function UploadPropertyModal({
//   onClose,
//   onSuccess,
// }: UploadPropertyModalProps) {
//   const { profile } = useAuth();
//   const [form, setForm] = useState<Partial<PropertyInsert>>(initialForm);
//   const [imageUrls, setImageUrls] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const citiesForCountry =
//     form.country === "albania" ? albanianCities : greekCities;

//   function set<K extends keyof PropertyInsert>(
//     key: K,
//     value: PropertyInsert[K],
//   ) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     if (key === "country") {
//       setForm((prev) => ({ ...prev, [key]: value, location_city: "" }));
//     }
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!profile) {
//       setError("You must be logged in to upload a property.");
//       setLoading(false);
//       return;
//     }

//     const parsedImages = imageUrls
//       .split("\n")
//       .map((u) => u.trim())
//       .filter((u) => u.length > 0);

//     const payload: PropertyInsert = {
//       title: form.title || "",
//       description: form.description || "",
//       typology: form.typology as PropertyInsert["typology"],
//       transaction_type:
//         form.transaction_type as PropertyInsert["transaction_type"],
//       price: form.price ? Number(form.price) : null,
//       currency: form.currency as PropertyInsert["currency"],
//       area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
//       bedrooms: form.bedrooms ? Number(form.bedrooms) : 0,
//       bathrooms: form.bathrooms ? Number(form.bathrooms) : 0,
//       floor: form.floor ? Number(form.floor) : null,
//       total_floors: form.total_floors ? Number(form.total_floors) : null,
//       location_city: form.location_city || "",
//       location_area: form.location_area || "",
//       location_address: form.location_address || "",
//       country: form.country as PropertyInsert["country"],
//       owner_name: form.owner_name || "",
//       owner_phone: form.owner_phone || "",
//       agent_id: profile.id,
//       images: parsedImages,
//       status: form.status as PropertyInsert["status"],
//     };

//     // const { error: dbError } = await supabase.from('properties').insert(payload);

//     if (1 == 3) {
//       setError("");
//     } else {
//       setSuccess(true);
//       setTimeout(() => {
//         onSuccess();
//         onClose();
//       }, 1200);
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-4">
//         <div className="flex items-center justify-between p-6 border-b border-slate-100">
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">
//               Add New Property
//             </h2>
//             <p className="text-sm text-slate-500 mt-0.5">
//               Fill in the property details below
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
//           >
//             <X className="w-4 h-4 text-slate-500" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="flex items-center justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || success}
//               className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium py-2.5 px-5 rounded-xl transition-all text-sm"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Upload className="w-4 h-4" />
//                   List Property
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

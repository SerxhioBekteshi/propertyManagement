export const SALES_STAGE_STYLES: Record<string, string> = {
  prospecting: "bg-violet-100 text-violet-700 border-violet-200",
  qualification: "bg-blue-100 text-blue-700 border-blue-200",
  proposal: "bg-cyan-100 text-cyan-700 border-cyan-200",
  negotiation: "bg-amber-100 text-amber-700 border-amber-200",
  closed_won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed_lost: "bg-rose-100 text-rose-700 border-rose-200",
};

export const AVAILABILITY_STYLES: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700 border-emerald-200",
  reserved: "bg-purple-100 text-purple-700 border-purple-200",
  sold: "bg-rose-100 text-rose-700 border-rose-200",
  rented: "bg-blue-100 text-blue-700 border-blue-200",
  in_negotiation: "bg-amber-100 text-amber-700 border-amber-200",
  withdrawn: "bg-slate-100 text-slate-700 border-slate-200",
};

export const BUSINESS_TYPE_STYLES: Record<string, string> = {
  sale: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rent: "bg-blue-50 text-blue-700 border-blue-200",
};

export const PAYMENT_TYPE_STYLES: Record<string, string> = {
  "bank financing": "bg-blue-50 text-blue-700 border-blue-200",
  "personal financing": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

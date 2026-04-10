import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyInsert =
  Database["public"]["Tables"]["properties"]["Insert"];

export type Role = "admin" | "agent";
export type Country = "albania" | "greece";
export type Typology =
  | "apartment"
  | "house"
  | "villa"
  | "commercial"
  | "land"
  | "office"
  | "studio";
export type TransactionType = "sale" | "rent";
export type PropertyStatus = "active" | "sold" | "rented" | "inactive";

export interface PropertyWithAgent extends Property {
  agent: Profile | null;
}

export interface PropertyFilters {
  typology: string;
  transaction_type: string;
  country: string;
  location_city: string;
  status: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
}

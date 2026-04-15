import { PropertyResponseDTO } from "../database";

export interface PropertyFiltersDTO {
  // Row 1 in Image
  id?: string; // Label: "Reference" (Maps to Property ID)
  businessType: string; // Label: "Business Type" (Options: Sale/Rent)
  minPrice: string; // Label: "Min Price"
  maxPrice: string; // Label: "Max Price"
  bedrooms: string; // Label: "Bedrooms"
  bathrooms: string; // Label: "Bathrooms"

  // Row 2 in Image
  propertyType: string; // Label: "Property Type"
  city: string; // Label: "City"
  zone: string; // Label: "Zone"
  availability: string; // Label: "Availability"
  agentId: string; // Label: "Assigned To" (Maps to DTO agentId)
  owner: string; // Label: "Owner"

  // Sort Logic
  orderBy: "newest" | "oldest" | "price_asc" | "price_desc";
}

export type AddPropertyDTO = Omit<
  PropertyResponseDTO,
  "id" | "agentId" | "lastModifiedBy"
>;

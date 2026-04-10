export type Property = {
  id: string;

  // Core
  title: string;
  description: string;
  comments?: string;

  // Classification
  status: string;
  mainType: string;
  propertyType: string;
  availability: string;
  furnished: string;
  division?: string;
  zone?: string;

  // Features
  elevator: "yes" | "no";
  beingLived: "yes" | "no";
  parking: "yes" | "no";
  documentation: "yes" | "no" | "in_progress";
  communalCharger?: "yes" | "no";

  // Business
  businessType: "sale" | "rent";
  exclusive: boolean;
  publishToPortal: boolean;
  portalsToPublish: string[];

  // Location
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  floor?: number;
  publishGeoreference: boolean;

  // Pricing
  price: number;
  priceForM2?: number;
  priceUponRequest: boolean;

  // Areas
  interiorArea?: number;
  grossArea?: number;
  landArea?: number;
  balconyArea?: number;
  commonArea?: number;

  // Timeline
  yearOfConstruction?: number;
  yearOfRenovation?: number;

  // System
  lastModifiedBy: string;
};

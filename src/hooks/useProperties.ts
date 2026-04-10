import { useState, useEffect, useCallback, useRef } from "react";
import { Property } from "../types/database";

const PAGE_SIZE = 12;

export const MOCK_PROPERTIES = [
  {
    id: 1,

    title: "Luxury Seafront Villa in Sarandë",
    description:
      "Modern luxury villa with panoramic sea views, private pool and large garden area.",
    comments: "Client requested fast sale due to relocation.",

    status: "refurbished",
    mainType: "residential",
    propertyType: "villa",
    availability: "available",
    furnished: "fully_furnished",
    division: "luxury_residential",
    zone: "coastal",

    elevator: "no",
    beingLived: "no",
    parking: "yes",
    documentation: "yes",
    communalCharger: "no",

    businessType: "sale",
    exclusive: true,

    publishToPortal: true,
    portalsToPublish: ["website", "facebook", "idealista"],

    country: "albania",
    city: "Sarandë",
    address: "Rruga Butrinti, Ksamil Area",
    latitude: 39.8752,
    longitude: 20.0053,
    floor: 0,
    publishGeoreference: true,

    price: 750000,
    priceForM2: 2678,
    priceUponRequest: false,

    interiorArea: 280,
    grossArea: 320,
    landArea: 900,
    balconyArea: 60,
    commonArea: 40,

    yearOfConstruction: 2015,
    yearOfRenovation: 2023,

    lastModifiedBy: "agent_01",
  },

  {
    id: 2,

    title: "Modern Apartment in Blloku",
    description:
      "Stylish apartment in the heart of Tirana with open space layout and natural light.",
    comments: "High rental demand area.",

    status: "new",
    mainType: "residential",
    propertyType: "apartment",
    availability: "in_negotiation",
    furnished: "semi_furnished",
    division: "urban_residential",
    zone: "city_center",

    elevator: "yes",
    beingLived: "no",
    parking: "no",
    documentation: "in_progress",
    communalCharger: "no",

    businessType: "rent",
    exclusive: false,

    publishToPortal: true,
    portalsToPublish: ["website", "facebook"],

    country: "albania",
    city: "Tirana",
    address: "Rruga Pjetër Bogdani, Blloku",
    latitude: 41.3193,
    longitude: 19.8172,
    floor: 5,
    publishGeoreference: true,

    price: 900,
    priceForM2: 10.5,
    priceUponRequest: false,

    interiorArea: 85,
    grossArea: 92,
    landArea: 0,
    balconyArea: 8,
    commonArea: 12,

    yearOfConstruction: 2020,
    yearOfRenovation: 2022,

    lastModifiedBy: "agent_02",
  },

  {
    id: 3,

    title: "Seafront Studio in Thessaloniki",
    description:
      "Compact studio with sea view, ideal for investment or Airbnb.",
    comments: "",

    status: "used",
    mainType: "residential",
    propertyType: "studio",
    availability: "available",
    furnished: "not_furnished",
    division: "urban_residential",
    zone: "coastal",

    elevator: "no",
    beingLived: "no",
    parking: "no",
    documentation: "yes",
    communalCharger: "no",

    businessType: "sale",
    exclusive: false,

    publishToPortal: false,
    portalsToPublish: ["website"],

    country: "greece",
    city: "Thessaloniki",
    address: "Leoforos Nikis 88",
    latitude: 40.6401,
    longitude: 22.9444,
    floor: 2,
    publishGeoreference: true,

    price: 120000,
    priceForM2: 3150,
    priceUponRequest: false,

    interiorArea: 38,
    grossArea: 42,
    landArea: 0,
    balconyArea: 4,
    commonArea: 6,

    yearOfConstruction: 1998,
    yearOfRenovation: 2010,

    lastModifiedBy: "agent_01",
  },

  {
    id: 4,

    title: "Commercial Space in Athens",
    description: "Prime retail space in central Athens with high foot traffic.",
    comments: "Suitable for long-term lease.",

    status: "refurbished",
    mainType: "commercial",
    propertyType: "commercial",
    availability: "reserved",
    furnished: "not_furnished",
    division: "commercial_zone",
    zone: "city_center",

    elevator: "yes",
    beingLived: "no",
    parking: "no",
    documentation: "yes",
    communalCharger: "no",

    businessType: "rent",
    exclusive: true,

    publishToPortal: true,
    portalsToPublish: ["website", "idealista"],

    country: "greece",
    city: "Athens",
    address: "Skoufa 34, Kolonaki",
    latitude: 37.9784,
    longitude: 23.7361,
    floor: 0,
    publishGeoreference: true,

    price: 3500,
    priceForM2: 29,
    priceUponRequest: false,

    interiorArea: 120,
    grossArea: 130,
    landArea: 0,
    balconyArea: 0,
    commonArea: 10,

    yearOfConstruction: 2005,
    yearOfRenovation: 2021,

    lastModifiedBy: "agent_03",
  },

  {
    id: 5,

    title: "Stone House in Gjirokastër",
    description:
      "Traditional stone house in UNESCO protected old town, fully restored.",
    comments: "",

    status: "refurbished",
    mainType: "residential",
    propertyType: "house",
    availability: "available",
    furnished: "semi_furnished",
    division: "historical",
    zone: "old_town",

    elevator: "no",
    beingLived: "no",
    parking: "yes",
    documentation: "yes",
    communalCharger: "no",

    businessType: "sale",
    exclusive: false,

    publishToPortal: true,
    portalsToPublish: ["website", "facebook"],

    country: "albania",
    city: "Gjirokastër",
    address: "Lagja Palorto 7",
    latitude: 40.0754,
    longitude: 20.1389,
    floor: 1,
    publishGeoreference: true,

    price: 95000,
    priceForM2: 593,
    priceUponRequest: false,

    interiorArea: 160,
    grossArea: 180,
    landArea: 220,
    balconyArea: 10,
    commonArea: 10,

    yearOfConstruction: 1900,
    yearOfRenovation: 2018,

    lastModifiedBy: "agent_02",
  },
];

// function applyFilters(
//   properties: PropertyWithAgent[],
//   filters: PropertyFilters,
// ): PropertyWithAgent[] {
//   return properties.filter((p) => {
//     if (filters.typology && p.typology !== filters.typology) return false;
//     if (
//       filters.transaction_type &&
//       p.transaction_type !== filters.transaction_type
//     )
//       return false;
//     if (filters.country && p.country !== filters.country) return false;
//     if (filters.status && p.status !== filters.status) return false;
//     if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
//     if (filters.min_price && p.price < Number(filters.min_price)) return false;
//     if (filters.max_price && p.price > Number(filters.max_price)) return false;
//     if (filters.location_city) {
//       const q = filters.location_city.toLowerCase();
//       const cityMatch = p.location_city?.toLowerCase().includes(q);
//       const areaMatch = p.location_area?.toLowerCase().includes(q);
//       if (!cityMatch && !areaMatch) return false;
//     }
//     return true;
//   });
// }

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const pageRef = useRef(0);

  const loadInitial = useCallback(() => {
    setLoading(true);
    pageRef.current = 0;

    setTimeout(() => {
      const page = MOCK_PROPERTIES.slice(0, PAGE_SIZE);

      setProperties(page);
      setTotalCount(MOCK_PROPERTIES.length);
      setHasMore(MOCK_PROPERTIES.length > PAGE_SIZE);

      pageRef.current = 1;
      setLoading(false);
    }, 300);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const from = pageRef.current * PAGE_SIZE;
      const page = MOCK_PROPERTIES.slice(from, from + PAGE_SIZE);

      setProperties((prev) => [...prev, ...page]);

      pageRef.current += 1;
      setHasMore(from + PAGE_SIZE < MOCK_PROPERTIES.length);

      setLoadingMore(false);
    }, 300);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return {
    properties,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    loadMore,
    refresh: loadInitial,
  };
}

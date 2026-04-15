import { useState, useEffect, useCallback, useRef } from "react";
import { PropertyResponseDTO } from "../types/properties";

const PAGE_SIZE = 12;

export const MOCK_PROPERTIES: PropertyResponseDTO[] = [
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
    exclusive: true,
    publishToPortal: true,
    elevator: "no",
    beingLived: "no",
    parking: "yes",
    portalsToPublish: ["website", "facebook", "idealista"],
    propertyOrientation: "South",
    country: "albania",
    city: "Sarandë",
    address: "Rruga Butrinti, Ksamil Area",
    latitude: 39.8752,
    longitude: 20.0053,
    zone: "coastal",
    floor: 0,
    publishGeoreference: true,
    businessType: "sale",
    price: 750000,
    priceForM2: 2678,
    priceUponRequest: false,
    interiorArea: 280,
    grossArea: 320,
    landArea: 900,
    balconyArea: 60,
    commonArea: 40,
    bedrooms: 4,
    bathrooms: 3,
    otherRooms: 1,
    livingRoom: 1,
    owner: "Besnik Hoxha",
    agentId: "agent_01",
    ownersTypology: "owner",
    documentation: "yes",
    communalCharger: "no",
    yearOfConstruction: 2015,
    yearOfRenovation: 2023,
    lastModifiedBy: "agent_01",

    withViewTo: "sea,city,garden",
    equipment: "air_conditioning,heating,security_door,wifi,oven",
    infrastructures: "swimming_pool,garage,terrace,roof_garden",
    surroundings: "beach,restaurant,supermarket,pharmacy",
  },
  {
    id: 2,
    title: "Modern Apartment in Blloku",
    description:
      "Stylish apartment in the heart of Tirana with open space layout.",
    comments: "High rental demand area.",
    status: "new",
    mainType: "residential",
    propertyType: "apartment",
    availability: "in_negotiation",
    furnished: "semi_furnished",
    exclusive: false,
    publishToPortal: true,
    elevator: "yes",
    beingLived: "no",
    parking: "no",
    portalsToPublish: ["website", "facebook"],
    propertyOrientation: "East",
    country: "albania",
    city: "Tirana",
    address: "Rruga Pjetër Bogdani, Blloku",
    latitude: 41.3193,
    longitude: 19.8172,
    zone: "city_center",
    floor: 5,
    publishGeoreference: true,
    businessType: "rent",
    price: 900,
    priceForM2: 10.5,
    priceUponRequest: false,
    interiorArea: 85,
    grossArea: 92,
    landArea: 0,
    balconyArea: 8,
    commonArea: 12,
    bedrooms: 2,
    bathrooms: 1,
    otherRooms: 0,
    livingRoom: 1,
    owner: "Arben Dauti",
    agentId: "agent_02",
    ownersTypology: "builder",
    documentation: "in_progress",
    communalCharger: "no",
    yearOfConstruction: 2020,
    yearOfRenovation: 2022,
    lastModifiedBy: "agent_02",

    withViewTo: "sea,city,garden",
    equipment: "air_conditioning,heating,security_door,wifi,oven",
    infrastructures: "swimming_pool,garage,terrace,roof_garden",
    surroundings: "beach,restaurant,supermarket,pharmacy",
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
    exclusive: false,
    publishToPortal: false,
    elevator: "no",
    beingLived: "no",
    parking: "no",
    portalsToPublish: ["website"],
    propertyOrientation: "West",
    country: "greece",
    city: "Thessaloniki",
    address: "Leoforos Nikis 88",
    latitude: 40.6401,
    longitude: 22.9444,
    zone: "coastal",
    floor: 2,
    publishGeoreference: true,
    businessType: "sale",
    price: 120000,
    priceForM2: 3150,
    priceUponRequest: false,
    interiorArea: 38,
    grossArea: 42,
    landArea: 0,
    balconyArea: 4,
    commonArea: 6,
    bedrooms: 1,
    bathrooms: 1,
    otherRooms: 0,
    livingRoom: 1,
    owner: "Eleni Papadopoulos",
    agentId: "agent_01",
    ownersTypology: "owner",
    documentation: "yes",
    communalCharger: "no",
    yearOfConstruction: 1998,
    yearOfRenovation: 2010,
    lastModifiedBy: "agent_01",

    withViewTo: "sea,city,garden",
    equipment: "air_conditioning,heating,security_door,wifi,oven",
    infrastructures: "swimming_pool,garage,terrace,roof_garden",
    surroundings: "beach,restaurant,supermarket,pharmacy",
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
    exclusive: true,
    publishToPortal: true,
    elevator: "yes",
    beingLived: "no",
    parking: "no",
    portalsToPublish: ["website", "idealista"],
    propertyOrientation: "North",
    country: "greece",
    city: "Athens",
    address: "Skoufa 34, Kolonaki",
    latitude: 37.9784,
    longitude: 23.7361,
    zone: "city_center",
    floor: 0,
    publishGeoreference: true,
    businessType: "rent",
    price: 3500,
    priceForM2: 29,
    priceUponRequest: false,
    interiorArea: 120,
    grossArea: 130,
    landArea: 0,
    balconyArea: 0,
    commonArea: 10,
    bedrooms: 0,
    bathrooms: 2,
    otherRooms: 2,
    livingRoom: 0,
    owner: "Athens Real Estate Group",
    agentId: "agent_03",
    ownersTypology: "clering",
    documentation: "yes",
    communalCharger: "no",
    yearOfConstruction: 2005,
    yearOfRenovation: 2021,
    lastModifiedBy: "agent_03",

    withViewTo: "sea,city,garden",
    equipment: "air_conditioning,heating,security_door,wifi,oven",
    infrastructures: "swimming_pool,garage,terrace,roof_garden",
    surroundings: "beach,restaurant,supermarket,pharmacy",
  },
  {
    id: 5,
    title: "Stone House in Gjirokastër",
    description: "Traditional stone house in UNESCO protected old town.",
    comments: "",
    status: "refurbished",
    mainType: "residential",
    propertyType: "house",
    availability: "available",
    furnished: "semi_furnished",
    exclusive: false,
    publishToPortal: true,
    elevator: "no",
    beingLived: "no",
    parking: "yes",
    portalsToPublish: ["website", "facebook"],
    propertyOrientation: "East",
    country: "albania",
    city: "Gjirokastër",
    address: "Lagja Palorto 7",
    latitude: 40.0754,
    longitude: 20.1389,
    zone: "old_town",
    floor: 1,
    publishGeoreference: true,
    businessType: "sale",
    price: 95000,
    priceForM2: 593,
    priceUponRequest: false,
    interiorArea: 160,
    grossArea: 180,
    landArea: 220,
    balconyArea: 10,
    commonArea: 10,
    bedrooms: 3,
    bathrooms: 2,
    otherRooms: 1,
    livingRoom: 1,
    owner: "Fatmir Rama",
    agentId: "agent_02",
    ownersTypology: "owner",
    documentation: "yes",
    communalCharger: "no",
    yearOfConstruction: 1900,
    yearOfRenovation: 2018,
    lastModifiedBy: "agent_02",

    withViewTo: "city",
    equipment: "air_conditioning,wifi,washing_machine",
    infrastructures: "elevator,indoor_parking",
    surroundings: "city_center,school,public_transport,bank",
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
  const [properties, setProperties] = useState<PropertyResponseDTO[]>([]);
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

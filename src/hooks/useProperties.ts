import { useState, useEffect, useCallback, useRef } from "react";
import type { PropertyWithAgent, PropertyFilters } from "../types";

const PAGE_SIZE = 12;

const MOCK_PROPERTIES: PropertyWithAgent[] = [
  {
    id: "1",
    created_at: "2024-11-01T10:00:00Z",
    updated_at: "2024-11-01T10:00:00Z",
    title: "Luxury Villa in Sarandë",
    description:
      "Stunning seafront villa with panoramic views of the Ionian Sea.",
    typology: "villa",
    transaction_type: "sale",
    status: "active",
    country: "albania",
    location_city: "Sarandë",
    location_area: "Ksamil",
    address: "Rruga Ksamil 12",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area_sqm: 280,
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "albania",
      phone: "+355 69 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "2",
    created_at: "2024-11-05T09:00:00Z",
    updated_at: "2024-11-05T09:00:00Z",
    title: "Modern Apartment in Tirana",
    description:
      "Bright 2-bedroom apartment in the heart of Tirana, close to Blloku.",
    typology: "apartment",
    transaction_type: "rent",
    status: "active",
    country: "albania",
    location_city: "Tirana",
    location_area: "Blloku",
    address: "Rruga Pjetër Bogdani 5",
    price: 800,
    bedrooms: 2,
    bathrooms: 1,
    area_sqm: 85,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "albania",
      phone: "+355 69 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "3",
    created_at: "2024-11-10T11:00:00Z",
    updated_at: "2024-11-10T11:00:00Z",
    title: "Seafront Studio in Thessaloniki",
    description:
      "Cozy studio with sea view, ideal for short-term rental or investment.",
    typology: "studio",
    transaction_type: "sale",
    status: "active",
    country: "greece",
    location_city: "Thessaloniki",
    location_area: "Kalamaria",
    address: "Leoforos Nikis 88",
    price: 120000,
    bedrooms: 0,
    bathrooms: 1,
    area_sqm: 38,
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "greece",
      phone: "+30 694 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "4",
    created_at: "2024-11-15T14:00:00Z",
    updated_at: "2024-11-15T14:00:00Z",
    title: "Commercial Space in Athens",
    description:
      "Prime ground-floor commercial unit in central Athens, high foot traffic.",
    typology: "commercial",
    transaction_type: "rent",
    status: "active",
    country: "greece",
    location_city: "Athens",
    location_area: "Kolonaki",
    address: "Skoufa 34",
    price: 3500,
    bedrooms: 0,
    bathrooms: 1,
    area_sqm: 120,
    images: [
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "greece",
      phone: "+30 694 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "5",
    created_at: "2024-11-20T08:00:00Z",
    updated_at: "2024-11-20T08:00:00Z",
    title: "Stone House in Gjirokastër",
    description: "Restored traditional stone house in UNESCO-listed old town.",
    typology: "house",
    transaction_type: "sale",
    status: "active",
    country: "albania",
    location_city: "Gjirokastër",
    location_area: "Old Bazaar",
    address: "Lagja Palorto 7",
    price: 95000,
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 160,
    images: [
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "albania",
      phone: "+355 69 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "6",
    created_at: "2024-11-25T16:00:00Z",
    updated_at: "2024-11-25T16:00:00Z",
    title: "Land Plot near Corfu",
    description: "Buildable land with sea view, planning permission in place.",
    typology: "land",
    transaction_type: "sale",
    status: "active",
    country: "greece",
    location_city: "Corfu",
    location_area: "Agios Gordios",
    address: "Agios Gordios Road",
    price: 210000,
    bedrooms: 0,
    bathrooms: 0,
    area_sqm: 1500,
    images: [
      "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    agent_id: "mock-user-id",
    agent: {
      id: "mock-user-id",
      email: "agent@estateflow.com",
      full_name: "Mock Agent",
      role: "agent",
      country: "greece",
      phone: "+30 694 123 4567",
      avatar_url: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

function applyFilters(
  properties: PropertyWithAgent[],
  filters: PropertyFilters,
): PropertyWithAgent[] {
  return properties.filter((p) => {
    if (filters.typology && p.typology !== filters.typology) return false;
    if (
      filters.transaction_type &&
      p.transaction_type !== filters.transaction_type
    )
      return false;
    if (filters.country && p.country !== filters.country) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
    if (filters.min_price && p.price < Number(filters.min_price)) return false;
    if (filters.max_price && p.price > Number(filters.max_price)) return false;
    if (filters.location_city) {
      const q = filters.location_city.toLowerCase();
      const cityMatch = p.location_city?.toLowerCase().includes(q);
      const areaMatch = p.location_area?.toLowerCase().includes(q);
      if (!cityMatch && !areaMatch) return false;
    }
    return true;
  });
}

export function useProperties(filters: PropertyFilters) {
  const [properties, setProperties] = useState<PropertyWithAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const pageRef = useRef(0);

  const loadInitial = useCallback(() => {
    setLoading(true);
    pageRef.current = 0;

    // Simulate async
    setTimeout(() => {
      const filtered = applyFilters(MOCK_PROPERTIES, filters);
      const page = filtered.slice(0, PAGE_SIZE);
      setProperties(page);
      setTotalCount(filtered.length);
      setHasMore(filtered.length > PAGE_SIZE);
      pageRef.current = 1;
      setLoading(false);
    }, 300);
  }, [JSON.stringify(filters)]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const filtered = applyFilters(MOCK_PROPERTIES, filters);
      const from = pageRef.current * PAGE_SIZE;
      const page = filtered.slice(from, from + PAGE_SIZE);

      if (page.length > 0) {
        setProperties((prev) => [...prev, ...page]);
        pageRef.current += 1;
        setHasMore(page.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, hasMore, JSON.stringify(filters)]);

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

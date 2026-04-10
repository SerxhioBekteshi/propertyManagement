export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'admin' | 'agent';
          country: 'albania' | 'greece' | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          role?: 'admin' | 'agent';
          country?: 'albania' | 'greece' | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'admin' | 'agent';
          country?: 'albania' | 'greece' | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          typology: 'apartment' | 'house' | 'villa' | 'commercial' | 'land' | 'office' | 'studio';
          transaction_type: 'sale' | 'rent';
          price: number | null;
          currency: 'EUR' | 'ALL';
          area_sqm: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          floor: number | null;
          total_floors: number | null;
          location_city: string;
          location_area: string | null;
          location_address: string | null;
          country: 'albania' | 'greece';
          owner_name: string;
          owner_phone: string;
          agent_id: string;
          images: string[];
          status: 'active' | 'sold' | 'rented' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          typology: 'apartment' | 'house' | 'villa' | 'commercial' | 'land' | 'office' | 'studio';
          transaction_type: 'sale' | 'rent';
          price?: number | null;
          currency?: 'EUR' | 'ALL';
          area_sqm?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          floor?: number | null;
          total_floors?: number | null;
          location_city: string;
          location_area?: string | null;
          location_address?: string | null;
          country: 'albania' | 'greece';
          owner_name: string;
          owner_phone: string;
          agent_id: string;
          images?: string[];
          status?: 'active' | 'sold' | 'rented' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          typology?: 'apartment' | 'house' | 'villa' | 'commercial' | 'land' | 'office' | 'studio';
          transaction_type?: 'sale' | 'rent';
          price?: number | null;
          currency?: 'EUR' | 'ALL';
          area_sqm?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          floor?: number | null;
          total_floors?: number | null;
          location_city?: string;
          location_area?: string | null;
          location_address?: string | null;
          country?: 'albania' | 'greece';
          owner_name?: string;
          owner_phone?: string;
          agent_id?: string;
          images?: string[];
          status?: 'active' | 'sold' | 'rented' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

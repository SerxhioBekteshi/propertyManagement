import { useState, FormEvent } from 'react';
import { X, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { PropertyInsert } from '../types';

interface UploadPropertyModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const albanianCities = ['Tirana', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan', 'Fier', 'Korçë', 'Berat', 'Sarandë', 'Lushnjë', 'Kavajë', 'Gjirokastër', 'Pogradec', 'Lezhë'];
const greekCities = ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Ioannina', 'Rhodes', 'Chania', 'Santorini', 'Mykonos', 'Corfu', 'Nafplio', 'Katerini'];

const typologyOptions = ['apartment', 'house', 'villa', 'studio', 'office', 'commercial', 'land'];

const initialForm: Partial<PropertyInsert> = {
  title: '',
  description: '',
  typology: 'apartment',
  transaction_type: 'sale',
  price: undefined,
  currency: 'EUR',
  area_sqm: undefined,
  bedrooms: 0,
  bathrooms: 0,
  floor: undefined,
  total_floors: undefined,
  location_city: '',
  location_area: '',
  location_address: '',
  country: 'albania',
  owner_name: '',
  owner_phone: '',
  images: [],
  status: 'active',
};

export default function UploadPropertyModal({ onClose, onSuccess }: UploadPropertyModalProps) {
  const { profile } = useAuth();
  const [form, setForm] = useState<Partial<PropertyInsert>>(initialForm);
  const [imageUrls, setImageUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const citiesForCountry = form.country === 'albania' ? albanianCities : greekCities;

  function set<K extends keyof PropertyInsert>(key: K, value: PropertyInsert[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'country') {
      setForm((prev) => ({ ...prev, [key]: value, location_city: '' }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!profile) {
      setError('You must be logged in to upload a property.');
      setLoading(false);
      return;
    }

    const parsedImages = imageUrls
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const payload: PropertyInsert = {
      title: form.title || '',
      description: form.description || '',
      typology: form.typology as PropertyInsert['typology'],
      transaction_type: form.transaction_type as PropertyInsert['transaction_type'],
      price: form.price ? Number(form.price) : null,
      currency: form.currency as PropertyInsert['currency'],
      area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : 0,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : 0,
      floor: form.floor ? Number(form.floor) : null,
      total_floors: form.total_floors ? Number(form.total_floors) : null,
      location_city: form.location_city || '',
      location_area: form.location_area || '',
      location_address: form.location_address || '',
      country: form.country as PropertyInsert['country'],
      owner_name: form.owner_name || '',
      owner_phone: form.owner_phone || '',
      agent_id: profile.id,
      images: parsedImages,
      status: form.status as PropertyInsert['status'],
    };

    const { error: dbError } = await supabase.from('properties').insert(payload);

    if (dbError) {
      setError(dbError.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add New Property</h2>
            <p className="text-sm text-slate-500 mt-0.5">Fill in the property details below</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Section title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Property Title *</Label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g. Modern 2BR Apartment in City Centre"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Country *</Label>
                <select
                  value={form.country}
                  onChange={(e) => set('country', e.target.value as 'albania' | 'greece')}
                  className={inputClass}
                  required
                >
                  <option value="albania">🇦🇱 Albania</option>
                  <option value="greece">🇬🇷 Greece</option>
                </select>
              </div>
              <div>
                <Label>City *</Label>
                <select
                  value={form.location_city}
                  onChange={(e) => set('location_city', e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select city...</option>
                  {citiesForCountry.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Area / Neighborhood</Label>
                <input
                  value={form.location_area ?? ''}
                  onChange={(e) => set('location_area', e.target.value)}
                  placeholder="e.g. Blloku, Kolonaki"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Street Address</Label>
                <input
                  value={form.location_address ?? ''}
                  onChange={(e) => set('location_address', e.target.value)}
                  placeholder="e.g. Rruga Myslym Shyri 12"
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          <Section title="Property Details">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Typology *</Label>
                <select
                  value={form.typology}
                  onChange={(e) => set('typology', e.target.value as PropertyInsert['typology'])}
                  className={inputClass}
                  required
                >
                  {typologyOptions.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Transaction *</Label>
                <select
                  value={form.transaction_type}
                  onChange={(e) => set('transaction_type', e.target.value as 'sale' | 'rent')}
                  className={inputClass}
                  required
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) => set('status', e.target.value as PropertyInsert['status'])}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label>Price</Label>
                <input
                  type="number"
                  value={form.price ?? ''}
                  onChange={(e) => set('price', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Currency</Label>
                <select
                  value={form.currency}
                  onChange={(e) => set('currency', e.target.value as 'EUR' | 'ALL')}
                  className={inputClass}
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="ALL">ALL (Lek)</option>
                </select>
              </div>
              <div>
                <Label>Area (m²)</Label>
                <input
                  type="number"
                  value={form.area_sqm ?? ''}
                  onChange={(e) => set('area_sqm', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Bedrooms</Label>
                <input
                  type="number"
                  value={form.bedrooms ?? ''}
                  onChange={(e) => set('bedrooms', e.target.value ? Number(e.target.value) : 0)}
                  placeholder="0"
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Bathrooms</Label>
                <input
                  type="number"
                  value={form.bathrooms ?? ''}
                  onChange={(e) => set('bathrooms', e.target.value ? Number(e.target.value) : 0)}
                  placeholder="0"
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Floor</Label>
                <input
                  type="number"
                  value={form.floor ?? ''}
                  onChange={(e) => set('floor', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 3"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Total Floors</Label>
                <input
                  type="number"
                  value={form.total_floors ?? ''}
                  onChange={(e) => set('total_floors', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 10"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Description</Label>
              <textarea
                value={form.description ?? ''}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Describe the property..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </Section>

          <Section title="Owner Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Owner Name *</Label>
                <input
                  required
                  value={form.owner_name}
                  onChange={(e) => set('owner_name', e.target.value)}
                  placeholder="Owner full name"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Owner Phone *</Label>
                <input
                  required
                  value={form.owner_phone}
                  onChange={(e) => set('owner_phone', e.target.value)}
                  placeholder="+355 69 XXX XXXX"
                  className={inputClass}
                />
              </div>
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">
              Owner phone is confidential — only you and admins can see it.
            </p>
          </Section>

          <Section title="Images">
            <Label>Image URLs (one per line)</Label>
            <textarea
              value={imageUrls}
              onChange={(e) => setImageUrls(e.target.value)}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              rows={3}
              className={`${inputClass} resize-none font-mono text-xs`}
            />
            <p className="text-xs text-slate-400 mt-1">Leave empty to use a default placeholder image.</p>
          </Section>

          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-emerald-600 text-sm font-medium">Property listed successfully!</p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium py-2.5 px-5 rounded-xl transition-all text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  List Property
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-100">{title}</h3>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-slate-600 mb-1.5">{children}</label>
  );
}

const inputClass =
  'w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all';

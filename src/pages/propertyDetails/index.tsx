import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { MOCK_PROPERTIES } from "../../hooks/useProperties";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = MOCK_PROPERTIES.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Property not found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* HERO */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <img
          src={
            property.images?.[0] ||
            "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
          }
          className="w-full h-[320px] object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-semibold">{property.title}</h1>

          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            {property.address}, {property.city}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <Stat
              icon={<BedDouble className="w-4 h-4" />}
              label="Beds"
              value={property.bedrooms}
            />
            <Stat
              icon={<Bath className="w-4 h-4" />}
              label="Baths"
              value={property.bathrooms}
            />
            <Stat
              icon={<Maximize2 className="w-4 h-4" />}
              label="Area"
              value={`${property.interiorArea} m²`}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-2xl font-bold">
              €{property.price?.toLocaleString()}
            </p>

            <span className="text-xs bg-slate-900 text-white px-3 py-1 rounded-lg">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <Section title="Description">
        <p className="text-sm text-slate-600">
          {property.description || "No description provided."}
        </p>
      </Section>

      {/* PROPERTY INFORMATION */}
      <Section title="Property Information">
        <Grid>
          <Item label="Main Type" value={property.mainType} />
          <Item label="Status" value={property.status} />
          <Item label="Availability" value={property.availability} />
          <Item label="Furnished" value={property.furnished} />
          <Item label="Property Type" value={property.propertyType} />
          <Item label="Elevator" value={property.elevator} />
          <Item label="Parking" value={property.parking} />
          <Item label="Exclusive" value={property.exclusive ? "Yes" : "No"} />
          <Item
            label="Publish to Portal"
            value={property.publishToPortal ? "Yes" : "No"}
          />
          <Item label="Portals" value={property.portalsToPublish?.join(", ")} />
          <Item label="Orientation" value={property.orientation} />
          <Item label="Comments" value={property.comments} />
        </Grid>
      </Section>

      {/* LOCATION */}
      <Section title="Location">
        <Grid>
          <Item label="Country" value={property.country} />
          <Item label="City" value={property.city} />
          <Item label="Address" value={property.address} />
          <Item label="Latitude" value={property.latitude} />
          <Item label="Longitude" value={property.longitude} />
          <Item label="Division" value={property.division} />
          <Item label="Zone" value={property.zone} />
          <Item label="Floor" value={property.floor} />
          <Item
            label="Geo Reference"
            value={property.publishGeoreference ? "Yes" : "No"}
          />
        </Grid>
      </Section>

      {/* PRICE */}
      <Section title="Property Price">
        <Grid>
          <Item label="Business Type" value={property.businessType} />
          <Item label="Price" value={`€${property.price}`} />
          <Item label="Price / m²" value={property.priceForM2} />
          <Item
            label="Price on Request"
            value={property.priceUponRequest ? "Yes" : "No"}
          />
        </Grid>
      </Section>

      {/* OWNER */}
      <Section title="Property Owner">
        <Grid>
          <Item label="Owner" value={property.owner} />
          <Item label="Owner Typology" value={property.ownersTypology} />
          <Item label="Last Modified By" value={property.lastModifiedBy} />
        </Grid>
      </Section>

      {/* OTHER */}
      <Section title="Other Information">
        <Grid>
          <Item label="Documentation" value={property.documentation} />
          <Item label="Communal Charge" value={property.communalCharger} />
          <Item label="Year Construction" value={property.yearOfConstruction} />
          <Item label="Year Renovation" value={property.yearOfRenovation} />
        </Grid>
      </Section>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {children}
    </div>
  );
}

function Item({ label, value }: any) {
  return (
    <>
      <p className="text-slate-500">{label}</p>
      <p className="font-medium text-slate-900">{value ?? "-"}</p>
    </>
  );
}

function Stat({ icon, label, value }: any) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <div className="flex items-center gap-2 text-slate-600 text-sm">
        {icon}
        {label}
      </div>
      <p className="text-lg font-semibold">{value ?? "-"}</p>
    </div>
  );
}

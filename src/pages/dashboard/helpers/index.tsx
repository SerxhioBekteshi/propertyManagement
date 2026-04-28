export const getPhoneWithPrefix = (phone?: string, nationality?: string) => {
  if (!phone) return null;

  const cleanedPhone = phone.trim();

  if (cleanedPhone.startsWith("+")) return cleanedPhone;

  if (cleanedPhone.startsWith("355") || cleanedPhone.startsWith("30")) {
    return `+${cleanedPhone}`;
  }

  const prefixMap: Record<string, string> = {
    AL: "+355",
    GR: "+30",
  };

  const key = nationality?.toUpperCase();
  const prefix = key ? prefixMap[key] : undefined;

  if (!prefix) return cleanedPhone;

  return `${prefix} ${cleanedPhone}`;
};

export const FURNISHED_ICONS: Record<string, string> = {
  no: "❌",
  furnished: "🛋️",
  semi_furnished: "🪑",
};

export const ORIENTATION_ICONS: Record<string, string> = {
  north: "⬆️",
  south: "⬇️",
  east: "➡️",
  west: "⬅️",
  north_east: "↗️",
  north_west: "↖️",
  south_east: "↘️",
  south_west: "↙️",
};

export const parseList = (val?: string) =>
  val
    ? val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export const formatDate = (val?: string) => {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

import { withDefault } from "../property";

export const PAYMENT_TYPE_OPTIONS = withDefault([
  { value: "Bank Financing", label: "Bank Financing" },
  { value: "Personal Financing", label: "Personal Financing" },
]);

export const SALES_STAGE_OPTIONS = withDefault([
  { value: "Prospecting", label: "Prospecting" },
  { value: "Qualification", label: "Qualification" },
  { value: "Property Proposal", label: "Property Proposal" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Klient me kapar", label: "Klient me kapar" },
  { value: "Documentation Preparation", label: "Documentation Preparation" },
  { value: "Closed Won", label: "Closed Won" },
  { value: "Closed Lost", label: "Closed Lost" },
]);

export const RENTAL_TIME_OPTIONS = withDefault([
  { value: "Less Than 1 year", label: "Less Than 1 year" },
  { value: "1 year", label: "1 Year" },
  { value: "2 years", label: "2 Years" },
  { value: "More", label: "More" },
]);

export const LEAD_SOURCE_OPTIONS = withDefault([
  { value: "Google", label: "Google" },
  { value: "Instagram", label: "Instagram" },
  { value: "Linkedn", label: "Linkedn" },
  { value: "Facebook", label: "Facebook" },
  { value: "Tik-Tok", label: "Google" },
  { value: "Merr-Jep", label: "Merr-Jep" },
  { value: "Celesi", label: "Celesi" },
  { value: "Broker", label: "Broker" },
  { value: "Co-Broker", label: "Co-Broker" },
  { value: "Lucky Day", label: "Lucky Day" },
  { value: "Brochure", label: "Brochure" },
  { value: "Baner", label: "Baner" },
  { value: "Sign/Sticker", label: "Sign/Sticker" },
  { value: "Sales Point", label: "Sales Point" },
  { value: "Flvers", label: "Flvers" },
  { value: "Existing Customer", label: "Existing Customer" },
  { value: "Direct Mail", label: "Direct Mail" },
  { value: "Phone Call", label: "Phone Call" },
  { value: "Website", label: "Website" },
  { value: "njoftime.al", label: "njoftime.al" },
  { value: "duashpi.al", label: "duashpi.al" },
  { value: "njoftime.com", label: "njoftime.com" },
  { value: "duaprone", label: "duaprone" },
  { value: "HomeZone", label: "HomeZone" },
  { value: "Celesi.al", label: "Celesi.al" },
  { value: "Other", label: "Other" },
]);

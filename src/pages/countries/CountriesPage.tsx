import { CountryFlag } from "../../components/flags/CountryFlag";
import { BaseTable, ColumnConfig } from "../../components/table";

export interface CountriesResponseDTO {
  code: string;
  name: string;
  flag: string; // emoji or icon key
}

const columns: ColumnConfig[] = [
  {
    key: "flag", // or anything unique
    header: "Flag",
    render: (_, row) => <CountryFlag code={row.code} />,
  },
  { key: "code", header: "Code" },
  { key: "name", header: "Country" },
];
export const COUNTRIES: CountriesResponseDTO[] = [
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  // ...add more
];

const CountriesPage = () => {
  return (
    <>
      <BaseTable<CountriesResponseDTO>
        staticData={COUNTRIES}
        columns={columns}
      />
    </>
  );
};

export default CountriesPage;

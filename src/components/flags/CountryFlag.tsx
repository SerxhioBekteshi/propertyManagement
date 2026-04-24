import { FLAGS } from ".";

export const CountryFlag = ({ code }: { code: string }) => {
  return FLAGS[code] ?? <span className="text-slate-300 text-xs">—</span>;
};

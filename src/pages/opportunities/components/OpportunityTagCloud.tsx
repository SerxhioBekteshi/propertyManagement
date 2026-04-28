export interface OpportunityTagCloudProps {
  values: string[];
  color: string;
}

const OpportunityTagCloud = ({ values, color }: OpportunityTagCloudProps) => {
  if (!values.length)
    return (
      <span className="text-xs text-slate-400 italic font-medium">
        Not specified
      </span>
    );

  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <span
          key={v}
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${color}`}
        >
          {v.replace(/_/g, " ")}
        </span>
      ))}
    </div>
  );
};

export default OpportunityTagCloud;

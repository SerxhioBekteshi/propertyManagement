const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block text-xs font-medium text-slate-600 mb-1.5">
      {children}
    </label>
  );
};

export default Label;

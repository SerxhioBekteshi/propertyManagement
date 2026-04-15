const Label = ({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-medium text-slate-600 mb-1.5 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;

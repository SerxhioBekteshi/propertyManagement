const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-100">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Section;

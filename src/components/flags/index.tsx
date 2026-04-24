export const FLAGS: Record<string, React.ReactNode> = {
  AL: (
    <svg
      viewBox="0 0 40 28"
      width="32"
      height="22"
      className="rounded-sm border border-slate-100"
    >
      <rect width="40" height="28" fill="#E41E20" />
      {/* Albanian eagle - simplified double-headed silhouette */}
      <path
        d="M20 5 L17 9 L13 8 L15 11 L11 13 L15 13 L14 17 L17 15 L17 19 L20 17 L23 19 L23 15 L26 17 L25 13 L29 13 L25 11 L27 8 L23 9 Z"
        fill="#000"
      />
    </svg>
  ),
  GR: (
    <svg
      viewBox="0 0 40 28"
      width="32"
      height="22"
      className="rounded-sm border border-slate-100"
    >
      {/* 9 stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
        <rect
          key={index}
          x="0"
          y={i * (28 / 9)}
          width="40"
          height={28 / 9}
          fill={i % 2 === 0 ? "#0D5EAF" : "#fff"}
        />
      ))}
      {/* Canton */}
      <rect x="0" y="0" width="16" height="15.6" fill="#0D5EAF" />
      {/* Cross */}
      <rect x="6.5" y="2" width="3" height="11.6" fill="#fff" />
      <rect x="2" y="5.8" width="12" height="3" fill="#fff" />
    </svg>
  ),
};

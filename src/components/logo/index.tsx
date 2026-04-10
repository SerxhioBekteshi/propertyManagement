import React from "react";
import { RouterLink } from "../../routes/components";

type LogoProps = {
  disabledLink?: boolean;
  className?: string;
};

const LOGO_URL =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop";

const Logo: React.FC<LogoProps> = ({ disabledLink, className }) => {
  const logo = (
    <img
      src={LOGO_URL}
      alt="Real Estate Logo"
      className={`w-24 cursor-pointer object-cover ${className || ""}`}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <RouterLink to="/" className="contents">
      {logo}
    </RouterLink>
  );
};

export default Logo;

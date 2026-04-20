import React from "react";
import { RouterLink } from "../../routes/components";

type LogoProps = {
  disabledLink?: boolean;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ disabledLink, className }) => {
  const logo = (
    <img
      src={"images/logo.png"}
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

import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ to, ...other }, ref) => <Link ref={ref} to={to} {...other} />,
);

export default RouterLink;

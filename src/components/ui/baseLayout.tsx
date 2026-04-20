import { ReactNode } from "react";
import Navbar from "../navbar";

type BaseLayoutProps = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-screen mx-auto px-2 sm:px-3 ">{children}</main>
    </div>
  );
}

import { ReactNode } from "react";
import Navbar from "../navbar";

type BaseLayoutProps = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-2 sm:px-3 lg:px-4">
        {children}
      </main>
    </div>
  );
}

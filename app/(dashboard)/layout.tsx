import Header from "@/components/Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>;
    </>
  );
}

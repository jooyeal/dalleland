import React from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import SideMenu from "@/components/admin/SideMenu";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-4rem)] flex">
        {router.pathname.includes("admin") ? <SideMenu /> : null}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

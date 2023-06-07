import React, { useState } from "react";
import SideMenu from "./SideMenu";
import Header from "../common/layout/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div>
      <Header />
      <div className="flex">
        <SideMenu opened={opened} onToggle={() => setOpened((prev) => !prev)} />
        <div
          className={`p-4 w-screen ${
            opened
              ? "sm:pl-admin-layout-sidemenu-opened"
              : "sm:pl-admin-layout-sidemenu-closed"
          } transition-all`}
        >
          {children}
        </div>
      </div>{" "}
    </div>
  );
};

export default Layout;

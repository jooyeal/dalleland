import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-4rem)]">{children}</div>
    </div>
  );
};

export default Layout;

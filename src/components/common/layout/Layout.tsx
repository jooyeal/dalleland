import React from "react";
import Header from "./Header";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

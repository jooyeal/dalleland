import React from "react";

type Props = {
  children: React.ReactNode;
};

const AccordionBody: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
};

export default AccordionBody;

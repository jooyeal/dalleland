import { Button, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  buttonTitle?: string;
  onClick?: () => void;
};

/** Common head section component usingin admin pages */
const HeadSection = ({ title, buttonTitle, onClick }: Props) => {
  return (
    <div>
      <div className="flex justify-between w-full mb-10">
        <Heading size="lg">{title}</Heading>
        {buttonTitle ? (
          <Button colorScheme="teal" size="sm" onClick={onClick}>
            {buttonTitle}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default HeadSection;

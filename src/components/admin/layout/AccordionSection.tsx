import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  content: React.ReactNode;
};

const AccordionSection: React.FC<Props> = ({ title, content }) => {
  return (
    <AccordionItem>
      <h2 className="bg-teal-600">
        <AccordionButton>
          <Box
            as="span"
            flex="1"
            textAlign="left"
            color="white"
            fontWeight="semibold"
          >
            {title}
          </Box>
          <AccordionIcon color="white" />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{content}</AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionSection;

import AccordionBody from "@/components/admin/layout/AccordionBody";
import AccordionSection from "@/components/admin/layout/AccordionSection";
import HeadSection from "@/components/admin/layout/HeadSection";
import { trpc } from "@/utils/trpc";
import {
  Accordion,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

/** User Detail page */
const UserDetail: NextPage = () => {
  const { id } = useParms();
  /** TRPC get category by id */
  const {
    data: userData,
  } = trpc.user.getUser.useQuery(
    {
      id: watch("selectedId"),
    },
    {
      onSuccess: (data) => {
        if (data) {
          setValue("name", data.name);
          setValue("comment", data.comment);
          setValue("parentId", data.parentId);
          setValue("parentName", data.parent?.name ?? null);
          setValue("isPromotion", data.isPromotion);
        }
      },
    }
  );

  return (
    <div>
      <HeadSection title="User Detail" />
      <div className="flex flex-col gap-2">
        <Heading size='sm'>User Number</Heading>
        <div>
          {/* <Accordion allowMultiple>
            <AccordionSection
              title="Name"
              content={
                <AccordionBody>
                  <Input
                    placeholder="Please input User name"
                  />
                </AccordionBody>
              }
            />
          </Accordion> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

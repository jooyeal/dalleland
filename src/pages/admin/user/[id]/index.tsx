import AccordionBody from "@/components/admin/layout/AccordionBody";
import AccordionSection from "@/components/admin/layout/AccordionSection";
import HeadSection from "@/components/admin/layout/HeadSection";
import { formatDate } from "@/utils/commonFunc";
import { trpc } from "@/utils/trpc";
import {
  Accordion,
  CheckboxIcon,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCopy, AiOutlineCopyright, AiOutlineCopyrightCircle, AiTwotoneCopy } from "react-icons/ai";

/** User Detail page */
const UserDetail: NextPage = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  /** TRPC get User Detail by id */
  const {
    data: userData,
  } = trpc.user.getUser.useQuery(
    {
      id: userId,
    }
  );
  /**data copy
   * @param text
   */
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      alert('faild to coppy');
    }
  };

  return (
    <div>
      <HeadSection title="User Detail" />
      <div className="flex flex-col gap-2">
        <Heading size='sm' className="border-l-4 border-teal-600 text-lg font-semibold pl-2">User Number</Heading>
        <Text fontSize='md'>{userId}</Text>
        <Heading size='sm' className="border-l-4 border-teal-600 text-lg font-semibold pl-2">User Info</Heading>
        <div>
          <Accordion allowMultiple>
            <AccordionSection
              title="General"
              content={
                <AccordionBody>
                  <Grid
                    templateColumns='repeat(3 , 1fr)'
                    gap={3}
                  >
                    <GridItem colSpan={1} mb='8px'>
                      <Text mb='8px'>Name</Text>
                      <InputGroup >
                        <Input
                          value={userData?.name}
                          readOnly
                        />
                        <InputRightAddon backgroundColor="transparent"><AiTwotoneCopy onClick={() => handleCopyClipBoard(userData?.name || "")} /></InputRightAddon>
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text mb='8px'>Birth</Text>
                      <InputGroup >
                        <Input
                          value={userData?.birth ? formatDate(userData.birth) : ""}
                          readOnly
                        />
                        <InputRightAddon backgroundColor="transparent">
                          <AiTwotoneCopy onClick={() => handleCopyClipBoard(userData?.birth ? formatDate(userData.birth) : "")} />
                        </InputRightAddon>
                      </InputGroup>
                    </GridItem>
                    <GridItem colStart={1} colSpan={1}>
                      <Text mb='8px'>Address</Text>
                      <InputGroup >
                        <Input
                          value={userData?.address || ""}
                          readOnly
                        />
                        <InputRightAddon backgroundColor="transparent">
                          <AiTwotoneCopy onClick={() => handleCopyClipBoard(userData?.address || "")} />
                        </InputRightAddon>
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text mb='8px'>Email</Text>
                      <InputGroup >
                        <Input
                          value={userData?.email}
                          readOnly
                        />
                        <InputRightAddon backgroundColor="transparent">
                          <AiTwotoneCopy onClick={() => handleCopyClipBoard(userData?.email || "")} />
                        </InputRightAddon>
                      </InputGroup>
                    </GridItem>
                    <GridItem colStart={1} colSpan={1}>
                      <Text mb='8px'>Phone Number</Text>
                      <InputGroup >
                        <Input
                          value={userData?.phoneNumber || ""}
                          readOnly
                        />
                        <InputRightAddon backgroundColor="transparent">
                          <AiTwotoneCopy onClick={() => handleCopyClipBoard(userData?.phoneNumber || "")} />
                        </InputRightAddon>
                      </InputGroup>
                    </GridItem>
                  </Grid>
                </AccordionBody>
              }
            />
          </Accordion>

        </div>
      </div>
    </div >
  );
};

export default UserDetail;

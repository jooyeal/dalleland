import CreateCategoryModal from "@/components/admin/modal/CreateCategoryModal";
import useCustomToast from "@/hooks/useCustomToast";
import { TInputCreateCategory } from "@/server/scheme/categoryScheme";
import { trpc } from "@/utils/trpc";
import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

/** Categories Page */
const Category: NextPage = () => {
  /** Toast message */
  const toast = useCustomToast();
  /** Modal control */
  const { onOpen, onClose, isOpen } = useDisclosure();
  /** TRPC create category */
  const { mutate } = trpc.category.createCategory.useMutation({
    /** The callback function when category is created successfully */
    onSuccess: () => {
      toast({
        title: "New category is created",
      });
    },
    /** The callback function when category creating is failed */
    onError: () => {
      toast({
        status: "error",
        title: "Failed",
      });
    },
  });
  return (
    <div>
      <div className="flex justify-between w-full">
        <Heading size="lg">Categories</Heading>
        <Button colorScheme="teal" size="sm" onClick={onOpen}>
          Create
        </Button>
      </div>
      <CreateCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        onClickConfirm={(data: TInputCreateCategory, { onSuccess }) =>
          mutate(data, { onSuccess })
        }
      />
    </div>
  );
};

export default Category;

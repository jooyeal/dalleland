import CreateCategoryModal from "@/components/admin/modal/CreateCategoryModal";
import SelectCategoryModal from "@/components/admin/modal/SelectCategoryModal";
import TreeView from "@/components/common/combine/TreeView";
import useCustomToast from "@/hooks/useCustomToast";
import { trpc } from "@/utils/trpc";
import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  Switch,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

/** Categories Page */
const Category: NextPage = () => {
  const [modalType, setModalType] = useState<"create" | "select">();
  /** Toast message */
  const toast = useCustomToast();
  /** Modal control */
  const createModal = useDisclosure();
  const selectModal = useDisclosure();

  /** create category form data control */
  const createFormControl = useForm<{
    name: string;
    parentId: string | null;
    parentDepth: number;
  }>({
    defaultValues: {
      parentId: null,
      parentDepth: 0,
    },
  });
  /** edit category, delete category form data control */
  const mutateFormControl = useForm<{
    name: string;
    comment: string | null;
    selectedId: string | null;
    parentId: string | null;
    parentName: string | null;
    parentDepth: number;
    isPromotion: boolean;
  }>({
    defaultValues: {
      selectedId: null,
      parentId: null,
      parentName: "",
      name: "",
      comment: "",
      parentDepth: 0,
      isPromotion: false,
    },
  });
  /** TRPC get categories */
  const { data: allCategoriesData, refetch } =
    trpc.category.getCategories.useQuery();

  /** TRPC get category by id */
  const { data: categoryData, refetch: refetchCategory } =
    trpc.category.getCategory.useQuery(
      {
        id: mutateFormControl.watch("selectedId"),
      },
      {
        onSuccess: (data) => {
          if (data) {
            mutateFormControl.setValue("name", data.name);
            mutateFormControl.setValue("comment", data.comment);
            mutateFormControl.setValue("parentId", data.parentId);
            mutateFormControl.setValue("parentName", data.parent?.name ?? null);
            mutateFormControl.setValue("isPromotion", data.isPromotion);
          }
        },
      }
    );
  /** TRPC create category */
  const { mutate: createMutate } = trpc.category.createCategory.useMutation({
    /** The callback function when category is created successfully */
    onSuccess: () => {
      toast({
        title: "New category is created successfully",
      });
      createModal.onClose();
      createFormControl.reset();
      refetch();
    },
    /** The callback function when category creating is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
      refetch();
    },
  });

  /** TRPC update category */
  const { mutate: updateMutate } = trpc.category.updateCategory.useMutation({
    /** The callback function when category is updated successfully */
    onSuccess: () => {
      toast({
        title: "category is edited successfully",
      });
      refetch();
      refetchCategory();
    },
    /** The callback function when category updating is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
      refetch();
      refetchCategory();
    },
  });

  const { mutate: deleteMutate } = trpc.category.deleteCategory.useMutation({
    /** The callback function when category is deleted successfully */
    onSuccess: () => {
      toast({
        title: "category is deleted successfully",
      });
      refetch();
      mutateFormControl.reset();
      refetchCategory();
    },
    /** The callback function when category deleting is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
      refetch();
      refetchCategory();
    },
  });

  return (
    <div>
      <div className="flex justify-between w-full mb-10">
        <Heading size="lg">Categories</Heading>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => {
            setModalType("create");
            createModal.onOpen();
          }}
        >
          Create
        </Button>
      </div>
      <div className="block sm:flex">
        <div className="w-96 p-4">
          <TreeView
            nodes={allCategoriesData}
            selectedId={mutateFormControl.watch("selectedId")}
            onSelect={(id, depth) => {
              mutateFormControl.setValue("selectedId", id);
              mutateFormControl.setValue("parentDepth", depth);
            }}
          />
        </div>
        <div className="p-4 w-full flex flex-col gap-2">
          {categoryData ? (
            <>
              <Text className="border-l-2 border-teal-600 text-lg font-semibold pl-2">
                Category
              </Text>
              <div className="flex flex-col w-full justify-center">
                <Text>Category name</Text>
                <Input {...mutateFormControl.register("name")} />
              </div>
              <div className="flex flex-col w-full justify-center">
                <Text>Parent category name</Text>
                <div className="flex items-center gap-2">
                  <Input
                    {...mutateFormControl.register("parentName")}
                    readOnly
                  />
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => {
                      setModalType("select");
                      selectModal.onOpen();
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex flex-col w-full justify-center">
                <div>
                  <Text>Comment</Text>
                  <Textarea
                    {...mutateFormControl.register("comment")}
                    resize="none"
                    focusBorderColor="black"
                    rows={12}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <Text>Promotion</Text>
                <Controller
                  control={mutateFormControl.control}
                  name="isPromotion"
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      isChecked={value}
                      onChange={onChange}
                      ref={ref}
                      colorScheme="teal"
                    />
                  )}
                />

                <ButtonGroup>
                  <Button
                    colorScheme="teal"
                    onClick={mutateFormControl.handleSubmit((data) => {
                      const { selectedId, parentDepth, ...rest } = data;
                      selectedId &&
                        updateMutate({
                          id: selectedId,
                          depth: parentDepth,
                          ...rest,
                        });
                    })}
                  >
                    Save
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={mutateFormControl.handleSubmit((data) =>
                      deleteMutate({ id: data.selectedId })
                    )}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </>
          ) : (
            <Text className="font-semibold">Please select category</Text>
          )}
        </div>
      </div>
      <CreateCategoryModal
        formControl={createFormControl}
        categories={allCategoriesData}
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.onClose();
          createFormControl.reset();
        }}
        onClickConfirm={(data) => createMutate(data)}
        type={modalType}
      />
      <SelectCategoryModal
        formControl={mutateFormControl}
        categories={allCategoriesData}
        isOpen={selectModal.isOpen}
        onClose={() => {
          mutateFormControl.setValue("parentId", categoryData?.parentId ?? "");
          mutateFormControl.setValue(
            "parentName",
            categoryData?.parent?.name ?? ""
          );
          selectModal.onClose();
        }}
        onClickConfirm={({ parentId, parentDepth, name }) => {
          mutateFormControl.setValue("parentId", parentId);
          mutateFormControl.setValue("parentDepth", parentDepth);
          mutateFormControl.setValue("parentName", name);
          selectModal.onClose();
        }}
      />
    </div>
  );
};

export default Category;

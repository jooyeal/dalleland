import HeadSection from "@/components/admin/layout/HeadSection";
import CreateCategoryModal from "@/components/admin/modal/CreateCategoryModal";
import SelectCategoryModal from "@/components/admin/modal/SelectCategoryModal";
import TreeView from "@/components/common/combine/TreeView";
import useCustomToast from "@/hooks/useCustomToast";
import { trpc } from "@/utils/trpc";
import {
  Button,
  ButtonGroup,
  Input,
  Skeleton,
  Switch,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Controller, useForm } from "react-hook-form";

/** Categories Page */
const Category: NextPage = () => {
  /** Toast message */
  const toast = useCustomToast();
  /** Modal control */
  const createModal = useDisclosure();
  const selectModal = useDisclosure();

  /** edit category, delete category form data control */
  const { setValue, watch, reset, handleSubmit, register, control } = useForm<{
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
  const {
    data: allCategoriesData,
    refetch: refetchAllCategories,
    isLoading: allCategoriesDataIsLoading,
  } = trpc.category.getCategories.useQuery();

  /** TRPC get category by id */
  const {
    data: categoryData,
    refetch: refetchCategory,
    isFetching: categoryDataIsFetching,
  } = trpc.category.getCategory.useQuery(
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

  /** TRPC update category */
  const { mutate: updateMutate } = trpc.category.updateCategory.useMutation({
    /** The callback function when category is updated successfully */
    onSuccess: () => {
      toast({
        title: "category is edited successfully",
      });
      refetchAllCategories();
      refetchCategory();
    },
    /** The callback function when category updating is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
      refetchAllCategories();
      refetchCategory();
    },
  });

  const { mutate: deleteMutate } = trpc.category.deleteCategory.useMutation({
    /** The callback function when category is deleted successfully */
    onSuccess: () => {
      toast({
        title: "category is deleted successfully",
      });
      refetchAllCategories();
      reset();
      refetchCategory();
    },
    /** The callback function when category deleting is failed */
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
      refetchAllCategories();
      refetchCategory();
    },
  });

  return (
    <div>
      <HeadSection
        title="Categories"
        buttonTitle="Create"
        onClick={() => {
          createModal.onOpen();
        }}
      />
      <div className="block sm:flex">
        <div className="sm:w-96 p-4">
          <Skeleton isLoaded={!allCategoriesDataIsLoading}>
            <TreeView
              nodes={allCategoriesData}
              selectedId={watch("selectedId")}
              onSelect={(id, depth) => {
                setValue("selectedId", id);
                setValue("parentDepth", depth);
              }}
            />
          </Skeleton>
        </div>
        <div className="p-4 w-full">
          {watch("selectedId") ? (
            <Skeleton
              isLoaded={!categoryDataIsFetching}
              className="flex flex-col gap-2"
            >
              <Text className="border-l-4 border-teal-600 text-lg font-semibold pl-2">
                Category
              </Text>
              <div className="flex flex-col w-full justify-center">
                <Text>Name</Text>
                <Input {...register("name")} />
              </div>
              <div className="flex flex-col w-full justify-center">
                <Text>Parent</Text>
                <div className="flex items-center gap-2">
                  <Input {...register("parentName")} readOnly />
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => {
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
                    {...register("comment")}
                    resize="none"
                    focusBorderColor="black"
                    rows={12}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <Text>Promotion</Text>
                <Controller
                  control={control}
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
                    onClick={handleSubmit((data) => {
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
                    onClick={handleSubmit((data) =>
                      deleteMutate({ id: data.selectedId })
                    )}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </Skeleton>
          ) : (
            <Text className="font-semibold">Please select category</Text>
          )}
        </div>
      </div>
      <CreateCategoryModal
        categories={allCategoriesData}
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.onClose();
        }}
        onClickConfirm={() => refetchAllCategories()}
      />
      <SelectCategoryModal
        isOpen={selectModal.isOpen}
        onClose={() => {
          setValue("parentId", categoryData?.parentId ?? null);
          setValue("parentName", categoryData?.parent?.name ?? null);
          selectModal.onClose();
        }}
        onClickConfirm={({ id, depth, name }) => {
          setValue("parentId", id);
          setValue("parentDepth", depth);
          setValue("parentName", name);
          selectModal.onClose();
        }}
      />
    </div>
  );
};

export default Category;

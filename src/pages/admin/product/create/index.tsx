import AccordionBody from "@/components/admin/layout/AccordionBody";
import AccordionSection from "@/components/admin/layout/AccordionSection";
import HeadSection from "@/components/admin/layout/HeadSection";
import InputSizeModal from "@/components/admin/modal/InputSizeModal";
import SelectCategoryModal from "@/components/admin/modal/SelectCategoryModal";
import useCustomToast from "@/hooks/useCustomToast";
import { TInputCreateProduct } from "@/server/scheme/productScheme";
import { trpc } from "@/utils/trpc";
import {
  Accordion,
  Button,
  Divider,
  Input,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";

/** Product create page */
const ProductCreate: NextPage = () => {
  const selectCategoryModalControl = useDisclosure();
  const inputSizeModalControl = useDisclosure();
  const toast = useCustomToast();
  const router = useRouter();

  /** TRPC Create product  */
  const { mutate } = trpc.product.createProduct.useMutation({
    onSuccess: () => {
      toast({
        title: "New product is created successfully",
      });
      router.push("/admin/product");
    },
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
    },
  });

  /** Create product form  */
  const { register, handleSubmit, setValue, watch, control } =
    useForm<TInputCreateProduct>({
      defaultValues: {
        images: [],
        size: [],
        categories: [],
        isDiscount: false,
      },
    });

  /** The evnet when click confirm button on SelectCategoryModal */
  const onSelect = ({
    id,
    name,
  }: {
    name: string;
    id: string | null;
    depth: number;
  }) => {
    if (id) {
      if (watch("categories").find((category) => category.id === id)) {
        /** When selected same category already show error message */
        toast({
          status: "error",
          title: "This category is already selected",
        });
      } else {
        setValue("categories", [...watch("categories"), { id, name }]);
        selectCategoryModalControl.onClose();
      }
    } else {
      /** When id is null show error message */
      toast({
        status: "error",
        title: "Please select category",
      });
    }
  };

  /** The evnet when click confirm button on InputSizeModal */
  const onInputSize = ({ name, stock }: { name: string; stock: number }) => {
    if (watch("size").find((size) => size.name === name)) {
      /** When tried add same name show error message */
      toast({
        status: "error",
        title: "This name is already added",
      });
    } else {
      setValue("size", [...watch("size"), { name, stock: Number(stock) }]);
      inputSizeModalControl.onClose();
    }
  };

  return (
    <div>
      <HeadSection title="Create new product" />
      <div className="flex flex-col gap-2">
        <div>
          <Accordion allowMultiple>
            <AccordionSection title="Images" content={null} />
            <AccordionSection
              title="Name"
              content={
                <AccordionBody>
                  <Input
                    {...register("name")}
                    placeholder="Please input product name"
                  />
                </AccordionBody>
              }
            />
            <AccordionSection
              title="Category"
              content={
                <AccordionBody>
                  <div className="flex justify-end">
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={selectCategoryModalControl.onOpen}
                    >
                      Add
                    </Button>
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-2">
                    {watch("categories").length > 0 ? (
                      watch("categories").map((category) => (
                        <div key={category.id} className="flex justify-between">
                          <Text>{category.name}</Text>
                          <Button
                            colorScheme="red"
                            size="xs"
                            onClick={() =>
                              setValue(
                                "categories",
                                watch("categories").filter(
                                  (c) => c.id !== category.id
                                )
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      ))
                    ) : (
                      <Text>Please add category</Text>
                    )}
                  </div>
                </AccordionBody>
              }
            />
            <AccordionSection
              title="Stock"
              content={
                <AccordionBody>
                  <Input
                    type="number"
                    {...register("stock")}
                    placeholder="Please input product stock"
                  />
                </AccordionBody>
              }
            />
            <AccordionSection
              title="Size"
              content={
                <AccordionBody>
                  <div className="flex justify-end">
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={inputSizeModalControl.onOpen}
                    >
                      Add
                    </Button>
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-2">
                    {watch("size").length > 0 ? (
                      watch("size").map((size) => (
                        <div key={size.name} className="flex justify-between">
                          <Text>{size.name}</Text>
                          <Button
                            colorScheme="red"
                            size="xs"
                            onClick={() =>
                              setValue(
                                "size",
                                watch("size").filter(
                                  (s) => s.name !== size.name
                                )
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      ))
                    ) : (
                      <Text>Please add size</Text>
                    )}
                  </div>
                </AccordionBody>
              }
            />
            <AccordionSection
              title="Price"
              content={
                <Input
                  type="number"
                  {...register("price")}
                  placeholder="Please input product price"
                />
              }
            />
            <AccordionSection
              title="Discount"
              content={
                <div className="flex flex-col gap-2 p-4">
                  <div>
                    <Text>Discount ON/OFF</Text>
                    <Controller
                      control={control}
                      name="isDiscount"
                      render={({ field: { onChange, value, ref } }) => (
                        <Switch
                          ref={ref}
                          isChecked={value}
                          onChange={onChange}
                          colorScheme="teal"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Text>Discount rate</Text>
                    <Input type="number" {...register("discountRate")} />
                  </div>
                </div>
              }
            />
            <AccordionSection title="Additional" content={null} />
          </Accordion>
        </div>
        <div className="flex justify-end">
          <Button
            colorScheme="teal"
            size="sm"
            onClick={handleSubmit((data) => {
              mutate({
                ...data,
                stock: Number(data.stock),
                price: Number(data.price),
                discountRate: Number(data.discountRate),
              });
            })}
          >
            Create
          </Button>
        </div>
      </div>
      {selectCategoryModalControl.isOpen ? (
        <SelectCategoryModal
          isOpen={selectCategoryModalControl.isOpen}
          onClose={selectCategoryModalControl.onClose}
          onClickConfirm={onSelect}
        />
      ) : null}
      {inputSizeModalControl.isOpen ? (
        <InputSizeModal
          isOpen={inputSizeModalControl.isOpen}
          onClose={inputSizeModalControl.onClose}
          onClickConfirm={onInputSize}
        />
      ) : null}
    </div>
  );
};

export default ProductCreate;

import CustomDropzone from "@/components/admin/combine/CustomDropzone";
import CustomTable from "@/components/admin/combine/CustomTable";
import AccordionBody from "@/components/admin/layout/AccordionBody";
import AccordionSection from "@/components/admin/layout/AccordionSection";
import HeadSection from "@/components/admin/layout/HeadSection";
import InputAdditionalInfoModal from "@/components/admin/modal/InputAdditionalInfoModal";
import InputSizeModal from "@/components/admin/modal/InputSizeModal";
import SelectCategoryModal from "@/components/admin/modal/SelectCategoryModal";
import { LoadingContext } from "@/contexts/LoadingProvider";
import useCustomToast from "@/hooks/useCustomToast";
import { TInputCreateProduct } from "@/server/scheme/productScheme";
import { trpc } from "@/utils/trpc";
import {
  Accordion,
  Button,
  Checkbox,
  Divider,
  Input,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";

/** Product create page */
const ProductCreate: NextPage = () => {
  const loadingCtx = useContext(LoadingContext);
  const selectCategoryModalControl = useDisclosure();
  const inputSizeModalControl = useDisclosure();
  const inputAdditionalModalControl = useDisclosure();
  const toast = useCustomToast();
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; isThumbnail?: boolean }[]
  >([]);

  /** TRPC Create product  */
  const { mutate } = trpc.product.createProduct.useMutation({
    onSuccess: () => {
      toast({
        title: "New product is created successfully",
      });
      loadingCtx?.setLoading(false);
      router.push("/admin/product");
    },
    onError: (error) => {
      loadingCtx?.setLoading(false);
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
        additionalInfos: [],
        isDiscount: false,
      },
    });

  // const { data } = await axios.post(
  //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
  //   formData
  // );

  /** The event when file is dropped selected from file select dialog  */
  const onFileAccepted: <T extends File>(files: T[]) => void = (files) => {
    setSelectedFiles((prev) => [...prev, ...files.map((file) => ({ file }))]);
  };

  /** The event when click confirm button on SelectCategoryModal */
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

  /** The event when click confirm button on InputSizeModal */
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

  /** The event when click confirm button on InputAdditonalInfoModal */
  const onInputAdditionalInfo = ({
    name,
    content,
  }: {
    name: string;
    content: string;
  }) => {
    if (
      watch("additionalInfos").find(
        (additionalInfo) => additionalInfo.name === name
      )
    ) {
      /** When tried add same name show error message */
      toast({
        status: "error",
        title: "This name is already added",
      });
    } else {
      setValue("additionalInfos", [
        ...watch("additionalInfos"),
        { name, content },
      ]);
      inputAdditionalModalControl.onClose();
    }
  };

  /** The event when click save */
  const onSubmit = handleSubmit((data) => {
    /** upload images to cloudinary */
    loadingCtx?.setLoading(true);
    const res = Promise.all(
      selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file.file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ""
        );
        formData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_NAME || ""
        );
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          formData
        );

        return { data, isThumbnail: file.isThumbnail };
      })
    );

    res
      .then((infos: { data: { url: string }; isThumbnail?: boolean }[]) => {
        const images = infos.map((info) => ({
          uri: info.data.url,
          isThumbnail: info.isThumbnail ? true : false,
        }));

        mutate({
          ...data,
          stock: Number(data.stock),
          price: Number(data.price),
          discountRate: Number(data.discountRate),
          images,
        });
      })
      .catch(() => {
        loadingCtx?.setLoading(false);
        toast({
          status: "error",
          title: "Error is occured while upload images",
        });
      });
  });

  return (
    <div>
      <HeadSection title="Create new product" />
      <div className="flex flex-col gap-2">
        <div>
          <Accordion allowMultiple>
            <AccordionSection
              title="Images"
              content={
                <div>
                  <CustomDropzone onFileAccepted={onFileAccepted} />
                  <div className="flex flex-wrap gap-2 justify-center items-center h-60 overflow-auto mt-10">
                    {selectedFiles.map((file, i) => (
                      <div key={i} className="relative w-40 h-40 border">
                        <Checkbox
                          className="absolute top-2 left-2 z-40"
                          colorScheme="teal"
                          isChecked={file.isThumbnail}
                          onChange={() => {
                            setSelectedFiles((prev) =>
                              prev.map((f, j) => {
                                if (i === j) {
                                  return { ...f, isThumbnail: true };
                                }
                                return { ...f, isThumbnail: false };
                              })
                            );
                          }}
                        />
                        <Image
                          className="object-contain"
                          src={URL.createObjectURL(file.file)}
                          alt=""
                          fill
                        />
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
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
                  <div className="flex flex-col gap-2">
                    <CustomTable
                      data={watch("categories")}
                      columns={["name"]}
                      tableCaption="Please add category"
                      controlColumn={(category) => (
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
                      )}
                    />
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
                    <CustomTable
                      data={watch("size")}
                      columns={["name", "stock"]}
                      tableCaption="Please add size"
                      controlColumn={(size) => (
                        <Button
                          colorScheme="red"
                          size="xs"
                          onClick={() =>
                            setValue(
                              "size",
                              watch("size").filter((s) => s.name !== size.name)
                            )
                          }
                        >
                          Delete
                        </Button>
                      )}
                    />
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
            <AccordionSection
              title="Additional"
              content={
                <AccordionBody>
                  <div className="flex justify-end">
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={inputAdditionalModalControl.onOpen}
                    >
                      Add
                    </Button>
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-2">
                    <CustomTable
                      data={watch("additionalInfos")}
                      columns={["name", "content"]}
                      tableCaption="Please add additional information"
                      controlColumn={(info) => (
                        <Button
                          colorScheme="red"
                          size="xs"
                          onClick={() =>
                            setValue(
                              "additionalInfos",
                              watch("additionalInfos").filter(
                                (additionalInfo) =>
                                  additionalInfo.name !== info.name
                              )
                            )
                          }
                        >
                          Delete
                        </Button>
                      )}
                    />
                  </div>
                </AccordionBody>
              }
            />
          </Accordion>
        </div>
        <div className="flex justify-end">
          <Button colorScheme="teal" size="sm" onClick={onSubmit}>
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
      {inputAdditionalModalControl.isOpen ? (
        <InputAdditionalInfoModal
          isOpen={inputAdditionalModalControl.isOpen}
          onClose={inputAdditionalModalControl.onClose}
          onClickConfirm={onInputAdditionalInfo}
        />
      ) : null}
    </div>
  );
};

export default ProductCreate;

import HeadSection from "@/components/admin/layout/HeadSection";
import { trpc } from "@/utils/trpc";
import {
  Button,
  ButtonGroup,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

const Product: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  /** TRPC get products */
  const { data, refetch } = trpc.product.getProductsByPage.useQuery({
    page: router.query.page ? Number(router.query.page) : 0,
    searchTarget: router.query.searchTarget
      ? String(router.query.searchTarget)
      : undefined,
  });

  const { mutate } = trpc.product.deleteProduct.useMutation({
    onSuccess: () => {
      toast({
        status: "success",
        title: "Product is deleted successfully",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        status: "error",
        title: error.message,
      });
    },
  });

  const { register, handleSubmit } = useForm<{ searchTarget: string }>();

  /** product table data */
  const productsData = useMemo(
    () =>
      data?.map((product) => ({
        ...product,
        thumbnail: product.images.length !== 0 ? product.images[0].uri : "",
      })),
    [data]
  );

  /** The evnet when excute search */
  const onSubmit = handleSubmit((data) => {
    router.push({
      pathname: "/admin/product",
      query: {
        searchTarget: data.searchTarget,
      },
    });
  });

  return (
    <div>
      <HeadSection
        title="Products"
        buttonTitle="Create"
        onClick={() => router.push("/admin/product/create")}
      />
      <div>
        <form onSubmit={onSubmit}>
          <div className="flex gap-2 mb-6">
            <Input
              {...register("searchTarget")}
              size="sm"
              placeholder="Please input search product name"
            />
            <Button type="submit" colorScheme="teal" size="sm">
              Search
            </Button>
          </div>
        </form>
      </div>
      <TableContainer>
        <Table>
          <TableCaption>
            {!productsData || productsData?.length === 0
              ? "Please add product"
              : null}
          </TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>name</Th>
              <Th>number</Th>
              <Th>category</Th>
              <Th> - </Th>
            </Tr>
          </Thead>
          <Tbody>
            {productsData?.map((product) => (
              <Tr
                className="cursor-pointer"
                key={product.id}
                onClick={() => router.push(`/admin/product/${product.id}`)}
              >
                <Td>
                  <Image
                    className="object-contain"
                    src={
                      product.thumbnail === ""
                        ? "/no-image.jpg"
                        : product.thumbnail
                    }
                    width={60}
                    height={60}
                    alt=""
                  />
                </Td>
                <Td>
                  <Text>{product.name}</Text>
                </Td>
                <Td>
                  <Text>{product.id}</Text>
                </Td>
                <Td>
                  <Text>
                    {product.categories
                      .map((category) => category.name)
                      .join(" / ")}
                  </Text>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => mutate({ id: product.id })}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Product;

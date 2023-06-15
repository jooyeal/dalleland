import HeadSection from "@/components/admin/layout/HeadSection";
import { badgeColor } from "@/utils/constants";
import { trpc } from "@/utils/trpc";
import {
  Badge,
  Button,
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

const User:NextPage = () =>  {
  const router = useRouter();
  const toast = useToast();

  /** TRPC get products */
  const { data, refetch } = trpc.user.getUsersByPage.useQuery({
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
        title="User"
        buttonTitle="Create"
        onClick={() => router.push("/admin/product/create")}
      />
      <div>
        <form onSubmit={onSubmit}>
          <div className="flex gap-2 mb-6">
            <Input
              {...register("searchTarget")}
              size="sm"
              placeholder="Please input search User name"
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
            {!data || data?.length === 0
              ? "Please add product"
              : null}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>User Number</Th>
              <Th>User Name</Th>
              <Th>User Email</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user) => (
              <Tr
                className="cursor-pointer"
                key={user.id}
                onClick={() => router.push(`/admin/product/${user.id}`)}
              >
                <Td>
                <Text>{user.id}</Text>
                </Td>
                <Td>
                  <Text>{user.name}</Text>
                </Td>
                <Td>
                  <Text>{user.email}</Text>
                </Td>
                <Td>
                <Badge ml='1' fontSize='0.8em' colorScheme={badgeColor[user.grade?.name || ""]}>{user.grade?.name}</Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;

import HeadSection from "@/components/admin/layout/HeadSection";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Product: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <HeadSection
        title="Products"
        buttonTitle="Create"
        onClick={() => router.push("/admin/product/create")}
      />
    </div>
  );
};

export default Product;

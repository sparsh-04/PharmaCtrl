import ProductSpecificationComponent from "index/components/coa/ProductSpecificationComponent";
import AuthLayout from "index/components/common/AuthLayout";
import ProductComplaintFormComponent from "index/components/complaints/product-complaint-form/ProductComplainFormComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface ProductSpecificationPageProps {}

const ProductSpecificationPage: React.FunctionComponent<ProductSpecificationPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Product Specification - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ProductSpecificationComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ProductSpecificationPage;

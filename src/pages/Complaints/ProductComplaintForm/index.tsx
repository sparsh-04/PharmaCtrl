import AuthLayout from "index/components/common/AuthLayout";
import Compliant from "index/components/Quality/Complaint";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface ProductComplainFormPageProps {}

const ProductComplainFormPage: React.FunctionComponent<ProductComplainFormPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Product Complaint Form - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <Compliant/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ProductComplainFormPage;

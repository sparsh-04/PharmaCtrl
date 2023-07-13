import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";
import AuthLayout from "index/components/common/AuthLayout";
import ChecklistComponent from "../../components/checklist/ChecklistComponent";


interface ChecklistPageProps {}

const ChecklistPage: React.FunctionComponent<ChecklistPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Checklist - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ChecklistComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ChecklistPage;

import CAPAComponent from "index/components/capa/CAPAComponent";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface CAPAPageProps {}

const CAPAPage: React.FunctionComponent<CAPAPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>CAPA - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
            <CAPAComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default CAPAPage;

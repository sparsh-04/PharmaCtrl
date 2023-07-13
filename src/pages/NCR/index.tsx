import AuthLayout from "index/components/common/AuthLayout";
import NCRComponent from "index/components/ncr/NCRComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface NCRPageProps {}

const NCRPage: React.FunctionComponent<NCRPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>NCR - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <NCRComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default NCRPage;

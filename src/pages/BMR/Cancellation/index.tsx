import AuthLayout from "index/components/common/AuthLayout";
import BMRcancel from "index/components/bmr/BMRcancel";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface GrnPageProps {}

const GrnPage: React.FunctionComponent<GrnPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Home Page - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <BMRcancel/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default GrnPage;

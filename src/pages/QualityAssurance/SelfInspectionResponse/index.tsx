import AuthLayout from "index/components/common/AuthLayout";
import SelfInspectionResponseComponent from "index/components/quality-aussurance/self-inspection-response/SelfInspectionResponseComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface SelfInspectionResponsePageProps {}

const SelfInspectionResponsePage: React.FunctionComponent<SelfInspectionResponsePageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Self Inspection Response - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <SelfInspectionResponseComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default SelfInspectionResponsePage;

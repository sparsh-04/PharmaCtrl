import AuthLayout from "index/components/common/AuthLayout";
import SelfInspectionComponent from "index/components/quality-aussurance/self-inspection/SelfInspectionComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface SelfInspectionPageProps {}

const SelfInspectionPage: React.FunctionComponent<SelfInspectionPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Self Inspection - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <SelfInspectionComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default SelfInspectionPage;

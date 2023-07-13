import AuthLayout from "index/components/common/AuthLayout";
import SelfInspectionReportComponent from "index/components/quality-aussurance/self-inspection-report/SelfInspectionReportComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface SelfInspectionReportPageProps {}

const SelfInspectionReportPage: React.FunctionComponent<SelfInspectionReportPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Self Inspection Report - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <SelfInspectionReportComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default SelfInspectionReportPage;

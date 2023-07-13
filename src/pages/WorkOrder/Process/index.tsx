import AuthLayout from "index/components/common/AuthLayout";
import WorkOrderProcessComponent from "index/components/work-order/process/ProcessWorkOrderComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface WorkOrderProcessPageProps {}

const WorkOrderProcessPage: React.FunctionComponent<WorkOrderProcessPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Work Order Process- {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <WorkOrderProcessComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default WorkOrderProcessPage;

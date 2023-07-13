import AuthLayout from "index/components/common/AuthLayout";
import SelfInspectionAuditPlanComponent from "index/components/quality-aussurance/audit-plan/AuditPlanComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface SelfInspectionAuditPlanPageProps {}

const SelfInspectionAuditPlanPage: React.FunctionComponent<SelfInspectionAuditPlanPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Self Inspection Audit Plan- {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <SelfInspectionAuditPlanComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default SelfInspectionAuditPlanPage;

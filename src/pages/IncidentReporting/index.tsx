import AuthLayout from "index/components/common/AuthLayout";
import IncidentReportingComponent from "index/components/incident-reporting/IncidentReportingComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface IncidentReportingPageProps {}

const IncidentReportingPage: React.FunctionComponent<
  IncidentReportingPageProps
> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Incident Reporting - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <IncidentReportingComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default IncidentReportingPage;

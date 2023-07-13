import * as React from "react";
import Head from "next/head";
import { getCompany } from "index/services/util/UtilService";
import { useState, useEffect } from "react";
import AuthLayout from "index/components/common/AuthLayout";
import ServiceRequest from "index/components/service-request/ServiceRequest";

export default function Home() {
  const [companyName, setcompanyName] = useState("");
  React.useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>AuditPlan - {companyName || ""}</title>
        <meta name="description" content="annual Plan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
      <AuthLayout>
          <ServiceRequest></ServiceRequest>
      </AuthLayout>
      </React.Fragment>
    </>
  );
}

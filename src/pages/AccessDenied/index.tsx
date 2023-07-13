import AccessDeniedComponent from "index/components/access-denied/AccessDeniedComponent";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface AccessDeniedProps {}

const AccessDenied: React.FunctionComponent<
AccessDeniedProps
> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Access Denied  - {companyName}</title>
        <meta name="description" content="Access Denied" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <AccessDeniedComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default AccessDenied;

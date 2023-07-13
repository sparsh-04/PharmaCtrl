import * as React from "react";
import Head from "next/head";
import UnAuthLayout from "index/components/common/UnAuthLayout";
import LoginComponent from "index/components/auth/LoginComponent";
import { getCompany } from "index/services/util/UtilService";
import { useState, useEffect } from "react";

export default function Home() {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Login - {companyName || ""}</title>
        <meta name="description" content={companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <UnAuthLayout>
          <LoginComponent />
        </UnAuthLayout>
      </React.Fragment>
    </>
  );
}

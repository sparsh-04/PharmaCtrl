import * as React from "react";
import Head from "next/head";
import { getCompany } from "index/services/util/UtilService";
import { useState, useEffect } from "react";
import MaterialDispatch from "index/components/inventorymanagement/MaterialDispatch";
import AuthLayout from "index/components/common/AuthLayout";

export default function Home() {
  const [companyName, setcompanyName] = useState("");
  React.useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Material Dispatch - {companyName || ""}</title>
        <meta name="description" content="Material Dispatch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
      <AuthLayout>
          <MaterialDispatch />
          </AuthLayout>
      </React.Fragment>
    </>
  );
}

import ChangeRequestComponent from "index/components/change-request/ChangeRequestComponent";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface ChangeRequestProps {}

const ChangeRequest: React.FunctionComponent<
ChangeRequestProps
> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Change Request - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ChangeRequestComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ChangeRequest;

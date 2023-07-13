import AuthLayout from "index/components/common/AuthLayout";
import QTMComponent from "index/components/quality-test-methods/QTMComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface QualityTestMethodsPageProps {}

const QualityTestMethodsPage: React.FunctionComponent<QualityTestMethodsPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Quality Test Methods - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
            <QTMComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default QualityTestMethodsPage;

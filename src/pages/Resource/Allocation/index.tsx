import AuthLayout from "index/components/common/AuthLayout";
import ResourceAllocationComponent from "index/components/resource/ResourceAllocationComponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";

interface ResourceAllocationPageProps {}

const ResourceAllocationPage: React.FunctionComponent<ResourceAllocationPageProps> = () => {
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {
    let company = getCompany();
    setcompanyName(company || "");
  }, []);
  return (
    <>
      <Head>
        <title>Resource Allocation - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
            <ResourceAllocationComponent/>
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ResourceAllocationPage;

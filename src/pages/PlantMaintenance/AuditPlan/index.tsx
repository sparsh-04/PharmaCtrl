import * as React from "react";
import Head from "next/head";
import { getCompany } from "index/services/util/UtilService";
import { useState, useEffect } from "react";
import AuthLayout from "index/components/common/AuthLayout";
import AuditPlan from "index/components/plantMaintenance/auditplan/AuditPlan";
import { useRouter } from "next/router";
import WeeklyPlan from "index/components/plantMaintenance/auditplan/WeeklyPlan";

const Home = (pageProps: any) => {
  const [data, setData] = React.useState<any>({});
  const [companyName, setcompanyName] = useState("");

  const router = useRouter();
  React.useEffect(() => {
    let queryParams = router.query;
    setData(queryParams);
    let company = getCompany();
    setcompanyName(company || "");
  }, [router.query]);

  return (
    <>
      <Head>
        <title>AuditPlan - {companyName || ""}</title>
        <meta name="description" content="annual Plan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          {data && data["auditPlanType"] === "weekly" ? (
            <WeeklyPlan type={data && data["auditPlanType"]} />
          ) : (
            <AuditPlan type={data && data["auditPlanType"]} />
          )}
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default Home;

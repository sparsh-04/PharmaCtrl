import AuthLayout from "index/components/common/AuthLayout";
import MaterialMaintenanceMain from "index/components/materialMaintenance/MaterialMaintenance";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface MaterialMaintenanceProps {}

const MaterialMaintenance: React.FC<MaterialMaintenanceProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);

  return (
    <>
      <Head>
        <title>Material Receipts - {companyName}</title>
        <meta name="description" content="Material Receipts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <MaterialMaintenanceMain />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default MaterialMaintenance;

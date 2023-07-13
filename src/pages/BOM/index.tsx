import BOMComponent from "index/components/bom/BOM";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface BOMProps {}

const BOM: React.FC<BOMProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);

  return (
    <>
      <Head>
        <title>BOM - {companyName}</title>
        <meta name="description" content="BOM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <BOMComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default BOM;

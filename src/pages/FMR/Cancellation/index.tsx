import AuthLayout from "index/components/common/AuthLayout";
import FMRCancellationComponent from "index/components/fmr/cancellation/Cancellation";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface FMRCancellationProps {}

const FMRCancellation: React.FC<FMRCancellationProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);

  return (
    <>
      <Head>
        <title>Cancellation - {companyName}</title>
        <meta name="description" content="Cancellation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <FMRCancellationComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default FMRCancellation;

import Head from "next/head";
import * as React from "react";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import ComplaintIRMain from "./ComplaintIRMain";
interface ComplaintIRProps {
}

const ComplaintIR: React.FC<ComplaintIRProps> = () =>   {
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
      let company = getCompany();
      setCompanyName(company);
    }, []);
   
  return (
       <>
    <Head>
    <title>Complaint IR - {companyName}</title>
        <meta name="description" content="Destruction note" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <React.Fragment>
        <AuthLayout>
            <ComplaintIRMain />
        </AuthLayout>
      </React.Fragment>
  </>
    
  )
}

export default ComplaintIR;

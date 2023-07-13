import AuthLayout from "index/components/common/AuthLayout";
import Requisition from "index/components/pmr/requisition/Requisition";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface RequisitionMainProps {
    
}
 
const RequisitionMain: React.FC<RequisitionMainProps> = () => {
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
      let company = getCompany();
      setCompanyName(company);
    }, []);
    return ( 
        <>
      <Head>
        <title>Requisition - {companyName}</title>
        <meta name="description" content="Cancellation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <Requisition />
        </AuthLayout>
      </React.Fragment>
    </>
     );
}
 
export default RequisitionMain;
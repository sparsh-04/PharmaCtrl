import Deviations from "index/components/Deviations/Deviations";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface DeviationsMainProps {
    
}
 
const DeviationsMain: React.FC<DeviationsMainProps> = () => {
    const [companyName, setcompanyName] = React.useState("");
    React.useEffect(() => {
      let company = getCompany();
      setcompanyName(company || "");
    }, []);
    return (  
        <>
      <Head>
        <title>Deviations - {companyName}</title>
        <meta name="description" content={"Description of " + companyName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <Deviations />
        </AuthLayout>
      </React.Fragment>
    </>
    );
}
 
export default DeviationsMain;
import AuthLayout from "index/components/common/AuthLayout";
import FinishedGoodsTransferNote from "index/components/fgtn/FinishedGoodsTransferNote";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface FinishedGoodsTransferNoteMainProps {
    
}
 
const FinishedGoodsTransferNoteMain: React.FC<FinishedGoodsTransferNoteMainProps> = () => {
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
      let company = getCompany();
      setCompanyName(company);
    }, []);
    return ( 
        <React.Fragment>
 <>
      <Head>
        <title>User Allocation - {companyName}</title>
        <meta name="description" content="Destruction note" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <React.Fragment>
        <AuthLayout>
          <FinishedGoodsTransferNote />
        </AuthLayout>
        </React.Fragment>
        </>
        </React.Fragment>
     );
}
 
export default FinishedGoodsTransferNoteMain;
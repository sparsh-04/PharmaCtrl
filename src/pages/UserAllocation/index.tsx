import { getCompany } from "index/services/util/UtilService";
import * as React from "react";
import Head from "next/head";
import AuthLayout from "index/components/common/AuthLayout";
import UserAllocation from "index/components/user-allocation/user-allocation";
interface UserAllocationMainProps {
    
}
 
const UserAllocationMain: React.FC<UserAllocationMainProps> = () => {
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
      let company = getCompany();
      setCompanyName(company);
    }, []);
    return (  
        <>
      <Head>
        <title>User Allocation - {companyName}</title>
        <meta name="description" content="Destruction note" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <React.Fragment>
        <AuthLayout>
          <UserAllocation />
        </AuthLayout>
        </React.Fragment>
        </>
    );
}
 
export default UserAllocationMain;
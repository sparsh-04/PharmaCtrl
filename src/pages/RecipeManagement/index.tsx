import WorkOrderComponent from "index/components/allocate-work-order/WorkOrderComponent";
import AuthLayout from "index/components/common/AuthLayout";
import RecipeManagementComponent from "index/components/recipe-management/RecipeManagementcomponent";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface RecipeManagementProps {}

const RecipeManagement: React.FC<RecipeManagementProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);

  return (
    <>
      <Head>
        <title>Index - {companyName}</title>
        <meta name="description" content="Index" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <RecipeManagementComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default RecipeManagement;

import WorkOrderComponent from "index/components/allocate-work-order/WorkOrderComponent";
import AuthLayout from "index/components/common/AuthLayout";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface WorkOrderProps {}

const WorkOrder: React.FC<WorkOrderProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);

  return (
    <>
      <Head>
        <title>Create Work Order - {companyName}</title>
        <meta name="description" content="Create Work Order" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <WorkOrderComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default WorkOrder;

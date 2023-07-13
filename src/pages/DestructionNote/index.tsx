import AuthLayout from "index/components/common/AuthLayout";
import DestructionNoteMain from "index/components/destructionnote/DestructionNoteMain";
import { getCompany } from "index/services/util/UtilService";
import Head from "next/head";
import * as React from "react";
interface DestructionNoteProps {
}

const DestructionNote: React.FC<DestructionNoteProps> = () => {
  const [companyName, setCompanyName] = React.useState<string>("");

  React.useEffect(() => {
    let company = getCompany();
    setCompanyName(company);
  }, []);
 
  return (
    <>
      <Head>
        <title>Destruction Note - {companyName}</title>
        <meta name="description" content="Destruction note" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <DestructionNoteMain />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default DestructionNote;

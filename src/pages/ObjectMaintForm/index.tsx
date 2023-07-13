import AuthLayout from "index/components/common/AuthLayout";
import ModelingTypesComponent from "index/components/modeling/ModelingTypesComponent";
import { getCompany } from "index/services/util/UtilService";
// import { GetStaticPaths, GetStaticProps } from "next";
// import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";

// export const getServerSideProps: GetServerSideProps<{
//   data: any;
// }> = async ({ query, params }) => {
//   return {
//     props: {
//       data: { query, params },
//     },
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   console.log("--staticprops--", params);
//   return {
//     props: {
//       params,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths<{ type: string }> = async ({}) => {
//   return {
//     paths: [],
//     fallback: false,
//   };
// };

interface ModelingTypePageProps {}

const ModelingTypePage: React.FunctionComponent<ModelingTypePageProps> = (
  // props: any
) => {
  const [data, setData] = React.useState<any>({});
  const [companyName, setcompanyName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // console.log("--staticpropsInUseEffect--", props);
    let queryParams = router.query;
    console.log("--modeling page router --", router)
    setData(queryParams);
    let company = getCompany();
    setcompanyName(company);
  }, [router]);

  return (
    <>
      <Head>
        <title>Home Page - {companyName}</title>
        <meta name="description" content="Description of Modeling" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ModelingTypesComponent type={data && data["ObjectName"]} />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ModelingTypePage;

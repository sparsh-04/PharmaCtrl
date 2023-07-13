import { IModelingSearch, IStandardAPIResponse } from "index/vm";
import { getUserCompanyName, httpClient } from "../util/UtilService";

export async function getTableFieldCaptions(
  type: string,
  company: string
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`query/getTableFieldCaptions`, "POST", {
      tablename: type.toLowerCase(),
      company: company,
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getTransactionObject(
  type: string,
  values: string[]
): Promise<any> {
  try {
    let res = await httpClient<any>(`query/getTransactionObject`, "POST", {
      ObjectName: type,
      InputValues: values,
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
export async function getQueryDetails(
  field_query: string,
  data?: any
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`query/${field_query}`, "POST", {
      ...data,
      company:getUserCompanyName(),
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}


export async function processModelingDetails(
  methodtype:string,
  tableName: string,
  data: any
): Promise<IStandardAPIResponse<any>> {
  try {
    var apiName = "getObjectDetails";
    if (methodtype.toUpperCase() === "GET") {apiName = "getObjectDetails"}
    else if (methodtype.toUpperCase() === "POST") {apiName = "maintObjectDetails"}
    else if (methodtype.toUpperCase() === "DELETE") {apiName = "deleteObjectDetails"}

    tableName = tableName.replaceAll("_", "").toLowerCase();
    let res = await httpClient<any>(
      `${tableName}/${apiName}`,
      "POST",
      data
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}



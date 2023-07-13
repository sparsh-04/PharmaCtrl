import { ILogin, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function validateLicenseKey(): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`auth/validateLicense`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getCompanyName(): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`auth/getLicensedtocompany`, "POST",{});
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function loginToApp(
  cred: ILogin
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(
      `auth/doLoginDetails`,
      "POST",
       cred 
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

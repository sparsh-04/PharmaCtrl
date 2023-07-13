import { IMenuGroup, IStandardAPIResponse } from "index/vm";
import { getCompany, getUserRole, httpClient } from "../util/UtilService";

export async function getMenuGroupsFromApi(): Promise<
  IStandardAPIResponse<IMenuGroup[]>
> {
  const userRole = getUserRole();
  const company = getCompany();
  try {
    let res = await httpClient<IMenuGroup[]>(
      `query/getMenuDefinitionsForUser?pUserRole=${userRole}`,
      "POST",
      {
        company: company,
      }
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getModelingMenuFromApi(): Promise<
  IStandardAPIResponse<any>
> {
  const company = getCompany();
  try {
    let res = await httpClient<any>(`query/getMaintObjects`, "POST", {
      company: company,
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

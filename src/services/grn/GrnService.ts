import { IGRNdetails, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function getAllGrn(
   
  ): Promise<IStandardAPIResponse<IGRNdetails>> {
    try {
      let res = await httpClient<IGRNdetails>(`query/GRN`, "GET");
      return res;
    } catch (err: any) {
      return err && err.response ? err.response.data : undefined;
    }
  }
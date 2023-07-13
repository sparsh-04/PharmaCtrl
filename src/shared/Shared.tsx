import { ICellRendererParams } from "ag-grid-community";
import moment from "moment";

export const customCell = (cellprops: ICellRendererParams) => {
  return (
    <span>
      {cellprops?.value || cellprops?.value == 0 ? cellprops.value : "-"}
    </span>
  );
};

export const customDateCell = (cellprops: ICellRendererParams) => {
  return (
    <span>
      {cellprops.value ? moment(cellprops.value).format("DD/MM/YYYY") : "-"}
    </span>
  );
};

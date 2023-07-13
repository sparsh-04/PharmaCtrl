import { Grid, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { useState, useEffect } from "react";
import AppTextInput from "./inputs/AppTextInput";
import { Formik } from "formik";
import AppButton from "./inputs/AppButton";
import Search from "@mui/icons-material/Search";
import AppSelectInput from "./inputs/AppSelectInput";
import { customCell, customDateCell } from "./Shared";
import {
  getQueryDetails,
  getTableFieldCaptions,
  getTransactionObject,
  processModelingDetails,
} from "index/services/modeling/ModelingService";
import Loading from "index/components/common/Loading";
import { API_METHOD_TYPES, FOOTER_COLORS } from "index/Constant";

interface ObjectSearchComponentProps {
  onClose: Function;
  tableName: string;
  data?: {
    isFinistedProducts?: boolean;
    showListDropDown?: boolean;
    disableList?: boolean;
    filterByList?: boolean;
    selectedType?: string;
    methodListName?: string;
    autoLoad?: boolean;
  };
}

const ObjectSearchComponent: React.FunctionComponent<
  ObjectSearchComponentProps
> = ({ data, onClose, tableName }) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [constRowData, setConstRowData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAutoLoadEnabled, setIsAutoLoadEnabled] = useState(
    data?.autoLoad === false ? true : false
  );
  const [listData, setListData] = useState<{ label: string; value: string }[]>(
    []
  );

  const [search, setSearch] = useState({
    searchFor: "",
    listTypeId: data?.selectedType || "",
    searchForBatchNum: "",
    searchForProduct: "",
  });

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

  useEffect(() => {
    const company_name = localStorage.getItem("company");
    if (tableName && company_name) {
      getFields(tableName, company_name);
    }
    if (data?.methodListName) {
      getDataList(data?.methodListName);
    }
  }, [tableName, data]);

  const getFields = async (type: string, company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(type, company);
    if (result && result.errorNo == 0) {
      let fieldCaptionsList: any = [];
      let formLoadData: any = result?.formLoadData || [];

      result.dTable.length > 0 &&
        result.dTable.forEach(async (ele) => {
          if (ele.uireturntype === "LIST") {
            let listItem = formLoadData.find(
              (e: any) => e.columnName === ele.field_name
            );
            let tempList =
              listItem && listItem.columnData && listItem.columnData.length > 0
                ? listItem.columnData.map((e: any) => {
                    let itemstoReturn: any = Object.keys(e).reduce(
                      (acc, key) => {
                        return { ...acc, [key.toLowerCase()]: e[key] };
                      },
                      {}
                    );
                    return {
                      value: itemstoReturn.keyid,
                      label: itemstoReturn.keyvalue,
                    };
                  })
                : [];
            fieldCaptionsList.push({
              ...ele,
              field_name: ele.field_name
                ? ele.field_name &&
                  ele.field_type &&
                  ele.field_name === ele.field_type
                  ? ele.field_name.toLowerCase() + "id"
                  : ele.field_name.toLowerCase()
                : "",
              listValues: tempList || [],
            });
          } else {
            fieldCaptionsList.push({
              ...ele,
              field_name: ele.field_name
                ? ele.field_name &&
                  ele.field_type &&
                  ele.field_name === ele.field_type
                  ? ele.field_name.toLowerCase() + "id"
                  : ele.field_name.toLowerCase()
                : "",
            });
          }
        });
      // setFieldCaptions(fieldCaptionsList);
      // setCompanyName(company || "");
      setLoading(false);
      setStatusMessage("");
      getList(fieldCaptionsList, company);
    } else {
      setStatusMessage(result?.resultMessage);
      setLoading(false);
    }
  };

  const getList = async (fieldCaptionsList: any[], company: string) => {
    if (tableName) {
      let obj: any = { company: company || "" };
      var objectArr: string[] = [];
      Object.keys(obj).forEach(function (key) {
        objectArr.push(key);
        objectArr.push(obj[key]);
      });
      setLoading(true);
      let transactionObj = await getTransactionObject(tableName, objectArr);
      if (transactionObj) {
        setLoading(true);
        let result = await processModelingDetails(
          API_METHOD_TYPES.GET,
          tableName,
          transactionObj
        );
        let colDefs: any = [];
        if (result && result.errorNo === 0) {
          result.columnDetails.forEach((item: any) => {
            if (
              item?.columnName &&
              item?.columnName.toLowerCase().includes("_hide") === false
            ) {
              let selectedFieldCation = fieldCaptionsList.find(
                (fieldCaptionItem) =>
                  fieldCaptionItem.field_name === item?.columnName.toLowerCase()
              );
              colDefs.push({
                field: item.columnName.toLowerCase(),
                headerName: item.columnCaption,
                colId: item.columnName.toLowerCase(),
                filter:
                  selectedFieldCation &&
                  selectedFieldCation.field_type === "DATETIME"
                    ? "agDateColumnFilter"
                    : selectedFieldCation &&
                      selectedFieldCation.field_type === "NUMBER"
                    ? "agNumberColumnFilter"
                    : "agTextColumnFilter",
                cellRenderer:
                  selectedFieldCation &&
                  selectedFieldCation.field_type === "DATETIME"
                    ? customDateCell
                    : customCell,
              });
            }
          });
          setColumnsDefs(colDefs);

          let row =
            result.dTable &&
            result.dTable.length > 0 &&
            result.dTable.map((ele: any) => {
              let headers = Object.entries(ele).map((e) => e[0]);
              let itemstoReturn = headers.reduce((e, acc) => {
                return { ...e, [acc.toLowerCase()]: ele[acc] };
              }, {});
              return itemstoReturn;
            });
          setRowData(row || []);
          setConstRowData(row || []);
          setLoading(false);
        } else {
          setLoading(false);
          setRowData([]);
          setStatusMessage(result?.resultMessage);
        }
      } else {
        setLoading(false);
        setStatusMessage(transactionObj?.resultMessage);
      }
    }
  };

  const getDataList = async (methodListSV: string) => {
    setLoading(true);
    let result = await getQueryDetails(methodListSV);
    if (result && result.errorNo === 0) {
      setLoading(false);
      let list = [...result?.dTable].map((e) => {
        return {
          value: e?.keyid,
          label: e?.keyvalue,
        };
      });
      setListData([...list]);
      setStatusMessage(result?.resultMessage || "");
    } else {
      setLoading(false);
      setStatusMessage(result?.resultMessage || "");
    }
  };

  const onSelectionChanged = () => {
    let selectedRow = gridRef.current?.api.getSelectedRows();
    if (selectedRow && selectedRow.length > 0 && selectedRow[0]) {
      let data = selectedRow[0];
      let hiddenColumns = Object.keys(data).filter((e) => e.includes("_hide"));
      hiddenColumns.forEach((column) => {
        data[column.split("_hide")[0]] = data[column];
      });
      setSelectedItem(data);
      //   setSearch(data);
      //   setIsEdit(true);
    }
  };
  return (
    <React.Fragment>
      {loading && <Loading />}
      <Formik
        enableReinitialize
        initialValues={search}
        validate={(values) => {
          let errors: any = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("test", values);
          if (!data?.isFinistedProducts) {
            if (values?.searchFor) {
              let rowsToSearch = [...constRowData];
              let filteredList = rowsToSearch.filter((e) => {
                let isInclude = false;
                let arrayItemToSearch = Object.entries(e).map((ele) => ele[1]);
                arrayItemToSearch.forEach((ele) => {
                  if (isInclude) {
                    return;
                  } else {
                    isInclude = String(ele || "")
                      .toLowerCase()
                      .includes(String(values?.searchFor).toLowerCase());
                  }
                });
                if (isInclude) {
                  return e;
                }
              });
              setRowData([...filteredList]);
              console.log("--filtered list--", filteredList);
            } else {
              setRowData([...constRowData]);
            }
          } else {
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1} alignItems="center">
              {!data?.isFinistedProducts ? (
                <>
                  <Grid item xs={data?.showListDropDown ? 4 : 9}>
                    <AppTextInput
                      label="Search For"
                      name="searchFor"
                      value={values?.searchFor}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  {data?.showListDropDown && data?.methodListName && (
                    <Grid item xs={4}>
                      <AppSelectInput
                        menuItems={[...listData]}
                        disabled={data?.disableList}
                        disableClearable
                        onChange={(e: any) => {
                          let tempValue = e?.value;
                          if (!e?.value) {
                            if (e?.value === 0) {
                              tempValue = 0;
                            } else {
                              tempValue = e?.value || null;
                            }
                          }
                          setFieldValue("listTypeId", tempValue);
                        }}
                        onBlur={handleBlur}
                        value={values?.listTypeId}
                        label="Type"
                        name="listTypeId"
                      />
                    </Grid>
                  )}
                  <Grid item xs={data?.showListDropDown ? 4 : 3}>
                    <AppButton
                      startIcon={<Search />}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        boxShadow: 5,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        if (isAutoLoadEnabled) {
                          setIsAutoLoadEnabled(false);
                        }
                      }}
                      btnText="Search"
                      type="submit"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={4}>
                    <AppTextInput
                      label="Batch Number"
                      name="searchForBatchNum"
                      value={values?.searchForBatchNum}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AppTextInput
                      label="Product Id"
                      name="searchForProduct"
                      value={values?.searchForProduct}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AppButton
                      startIcon={<Search />}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        boxShadow: 5,
                        fontSize: 13,
                      }}
                      btnText="Search"
                      type="submit"
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  style={{
                    height: "calc(100vh - 444px)",
                  }}
                >
                  <AgGridReact
                    ref={gridRef}
                    rowData={isAutoLoadEnabled ? [] : rowData}
                    columnDefs={isAutoLoadEnabled ? [] : columnDefs}
                    className="custom-grid ag-theme-alpine"
                    rowSelection="single"
                    rowHeight={36}
                    animateRows={true}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    onSelectionChanged={onSelectionChanged}
                    suppressMovableColumns={true}
                    context={{
                      customDateCell,
                      customCell,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <br />
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <AppButton
                      size="medium"
                      btnText="Cancel"
                      variant="outlined"
                      type="button"
                      className="cancel-btn"
                      color="primary"
                      onClick={() => onClose()}
                    />
                  </Grid>
                  <Grid item>
                    <AppButton
                      btnText="Select"
                      type="button"
                      onClick={() => {
                        console.log("--selectedItem--", selectedItem);
                        onClose(selectedItem);
                      }}
                      variant="contained"
                      className="add-btn"
                      color="primary"
                      disabled={!selectedItem}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontSize={14} fontWeight={600}>
                  Status Message:{" "}
                  <Typography
                    component="span"
                    color={FOOTER_COLORS["error"]}
                    variant="subtitle2"
                  >
                    {statusMessage || ""}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ObjectSearchComponent;

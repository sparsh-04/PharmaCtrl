import { Box, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import AppTextInput from "index/shared/inputs/AppTextInput";
import {
  getTableFieldCaptions,
  getTransactionObject,
  processModelingDetails,
} from "index/services/modeling/ModelingService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDialogContext } from "index/providers/ConfirmDialogProvider";
import moment from "moment";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import { StatusContext } from "index/providers/StatusProvider";
import Loading from "../common/Loading";
import Collapse from "@mui/material/Collapse";
import { Formik } from "formik";
import { customCell, customDateCell } from "index/shared/Shared";
import { API_METHOD_TYPES } from "index/Constant";
import { convertToObjectArr } from "index/services/util/UtilService";

interface ModelingTypesComponentProps {
  type: string;
}

const ModelingTypesComponent: React.FunctionComponent<
  ModelingTypesComponentProps
> = (props) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const { showConfirmDialog } = React.useContext(ConfirmDialogContext);
  const { updateStatus } = React.useContext(StatusContext);

  const [isLoading, setLoading] = useState(false);
  const [tableName, setTableName] = useState("");
  const [fieldCaptions, setFieldCaptions] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [hideTable, setHideTable] = useState(false);
  const [zoomTable, setZoomTable] = useState(false);

  const [isFirst, setIsFirst] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [search, setSearch] = useState<any>({});
  const [isSubmited, setSubmitted] = React.useState(false);

  useEffect(() => {
    const company_name = localStorage.getItem("company");
    setSearch({ company: company_name });
    setIsFirst(true);
    setIsEdit(false);
    setIsAdd(false);
    setSubmitted(false);
    if (company_name&&props.type) {
      getFields(props.type, company_name);
    }
  }, [props.type]);

  const getFields = async (type: string, company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(type, company);
    if (result && result.errorNo == 0) {
      let fieldCaptionsList: any = [];
      let formLoadData: any = result?.formLoadData || [];
      if(result.dTable.length>0){
        setTableName(result.dTable[0].table_caption)
      }
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
      setFieldCaptions(fieldCaptionsList);
      setCompanyName(company || "");
      setLoading(false);
      updateStatus("", "");
      getList({}, fieldCaptionsList, true);
    } else {
      updateStatus(result?.resultMessage, "error");
      setLoading(false);
    }
  };

  const getList = async (
    searchObj?: any,
    fieldCaptionsList?: any[],
    isFirstLoad?: boolean,
    isSearch?: boolean
  ) => {
    const companyName = localStorage.getItem("company");
    let obj = searchObj
      ? { ...searchObj, company: companyName || "" }
      : { ...search, company: companyName || "" };
    if(isSearch){
      let searchRequest:any={};
      fieldCaptions.forEach(field=>{
        searchRequest[field.field_name] = obj[field.field_name];
      });
      obj=searchRequest;
    }
    var objectArr: string[] = [];
    Object.keys(obj).forEach(function (key) {
      objectArr.push(key);
      objectArr.push(obj[key]);
    });
    let transactionObj = await getTransactionObject(props.type, objectArr);
    if (transactionObj) {
      let result = await processModelingDetails(API_METHOD_TYPES.GET,props.type, transactionObj);
      let tempFieldCaptions =
        fieldCaptionsList && fieldCaptionsList.length > 0
          ? [...fieldCaptionsList]
          : [...fieldCaptions];
      let colDefs: any = [];
      if (result && result.errorNo === 0) {
        result.columnDetails.forEach((item: any) => {
          if (
            item?.columnName &&
            item?.columnName.toLowerCase().includes("_hide") === false
          ) {
            let selectedFieldCation = tempFieldCaptions.find(
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
        if (!isFirstLoad) {
          setRowData(row || []);
          setIsFirst(false);
        } else {
          setRowData([]);
          setIsFirst(true);
        }
        setSearch(obj);
      } else {
        setRowData([]);
        updateStatus(result?.resultMessage, "error");
      }
    }

    if(isSearch){
      setSearch(obj);
    }
  };

  const reset = () => {
    setIsEdit(false);
    setIsAdd(false);
    setSubmitted(false);
    getList({ company: companyName });
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      // sortable: true,
      // editable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

  const onGridReady = () => {};

  const handleDelete = (data: any) => {
    showConfirmDialog("Are you sure", "Do you want to delete?", async () => {
      const result = await processModelingDetails(API_METHOD_TYPES.DELETE,props.type, data);
      if (result && result.errorNo === 0) {
        updateStatus(result?.resultMessage, "success");
        getList({ company: companyName });
        setIsEdit(false);
        setSubmitted(false);
      } else {
        updateStatus(result?.resultMessage, "error");
      }
    });
  };

  const onSelectionChanged = () => {
    let selectedRow = gridRef.current?.api.getSelectedRows();
    if (selectedRow && selectedRow.length > 0 && selectedRow[0]) {
      let data = selectedRow[0];
      let hiddenColumns = Object.keys(data).filter((e) => e.includes("_hide"));
      hiddenColumns.forEach(column=>{
        data[column.split("_hide")[0]] = data[column];
      })
      setSearch(data);
      setIsEdit(true);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      <Grid container direction="column" spacing={2}>
        {!zoomTable && (
          <Grid item xs={12}>
            <Paper elevation={4} component="div" sx={{ padding: 2 }}>
              <Formik
                enableReinitialize
                initialValues={search}
                validate={(values: any) => {
                  let errors: any = {};
                  fieldCaptions.forEach((ele) => {
                    if (
                      ele.userrequired != 0 &&
                      !values[ele.field_name] &&
                      values[ele.field_name] !== 0
                    ) {
                      errors[ele.field_name] = "Required";
                    }
                  });
                  if (!isEdit && !isAdd) {
                    errors = {};
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  if (isEdit || isAdd) {
                    // setLoading(true);
                    const obj = { ...values };
                    var objectArr: string[] = convertToObjectArr(obj);
                    let transactionObj = await getTransactionObject(
                      props.type,
                      objectArr
                    );
                    if (transactionObj) {
                    let result = await processModelingDetails(
                      API_METHOD_TYPES.POST,
                        props.type,
                        transactionObj
                      );
                      if (result && result.errorNo === 0) {
                        setLoading(false);
                        updateStatus(result?.resultMessage, "success");
                        setIsEdit(false);
                        resetForm();
                        reset();
                      } else {
                        setLoading(false);
                        updateStatus(result?.resultMessage, "error");
                      }
                    } else {
                      setLoading(false);
                    }
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
                  setFieldValue,
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      component="div"
                      justifyContent="space-between"
                      display="flex"
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        textTransform="capitalize"
                      >
                        {tableName}
                      </Typography>
                      <Box component="div" display="flex" flexDirection="row">
                        <AppButton
                          btnText="Search"
                          onClick={() => {
                            getList(values,undefined,undefined,true);
                            setIsEdit(false);
                            setIsAdd(false);
                          }}
                          startIcon={<SearchIcon />}
                          type="button"
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                        />
                        {isEdit ? (
                          <AppButton
                            btnText="Update"
                            onClick={() => {
                              if (!isSubmited) {
                                setSubmitted(true);
                              }
                            }}
                            startIcon={<EditIcon />}
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            className="ml-2"
                          />
                        ) : (
                          <AppButton
                            btnText="Add"
                            onClick={() => {
                              setIsAdd(true);
                              if (!isSubmited) {
                                setSubmitted(true);
                              }
                            }}
                            startIcon={<AddIcon />}
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            className="ml-2"
                          />
                        )}
                        <AppButton
                          btnText="Delete"
                          disabled={!isEdit}
                          onClick={() => {
                            handleDelete(values);
                          }}
                          startIcon={<DeleteIcon />}
                          type="button"
                          variant="contained"
                          color="error"
                          fullWidth={true}
                          className="ml-2"
                        />
                        <AppButton
                          btnText="Reset"
                          onClick={() => {
                            resetForm();
                            reset();
                          }}
                          startIcon={<ReplayIcon />}
                          type="rest"
                          variant="outlined"
                          color="primary"
                          fullWidth={true}
                          className="ml-2"
                        />
                      </Box>
                    </Box>
                    <br />
                    <Box
                      sx={{
                        height: hideTable ? "calc(100vh - 290px)" : "210px",
                        overflow: "auto",
                        padding: "0 24px",
                      }}
                    >
                      <Grid container spacing={1}>
                        {fieldCaptions.map((item, index) => (
                          <React.Fragment key={index}>
                            {item.uireturntype === "SINGLE" &&
                              item.field_type !== "DATETIME" && (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                  <AppTextInput
                                  label={item.field_caption}
                                  name={item.field_name}
                                  required={item.userrequired != 0}
                                  encrypted={item.encrypted != 0}
                                  type={item.field_type === "NUMERIC"
                                    ? "number"
                                    : "text"}
                                  disabled={item.readOnly != 0}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = e.target.value;
                                    setFieldValue(
                                      item.field_name,
                                      tempValue || undefined
                                    );
                                  } }
                                  value={values[item.field_name] || ""}
                                  error={errors[item.field_name] &&
                                    (touched[item.field_name] || isSubmited)
                                    ? true
                                    : false}
                                  helperText={errors[item.field_name] &&
                                    (touched[item.field_name] ||
                                      isSubmited) &&
                                    errors[item.field_name]} fullWidth={false}                                  />
                                </Grid>
                              )}
                            {item.uireturntype === "SINGLE" &&
                              item.field_type === "DATETIME" && (
                                <Grid
                                  item
                                  key={index}
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  lg={3}
                                >
                                  <AppDatePicker
                                    label={item.field_caption}
                                    required={item.userrequired != 0}
                                    encrypted={item.encrypted != 0}
                                    name={item.field_name}
                                    onBlur={handleBlur}
                                    disabled={item.readOnly != 0}
                                    onChange={(e: any) => {
                                      let tempValue = "";
                                      if (e) {
                                        tempValue = moment(e).toISOString();
                                      }
                                      setFieldValue(item.field_name, tempValue);
                                    }}
                                    value={values[item.field_name] || ""}
                                    error={
                                      errors[item.field_name] &&
                                      (touched[item.field_name] || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors[item.field_name] &&
                                      (touched[item.field_name] ||
                                        isSubmited) &&
                                      errors[item.field_name]
                                    }
                                  />
                                </Grid>
                              )}
                            {item.uireturntype === "LIST" && (
                              <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                              >
                                <AppSelectInput
                                  required={item.userrequired != 0}
                                  encrypted={item.encrypted != 0}
                                  menuItems={item.listValues}
                                  label={item.field_caption}
                                  name={item.field_name}
                                  disabled={item.readOnly != 0}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = e?.value;
                                    if(!e?.value){
                                      if(e?.value === 0){
                                        tempValue = 0;
                                      }else{
                                        tempValue = e?.value || null
                                      }
                                    }
                                    setFieldValue(item.field_name, tempValue);
                                  }}
                                  value={values[item.field_name]}
                                  error={
                                    errors[item.field_name] &&
                                    (touched[item.field_name] || isSubmited)
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    errors[item.field_name] &&
                                    (touched[item.field_name] || isSubmited) &&
                                    errors[item.field_name]
                                  }
                                />
                              </Grid>
                            )}
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Box>
                  </form>
                )}
              </Formik>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} paddingBottom={6}>
          <Paper elevation={4} component="div" sx={{ padding: 2 }}>
            <Box
              component="div"
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              {!zoomTable ? (
                <Typography
                  variant="subtitle2"
                  component="a"
                  color="primary"
                  onClick={() => {
                    setHideTable(!hideTable);
                  }}
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {!hideTable ? "Hide" : "Show"}
                </Typography>
              ) : (
                <span></span>
              )}
              {!hideTable ? (
                <Typography
                  variant="subtitle2"
                  component="a"
                  color="primary"
                  onClick={() => {
                    setZoomTable(!zoomTable);
                  }}
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                  className="ml-2"
                >
                  {!zoomTable ? "Maximize" : "Minimize"}
                </Typography>
              ) : (
                <span></span>
              )}
            </Box>
            <Collapse in={!hideTable}>
              <div
                style={{
                  height: !zoomTable
                    ? "calc(100vh - 500px)"
                    : "calc(100vh - 184px)",
                }}
              >
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  className="custom-grid ag-theme-alpine"
                  rowSelection="single"
                  rowHeight={36}
                  animateRows={true}
                  defaultColDef={defaultColDef}
                  pagination={false}
                  onGridReady={onGridReady}
                  onSelectionChanged={onSelectionChanged}
                  suppressMovableColumns={true}
                  overlayNoRowsTemplate={
                    isFirst
                      ? "Please Search To Load The Data"
                      : "No Rows To Show"
                  }
                  context={{
                    // customButtonCell,
                    customDateCell,
                    customCell,
                  }}
                ></AgGridReact>
              </div>
            </Collapse>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ModelingTypesComponent;

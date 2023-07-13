import * as React from "react";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppButton from "index/shared/inputs/AppButton";
import Queue from "@mui/icons-material/Queue";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import SignaturesTable from "index/shared/signature/SignaturesTable";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
import { API_METHOD_TYPES, TABLE_NAMES, USER_GROUPS } from "index/Constant";
import { StatusContext } from "index/providers/StatusProvider";
import {
  getQueryDetails,
  getTableFieldCaptions,
  getTransactionObject,
  processModelingDetails,
} from "index/services/modeling/ModelingService";
import {
  convertToObjectArr,
  getUserCompanyName,
  joinStringArray,
  splitStringToArray,
} from "index/services/util/UtilService";
import CustomDialogComponent from "../common/CustomDialogComponent";
import LoginComponent from "../auth/LoginComponent";
import { getMaterialMasterDetails } from "index/services/util/CommonAPIMethodService";

interface NCRComponentProps {}

const NCRComponent: React.FunctionComponent<NCRComponentProps> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const splitStrings = ["ncr_description"];
  const initialSearchObj = {
    noconformance_reportid: "",
    created_date: moment(),
    ncr_statusid: "",
    ncr_category: "",
    reporting_date: moment(),
    ncr_areaid: "",
    customer: "",
    material_masterid: "",
    batch_number: "",
    order_headerid: "",
    capaid: "",
    ncr_description: "",
    ncr_description1: "",
    ncr_description2: "",
    ncr_description3: "",
    ncr_initiator: "",
    ncr_initiator_signed_date: moment(),
    ncr_initiator_user_group: "",
    hod: "",
    hod_signed_date: "",
    hod_user_group: "",
    qa_hod: "",
    qa_hod_signed_date: "",
    qa_hod_user_group: "",
    company: "",
  };
  const extraPropsObj = {
    batch_size: "",
    material_description: "",
    material_type: "",
    word_order_status: "",
    capa_due_date: moment(),
  };
  const [initialData, setInitialData] = useState(initialSearchObj);
  const [extraProps, setExtraProps] = useState(extraPropsObj);
  const eSigDefinition = {
    initiator: "ncr_initiator",
    hod: "hod",
    qa_hod: "qa_hod",
  };
  const selectedChangeRequest = React.useRef(undefined);
  const [materialQuery, setMaterialQuery] = React.useState("");
  const [tableName, setTableName] = useState("");
  const [fieldCaptions, setFieldCaptions] = useState({} as any);
  const { updateStatus } = React.useContext(StatusContext);

  const [eSigDialog, setESigDialog] = useState({
    isOpen: false,
    netWorkId: "",
    groupName: "",
    type: "",
  });
  useEffect(() => {
    const company_name = localStorage.getItem("company");
    if (company_name) {
      setInitialData({
        ...initialData,
        company: company_name,
      });
      getFields(company_name);
    }
  }, []);

  const getFields = async (company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(
      TABLE_NAMES.NOCONFORMANCE_REPORT,
      company
    );
    if (result && result.errorNo == 0) {
      let fieldCaptionsList: any = [];
      let formLoadData: any = result?.formLoadData || [];
      if (result.dTable.length > 0) {
        setTableName(result.dTable[0].table_caption);
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
      let fieldCaptionsDic = fieldCaptionsList.reduce((acc: any, ele: any) => {
        acc[ele.field_name] = ele;
        return acc;
      }, {});

      console.log(fieldCaptionsDic);
      setFieldCaptions(fieldCaptionsDic);
    } else {
      updateStatus(result?.resultMessage, "error");
    }
    setLoading(false);
  };
  const [isCollectSigDisabled, setIsCollectSigDisabled] = useState(false);

  const [ncrDialog, setNCRDialog] = useState({
    isOpen: false,
    data: {},
  });
  const [materialDialog, setMaterialDialog] = useState({
    isOpen: false,
    data: {},
  });
  
  const [capaDialog, setCAPADialog] = useState({
    isOpen: false,
    data: {},
  });

  const handleNCRDialogOpen = (data?: any, values?: any) => {
    setNCRDialog({ data, isOpen: true });
    if (values) {
      setInitialData({
        ...values,
      });
    }
  };
  const handleNCRDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
      let requestObj = joinStringArray(data, splitStrings);
      setInitialData(requestObj);
      selectedChangeRequest.current = requestObj;
    }
    setNCRDialog({ data: {}, isOpen: false });
  };

  const handleMaterialDialogOpen = (data?: any, values?: any) => {
    setMaterialDialog({ data, isOpen: true });
    if (values) {
      setInitialData({
        ...values,
      });
    }
  };
  const handleMaterialDialogClose = async (data?: any) => {
    if (data) {
      console.log(data, "data");

      let materialQuery = getMaterialMasterDetails(data.material_masterid,data.material_typeid,data.material_groupid);
      let materialRes = await getQueryDetails(materialQuery);
      if (materialRes) {
        console.log(materialRes, "dataaaa");
        // materialRes.dTable.forEach((ele, index) => {
        if (materialRes.dTable.length > 0) {
          setInitialData({
            ...initialData,
            material_masterid: data.material_masterid,
            batch_number: materialRes.dTable[0]["batch NUMBER"],
          });

          setExtraProps({
            ...extraProps,
            material_description: materialRes.dTable[0]["material"],
            material_type: materialRes.dTable[0]["material Type"],
            batch_size: materialRes.dTable[0]["quantity"] || "",
          });
        }
        // });
      }
      // getBatchDetails(company_name||'')
    }
    setMaterialDialog({ data: {}, isOpen: false });
  };

  
  const handleCAPADialogOpen = (data?: any, values?: any) => {
    setCAPADialog({ data, isOpen: true });
    if (values) {
      setInitialData({
        ...values,
      });
    }
  };
  const handleCAPADialogClose = (data?: any) => {
    if (data) {
      setInitialData({
        ...initialData,
        capaid: data.capaid,
      });
    }
    setCAPADialog({ data: {}, isOpen: false });
  };

  const handleCloseESigDialog = async (data: any) => {
    if (data) {
      let selectedCRDetails: any = selectedChangeRequest.current;
      switch (eSigDialog.type) {
        case eSigDefinition.initiator:
          selectedCRDetails.ncr_initiator = data.networkid;
          selectedCRDetails.ncr_initiator_signed_date = moment();
          selectedCRDetails.ncr_initiator_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.hod:
          selectedCRDetails.hod = data.networkid;
          selectedCRDetails.hod_signed_date = moment();
          selectedCRDetails.hod_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.qa_hod:
          selectedCRDetails.qa_hod = data.networkid;
          selectedCRDetails.qa_hod_signed_date = moment();
          selectedCRDetails.qa_hod_user_group = data.useR_GROUPSID;
          break;
      }
      let result = await addOrUpdateNCR(selectedCRDetails);
      if (result && result.errorNo === 0) {
        let searchObj = {
          noconformance_reportid: initialData.noconformance_reportid,
          company: getUserCompanyName(),
        };

        var objectArr: string[] = convertToObjectArr(searchObj);
        let transactionObj = await getTransactionObject(
          TABLE_NAMES.NOCONFORMANCE_REPORT,
          objectArr
        );
        if (transactionObj) {
          let result = await processModelingDetails(
            API_METHOD_TYPES.GET,
            TABLE_NAMES.NOCONFORMANCE_REPORT,
            transactionObj
          );
          if (result.dTable.length > 0) {
            let selectedObj: any = {};
            Object.keys(result.dTable[0]).forEach((ele) => {
              selectedObj[ele.toLowerCase()] = result.dTable[0][ele];
            });
            setInitialData({
              ...selectedObj,
              noconformance_reportid: initialData.noconformance_reportid,
            });
          }
        } else {
          updateStatus(result?.resultMessage, "error");
          setLoading(false);
        }
      }
    }
    setESigDialog({
      groupName: "",
      type: "",
      netWorkId: "",
      isOpen: false,
    });
  };
  const handleOpenESigDialog = (type: string, groupName?: string) => {
    let loggedInDetails = localStorage.getItem("loggedInUser");
    if (loggedInDetails) {
      let userDetails = JSON.parse(loggedInDetails);
      setESigDialog({
        netWorkId: userDetails.networkid,
        isOpen: true,
        groupName: groupName || "",
        type: type,
      });
    }
  };
  const addOrUpdateNCR = async (details: any, isESig?: boolean) => {
    setLoading(true);
    let obj = splitStringToArray(details, splitStrings);
    var objectArr: string[] = convertToObjectArr(obj);
    let transactionObj = await getTransactionObject(
      TABLE_NAMES.NOCONFORMANCE_REPORT,
      objectArr
    );
    if (transactionObj) {
      let result = await processModelingDetails(
        API_METHOD_TYPES.POST,
        TABLE_NAMES.NOCONFORMANCE_REPORT,
        transactionObj
      );
      if (result && result.errorNo === 0) {
        if (!isESig) {
          setLoading(false);
        }
        updateStatus(result?.resultMessage, "success");
      } else {
        if (!isESig) {
          setLoading(false);
        }
        updateStatus(result?.resultMessage, "error");
      }
      return result;
    } else {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">NCR</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={initialData}
                validate={(values: any) => {
                  let errors: any = {};
                  Object.values(fieldCaptions).forEach((ele: any) => {
                    if (
                      ele.userrequired != 0 &&
                      !values[ele.field_name] &&
                      values[ele.field_name] !== 0
                    ) {
                      if (ele.field_name.includes("description")) {
                        if (!values[ele.field_name.slice(0, -1)]) {
                          errors[ele.field_name] = "Required";
                        }
                      } else {
                        errors[ele.field_name] = "Required";
                      }
                    }
                  });
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  let obj = { ...values };
                  let result = await addOrUpdateNCR(obj);
                  if (result && result.errorNo === 0) {
                    resetForm();
                    setInitialData(initialSearchObj);
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
                  <div style={{ padding: "16px" }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              name="noconformance_reportid"
                              label={"NCR ID"}
                              type="text"
                              value={values.noconformance_reportid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.noconformance_reportid &&
                                (touched.noconformance_reportid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.noconformance_reportid &&
                                (touched.noconformance_reportid ||
                                  isSubmited) &&
                                errors.noconformance_reportid
                              }
                            />
                            <div>
                              <IconButton
                                color="primary"
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  handleNCRDialogOpen(undefined, values);
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label={fieldCaptions["created_date"]?.field_caption}
                            required={
                              fieldCaptions["created_date"]?.userrequired != 0
                            }
                            name="created_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("created_date", tempValue);
                            }}
                            value={values?.created_date || ""}
                            minDate={moment()}
                            error={
                              errors.created_date &&
                              (touched.created_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.created_date &&
                              (touched.created_date || isSubmited) &&
                              errors.created_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppSelectInput
                                menuItems={
                                  fieldCaptions["ncr_statusid"]?.listValues
                                }
                                label={
                                  fieldCaptions["ncr_statusid"]?.field_caption
                                }
                                name="ncr_statusid"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = e?.value || null;
                                  setFieldValue("ncr_statusid", tempValue);
                                }}
                                value={values.ncr_statusid}
                                error={
                                  errors.ncr_statusid &&
                                  (touched.ncr_statusid || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.ncr_statusid &&
                                  (touched.ncr_statusid || isSubmited) &&
                                  errors.ncr_statusid
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label={
                              fieldCaptions["reporting_date"]?.field_caption
                            }
                            required={
                              fieldCaptions["reporting_date"]?.userrequired != 0
                            }
                            name="reporting_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("reporting_date", tempValue);
                            }}
                            value={values?.reporting_date || ""}
                            minDate={moment()}
                            error={
                              errors.reporting_date &&
                              (touched.reporting_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.reporting_date &&
                              (touched.reporting_date || isSubmited) &&
                              errors.reporting_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="customer"
                            label={fieldCaptions["customer"]?.field_caption}
                            required={
                              fieldCaptions["customer"]?.userrequired != 0
                            }
                            type="text"
                            value={values.customer}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.customer &&
                              (touched.customer || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.customer &&
                              (touched.customer || isSubmited) &&
                              errors.customer
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={
                              fieldCaptions["ncr_category"]?.listValues
                            }
                            label={fieldCaptions["ncr_category"]?.field_caption}
                            name="ncr_category"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("ncr_category", tempValue);
                            }}
                            value={values.ncr_category}
                            error={
                              errors.ncr_category &&
                              (touched.ncr_category || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.ncr_category &&
                              (touched.ncr_category || isSubmited) &&
                              errors.ncr_category
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={fieldCaptions["ncr_areaid"]?.listValues}
                            label={fieldCaptions["ncr_areaid"]?.field_caption}
                            name="ncr_areaid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("ncr_areaid", tempValue);
                            }}
                            value={values.ncr_areaid}
                            error={
                              errors.ncr_areaid &&
                              (touched.ncr_areaid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.ncr_areaid &&
                              (touched.ncr_areaid || isSubmited) &&
                              errors.ncr_areaid
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <Box display="flex">
                            <AppTextInput
                              name="material_masterid"
                              label={
                                fieldCaptions["material_masterid"]
                                  ?.field_caption
                              }
                              required={
                                fieldCaptions["material_masterid"]
                                  ?.userrequired != 0
                              }
                              type="text"
                              value={values.material_masterid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.material_masterid &&
                                (touched.material_masterid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.material_masterid &&
                                (touched.material_masterid || isSubmited) &&
                                errors.material_masterid
                              }
                            />
                            <div>
                              <IconButton
                                color="primary"
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  handleMaterialDialogOpen(undefined, values);
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppTextInput
                            name="material_description"
                            disabled
                            label={
                              fieldCaptions["material_description"]
                                ?.field_caption || "Material Description"
                            }
                            required={
                              fieldCaptions["material_description"]
                                ?.userrequired != 0
                            }
                            type="text"
                            value={extraProps.material_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppTextInput
                            name="material_type"
                            disabled
                            label={
                              fieldCaptions["material_type"]?.field_caption ||
                              "Material Type"
                            }
                            required={
                              fieldCaptions["material_type"]?.userrequired != 0
                            }
                            type="text"
                            value={extraProps.material_type}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="batch_number"
                            disabled
                            label={fieldCaptions["batch_number"]?.field_caption}
                            required={
                              fieldCaptions["batch_number"]?.userrequired != 0
                            }
                            type="text"
                            value={values.batch_number}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.batch_number &&
                              (touched.batch_number || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.batch_number &&
                              (touched.batch_number || isSubmited) &&
                              errors.batch_number
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="batch_size"
                            disabled
                            label="Batch Size"
                            type="text"
                            value={extraProps.batch_size}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="order_headerid"
                            label={
                              fieldCaptions["order_headerid"]?.field_caption
                            }
                            required={
                              fieldCaptions["order_headerid"]?.userrequired != 0
                            }
                            type="text"
                            value={values.order_headerid}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.order_headerid &&
                              (touched.order_headerid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.order_headerid &&
                              (touched.order_headerid || isSubmited) &&
                              errors.order_headerid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="word_order_status"
                            label="WO Status"
                            type="text"
                            value={extraProps.word_order_status}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              name="capaid"
                              label={fieldCaptions["capaid"]?.field_caption}
                              required={
                                fieldCaptions["capaid"]?.userrequired != 0
                              }
                              type="text"
                              value={values.capaid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.capaid && (touched.capaid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.capaid &&
                                (touched.capaid || isSubmited) &&
                                errors.capaid
                              }
                            />
                            <div>
                              <IconButton
                                color="primary"
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  handleCAPADialogOpen(undefined, values);
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label="Due Date for CAPA"
                            name="capa_due_date"
                            value={extraProps?.capa_due_date || ""}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="ncr_description"
                            label="Brief Description of NCR"
                            type="text"
                            value={values.ncr_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={4}
                            error={
                              errors.ncr_description &&
                              (touched.ncr_description || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.ncr_description &&
                              (touched.ncr_description || isSubmited) &&
                              errors.ncr_description
                            }
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <AppButton
                            variant="outlined"
                            color="primary"
                            size="medium"
                            onClick={() => resetForm()}
                            btnText="Clear"
                          />
                        </Grid>
                        <Grid item>
                          <AppButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              if (!isSubmited) {
                                setSubmitted(true);
                              }
                            }}
                            disabled={isSubmitting}
                            btnText="Save"
                          />
                        </Grid>
                      </Grid>
                      {values?.noconformance_reportid && (
                        <React.Fragment>
                          <br />
                          {/* <SignaturesTable
                            rowDefs={[]}
                            isCollectSigDisabled={isCollectSigDisabled}
                          /> */}
                        </React.Fragment>
                      )}
                      {values?.noconformance_reportid && (
                        <React.Fragment>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={9} lg={6}>
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">
                                    Initiator
                                  </Typography>
                                </Grid>
                                {values.ncr_initiator ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.ncr_initiator}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="initiator_signed_date"
                                        value={
                                          values?.ncr_initiator_signed_date ||
                                          ""
                                        }
                                        disabled={true}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <Grid item>
                                      <AppButton
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                          handleOpenESigDialog(
                                            eSigDefinition.initiator,
                                            ""
                                          )
                                        }
                                        btnText="Collect ESig."
                                      />
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Grid>
                              <br />
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">
                                    CFT Member
                                  </Typography>
                                </Grid>
                                {values.hod ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.hod}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="cft_member_signed_date"
                                        value={values?.hod_signed_date || ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <Grid item>
                                      <AppButton
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                          handleOpenESigDialog(
                                            eSigDefinition.hod,
                                            ""
                                          )
                                        }
                                        btnText="Collect ESig."
                                      />
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Grid>
                              <br />
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">
                                    QA Approval
                                  </Typography>
                                </Grid>
                                {values.qa_hod ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.qa_hod}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="qa_approver_signed_date"
                                        value={values?.qa_hod_signed_date || ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <Grid item>
                                      <AppButton
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                          values.ncr_initiator ? false : true
                                        }
                                        onClick={() =>
                                          handleOpenESigDialog(
                                            eSigDefinition.qa_hod,
                                            USER_GROUPS.QualityAssurance
                                          )
                                        }
                                        btnText="Collect ESig."
                                      />
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                    </form>
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
          <br />
          <br />
        </Grid>
      </Grid>
      {ncrDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="NCR Search"
          onClose={handleNCRDialogClose}
          data={ncrDialog?.data}
          tableName={TABLE_NAMES.NOCONFORMANCE_REPORT.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
      {materialDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="Material Search"
          onClose={handleMaterialDialogClose}
          data={materialDialog?.data}
          tableName={TABLE_NAMES.MATERIAL_MASTER.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
      {capaDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="CAPA Search"
          onClose={handleCAPADialogClose}
          data={capaDialog?.data}
          tableName={TABLE_NAMES.CAPA.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
      {eSigDialog.isOpen && (
        <CustomDialogComponent
          title={`E-Signature`}
          onClose={handleCloseESigDialog}
          fullWidth
          variant="sm"
        >
          <LoginComponent
            groupName={eSigDialog.groupName}
            netWorkId={eSigDialog.netWorkId}
            submitText="Collect Signature"
            handleClose={handleCloseESigDialog}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default NCRComponent;

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
import CustomDialogComponent from "../common/CustomDialogComponent";
import { API_METHOD_TYPES, TABLE_NAMES, USER_GROUPS, USER_ROLES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
import { convertToObjectArr, getUserCompanyName, joinStringArray, splitStringToArray } from "index/services/util/UtilService";
import { StatusContext } from "index/providers/StatusProvider";
import { getQueryDetails, getTableFieldCaptions, getTransactionObject, processModelingDetails } from "index/services/modeling/ModelingService";
import LoginComponent from "../auth/LoginComponent";
import { getMaterialMasterDetails } from "index/services/util/CommonAPIMethodService";

interface IncidentReportingComponentProps { }

const IncidentReportingComponent: React.FunctionComponent<
  IncidentReportingComponentProps
> = () => {
  const splitStrings = ["incident_details"];
  const initialSearchObj = {
    incident_reportingid: "",
    "incident_date": moment(),
    "incident_statusid": "",
    "reporting_date": "",
    "customer": "",
    "area_of_incident": "",
    "line": "",
    "category": "",
    "material_masterid": "",
    "gxp_relevant": "",
    "batch_number": "",
    "incident_natureid": "",
    "relevent_to_capa": "",
    incident_details: "",
    "incident_details1": "",
    "incident_details2": "",
    "incident_details3": "",
    "incident_initiator": "",
    "incident_initiator_signed_date": "",
    "incident_initiator_user_group": "",
    "hod": "",
    "hod_signed_date": "",
    "hod_user_group": "",
    "qa_approver": "",
    "qa_approver_signed_date": "",
    "qa_approver_user_group": "",

    "company": getUserCompanyName()
  }
  const eSigDefinition = {
    initiator: "initiator",
    hod: "hod",
    qa_approver: "qa_approver",
  }

  useEffect(() => {
    const company_name = localStorage.getItem("company");
    if (company_name) {
      setInitialData({
        ...initialData,
        company: company_name
      })
      getFields(company_name);
    }
  }, []);


  const selectedChangeRequest = React.useRef(undefined);
  const [tableName, setTableName] = useState("");
  const [fieldCaptions, setFieldCaptions] = useState({} as any);
  const { updateStatus } = React.useContext(StatusContext);
  const [eSigDialog, setESigDialog] = useState({ isOpen: false, netWorkId: "", groupName: "", type: "",roleName:"" })


  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState(initialSearchObj);
  const [extraFields, setExtraFields] = useState({
    material_description: "",
    batch_size: "",
    material_type: ""
  });

  const [incidentDialog, setIncidentDialog] = useState({
    isOpen: false,
    data: {},
  });
  const [materialDialog, setMaterialDialog] = useState({
    isOpen: false,
    data: {},
  });

  const handleIncidentDialogOpen = (data?: any) => {
    setIncidentDialog({ data, isOpen: true });
  };
  const handleIncidentDialogClose = (data?: any) => {
    if (data) {
      let requestObj = joinStringArray(data, splitStrings);
      setInitialData(requestObj);
      selectedChangeRequest.current = requestObj;
    }
    setIncidentDialog({ data: {}, isOpen: false });
  };

  const handleMaterialDialogOpen = (data?: any, searchObj?: any) => {
    setMaterialDialog({ data, isOpen: true });
    if (searchObj) {
      setInitialData({
        ...initialData,
        ...searchObj
      })
    }
  };
  const handleMaterialDialogClose = async (data?: any) => {
    if (data) {
      console.log(data);
      setInitialData({
        ...initialData,
        // material_description:data.description,
        material_masterid: data.material_typeid
      });
      setExtraFields({
        ...extraFields,
        material_description: data.description
      });
      let materialQuery = getMaterialMasterDetails(data.material_masterid, data.material_typeid, data.material_groupid);
      let materialRes = await getQueryDetails(materialQuery);
      if (materialRes) {
        if (materialRes.dTable.length > 0) {
          setInitialData({
            ...initialData,
            material_masterid: data.material_masterid,
            batch_number: materialRes.dTable[0]["batch NUMBER"],
          });

          setExtraFields({
            ...extraFields,
            material_description: materialRes.dTable[0]["material"],
            material_type: materialRes.dTable[0]["material Type"],
            batch_size: materialRes.dTable[0]["batch QUANTITY"] || "",
          });
        }
      }
    }
    setMaterialDialog({ data: {}, isOpen: false });
  };

  const getFields = async (company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(TABLE_NAMES.INCIDENT_REPORTING, company);
    if (result && result.errorNo == 0) {
      let fieldCaptionsList: any = [];
      let formLoadData: any = result?.formLoadData || [];
      if (result.dTable.length > 0) {
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
      let fieldCaptionsDic = fieldCaptionsList.reduce((acc: any, ele: any) => {
        acc[ele.field_name] = ele;
        return acc;
      }, {});
      console.log(fieldCaptionsDic);
      setFieldCaptions(fieldCaptionsDic)
    } else {
      updateStatus(result?.resultMessage, "error");
    }
    setLoading(false);
  }

  const handleCloseESigDialog = async (data: any) => {
    if (data) {
      let selectedCRDetails: any = selectedChangeRequest.current;
      switch (eSigDialog.type) {
        case eSigDefinition.initiator:
          selectedCRDetails.incident_initiator = data.networkid;
          selectedCRDetails.incident_initiator_signed_date = moment();
          selectedCRDetails.incident_initiator_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.hod:
          selectedCRDetails.hod = data.networkid;
          selectedCRDetails.hod_signed_date = moment();
          selectedCRDetails.hod_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.qa_approver:
          selectedCRDetails.qa_approver = data.networkid;
          selectedCRDetails.qa_approver_signed_date = moment();
          selectedCRDetails.qa_approver_user_group = data.useR_GROUPSID;
          break;
      }
      let result = await addOrUpdateIR(selectedCRDetails);
      if (result && result.errorNo === 0) {
        let searchObj = {
          incident_reportingid: initialData.incident_reportingid,
          "company": getUserCompanyName(),
        }

        var objectArr: string[] = convertToObjectArr(searchObj);
        let transactionObj = await getTransactionObject(TABLE_NAMES.INCIDENT_REPORTING, objectArr);
        if (transactionObj) {
          let result = await processModelingDetails(API_METHOD_TYPES.GET, TABLE_NAMES.INCIDENT_REPORTING, transactionObj);
          if (result.dTable.length > 0) {
            let selectedObj: any = {};
            Object.keys(result.dTable[0]).forEach(ele => {
              selectedObj[ele.toLowerCase()] = result.dTable[0][ele];
            });
            setInitialData({
              ...selectedObj,
              incident_reportingid: initialData.incident_reportingid
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
      roleName:""
    })

  }

  const handleOpenESigDialog = (type: string, groupName?: string,roleName?: string,) => {
    let loggedInDetails = localStorage.getItem("loggedInUser");
    if (loggedInDetails) {
      let userDetails = JSON.parse(loggedInDetails);
      setESigDialog({
        netWorkId: userDetails.networkid,
        isOpen: true,
        groupName: groupName || "",
        type: type,
        roleName:roleName||""
      })
    }
  }


  const addOrUpdateIR = async (details: any, isESig?: boolean) => {
    setLoading(true);
    let obj = splitStringToArray(details, splitStrings);
    var objectArr: string[] = convertToObjectArr(obj);
    let transactionObj = await getTransactionObject(
      TABLE_NAMES.INCIDENT_REPORTING,
      objectArr
    );
    if (transactionObj) {
      let result = await processModelingDetails(
        API_METHOD_TYPES.POST,
        TABLE_NAMES.INCIDENT_REPORTING,
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
  }


  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">{tableName}</h2>
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
                      if (ele.field_name.includes("details")) {
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
                  let result = await addOrUpdateIR(obj);
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
                              disabled
                              name="incident_reportingid"
                              label={fieldCaptions["incident_reportingid"]?.field_caption || "Incident Reporting ID"}
                              type="text"
                              value={values.incident_reportingid}
                              required={fieldCaptions["incident_reportingid"]?.userrequired != 0}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.incident_reportingid &&
                                  (touched.incident_reportingid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.incident_reportingid &&
                                (touched.incident_reportingid || isSubmited) &&
                                errors.incident_reportingid
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
                                  handleIncidentDialogOpen();
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled
                            label={fieldCaptions["incident_date"]?.field_caption}
                            name="incident_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("incident_date", tempValue);
                            }}
                            required={fieldCaptions["incident_date"]?.userrequired != 0}
                            value={values?.incident_date || ""}
                            minDate={moment()}
                            error={
                              errors.incident_date &&
                                (touched.incident_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.incident_date &&
                              (touched.incident_date || isSubmited) &&
                              errors.incident_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppSelectInput
                                menuItems={fieldCaptions["incident_statusid"]?.listValues}
                                label={fieldCaptions["incident_statusid"]?.field_caption}
                                name="incident_statusid"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = e?.value || null;
                                  setFieldValue("incident_statusid", tempValue);
                                }}
                                required={fieldCaptions["incident_statusid"]?.userrequired != 0}
                                value={values.incident_statusid}
                                error={
                                  errors.incident_statusid &&
                                    (touched.incident_statusid || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.incident_statusid &&
                                  (touched.incident_statusid || isSubmited) &&
                                  errors.incident_statusid
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppDatePicker
                            label={fieldCaptions["reporting_date"]?.field_caption}
                            name="reporting_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("reporting_date", tempValue);
                            }}
                            required={fieldCaptions["reporting_date"]?.userrequired != 0}
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
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="customer"
                            label={fieldCaptions["customer"]?.field_caption}
                            type="text"
                            value={values.customer}
                            required={fieldCaptions["customer"]?.userrequired != 0}
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
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="area_of_incident"
                            label={fieldCaptions["area_of_incident"]?.field_caption}
                            type="text"
                            value={values.area_of_incident}
                            required={fieldCaptions["area_of_incident"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.area_of_incident &&
                                (touched.area_of_incident || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.area_of_incident &&
                              (touched.area_of_incident || isSubmited) &&
                              errors.area_of_incident
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="line"
                            label={fieldCaptions["line"]?.field_caption}
                            required={fieldCaptions["line"]?.userrequired != 0}
                            type="text"
                            value={values.line}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.line && (touched.line || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.line &&
                              (touched.line || isSubmited) &&
                              errors.line
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={fieldCaptions["category"]?.listValues}
                            label={fieldCaptions["category"]?.field_caption}
                            required={fieldCaptions["category"]?.userrequired != 0}
                            name="category"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("category", tempValue);
                            }}
                            value={values.category}
                            error={
                              errors.category &&
                                (touched.category || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.category &&
                              (touched.category || isSubmited) &&
                              errors.category
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={fieldCaptions["gxp_relevant"]?.listValues}
                            label={fieldCaptions["gxp_relevant"]?.field_caption}
                            name="gxp_relevant"
                            required={fieldCaptions["gxp_relevant"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("gxp_relevant", tempValue);
                            }}
                            value={values.gxp_relevant}
                            error={
                              errors.gxp_relevant &&
                                (touched.gxp_relevant || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.gxp_relevant &&
                              (touched.gxp_relevant || isSubmited) &&
                              errors.gxp_relevant
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
                              disabled
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
                            label={"Material Description"}
                            type="text"
                            value={extraFields.material_description}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppTextInput
                            name="material_type"
                            disabled
                            label={"Material Type"}
                            type="text"
                            value={extraFields.material_type}
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="batch_size"
                            disabled
                            label="Batch Size"
                            type="text"
                            value={extraFields.batch_size}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={fieldCaptions["incident_natureid"]?.listValues}
                            label="Nature of Incident"
                            name="incident_natureid"
                            required={fieldCaptions["incident_natureid"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("incident_natureid", tempValue);
                            }}
                            value={values.incident_natureid}
                            error={
                              errors.incident_natureid &&
                                (touched.incident_natureid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.incident_natureid &&
                              (touched.incident_natureid || isSubmited) &&
                              errors.incident_natureid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={fieldCaptions["relevent_to_capa"]?.listValues}
                            label={fieldCaptions["relevent_to_capa"]?.field_caption}
                            required={fieldCaptions["relevent_to_capa"]?.userrequired != 0}
                            name="relevent_to_capa"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("relevent_to_capa", tempValue);
                            }}
                            value={values.relevent_to_capa}
                            error={
                              errors.relevent_to_capa &&
                                (touched.relevent_to_capa || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.relevent_to_capa &&
                              (touched.relevent_to_capa || isSubmited) &&
                              errors.relevent_to_capa
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="incident_details"
                            label={fieldCaptions["incident_details1"]?.field_caption}
                            required={fieldCaptions["incident_details1"]?.userrequired != 0}
                            type="text"
                            value={values.incident_details}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={4}
                            error={
                              errors.incident_details &&
                                (touched.incident_details || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.incident_details &&
                              (touched.incident_details || isSubmited) &&
                              errors.incident_details
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
                      {values?.incident_reportingid && (
                        <React.Fragment>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={9} lg={6}>
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">Initiator</Typography>
                                </Grid>
                                {values.incident_initiator ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="incident_initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.incident_initiator}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="incident_initiator_signed_date"
                                        value={values?.incident_initiator_signed_date || ""}
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
                                        onClick={() => handleOpenESigDialog(eSigDefinition.initiator, "")}
                                        btnText="Collect ESig."
                                      />
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Grid>
                              <br />
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">HOD</Typography>
                                </Grid>
                                {values.hod ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="hod"
                                        label="User ID"
                                        type="text"
                                        value={values.hod}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="hod_signed_date"
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
                                        onClick={() => handleOpenESigDialog(eSigDefinition.hod, "",USER_ROLES.HOD)}
                                        btnText="Collect ESig."
                                      />
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Grid>
                              <br />
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">QA Approval</Typography>
                                </Grid>
                                {values.qa_approver ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.qa_approver}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="qa_approver_signed_date"
                                        value={values?.qa_approver_signed_date || ""}
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
                                        disabled={values.incident_initiator ? false : true}
                                        onClick={() => handleOpenESigDialog(eSigDefinition.qa_approver, USER_GROUPS.QualityAssurance)}
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
      {incidentDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="Incident Search"
          data={incidentDialog?.data}
          onClose={(data: any) => handleIncidentDialogClose(data)}
          tableName={TABLE_NAMES.INCIDENT_REPORTING.toLocaleLowerCase()}
        />
      )}
      {materialDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="Material Search"
          data={materialDialog?.data}
          onClose={(data: any) => handleMaterialDialogClose(data)}
          tableName={TABLE_NAMES.MATERIAL_MASTER.toLocaleLowerCase()}
        />
      )}
      {eSigDialog.isOpen && (
        <CustomDialogComponent
          title={`E-Signature`}
          onClose={handleCloseESigDialog}
          fullWidth
          variant="sm"
        >
          <LoginComponent roleName={eSigDialog.roleName} groupName={eSigDialog.groupName} netWorkId={eSigDialog.netWorkId} submitText="Collect Signature" handleClose={handleCloseESigDialog} />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default IncidentReportingComponent;

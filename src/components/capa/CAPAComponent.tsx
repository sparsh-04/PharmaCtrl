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
import { API_METHOD_TYPES, TABLE_NAMES, USER_GROUPS, USER_ROLES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
import { StatusContext } from "index/providers/StatusProvider";
import {
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

interface CAPAComponentProps {}

const CAPAComponent: React.FunctionComponent<CAPAComponentProps> = () => {
  const splitStrings = ["capa_raised_for", "capa_proposed"];
  const [initialData, setInitialData] = useState({
    capa_date: moment(),
    approved_on: "",
    customer: "",
    capa_statusid: "",
    closed_on: "",
    reference_number: "",
    capa_reference_typeid: "",
    capa_categoryid: "",
    capa_areaid: "",
    product_impact: "",
    gxp_relevant: "",
    capa_raised_for1: "",
    capa_raised_for2: "",
    capa_proposed1: "",
    capa_proposed2: "",
    capa_initiator: "",
    capa_initiator_signed_date: "",
    capa_initiator_user_group: "",
    capa_cft: "",
    capa_cft_signed_date: "",
    cft_initiator_user_group: "",
    qa_approver: "",
    qa_approver_signed_date: "",
    qa_approver_user_group: "",
    qa_hod: "",
    qa_hod_signed_date: "",
    qa_hod_user_group: "",
    company: getUserCompanyName(),
    capaid: "",
    capa_raised_for: "",
    capa_proposed: "",
  });
  const eSigDefinition = {
    capa_initiator: "capa_initiator",
    capa_cft: "capa_cft",
    qa_hod: "qa_hod",
    qa_approver: "qa_approver",
  };
  const selectedCapa = React.useRef(undefined);

  const [eSigDialog, setESigDialog] = useState({
    isOpen: false,
    netWorkId: "",
    groupName: "",
    type: "",
    roleName:""
  });
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [isCollectSigDisabled, setIsCollectSigDisabled] = useState(false);
  const [tableName, setTableName] = useState("");
  const [fieldCaptions, setFieldCaptions] = useState({} as any);
  const { updateStatus } = React.useContext(StatusContext);
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
    const result = await getTableFieldCaptions(TABLE_NAMES.CAPA, company);
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

      console.log(fieldCaptionsDic, ' "company": getUserCompanyName(),');
      setFieldCaptions(fieldCaptionsDic);
    } else {
      updateStatus(result?.resultMessage, "error");
    }
    setLoading(false);
  };

  const addOrUpdateCapa = async (details: any, isESig?: boolean) => {
    setLoading(true);
    let obj = splitStringToArray(details, splitStrings);
    var objectArr: string[] = convertToObjectArr(obj);
    let transactionObj = await getTransactionObject(
      TABLE_NAMES.CAPA,
      objectArr
    );
    if (transactionObj) {
      let result = await processModelingDetails(
        API_METHOD_TYPES.POST,
        TABLE_NAMES.CAPA,
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
  const [capaDialog, setCAPADialog] = useState({
    isOpen: false,
    data: {},
  });

  const handleCAPADialogOpen = (data?: any) => {
    setCAPADialog({ data, isOpen: true });
  };
  const handleCAPADialogClose = (data?: any) => {
    if (data) {
      let capaObj = joinStringArray(data, splitStrings);
      setInitialData(capaObj);
      selectedCapa.current = capaObj;
    }
    setCAPADialog({ data: {}, isOpen: false });
  };

  const handleCloseESigDialog = async (data: any) => {
    if (data) {
      let selectedCapaDetails: any = selectedCapa.current;
      console.log(data, "data");
      switch (eSigDialog.type) {
        case eSigDefinition.capa_initiator:
          selectedCapaDetails.capa_initiator = data.networkid;
          selectedCapaDetails.capa_initiator_signed_date = moment();
          selectedCapaDetails.capa_initiator_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.capa_cft:
          selectedCapaDetails.capa_cft = data.networkid;
          selectedCapaDetails.capa_cft_signed_date = moment();
          selectedCapaDetails.cft_initiator_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.qa_approver:
          selectedCapaDetails.qa_approver = data.networkid;
          selectedCapaDetails.qa_approver_signed_date = moment();
          selectedCapaDetails.qa_approver_user_group = data.useR_GROUPSID;
          break;
        case eSigDefinition.qa_hod:
          selectedCapaDetails.qa_hod = data.networkid;
          selectedCapaDetails.qa_hod_signed_date = moment();
          selectedCapaDetails.qa_hod_user_group = data.useR_GROUPSID;
          break;
      }
      let result = await addOrUpdateCapa(selectedCapaDetails);
      if (result && result.errorNo === 0) {
        let searchObj = {
          capaid: initialData.capaid,
          company: getUserCompanyName(),
        };

        var objectArr: string[] = convertToObjectArr(searchObj);
        let transactionObj = await getTransactionObject(
          TABLE_NAMES.CAPA,
          objectArr
        );
        if (transactionObj) {
          let result = await processModelingDetails(
            API_METHOD_TYPES.GET,
            TABLE_NAMES.CAPA,
            transactionObj
          );
          if (result.dTable.length > 0) {
            let selectedObj: any = {};
            Object.keys(result.dTable[0]).forEach((ele) => {
              selectedObj[ele.toLowerCase()] = result.dTable[0][ele];
            });
            setInitialData({
              ...selectedObj,
              capaid: initialData.capaid,
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
    });
  };

  const handleOpenESigDialog = (type: string, groupName?: string, roleName?: string) => {
    let loggedInDetails = localStorage.getItem("loggedInUser");
    if (loggedInDetails) {
      let userDetails = JSON.parse(loggedInDetails);
      setESigDialog({
        netWorkId: userDetails.networkid,
        isOpen: true,
        groupName: groupName || "",
        type: type,
        roleName:roleName|| ""
      });
    }
  };

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
                      if (
                        ele.field_name.includes("capa_raised_for") ||
                        ele.field_name.includes("capa_proposed")
                      ) {
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
                  console.log("test", values);
                  let obj = { ...values };
                  let result = await addOrUpdateCapa(obj);
                  if (result && result.errorNo === 0) {
                    resetForm();
                    setInitialData(initialData);
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
                                  handleCAPADialogOpen();
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
                            label={fieldCaptions["capa_date"]?.field_caption}
                            required={
                              fieldCaptions["capa_date"]?.userrequired != 0
                            }
                            name="capa_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("capa_date", tempValue);
                            }}
                            value={values?.capa_date || ""}
                            minDate={moment()}
                            error={
                              errors.capa_date &&
                              (touched.capa_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_date &&
                              (touched.capa_date || isSubmited) &&
                              errors.capa_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label={fieldCaptions["approved_on"]?.field_caption}
                            required={
                              fieldCaptions["approved_on"]?.userrequired != 0
                            }
                            name="approved_on"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("approved_on", tempValue);
                            }}
                            value={values?.approved_on || ""}
                            minDate={moment()}
                            error={
                              errors.approved_on &&
                              (touched.approved_on || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.approved_on &&
                              (touched.approved_on || isSubmited) &&
                              errors.approved_on
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
                              fieldCaptions["capa_statusid"]?.listValues
                            }
                            label={
                              fieldCaptions["capa_statusid"]?.field_caption
                            }
                            required={
                              fieldCaptions["capa_statusid"]?.userrequired != 0
                            }
                            name="capa_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("capa_statusid", tempValue);
                            }}
                            value={values.capa_statusid}
                            error={
                              errors.capa_statusid &&
                              (touched.capa_statusid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_statusid &&
                              (touched.capa_statusid || isSubmited) &&
                              errors.capa_statusid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label={fieldCaptions["closed_on"]?.field_caption}
                            required={
                              fieldCaptions["closed_on"]?.userrequired != 0
                            }
                            name="closed_on"
                            onBlur={handleBlur}
                            disabled={
                              values.qa_hod ? true : false
                            }
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("closed_on", tempValue);
                            }}
                            value={values?.closed_on || ""}
                            minDate={moment()}
                            error={
                              errors.closed_on &&
                              (touched.closed_on || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.closed_on &&
                              (touched.closed_on || isSubmited) &&
                              errors.closed_on
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="reference_number"
                            label={
                              fieldCaptions["reference_number"]?.field_caption
                            }
                            required={
                              fieldCaptions["reference_number"]?.userrequired !=
                              0
                            }
                            type="text"
                            value={values.reference_number}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.reference_number &&
                              (touched.reference_number || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.reference_number &&
                              (touched.reference_number || isSubmited) &&
                              errors.reference_number
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={
                              fieldCaptions["capa_reference_typeid"]?.listValues
                            }
                            label={
                              fieldCaptions["capa_reference_typeid"]
                                ?.field_caption
                            }
                            required={
                              fieldCaptions["capa_reference_typeid"]
                                ?.userrequired != 0
                            }
                            name="capa_reference_typeid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("capa_reference_typeid", tempValue);
                            }}
                            value={values.capa_reference_typeid}
                            error={
                              errors.capa_reference_typeid &&
                              (touched.capa_reference_typeid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_reference_typeid &&
                              (touched.capa_reference_typeid || isSubmited) &&
                              errors.capa_reference_typeid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={
                              fieldCaptions["capa_categoryid"]?.listValues
                            }
                            label={
                              fieldCaptions["capa_categoryid"]?.field_caption
                            }
                            required={
                              fieldCaptions["capa_categoryid"]?.userrequired !=
                              0
                            }
                            name="capa_categoryid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("capa_categoryid", tempValue);
                            }}
                            value={values.capa_categoryid}
                            error={
                              errors.capa_categoryid &&
                              (touched.capa_categoryid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_categoryid &&
                              (touched.capa_categoryid || isSubmited) &&
                              errors.capa_categoryid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={fieldCaptions["capa_areaid"]?.listValues}
                            label={fieldCaptions["capa_areaid"]?.field_caption}
                            required={
                              fieldCaptions["capa_areaid"]?.userrequired != 0
                            }
                            name="capa_areaid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("capa_areaid", tempValue);
                            }}
                            value={values.capa_areaid}
                            error={
                              errors.capa_areaid &&
                              (touched.capa_areaid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_areaid &&
                              (touched.capa_areaid || isSubmited) &&
                              errors.capa_areaid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={
                              fieldCaptions["product_impact"]?.listValues
                            }
                            label={
                              fieldCaptions["product_impact"]?.field_caption
                            }
                            required={
                              fieldCaptions["product_impact"]?.userrequired != 0
                            }
                            name="product_impact"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("product_impact", tempValue);
                            }}
                            value={values.product_impact}
                            error={
                              errors.product_impact &&
                              (touched.product_impact || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.product_impact &&
                              (touched.product_impact || isSubmited) &&
                              errors.product_impact
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={
                              fieldCaptions["gxp_relevant"]?.listValues
                            }
                            label={fieldCaptions["gxp_relevant"]?.field_caption}
                            required={
                              fieldCaptions["gxp_relevant"]?.userrequired != 0
                            }
                            name="gxp_relevant"
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
                        <Grid item xs={12}>
                          <AppTextInput
                            name="capa_raised_for"
                            label={
                              fieldCaptions["capa_raised_for1"]?.field_caption
                            }
                            required={
                              fieldCaptions["capa_raised_for1"]?.userrequired !=
                              0
                            }
                            type="text"
                            value={values.capa_raised_for}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={4}
                            error={
                              errors.capa_raised_for &&
                              (touched.capa_raised_for || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_raised_for &&
                              (touched.capa_raised_for || isSubmited) &&
                              errors.capa_raised_for
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="capa_proposed"
                            label={
                              fieldCaptions["capa_proposed1"]?.field_caption
                            }
                            required={
                              fieldCaptions["capa_proposed1"]?.userrequired != 0
                            }
                            type="text"
                            value={values.capa_proposed}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={4}
                            error={
                              errors.capa_proposed &&
                              (touched.capa_proposed || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capa_proposed &&
                              (touched.capa_proposed || isSubmited) &&
                              errors.capa_proposed
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
                      {values?.capaid && (
                        <React.Fragment>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={9} lg={6}>
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">
                                    Initiator
                                  </Typography>
                                </Grid>
                                {values.capa_initiator ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="capa_initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.capa_initiator}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="capa_initiator_signed_date"
                                        value={
                                          values?.capa_initiator_signed_date ||
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
                                            eSigDefinition.capa_initiator,
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
                                {values.capa_cft ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="capa_cft"
                                        label="User ID"
                                        type="text"
                                        value={values.capa_cft}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="capa_cft_signed_date"
                                        value={
                                          values?.capa_cft_signed_date || ""
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
                                            eSigDefinition.capa_cft,
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
                                    QA Approver
                                  </Typography>
                                </Grid>
                                {values.qa_approver ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="qa_approver"
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
                                        value={
                                          values?.qa_approver_signed_date || ""
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
                                            eSigDefinition.qa_approver,
                                            USER_GROUPS.QualityAssurance
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
                                  <Typography variant="h6">QA HOD</Typography>
                                </Grid>
                                {values.qa_hod ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="qa_hod"
                                        label="User ID"
                                        type="text"
                                        value={values.qa_hod}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="qa_hod_signed_date"
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
                                          values.capa_initiator ? false : true
                                        }
                                        onClick={() =>
                                          handleOpenESigDialog(
                                            eSigDefinition.qa_hod,
                                            USER_GROUPS.QualityAssurance,
                                            USER_ROLES.HOD
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
            roleName={eSigDialog.roleName}
            netWorkId={eSigDialog.netWorkId}
            submitText="Collect Signature"
            handleClose={handleCloseESigDialog}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default CAPAComponent;

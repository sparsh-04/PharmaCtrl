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
import { API_METHOD_TYPES, TABLE_NAMES, USER_GROUPS } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
import { getTableFieldCaptions, getTransactionObject, processModelingDetails } from "index/services/modeling/ModelingService";
import { StatusContext } from "index/providers/StatusProvider";
import { convertToObjectArr, getUserCompanyName, joinStringArray, splitStringToArray } from "index/services/util/UtilService";
import CustomDialogComponent from "../common/CustomDialogComponent";
import LoginComponent from "../auth/LoginComponent";

interface ChangeRequestComponentProps { }

const ChangeRequestComponent: React.FunctionComponent<
  ChangeRequestComponentProps
> = () => {
  const splitStrings = ["current_description", "proposed_description"];
  const initialSearchObj = {
    change_requestid: "",
    "created_date": moment(),
    "effective_date": "",
    "customer": "",
    "criticality": "",
    "change_required_date": "",
    "gxp_relevant": "",
    "change_requested_area": "",
    "current_description": "",
    "current_description1": "",
    "current_description2": "",
    "proposed_description": "",
    "proposed_description1": "",
    "proposed_description2": "",
    "initiator": "",
    "initiator_signed_date": "",
    "initiatoR_USER_GROUP": "",
    "cft_member": "",
    "cft_member_signed_date": "",
    "cfT_MEMBER_USER_GROUP": "",
    "qa_approver": "",
    "qa_approver_signed_date": "",
    "qA_APPROVER_USER_GROUP": "",
    "company": getUserCompanyName(),
  }
  const eSigDefinition = {
    initiator: "initiator",
    cft_member: "cft_member",
    qa_approver: "qa_approver",
  }
  const selectedChangeRequest = React.useRef(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitted, setSubmitted] = React.useState(false);

  const [initialData, setInitialData] = useState(initialSearchObj);

  const [tableName, setTableName] = useState("");
  const [fieldCaptions, setFieldCaptions] = useState({} as any);
  const { updateStatus } = React.useContext(StatusContext);

  const [eSigDialog, setESigDialog] = useState({ isOpen: false, netWorkId: "", groupName: "", type: "" })

  const [crNumberDialog, setCrNumberDialog] = useState({
    isOpen: false,
    data: {},
  });

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

  const getFields = async (company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(TABLE_NAMES.CHANGE_REQUEST, company);
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
      setFieldCaptions(fieldCaptionsDic)
    } else {
      updateStatus(result?.resultMessage, "error");
    }
    setLoading(false);
  }

  const handleCrNumberDialogOpen = (data?: any) => {
    setCrNumberDialog({ data, isOpen: true });
  };
  const handleCrNumberDialogClose = (data?: any) => {
    if (data) {
      let requestObj = joinStringArray(data, splitStrings);
      setInitialData(requestObj);
      selectedChangeRequest.current = requestObj;
    }
    setCrNumberDialog({ data: {}, isOpen: false });
  };

  const handleCloseESigDialog = async (data: any) => {
    if (data) {
      let selectedCRDetails: any = selectedChangeRequest.current;
      switch (eSigDialog.type) {
        case eSigDefinition.initiator:
          selectedCRDetails.initiator = data.networkid;
          selectedCRDetails.initiator_signed_date = moment();
          selectedCRDetails.initiatoR_USER_GROUP = data.useR_GROUPSID;
          break;
        case eSigDefinition.cft_member:
          selectedCRDetails.cft_member = data.networkid;
          selectedCRDetails.cft_member_signed_date = moment();
          selectedCRDetails.cfT_MEMBER_USER_GROUP = data.useR_GROUPSID;
          break;
        case eSigDefinition.qa_approver:
          selectedCRDetails.qa_approver = data.networkid;
          selectedCRDetails.qa_approver_signed_date = moment();
          selectedCRDetails.qA_APPROVER_USER_GROUP = data.useR_GROUPSID;
          break;
      }
      let result = await addOrUpdateChangeRequest(selectedCRDetails);
      if (result && result.errorNo === 0) {
        let searchObj = {
          change_requestid: initialData.change_requestid,
          "company": getUserCompanyName(),
        }

        var objectArr: string[] = convertToObjectArr(searchObj);
        let transactionObj = await getTransactionObject(TABLE_NAMES.CHANGE_REQUEST, objectArr);
        if (transactionObj) {
          let result = await processModelingDetails(API_METHOD_TYPES.GET, TABLE_NAMES.CHANGE_REQUEST, transactionObj);
          if (result.dTable.length > 0) {
            let selectedObj:any = {};
            Object.keys(result.dTable[0]).forEach(ele=>{
              selectedObj[ele.toLowerCase()] = result.dTable[0][ele];
            });
            setInitialData({
              ...selectedObj,
              change_requestid:initialData.change_requestid
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
      isOpen: false
    })

  }

  const handleOpenESigDialog = (type: string, groupName?: string) => {
    let loggedInDetails = localStorage.getItem("loggedInUser");
    if (loggedInDetails) {
      let userDetails = JSON.parse(loggedInDetails);
      setESigDialog({
        netWorkId: userDetails.networkid,
        isOpen: true,
        groupName: groupName || "",
        type: type
      })
    }
  }

  const addOrUpdateChangeRequest = async (details: any, isESig?: boolean) => {
    setLoading(true);
    let obj = splitStringToArray(details, splitStrings);
    var objectArr: string[] = convertToObjectArr(obj);
    let transactionObj = await getTransactionObject(
      TABLE_NAMES.CHANGE_REQUEST,
      objectArr
    );
    if (transactionObj) {
      let result = await processModelingDetails(
        API_METHOD_TYPES.POST,
        TABLE_NAMES.CHANGE_REQUEST,
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2 className="header-margin">{tableName}</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent className="p-0">
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
                  let result = await addOrUpdateChangeRequest(obj);
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
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <Box display="flex" alignItems="flex-end">
                            <AppTextInput
                              disabled
                              name="change_requestid"
                              label={"CR Number"}
                              type="text"
                              value={values.change_requestid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.change_requestid && (touched.change_requestid || isSubmitted)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.change_requestid &&
                                (touched.change_requestid || isSubmitted) &&
                                errors.change_requestid
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
                                  handleCrNumberDialogOpen();
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppDatePicker
                            disabled
                            label={fieldCaptions["created_date"]?.field_caption}
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
                              errors.created_date && (touched.created_date || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.created_date &&
                              (touched.created_date || isSubmitted) &&
                              errors.created_date
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppDatePicker
                            label={fieldCaptions["effective_date"]?.field_caption}
                            name="effective_date"
                            required={fieldCaptions["effective_date"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("effective_date", tempValue);
                            }}
                            value={values?.effective_date || ""}
                            minDate={moment()}
                            error={
                              errors.effective_date &&
                                (touched.effective_date || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.effective_date &&
                              (touched.effective_date || isSubmitted) &&
                              errors.effective_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppTextInput
                            name="customer"
                            required={fieldCaptions["customer"]?.userrequired != 0}
                            label={fieldCaptions["customer"]?.field_caption}
                            type="text"
                            value={values.customer}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.customer &&
                                (touched.customer || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.customer &&
                              (touched.customer || isSubmitted) &&
                              errors.customer
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={fieldCaptions["criticality"]?.listValues}
                            label={fieldCaptions["criticality"]?.field_caption}
                            name="criticality"
                            required={fieldCaptions["criticality"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("criticality", tempValue);
                            }}
                            value={values.criticality}
                            error={
                              errors.criticality &&
                                (touched.criticality || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.criticality &&
                              (touched.criticality || isSubmitted) &&
                              errors.criticality
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppDatePicker
                            label={fieldCaptions["change_required_date"]?.field_caption}
                            name="change_required_date"
                            required={fieldCaptions["change_required_date"]?.userrequired != 0}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(
                                "change_required_date",
                                tempValue
                              );
                            }}
                            value={values?.change_required_date || ""}
                            minDate={moment()}
                            error={
                              errors.change_required_date &&
                                (touched.change_required_date || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.change_required_date &&
                              (touched.change_required_date ||
                                isSubmitted) &&
                              errors.change_required_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
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
                                (touched.gxp_relevant || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.gxp_relevant &&
                              (touched.gxp_relevant || isSubmitted) &&
                              errors.gxp_relevant
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppTextInput
                            name="change_requested_area"
                            required={fieldCaptions["change_requested_area"]?.userrequired != 0}
                            label={fieldCaptions["change_requested_area"]?.field_caption}
                            type="text"
                            value={values.change_requested_area}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.change_requested_area &&
                                (touched.change_requested_area || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.change_requested_area &&
                              (touched.change_requested_area || isSubmitted) &&
                              errors.change_requested_area
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <AppTextInput
                            name="current_description"
                            required={fieldCaptions["current_description1"]?.userrequired != 0}
                            label={fieldCaptions["current_description1"]?.field_caption}
                            type="text"
                            value={values.current_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={2}
                            error={
                              errors.current_description &&
                                (touched.current_description || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.current_description &&
                              (touched.current_description || isSubmitted) &&
                              errors.current_description
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="proposed_description"
                            required={fieldCaptions["proposed_description1"]?.userrequired != 0}
                            label={fieldCaptions["proposed_description1"]?.field_caption}
                            type="text"
                            value={values.proposed_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline={true}
                            rows={2}
                            error={
                              errors.proposed_description &&
                                (touched.proposed_description || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.proposed_description &&
                              (touched.proposed_description || isSubmitted) &&
                              errors.proposed_description
                            }
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <AppButton
                            variant="outlined"
                            color="primary"
                            size="medium"
                            onClick={() => {
                              resetForm();
                              setInitialData(initialSearchObj)
                            }}
                            btnText="Clear"
                          />
                        </Grid>
                        <Grid item>
                          <AppButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              if (!isSubmitted) {
                                setSubmitted(true);
                              }
                            }}
                            disabled={isSubmitting}
                            btnText="Save"
                          />
                        </Grid>
                      </Grid>
                      {values?.change_requestid && (
                        <React.Fragment>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={9} lg={6}>
                              <Grid container spacing={0} alignItems="center">
                                <Grid item lg={4}>
                                  <Typography variant="h6">Initiator</Typography>
                                </Grid>
                                {values.initiator ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.initiator}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="initiator_signed_date"
                                        value={values?.initiator_signed_date || ""}
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
                                  <Typography variant="h6">CFT Member</Typography>
                                </Grid>
                                {values.cft_member ? (
                                  <React.Fragment>
                                    <Grid item lg={4}>
                                      <AppTextInput
                                        name="initiator"
                                        label="User ID"
                                        type="text"
                                        value={values.cft_member}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                      <AppDatePicker
                                        label="Signed On"
                                        name="cft_member_signed_date"
                                        value={values?.cft_member_signed_date || ""}
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
                                        onClick={() => handleOpenESigDialog(eSigDefinition.cft_member, "")}
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
                                        disabled={values.initiator ? false : true}
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
      {crNumberDialog?.isOpen && (
        <ObjectSearchDialogComponent
          title="Change Request Search"
          onClose={handleCrNumberDialogClose}
          data={crNumberDialog?.data}
          tableName={TABLE_NAMES.CHANGE_REQUEST.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
      {eSigDialog.isOpen && (
        <CustomDialogComponent
          title={`E-Signature`}
          onClose={handleCloseESigDialog}
          fullWidth
          variant="sm"
        >
          <LoginComponent groupName={eSigDialog.groupName} netWorkId={eSigDialog.netWorkId} submitText="Collect Signature" handleClose={handleCloseESigDialog} />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ChangeRequestComponent;

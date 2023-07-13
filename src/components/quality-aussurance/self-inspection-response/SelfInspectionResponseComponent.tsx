import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Fab,
} from "@mui/material";
import { Formik } from "formik";
import Loading from "index/components/common/Loading";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
import { useState, useEffect } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import { TABLE_NAMES } from "index/Constant";

interface SelfInspectionResponseComponentProps {}

const SelfInspectionResponseComponent: React.FunctionComponent<
  SelfInspectionResponseComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    inspection_reportid: "",
    inspection_response_statusid: "",
    page_no: "",
    audit_locationsid: "",
    audited_date: "",
    area_audited: "",
    auditee: "",
    observation_text: "",
    observation_typesid: "",
    corrective_action: "",
    target_date: "",
    compliance_statusid: "",
    notes: "",
  });
  const [auditLocations, setAuditLocations] = useState([]);
  const [inspectionStatuses, setInspectionStatuses] = useState([]);
  const [observations, setObservations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, data: {} });

  const handleDialogOpen = (data?: any) => {
    setDialogInfo({ data, isOpen: true });
  };
  const handleDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setDialogInfo({ data: {}, isOpen: false });
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Self Inspection Response</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={initialData}
                validate={(values: any) => {
                  let errors: any = {};
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log("test", values);
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
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              disabled={true}
                              name="inspection_reportid"
                              label="Reference Number"
                              type="text"
                              value={values.inspection_reportid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.inspection_reportid &&
                                (touched.inspection_reportid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.inspection_reportid &&
                                (touched.inspection_reportid || isSubmited) &&
                                errors.inspection_reportid
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
                                onClick={()=>handleDialogOpen()}
                              >
                                <QueueIcon />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={inspectionStatuses}
                            label="Status"
                            name="inspection_response_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue(
                                "inspection_response_statusid",
                                tempValue
                              );
                            }}
                            value={values.inspection_response_statusid}
                            error={
                              errors.inspection_response_statusid &&
                              (touched.inspection_response_statusid ||
                                isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.inspection_response_statusid &&
                              (touched.inspection_response_statusid ||
                                isSubmited) &&
                              errors.inspection_response_statusid
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          sx={{
                            display: {
                              sx: "none",
                              sm: "none",
                              md: "block",
                              lg: "block",
                            },
                          }}
                        ></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            label="Page Number"
                            name="page_no"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.page_no}
                            error={
                              errors.page_no && (touched.page_no || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.page_no &&
                              (touched.page_no || isSubmited) &&
                              errors.page_no
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            disabled={true}
                            menuItems={auditLocations}
                            label="Department"
                            name="audit_locationsid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("audit_locationsid", tempValue);
                            }}
                            value={values.audit_locationsid}
                            error={
                              errors.audit_locationsid &&
                              (touched.audit_locationsid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.audit_locationsid &&
                              (touched.audit_locationsid || isSubmited) &&
                              errors.audit_locationsid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled={true}
                            label="Audit Date"
                            name="audited_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("audited_date", tempValue);
                            }}
                            value={values?.audited_date || ""}
                            error={
                              errors.audited_date &&
                              (touched.audited_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.audited_date &&
                              (touched.audited_date || isSubmited) &&
                              errors.audited_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            label="Area Focused on"
                            name="area_audited"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.area_audited}
                            error={
                              errors.area_audited &&
                              (touched.area_audited || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.area_audited &&
                              (touched.area_audited || isSubmited) &&
                              errors.area_audited
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            label="Auditee"
                            name="auditee"
                            type="text"
                            value={values.auditee}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.auditee && (touched.auditee || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.auditee &&
                              (touched.auditee || isSubmited) &&
                              errors.auditee
                            }
                          />
                          <br />
                          <br />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="caption">
                            Note: Self inspection response shall be submitted to
                            Quality Assurance department within 10 working days
                            from the date of aduit completion
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            label="Inspection observations"
                            name="observation_text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.observation_text}
                            error={
                              errors.observation_text &&
                              (touched.observation_text || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.observation_text &&
                              (touched.observation_text || isSubmited) &&
                              errors.observation_text
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            label="Observation Type (DL)"
                            menuItems={observations}
                            name="observation_typesid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("observation_typesid", tempValue);
                            }}
                            value={values.observation_typesid}
                            error={
                              errors.observation_typesid &&
                              (touched.observation_typesid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.observation_typesid &&
                              (touched.observation_typesid || isSubmited) &&
                              errors.observation_typesid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            label="Corrective action"
                            name="corrective_action"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.corrective_action}
                            error={
                              errors.corrective_action &&
                              (touched.corrective_action || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.corrective_action &&
                              (touched.corrective_action || isSubmited) &&
                              errors.corrective_action
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            label="Target Date"
                            name="target_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("target_date", tempValue);
                            }}
                            value={values?.target_date || ""}
                            error={
                              errors.target_date &&
                              (touched.target_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.target_date &&
                              (touched.target_date || isSubmited) &&
                              errors.target_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            menuItems={statuses}
                            label="Compliance Status"
                            name="compliance_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("compliance_statusid", tempValue);
                            }}
                            value={values.compliance_statusid}
                            error={
                              errors.compliance_statusid &&
                              (touched.compliance_statusid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.compliance_statusid &&
                              (touched.compliance_statusid || isSubmited) &&
                              errors.compliance_statusid
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

                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            label="Remarks"
                            name="notes"
                            type="text"
                            value={values.notes}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.notes && (touched.notes || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.notes &&
                              (touched.notes || isSubmited) &&
                              errors.notes
                            }
                          />
                          <br />
                          <br />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                              <AppButton
                                variant="contained"
                                color="primary"
                                disabled={!values?.inspection_reportid}
                                btnText="Save"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
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
      {dialogInfo?.isOpen && (
        <CustomDialogComponent
          title="Inspection Report Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data:any) => handleDialogClose(data)}
            tableName={TABLE_NAMES.INSPECTION_REPORT.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default SelfInspectionResponseComponent;

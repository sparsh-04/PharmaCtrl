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

interface SelfInspectionComponentProps {}

const SelfInspectionComponent: React.FunctionComponent<
  SelfInspectionComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    inspection_initiamtion_slipid: "",
    audit_locationsid: "",
    inspection_slip_statusid: "",
    inspection_date: "",
    inspection_time: "",
    inspection_by: "",
    prepared_by: "",
    prepared_date: "",
    approved_by: "",
    approved_date: "",
  });
  const [auditLocations, setAuditLocations] = useState([]);
  const [inspectionStatuses, setInspectionStatuses] = useState([]);
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
          <h2 className="header-margin">
            Self Inspection Intimation Slip
          </h2>
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
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Box display="flex">
                            <AppTextInput
                              name="inspection_initiamtion_slipid"
                              label="Inspection"
                              type="text"
                              value={values.inspection_initiamtion_slipid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.inspection_initiamtion_slipid &&
                                (touched.inspection_initiamtion_slipid ||
                                  isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.inspection_initiamtion_slipid &&
                                (touched.inspection_initiamtion_slipid ||
                                  isSubmited) &&
                                errors.inspection_initiamtion_slipid
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
                                  handleDialogOpen();
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <AppSelectInput
                            required={true}
                            menuItems={auditLocations}
                            label="To Department"
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
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <AppSelectInput
                            required={true}
                            disabled={
                              !values?.inspection_initiamtion_slipid
                                ? true
                                : false
                            }
                            menuItems={inspectionStatuses}
                            label="Status"
                            name="inspection_slip_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue(
                                "inspection_slip_statusid",
                                tempValue
                              );
                            }}
                            value={values.inspection_slip_statusid}
                            error={
                              errors.inspection_slip_statusid &&
                              (touched.inspection_slip_statusid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.inspection_slip_statusid &&
                              (touched.inspection_slip_statusid ||
                                isSubmited) &&
                              errors.inspection_slip_statusid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppDatePicker
                            label="Self Inspection Date"
                            required={true}
                            name="inspection_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("inspection_date", tempValue);
                            }}
                            value={values?.inspection_date || ""}
                            minDate={moment()}
                            error={
                              errors.inspection_date &&
                              (touched.inspection_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.inspection_date &&
                              (touched.inspection_date || isSubmited) &&
                              errors.inspection_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            required={true}
                            name="inspection_time"
                            label="Inspection Time"
                            type="text"
                            value={values.inspection_time}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.inspection_time &&
                              (touched.inspection_time || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.inspection_time &&
                              (touched.inspection_time || isSubmited) &&
                              errors.inspection_time
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            required={true}
                            name="inspection_by"
                            label="Inspectors Name"
                            type="text"
                            value={values.inspection_by}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.inspection_by &&
                              (touched.inspection_by || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.inspection_by &&
                              (touched.inspection_by || isSubmited) &&
                              errors.inspection_by
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppTextInput
                                required={true}
                                disabled={true}
                                name="prepared_by"
                                label="Prepared By"
                                type="text"
                                value={values.prepared_by}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  errors.prepared_by &&
                                  (touched.prepared_by || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.prepared_by &&
                                  (touched.prepared_by || isSubmited) &&
                                  errors.prepared_by
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppDatePicker
                                label="Prepared Date"
                                required={true}
                                disabled={true}
                                name="prepared_date"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = "";
                                  if (e) {
                                    tempValue = moment(e).toISOString();
                                  }
                                  setFieldValue("prepared_date", tempValue);
                                }}
                                value={values?.prepared_date || ""}
                                minDate={moment()}
                                error={
                                  errors.prepared_date &&
                                  (touched.prepared_date || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.prepared_date &&
                                  (touched.prepared_date || isSubmited) &&
                                  errors.prepared_date
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppTextInput
                                required={true}
                                name="prepared_by"
                                label="Approved By"
                                type="text"
                                value={values.approved_by}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  errors.approved_by &&
                                  (touched.approved_by || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.approved_by &&
                                  (touched.approved_by || isSubmited) &&
                                  errors.approved_by
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppDatePicker
                                label="Approved Date"
                                required={true}
                                name="approved_date"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = "";
                                  if (e) {
                                    tempValue = moment(e).toISOString();
                                  }
                                  setFieldValue("approved_date", tempValue);
                                }}
                                value={values?.approved_date || ""}
                                minDate={moment()}
                                error={
                                  errors.approved_date &&
                                  (touched.approved_date || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.approved_date &&
                                  (touched.approved_date || isSubmited) &&
                                  errors.approved_date
                                }
                              />
                            </Grid>
                          </Grid>
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
          title="Inspection Slip Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data:any) => handleDialogClose(data)}
            tableName={TABLE_NAMES.INSPECTION_INTIMATION_SLIP.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default SelfInspectionComponent;

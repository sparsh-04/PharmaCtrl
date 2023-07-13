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
import Queue from "@mui/icons-material/Queue";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import { TABLE_NAMES } from "index/Constant";

interface SelfInspectionReportComponentProps {}

const SelfInspectionReportComponent: React.FunctionComponent<
  SelfInspectionReportComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    inspection_reportid: "",
    audit_locationsid: "",
    area_audited: "",
    audited_date: "",
    inspected_by1: "",
    inspected_by2: "",
    inspected_by3: "",
    inspected_by4: "",
    inspected_by5: "",
    critical_observations: "",
    major_observations: "",
    minor_observations: "",
    prepared_by: "",
    password: "",
    prepared_date: "",
  });
  const [auditLocations, setAuditLocations] = useState([]);
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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <h2 className="header-margin">Self Inspection Report</h2>
            </Grid>
            <Grid item>
              <AppButton
                disabled
                variant="contained"
                color="primary"
                btnText="Export"
                startIcon={<PictureAsPdf />}
              />
            </Grid>
          </Grid>
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
                              label="Report Number"
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
                                onClick={() => handleDialogOpen()}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppSelectInput
                            required={true}
                            menuItems={auditLocations}
                            label="Auditee"
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
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            required={true}
                            label="Area Audited"
                            name="area_audited"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("area_audited", tempValue);
                            }}
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
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppDatePicker
                            label="Audit Date"
                            required={true}
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
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={2} lg={1}>
                              <Typography marginTop={1}>
                                Inspected By
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <AppTextInput
                                    required={true}
                                    name="inspected_by1"
                                    type="text"
                                    value={values.inspected_by1}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      errors.inspected_by1 &&
                                      (touched.inspected_by1 || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors.inspected_by1 &&
                                      (touched.inspected_by1 || isSubmited) &&
                                      errors.inspected_by1
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <AppTextInput
                                    required={true}
                                    name="inspected_by2"
                                    type="text"
                                    value={values.inspected_by2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      errors.inspected_by2 &&
                                      (touched.inspected_by2 || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors.inspected_by2 &&
                                      (touched.inspected_by2 || isSubmited) &&
                                      errors.inspected_by2
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <AppTextInput
                                    required={true}
                                    name="inspected_by3"
                                    type="text"
                                    value={values.inspected_by3}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      errors.inspected_by3 &&
                                      (touched.inspected_by3 || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors.inspected_by3 &&
                                      (touched.inspected_by3 || isSubmited) &&
                                      errors.inspected_by3
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <AppTextInput
                                    required={true}
                                    name="inspected_by4"
                                    type="text"
                                    value={values.inspected_by4}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      errors.inspected_by4 &&
                                      (touched.inspected_by4 || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors.inspected_by4 &&
                                      (touched.inspected_by4 || isSubmited) &&
                                      errors.inspected_by4
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <AppTextInput
                                    required={true}
                                    name="inspected_by5"
                                    type="text"
                                    value={values.inspected_by5}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      errors.inspected_by5 &&
                                      (touched.inspected_by5 || isSubmited)
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      errors.inspected_by5 &&
                                      (touched.inspected_by5 || isSubmited) &&
                                      errors.inspected_by5
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography fontWeight={800}>
                            Inspection Observation
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <AppTextInput
                                name="critical_observations"
                                label="Critical"
                                type="text"
                                value={values.critical_observations}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                multiline={true}
                                rows={2}
                                error={
                                  errors.critical_observations &&
                                  (touched.critical_observations || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.critical_observations &&
                                  (touched.critical_observations ||
                                    isSubmited) &&
                                  errors.critical_observations
                                }
                              />
                              <Typography
                                variant="caption"
                                display="flex"
                                justifyContent="end"
                                color={
                                  values?.critical_observations &&
                                  String(values.critical_observations)?.length >
                                    150
                                    ? "red"
                                    : "inherit"
                                }
                              >
                                {values.critical_observations
                                  ? String(values.critical_observations)?.length
                                  : 0}
                                /150
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <AppTextInput
                                name="major_observations"
                                label="Major"
                                type="text"
                                value={values.major_observations}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                multiline={true}
                                rows={2}
                                error={
                                  errors.major_observations &&
                                  (touched.major_observations || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.major_observations &&
                                  (touched.major_observations || isSubmited) &&
                                  errors.major_observations
                                }
                              />
                              <Typography
                                variant="caption"
                                display="flex"
                                justifyContent="end"
                                color={
                                  values?.major_observations &&
                                  String(values.major_observations)?.length >
                                    150
                                    ? "red"
                                    : "inherit"
                                }
                              >
                                {values.major_observations
                                  ? String(values.major_observations)?.length
                                  : 0}
                                /150
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <AppTextInput
                                name="minor_observations"
                                label="Minor"
                                type="text"
                                value={values.minor_observations}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                multiline={true}
                                rows={2}
                                error={
                                  errors.minor_observations &&
                                  (touched.minor_observations || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.minor_observations &&
                                  (touched.minor_observations || isSubmited) &&
                                  errors.minor_observations
                                }
                              />
                              <Typography
                                variant="caption"
                                display="flex"
                                justifyContent="end"
                                color={
                                  values?.minor_observations &&
                                  String(values.minor_observations)?.length >
                                    150
                                    ? "red"
                                    : "inherit"
                                }
                              >
                                {values.minor_observations
                                  ? String(values.minor_observations)?.length
                                  : 0}
                                /150
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <h2 className="header-margin">Report prepared By</h2 >
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                              <AppTextInput
                                required={true}
                                disabled={true}
                                name="prepared_by"
                                label="User ID"
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
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                              <AppTextInput
                                name="password"
                                label="Password"
                                type="text"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  errors.password &&
                                  (touched.password || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.password &&
                                  (touched.password || isSubmited) &&
                                  errors.password
                                }
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={3}>
                              <AppDatePicker
                                required={true}
                                disabled={true}
                                name="prepared_date"
                                label="Prepared Date"
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
          title="Inspection Report Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName={TABLE_NAMES.INSPECTION_REPORT.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default SelfInspectionReportComponent;

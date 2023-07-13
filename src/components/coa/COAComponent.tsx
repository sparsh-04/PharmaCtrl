import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import Loading from "index/components/common/Loading";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
import { useState, useEffect } from "react";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Search from "@mui/icons-material/Search";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";

interface COAComponentProps {}

const COAComponent: React.FunctionComponent<COAComponentProps> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    certificate_of_analysisid: "",
    specification_headerid: "",
    specificationtype: "",
    material_name: "",
    material_masterid: "",
    manufcatured_by: "",
    supplied_by: "",
    mfg_date: "",
    exp_date: "",
    batch_no: "",
    quantity_received: "",
    sample_quantity: "",
    retesting_date: "",
    sampling_date: "",
    coa_statusid: "",
    result: "",
    remarks: "",
  });
  const [specificationList, setSpecificationList] = useState([]);
  const [coaStatusList, setCoaStatusList] = useState([]);
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, data: {} });
  const [isCompletedCOA, setIsCompletedCOA] = useState(false);

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
              <h2 className="header-margin">COA</h2>
            </Grid>
            <Grid item>
              <AppButton
                disabled={!isCompletedCOA}
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
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppTextInput
                                name="certificate_of_analysisid"
                                label="COA"
                                type="number"
                                value={values.certificate_of_analysisid}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  errors.certificate_of_analysisid &&
                                  (touched.certificate_of_analysisid ||
                                    isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.certificate_of_analysisid &&
                                  (touched.certificate_of_analysisid ||
                                    isSubmited) &&
                                  errors.certificate_of_analysisid
                                }
                                endAdornment={
                                  <IconButton
                                    onClick={() => {
                                      console.log("test");
                                    }}
                                  >
                                    <Search />
                                  </IconButton>
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            disabled
                            menuItems={specificationList}
                            label="Specification"
                            name="specification_headerid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue(
                                "specification_headerid",
                                tempValue
                              );
                            }}
                            value={values.specification_headerid}
                            error={
                              errors.specification_headerid &&
                              (touched.specification_headerid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.specification_headerid &&
                              (touched.specification_headerid || isSubmited) &&
                              errors.specification_headerid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            disabled={true}
                            name="specificationtype"
                            label="Specification Type"
                            type="text"
                            value={values.specificationtype}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.specificationtype &&
                              (touched.specificationtype || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.specificationtype &&
                              (touched.specificationtype || isSubmited) &&
                              errors.specificationtype
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            disabled={true}
                            name="material_name"
                            label="Material"
                            type="text"
                            value={values.material_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.material_name &&
                              (touched.material_name || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.material_name &&
                              (touched.material_name || isSubmited) &&
                              errors.material_name
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            disabled={true}
                            name="material_masterid"
                            label="Material ID"
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            name="manufcatured_by"
                            label="Mfg By"
                            type="text"
                            value={values.manufcatured_by}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.manufcatured_by &&
                              (touched.manufcatured_by || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.manufcatured_by &&
                              (touched.manufcatured_by || isSubmited) &&
                              errors.manufcatured_by
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            name="supplied_by"
                            label="Supplied By"
                            type="text"
                            value={values.supplied_by}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.supplied_by &&
                              (touched.supplied_by || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.supplied_by &&
                              (touched.supplied_by || isSubmited) &&
                              errors.supplied_by
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppDatePicker
                            label="MFG Date"
                            name="mfg_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("mfg_date", tempValue);
                            }}
                            value={values?.mfg_date || ""}
                            minDate={moment()}
                            error={
                              errors.mfg_date &&
                              (touched.mfg_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.mfg_date &&
                              (touched.mfg_date || isSubmited) &&
                              errors.mfg_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppDatePicker
                            label="EXP Date"
                            name="exp_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("exp_date", tempValue);
                            }}
                            value={values?.exp_date || ""}
                            minDate={moment()}
                            error={
                              errors.exp_date &&
                              (touched.exp_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.exp_date &&
                              (touched.exp_date || isSubmited) &&
                              errors.exp_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            name="batch_no"
                            label="Batch No"
                            type="text"
                            value={values.batch_no}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.batch_no &&
                              (touched.batch_no || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.batch_no &&
                              (touched.batch_no || isSubmited) &&
                              errors.batch_no
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            name="quantity_received"
                            label="Quantity Received"
                            type="number"
                            value={values.quantity_received}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.quantity_received &&
                              (touched.quantity_received || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.quantity_received &&
                              (touched.quantity_received || isSubmited) &&
                              errors.quantity_received
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppTextInput
                            name="sample_quantity"
                            label="Quantity Sampled"
                            type="number"
                            value={values.sample_quantity}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.sample_quantity &&
                              (touched.sample_quantity || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.sample_quantity &&
                              (touched.sample_quantity || isSubmited) &&
                              errors.sample_quantity
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppDatePicker
                            label="Retesting Date"
                            name="retesting_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("retesting_date", tempValue);
                            }}
                            value={values?.retesting_date || ""}
                            minDate={moment()}
                            error={
                              errors.retesting_date &&
                              (touched.retesting_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.retesting_date &&
                              (touched.retesting_date || isSubmited) &&
                              errors.retesting_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppDatePicker
                            label="Date of Sampling"
                            name="sampling_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("sampling_date", tempValue);
                            }}
                            value={values?.sampling_date || ""}
                            minDate={moment()}
                            error={
                              errors.sampling_date &&
                              (touched.sampling_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.sampling_date &&
                              (touched.sampling_date || isSubmited) &&
                              errors.sampling_date
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
                            label="Result"
                            name="result"
                            type="text"
                            value={values.result}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.result && (touched.result || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.result &&
                              (touched.result || isSubmited) &&
                              errors.result
                            }
                          />
                          <Typography
                            variant="caption"
                            display="flex"
                            justifyContent="end"
                            color={
                              values?.result &&
                              String(values.result)?.length > 10000
                                ? "red"
                                : "inherit"
                            }
                          >
                            {values.result ? String(values.result)?.length : 0}
                            /10000
                          </Typography>
                          <br />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                              <AppButton
                                variant="contained"
                                color="primary"
                                disabled={isCompletedCOA}
                                btnText="Save"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            label="Remarks"
                            name="remarks"
                            type="text"
                            value={values.remarks}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.remarks && (touched.remarks || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.remarks &&
                              (touched.remarks || isSubmited) &&
                              errors.remarks
                            }
                          />
                          <Typography
                            variant="caption"
                            display="flex"
                            justifyContent="end"
                            color={
                              values?.remarks &&
                              String(values.remarks)?.length > 10000
                                ? "red"
                                : "inherit"
                            }
                          >
                            {values.remarks
                              ? String(values.remarks)?.length
                              : 0}
                            /10000
                          </Typography>
                          <br />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                              <AppButton
                                variant="contained"
                                color="primary"
                                disabled={isCompletedCOA}
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
    </React.Fragment>
  );
};

export default COAComponent;

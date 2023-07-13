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
import { Queue } from "@mui/icons-material";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import CustomDialogComponent from "../common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import SignaturesTable from "index/shared/signature/SignaturesTable";
import { AgGridReact } from "ag-grid-react";
import { customCell } from "index/shared/Shared";

interface QTMComponentProps {}

const QTMComponent: React.FunctionComponent<QTMComponentProps> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    test_method_no: "",
    date: moment(),
    prev_test_method_no: "",
    material_codeid: "",
    version: "",
    validity_end_date: "",
    pharmacopia: "",
    effective_date: "",
    material_description: "",
    customer_name: "",
    sample_qty: "",
    batch_qty: "",
  });
  const [materialCodes, setMaterialCodes] = useState([]);
  const [pharmacopiaList, setpharmacopiaList] = useState([]);
  const [isCollectSigDisabled, setIsCollectSigDisabled] = useState(false);
  const [testingMethodsTable, setTestingMethodsTable] = useState([]);

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );
  const onCellValueChanged = (event: any) => {
    console.log("event", event);
    debugger;
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight="bold">Quality Test Methods</Typography>
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
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="test_method_no"
                            label="Test Method#"
                            type="number"
                            value={values.test_method_no}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.test_method_no &&
                              (touched.test_method_no || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.test_method_no &&
                              (touched.test_method_no || isSubmited) &&
                              errors.test_method_no
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppDatePicker
                            label="Date"
                            name="date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("date", tempValue);
                            }}
                            value={values?.date || ""}
                            minDate={moment()}
                            error={
                              errors.date && (touched.date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.date &&
                              (touched.date || isSubmited) &&
                              errors.date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="prev_test_method_no"
                            label="Previous Test Methods(if any)"
                            type="number"
                            value={values.prev_test_method_no}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.prev_test_method_no &&
                              (touched.prev_test_method_no || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.prev_test_method_no &&
                              (touched.prev_test_method_no || isSubmited) &&
                              errors.prev_test_method_no
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={materialCodes}
                            label="Material Code"
                            name="material_codeid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("material_codeid", tempValue);
                            }}
                            value={values.material_codeid}
                            error={
                              errors.material_codeid &&
                              (touched.material_codeid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.material_codeid &&
                              (touched.material_codeid || isSubmited) &&
                              errors.material_codeid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="version"
                            label="Version#"
                            type="number"
                            value={values.version}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.version && (touched.version || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.version &&
                              (touched.version || isSubmited) &&
                              errors.version
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppDatePicker
                            label="Validity ended on"
                            name="validity_end_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("validity_end_date", tempValue);
                            }}
                            value={values?.validity_end_date || ""}
                            minDate={moment()}
                            error={
                              errors.validity_end_date &&
                              (touched.validity_end_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.validity_end_date &&
                              (touched.validity_end_date || isSubmited) &&
                              errors.validity_end_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={pharmacopiaList}
                            label="Pharmacopia"
                            name="pharmacopia"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("pharmacopia", tempValue);
                            }}
                            value={values.pharmacopia}
                            error={
                              errors.pharmacopia &&
                              (touched.pharmacopia || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.pharmacopia &&
                              (touched.pharmacopia || isSubmited) &&
                              errors.pharmacopia
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppDatePicker
                            label="Effective Date"
                            name="effective_date"
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
                              (touched.effective_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.effective_date &&
                              (touched.effective_date || isSubmited) &&
                              errors.effective_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="material_description"
                            label="Material Description"
                            type="text"
                            value={values.material_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.material_description &&
                              (touched.material_description || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.material_description &&
                              (touched.material_description || isSubmited) &&
                              errors.material_description
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="customer_name"
                            label="Customer Name"
                            type="text"
                            value={values.customer_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.customer_name &&
                              (touched.customer_name || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.customer_name &&
                              (touched.customer_name || isSubmited) &&
                              errors.customer_name
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="sample_qty"
                            label="Sample Qty"
                            type="text"
                            value={values.sample_qty}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.sample_qty &&
                              (touched.sample_qty || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.sample_qty &&
                              (touched.sample_qty || isSubmited) &&
                              errors.sample_qty
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="batch_qty"
                            label="Batch Qty"
                            type="text"
                            value={values.batch_qty}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.batch_qty &&
                              (touched.batch_qty || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.batch_qty &&
                              (touched.batch_qty || isSubmited) &&
                              errors.batch_qty
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid item xs={12}>
                            <div
                              style={{
                                minHeight: "160px",
                                height: "calc(100vh - 600px)",
                              }}
                            >
                              <AgGridReact
                                rowData={testingMethodsTable}
                                columnDefs={[
                                  {
                                    field: "test_method_no",
                                    headerName: "Test Number#",
                                    colId: "test_method_no".toLowerCase(),
                                    filter: "agNumberColumnFilter",
                                    cellRenderer: customCell,
                                  },
                                  {
                                    field: "specification",
                                    headerName: "Specifications",
                                    colId: "specification".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                  },
                                  {
                                    field: "test_description",
                                    headerName: "Test Description",
                                    colId: "test_description".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                  },
                                  {
                                    field: "testing_method",
                                    headerName: "Testing Method",
                                    colId: "testing_method".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                  },
                                  {
                                    field: "expected_results",
                                    headerName: "Expected Results",
                                    colId: "expected_results".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                  },
                                  {
                                    field: "actual_results",
                                    headerName: "Actual Results",
                                    colId: "actual_results".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                    editable: true,
                                  },
                                  {
                                    field: "impression",
                                    headerName: "Impression",
                                    colId: "impression".toLowerCase(),
                                    filter: "agTextColumnFilter",
                                    cellRenderer: customCell,
                                    editable: true,
                                  },
                                ]}
                                className="custom-grid ag-theme-alpine"
                                onCellValueChanged={onCellValueChanged}
                                rowHeight={36}
                                animateRows={true}
                                defaultColDef={defaultColDef}
                                pagination={false}
                                suppressMovableColumns={true}
                                context={{
                                  customCell,
                                }}
                              />
                            </div>
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
                            btnText="Submit"
                          />
                        </Grid>
                      </Grid>
                      {values?.test_method_no && (
                        <React.Fragment>
                          <br />
                          <SignaturesTable
                            rowDefs={[]}
                            isCollectSigDisabled={isCollectSigDisabled}
                          />
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
    </React.Fragment>
  );
};

export default QTMComponent;

import * as React from "react";
import Loading from "../common/Loading";
import { Grid, Typography, Card, CardContent, IconButton } from "@mui/material";
import { Formik } from "formik";
import AppTextInput from "index/shared/inputs/AppTextInput";
import QueueIcon from "@mui/icons-material/Queue";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import moment from "moment";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import SignaturesTable from "index/shared/signature/SignaturesTable";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
import { TABLE_NAMES } from "index/Constant";
interface DeviationsProps {}

const Deviations: React.FC<DeviationsProps> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSearchDialog, setIsSearchDialog] = React.useState({
    isOpen: false,
    data: {},
  } as { isOpen: boolean; data: object });
  const dialogSearch = (data: any) => {
    if (data) {
      console.log(data);
    }
    setIsSearchDialog({ data: {}, isOpen: false });
  };
  const [initialData, setInitialData] = React.useState({
    DR_NUMBER: "",
    DEVIATION_TYPE: "",
    DATE: "",
    REPORTING_DATE: "",
    CUSTOMER: "",
    CRITICALITY: "",
    AREA: "",
    PRODUCT_IMPACT: "",
    GXP_RELEVENT: "",
    GAPA_REQUIRED: "",
    DUE_DATE: "",
    REPORTING_OF_DEVIATION: "",
    PROPOSED_CORRECTIVE_ACTION_PLAN: "",
  });
  const [isCollectSigDisabled, setIsCollectSigDisabled] = React.useState(false);
  const deviationType = [
    {
      value: "Planned",
    },
    {
      value: "UnPlanned",
    },
  ];
  const criticality = [
    {
      value: "High",
    },
    {
      value: "Medium",
    },
    {
      value: "Low",
    },
  ];
  const area = [
    {
      value: "Process",
    },
    {
      value: "Method",
    },
    {
      value: "Quality",
    },
  ];
  const options = [
    {
      value: "Yes",
    },
    {
      value: "No",
    },
  ];
  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Deviations</h2>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                name="DR_NUMBER"
                                label="DR Number"
                                type="text"
                                value={values.DR_NUMBER}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() => setIsSearchDialog({
                                    data: {},
                                    isOpen: true,
                                  })}
                                sx={{
                                  backgroundColor: "#ddd",
                                  marginTop: "10%",
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppSelectInput
                            name="DEVIATION_TYPE"
                            label="Deviation Type"
                            value={values.DEVIATION_TYPE}
                            menuItems={deviationType.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.DEVIATION_TYPE, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppDatePicker
                            name="DATE"
                            label="Date"
                            value={values.DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            name="REPORTING_DATE"
                            label="Reporting Date"
                            value={values.REPORTING_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="CUSTOMER"
                            label="Customer"
                            type="text"
                            value={values.CUSTOMER}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            name="CRITICALITY"
                            label="Deviation Type"
                            value={values.CRITICALITY}
                            menuItems={criticality.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.CRITICALITY, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            name="AREA"
                            label="Area"
                            value={values.AREA}
                            menuItems={area.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.AREA, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            name="PRODUCT_IMPACT"
                            label="Product Impact"
                            value={values.PRODUCT_IMPACT}
                            menuItems={options.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.PRODUCT_IMPACT, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            name="GXP_RELEVENT"
                            label="GxP Relevent"
                            value={values.GXP_RELEVENT}
                            menuItems={options.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.GXP_RELEVENT, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            name="GAPA_REQUIRED"
                            label="GAPA Required"
                            value={values.GAPA_REQUIRED}
                            menuItems={options.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.GAPA_REQUIRED, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="DUE_DATE"
                            label="If yes due date for CAP"
                            type="text"
                            value={values.DUE_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AppTextInput
                        name="REPORTING_OF_DEVIATION"
                        label="Justification / Reporting of deviation"
                        type="text"
                        value={values.REPORTING_OF_DEVIATION}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        multiline={true}
                        rows={5}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AppTextInput
                        name="PROPOSED_CORRECTIVE_ACTION_PLAN"
                        label="Proposed Corrective Action Plan"
                        type="text"
                        value={values.PROPOSED_CORRECTIVE_ACTION_PLAN}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        multiline={true}
                        rows={5}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    {values?.DR_NUMBER && (
                     <React.Fragment>
                       <br />
                       <SignaturesTable
                         rowDefs={[]}
                         isCollectSigDisabled={isCollectSigDisabled}
                       />
                     </React.Fragment>
                    )} 
                    </Grid>
                  </Grid>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isSearchDialog?.isOpen && (
        <ObjectSearchDialogComponent
        title="Deviations Search"
        onClose={dialogSearch}
        data={isSearchDialog?.data}
        tableName={TABLE_NAMES.DEVIATION.toLocaleLowerCase()}
      ></ObjectSearchDialogComponent>
      )}
    </React.Fragment>
  );
};

export default Deviations;

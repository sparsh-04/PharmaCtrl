import { Card, CardContent, Grid, IconButton } from "@mui/material";
import AppButton from "index/shared/inputs/AppButton";
import * as React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Formik } from "formik";
import AppTextInput from "index/shared/inputs/AppTextInput";
import QueueIcon from "@mui/icons-material/Queue";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import moment from "moment";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
interface RequisitionProps { }

const Requisition: React.FC<RequisitionProps> = () => {
  const [initialData, setInitialData] = React.useState({
    PM_ORDER_HEADERID: "",
    CREATED_DATE: "",
    DESCRIPTION: "",
    WORKORDER_TYPESID: "",
    ORDER_STATUSID: "",
    AREA: "",
    LINE: "",
    RESOURCE_NAME: "",
    PLAN_TYPE: "",
    BATCH_PLANNED_DATE: "",
    CRITICALITY: "",
    WORKORDER_CATEGORYID: "",
    PM_RESOURCE_STATUS: "",
    CALIBRATION_DUE_DATE: "",
    LAST_CALIBRATION_DATE: "",
    CREATED_BY: "",
    RECEIVED_BY: "",
  });
  const [workOrderSearchDialog, setWorkOrderSearchDialog] = React.useState({
    isOpen: false,
    data: {},
  } as { isOpen: boolean; data: object });
  const workOrderSearch = (data: any) => {
    if (data) {
      console.log(data);
    }
    setWorkOrderSearchDialog({ data: {}, isOpen: false });
  };
  const [resourceSearchDialog, setResourceSearchDialog] = React.useState({
    isOpen: false,
    data: {},
  } as { isOpen: boolean; data: object });
  const resourceSearch = (data: any) => {
    if (data) {
      console.log(data);
    }
    setResourceSearchDialog({ data: {}, isOpen: false });
  };
  const workOrderType = [
    {
      value: "Facility Clearance",
    },
    {
      value: "Facility Clearance",
    },
    {
      value: "Facility Clearance",
    },
    {
      value: "Facility Clearance",
    },
  ];
  const pmrStatus = [
    {
      value: "Not Started",
    },
    {
      value: "Not Started",
    },
    {
      value: "Not Started",
    },
    {
      value: "Facility Clearance",
    },
  ];
  const typeOfMaintenance = [
    {
      value: "Breakdown Maintenance",
    },
    {
      value: "Breakdown Maintenance",
    },
    {
      value: "Breakdown Maintenance",
    },
    {
      value: "Facility Clearance",
    },
  ];
  const criticality = [
    {
      value: "HIGH",
    },
    {
      value: "LOW",
    },
    {
      value: "MEDIUM",
    },
    {
      value: "Facility Clearance",
    },
  ];
  const options = [
    {
      value: "YES",
    },
    {
      value: "NO",
    },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid
          style={{ padding: "16px" }}
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <h2 className="header-margin">Plant Maintenance Requisition</h2>
          </Grid>
          <Grid item>
            <AppButton
              btnText="EXPORT"
              type="submit"
              variant="contained"
              color="warning"
            >
              <PictureAsPdfIcon />
            </AppButton>
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
                  //   return errors;
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
                }) => (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="PM_ORDER_HEADERID"
                                label="PMR Number"
                                type="text"
                                value={values.PM_ORDER_HEADERID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setWorkOrderSearchDialog({
                                    isOpen: true,
                                    data: {},
                                  })
                                }
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
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppDatePicker
                            disabled
                            name="CREATED_DATE"
                            label="Requisition Date"
                            value={values.CREATED_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                          <AppTextInput
                            name="DESCRIPTION"
                            label="Description"
                            type="text"
                            value={values.DESCRIPTION}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppSelectInput
                            disabled
                            name="WORKORDER_TYPESID"
                            label="Workorder Type"
                            value={values.WORKORDER_TYPESID}
                            menuItems={workOrderType.map((x) => {
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
                              setFieldValue(
                                values.WORKORDER_TYPESID,
                                tempValue
                              );
                            }}
                          ></AppSelectInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            disabled
                            name="ORDER_STATUSID"
                            label="Breakdown Maintenance Status"
                            value={values.ORDER_STATUSID}
                            menuItems={pmrStatus.map((x) => {
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
                              setFieldValue(values.ORDER_STATUSID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            name="PM_ORDER_HEADERID"
                            label="Maintenance Type"
                            value={values.PM_ORDER_HEADERID}
                            menuItems={typeOfMaintenance.map((x) => {
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
                              setFieldValue(
                                values.PM_ORDER_HEADERID,
                                tempValue
                              );
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="AREA"
                            label="Area"
                            type="text"
                            value={values.AREA}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="LINE"
                            label="Line"
                            type="text"
                            value={values.LINE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="RESOURCE_NAME"
                                label="Equipment Name"
                                type="text"
                                value={values.RESOURCE_NAME}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setResourceSearchDialog({
                                    isOpen: true,
                                    data: {},
                                  })
                                }
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
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            disabled
                            name="PLAN_TYPE"
                            label="Schedule of Preventive Maintenance"
                            value={values.PLAN_TYPE}
                            menuItems={pmrStatus.map((x) => {
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
                              setFieldValue(values.ORDER_STATUSID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="BATCH_PLANNED_DATE"
                            label="Batch planned on Date"
                            type="text"
                            value={values.BATCH_PLANNED_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            disabled
                            name="CRITICALITY"
                            label="If Breakdown (Criticality)"
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
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            name="WORKORDER_CATEGORYID"
                            label="Incident to be created"
                            value={values.WORKORDER_CATEGORYID}
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
                              setFieldValue(
                                values.WORKORDER_CATEGORYID,
                                tempValue
                              );
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppSelectInput
                            disabled
                            name="PM_RESOURCE_STATUS"
                            label="Equipment"
                            value={values.PM_RESOURCE_STATUS}
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
                              setFieldValue(
                                values.PM_RESOURCE_STATUS,
                                tempValue
                              );
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="CALIBRATION_DUE_DATE"
                            label="Due on Date"
                            type="text"
                            value={values.CALIBRATION_DUE_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="LAST_CALIBRATION_DATE"
                            label="Last Calibrated"
                            type="text"
                            value={values.LAST_CALIBRATION_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="CREATED_BY"
                            label="Request By"
                            type="text"
                            value={values.CREATED_BY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            name="RECEIVED_BY"
                            label="Received By"
                            type="text"
                            value={values.RECEIVED_BY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={12}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid item>
                          <AppButton
                            btnText="Clear"
                            type="submit"
                            variant="outlined"
                            color="primary"
                          />
                        </Grid>
                        <Grid item>
                          <AppButton
                            disabled={isSubmitting}
                            btnText="Save"
                            type="submit"
                            variant="contained"
                            color="primary"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {workOrderSearchDialog?.isOpen && (
        <CustomDialogComponent
          title="Work Order Search"
          onClose={() => workOrderSearch(undefined)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            tableName=""
            onClose={(data: any) => workOrderSearch(data)}
          />
        </CustomDialogComponent>
      )}
      {resourceSearchDialog?.isOpen && (
        <CustomDialogComponent
          title="Resource Search"
          onClose={() => resourceSearch(undefined)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            tableName=""
            onClose={(data: any) => resourceSearch(data)}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default Requisition;

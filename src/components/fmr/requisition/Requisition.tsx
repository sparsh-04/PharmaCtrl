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
import { TABLE_NAMES } from "index/Constant";
interface RequisitionProps {}

const Requisition: React.FC<RequisitionProps> = () => {
  const [isSearchDialog, setIsSearchDialog] = React.useState(false);
  const [initialData, setInitialData] = React.useState({
    FM_ORDER_HEADERID: "",
    CREATED_DATE: "",
    DESCRIPTION: "",
    WORKORDER_TYPESID: "",
    ORDER_STATUSID: "",
    WORKORDER_CATEGORYID: "",
    AREA: "",
    PRODUCTION_LINE: "",
    LAST_PRODUCT_NAME: "",
    LAST_BATCH_COMPLETION_DATE: "",
    NEXT_PRODUCT_NAME: "",
    NEXT_BATCH_PLANNED_DATE: "",
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
  const [materialSearchDialog, setMaterialSearchDialog] = React.useState({
    isOpen: false,
    data: {},
  } as { isOpen: boolean; data: object });
  const materialSearch = (data: any) => {
    if (data) {
      console.log(data);
    }
    setMaterialSearchDialog({ data: {}, isOpen: false });
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
  const fmrStatus = [
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
  const typeOfCleaning = [
    {
      value: "Type-1",
    },
    {
      value: "Type-2",
    },
    {
      value: "Type-3",
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
            <h2 className="header-margin">Facility Clearance</h2>
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
                                name="FM_ORDER_HEADERID"
                                label="FMR Number"
                                type="text"
                                value={values.FM_ORDER_HEADERID}
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
                            label="FMR Status"
                            value={values.ORDER_STATUSID}
                            menuItems={fmrStatus.map((x) => {
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
                            name="WORKORDER_CATEGORYID"
                            label="Type of cleaning"
                            value={values.WORKORDER_CATEGORYID}
                            menuItems={typeOfCleaning.map((x) => {
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
                            name="PRODUCTION_LINE"
                            label="Production Line"
                            type="text"
                            value={values.PRODUCTION_LINE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="LAST_PRODUCT_NAME"
                                label="Last Product manufactured"
                                type="text"
                                value={values.LAST_PRODUCT_NAME}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setMaterialSearchDialog({
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
                            name="LAST_BATCH_COMPLETION_DATE"
                            label="Last Batch completion Date"
                            value={values.LAST_BATCH_COMPLETION_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="NEXT_PRODUCT_NAME"
                                label="Next Product planned"
                                type="text"
                                value={values.NEXT_PRODUCT_NAME}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setMaterialSearchDialog({
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
                            name="NEXT_BATCH_PLANNED_DATE"
                            label="Next Batch planned on Date"
                            value={values.NEXT_BATCH_PLANNED_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            disabled
                            name="CREATED_BY"
                            label="Request By"
                            type="text"
                            value={values.CREATED_BY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            disabled
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
            tableName={TABLE_NAMES.WORKORDER_CATEGORY}
            onClose={(data: any) => workOrderSearch(data)}
          />
        </CustomDialogComponent>
      )}
      {materialSearchDialog?.isOpen && (
        <CustomDialogComponent
          title="Material Search"
          onClose={() => materialSearch(undefined)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
             tableName={TABLE_NAMES.MATERIAL_DETAILS}
            onClose={(data: any) => materialSearch(data)}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default Requisition;

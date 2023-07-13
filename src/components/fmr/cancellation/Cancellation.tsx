import * as React from "react";
import { Grid, Card, CardContent, IconButton, Typography } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import AppButton from "index/shared/inputs/AppButton";
import { useState } from "react";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import { TABLE_NAMES } from "index/Constant";
interface FMRCancellationProps {}

const FMRCancellationComponent: React.FC<FMRCancellationProps> = () => {
  const [workOrderSearchDialog, setWorkOrderSearchDialog] = useState({
    isOpen: false,
    type: "",
    tableName:"",
  } as { isOpen: boolean; type: string,tableName:string });

  const handleDialogClose = (data: any) => {
    setWorkOrderSearchDialog({
      isOpen: false,
      type: "",
      tableName:"",
    });
  };
  const [statusValue, setStatusValue] = React.useState("In Process");
  const handleStatusChange = (newValue: any) => {
    console.log(newValue);
    setStatusValue(newValue?.value || undefined);
  };
  const [reasonValue, setInstructionValue] = React.useState("aa");
  const handleReasonChange = (newValue: any) => {
    console.log(newValue);
    setInstructionValue(newValue?.value || undefined);
  };
  const reasonList = [
    {
      value: "aa",
    },
    {
      value: "My Process instructions",
    },
    {
      value: "process",
    },
    {
      value: "Test1",
    },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid style={{ padding: "16px" }} container spacing={2} direction="row">
          <Grid item>
            <h2 className="header-margin">FMR Cancellation</h2>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  FM_ORDER_HEADERID: "",
                  AREA: "",
                  PRODUCTION_LINE: "",
                  NEXT_PRODUCT_NAME: "",
                  NEXT_PRODUCT: "",
                  NEXT_BATCH_PLANNED_DATE: "",
                  ORDER_STATUSID: "",

                  BATCH_SIZE: "",
                }}
                validate={(values: any) => {
                  let errors: any = {};
                  if (!values["FM_ORDER_HEADERID"]) {
                    errors["FM_ORDER_HEADERID"] = "Required";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log("material", values);
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
                  <div style={{ padding: "16px" }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item lg={12}>
                          <Grid container spacing={2}>
                            <Grid
                              container
                              item
                              xs={12}
                              sm={5}
                              md={3}
                              lg={6}
                              className="flex-1"
                            >
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
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  setWorkOrderSearchDialog({
                                    isOpen: true,
                                    type: "Work Order",
                                    tableName:TABLE_NAMES.FM_ORDER_HEADER,
                                  });
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppTextInput
                                disabled
                                name="AREA"
                                label="Area"
                                type="text"
                                value={values.AREA}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppTextInput
                                disabled
                                name="PRODUCTION_LINE"
                                label="Production Line"
                                type="text"
                                value={values.PRODUCTION_LINE}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="NEXT_PRODUCT_NAME"
                                label="Product Planned"
                                type="text"
                                value={values.NEXT_PRODUCT_NAME}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="NEXT_PRODUCT"
                                label="Product ID"
                                type="text"
                                value={values.NEXT_PRODUCT}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="NEXT_BATCH_PLANNED_DATE"
                                label="Planned on Date"
                                type="text"
                                value={values.NEXT_BATCH_PLANNED_DATE}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppSelectInput
                                disabled
                                name="ORDER_STATUSID"
                                label="Current Status"
                                // value={values.ORDER_STATUSID}
                                value={statusValue}
                                menuItems={reasonList.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleStatusChange}
                              ></AppSelectInput>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppSelectInput
                                name="BMR_CANCELLATION_REASONSID"
                                label="Reason for Cancellation"
                                // value={values.BMR_CANCELLATION_REASONSID}
                                value={reasonValue}
                                menuItems={reasonList.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleReasonChange}
                              ></AppSelectInput>
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
                    </form>
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {workOrderSearchDialog.isOpen && (
        <CustomDialogComponent
          title={`${workOrderSearchDialog.type} Search`}
          onClose={(data: any) => handleDialogClose(data)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName={workOrderSearchDialog?.tableName?.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default FMRCancellationComponent;

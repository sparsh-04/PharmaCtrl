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

interface ResourceComponentProps {}

const ResourceComponent: React.FunctionComponent<
  ResourceComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    resourceid: "",
    name: "",
    description: "",
    capacityid: "",
    colorid: "",
    shapeid: "",
    uomid: "",
    resource_status: "",
    resource_new_statusid: "",
    work_order: "",
    iscurrent: "",
    annual_plan: "",
    monthly_plan: "",
    weekly_plan: "",
    out_comments: "",
  });
  const [capacities, setCapacities] = useState([]);
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [newStatuses, setNewStatuses] = useState([]);
  const [currentStatuses, setcurrentStatuses] = useState([]);
  const [annualPlanList, setAnnualPlanList] = useState([]);
  const [monthlyPlanList, setMonthlyPlanList] = useState([]);
  const [weeklyPlanList, setweeklyPlanList] = useState([]);
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, data: {}, tableName:"" });

  const [resourceHistory, setResourceHistory] = useState();

  const handleDialogOpen = (data?: any) => {
    setDialogInfo({ data, isOpen: true, tableName:TABLE_NAMES.RESOURCE });
  };
  const handleDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setDialogInfo({ data: {}, isOpen: false, tableName:"" });
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">
            Resource
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
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              disabled={true}
                              name="resourceid"
                              label="Resource"
                              type="text"
                              value={values.resourceid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.resourceid &&
                                (touched.resourceid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.resourceid &&
                                (touched.resourceid || isSubmited) &&
                                errors.resourceid
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
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="name"
                            label="Name"
                            type="text"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.name && (touched.name || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.name &&
                              (touched.name || isSubmited) &&
                              errors.name
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            name="description"
                            label="Description"
                            type="text"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.description &&
                              (touched.description || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.description &&
                              (touched.description || isSubmited) &&
                              errors.description
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={capacities}
                            label="Capacity"
                            name="capacityid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("capacityid", tempValue);
                            }}
                            value={values.capacityid}
                            error={
                              errors.capacityid &&
                              (touched.capacityid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.capacityid &&
                              (touched.capacityid || isSubmited) &&
                              errors.capacityid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={colors}
                            label="Color"
                            name="colorid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("colorid", tempValue);
                            }}
                            value={values.colorid}
                            error={
                              errors.colorid && (touched.colorid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.colorid &&
                              (touched.colorid || isSubmited) &&
                              errors.colorid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={shapes}
                            label="Shape"
                            name="shapeid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("shapeid", tempValue);
                            }}
                            value={values.shapeid}
                            error={
                              errors.shapeid && (touched.shapeid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.shapeid &&
                              (touched.shapeid || isSubmited) &&
                              errors.shapeid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={uoms}
                            label="UOM"
                            name="uomid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("uomid", tempValue);
                            }}
                            value={values.uomid}
                            error={
                              errors.uomid && (touched.uomid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.uomid &&
                              (touched.uomid || isSubmited) &&
                              errors.uomid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            name="resource_status"
                            label="Current Status"
                            type="text"
                            value={values.resource_status}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.resource_status &&
                              (touched.resource_status || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.resource_status &&
                              (touched.resource_status || isSubmited) &&
                              errors.resource_status
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={newStatuses}
                            label="New Status/Out Status"
                            name="resource_new_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("resource_new_statusid", tempValue);
                            }}
                            value={values.resource_new_statusid}
                            error={
                              errors.resource_new_statusid &&
                              (touched.resource_new_statusid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.resource_new_statusid &&
                              (touched.resource_new_statusid || isSubmited) &&
                              errors.resource_new_statusid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppTextInput
                            name="work_order"
                            label="Work Order#"
                            type="text"
                            value={values.work_order}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.work_order &&
                              (touched.work_order || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.work_order &&
                              (touched.work_order || isSubmited) &&
                              errors.work_order
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={currentStatuses}
                            label="Is Current"
                            name="iscurrent"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("iscurrent", tempValue);
                            }}
                            value={values.iscurrent}
                            error={
                              errors.iscurrent &&
                              (touched.iscurrent || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.iscurrent &&
                              (touched.iscurrent || isSubmited) &&
                              errors.iscurrent
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={annualPlanList}
                            label="Annual Plan"
                            name="annual_plan"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("annual_plan", tempValue);
                            }}
                            value={values.annual_plan}
                            error={
                              errors.annual_plan &&
                              (touched.annual_plan || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.annual_plan &&
                              (touched.annual_plan || isSubmited) &&
                              errors.annual_plan
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={monthlyPlanList}
                            label="Monthly Plan"
                            name="monthly_plan"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("monthly_plan", tempValue);
                            }}
                            value={values.monthly_plan}
                            error={
                              errors.monthly_plan &&
                              (touched.monthly_plan || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.monthly_plan &&
                              (touched.monthly_plan || isSubmited) &&
                              errors.monthly_plan
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <AppSelectInput
                            menuItems={weeklyPlanList}
                            label="Weekly Plan"
                            name="weekly_plan"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("weekly_plan", tempValue);
                            }}
                            value={values.weekly_plan}
                            error={
                              errors.weekly_plan &&
                              (touched.weekly_plan || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.weekly_plan &&
                              (touched.weekly_plan || isSubmited) &&
                              errors.weekly_plan
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            name="out_comments"
                            label="Comments"
                            type="text"
                            value={values.out_comments}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.out_comments &&
                              (touched.out_comments || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.out_comments &&
                              (touched.out_comments || isSubmited) &&
                              errors.out_comments
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
          title="Resource Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName={dialogInfo?.tableName?.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ResourceComponent;

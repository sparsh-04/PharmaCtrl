import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  DialogContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AppButton from "index/shared/inputs/AppButton";
import { Grid, IconButton } from "@mui/material";
import AppDatePicker from "../../shared/inputs/AppDateSelect";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import { Formik, FormikErrors } from "formik";
import { TABLE_NAMES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";

interface ChecklistComponentProps {}

const ChecklistComponent: React.FunctionComponent<ChecklistComponentProps> = (
  props
) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [checkListObj, setChecklistObj] = React.useState({
    name: "",
    checklisttype: "",
    resourceid: "",
    networkId: "",
    startDate: "",
    endDate: "",
  });

  const [checkListHistoryObj, setChecklistHistoryObj] = React.useState({
    resourceid: "",
    checklisttype: "",
    networkId: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitted, setSubmitted] = React.useState(false);

  const [resourceSearchDialog, setResourceSearchDialog] = useState({
    isOpen: false,
    type: "",
    search:"",
    tableName: "",
  } as { isOpen: boolean; type: string;search:string; tableName: string });

  const handleDialogClose = (data: any) => {
    if (data) {
      console.log(data);
      if(resourceSearchDialog.search==="checklist"){
        setChecklistObj({
          ...checkListObj,
          name: data.name,
          resourceid: data.resourceid,
        });
      }else{
         setChecklistHistoryObj({
           ...checkListHistoryObj,
           resourceid: data.resourceid,
         });
      }
    }
    setResourceSearchDialog({
      isOpen: false,
      type: "",
      search:"",
      tableName: "",
    });
  };

  const handleTabChange = (e: any, tabIndex: any) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <React.Fragment>
      {<h2 className="header-margin">Checklist</h2>}
      <Card>
        <CardContent style={{ padding: "0px" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Tabs
                value={currentTabIndex}
                onChange={handleTabChange}
                style={{ borderBottom: "1px solid grey", color: "#ffccbc" }}
              >
                <Tab
                  label="CHECKLIST"
                  className={`checklist-tab ${
                    currentTabIndex === 0 ? "active" : ""
                  }`}
                  style={{ color: "rgb(243 139 106)" }}
                />
                <Tab
                  label="CHECKLIST HISTORY"
                  className={`checklist-tab ${
                    currentTabIndex === 1 ? "active" : ""
                  }`}
                  style={{ color: "rgb(243 139 106)" }}
                />
              </Tabs>

              {currentTabIndex === 0 && (
                <Formik
                  initialValues={checkListObj}
                  enableReinitialize
                  validate={(values) => {
                    let errors: any = {};
                    if (!values.name) {
                      errors.name = "Required";
                    }

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
                    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <AppTextInput
                              disabled
                              label="Resource"
                              name="name"
                              // placeholder="Resource"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                errors.name && (touched.name || isSubmitted)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.name &&
                                (touched.name || isSubmitted) &&
                                errors.name
                              }
                            />
                            <IconButton
                              color="primary"
                              sx={{
                                backgroundColor: "#efefef",
                                marginTop: 2.5,
                                padding: 1.5,
                                "&.MuiIconButton-root:hover": {
                                  backgroundColor: "#efefef",
                                },
                              }}
                              onClick={() => {
                                setResourceSearchDialog({
                                  isOpen: true,
                                  type: "Resource",
                                  search:"checklist",
                                  tableName: TABLE_NAMES.RESOURCE,
                                });
                              }}
                            >
                              <QueueIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            disabled
                            label="Resource ID"
                            name="resourceid"
                            // placeholder="12018102"
                            type="text"
                            value={values.resourceid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.resourceid &&
                              (touched.resourceid || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.resourceid &&
                              (touched.resourceid || isSubmitted) &&
                              errors.resourceid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppSelectInput
                            disabled
                            label="Checklist Type"
                            name="checklisttype"
                            value={values.checklisttype}
                            menuItems={[]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.checklisttype &&
                              (touched.checklisttype || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.checklisttype &&
                              (touched.checklisttype || isSubmitted) &&
                              errors.name
                            }
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Box display="flex" justifyContent="end">
                            <AppButton
                              btnText="Clear"
                              //   onClick={() => {
                              //     getList(values);
                              //   }}
                              //   startIcon={<SearchIcon />}
                              type="submit"
                              variant="contained"
                            />
                            <AppButton
                              btnText="Submit"
                              disabled
                              //   onClick={() => {
                              //     getList(values);
                              //   }}
                              //   startIcon={<SearchIcon />}
                              type="submit"
                              className="ml-2"
                              color="primary"
                              variant="contained"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              )}

              {currentTabIndex === 1 && (
                <Formik
                  enableReinitialize
                  initialValues={checkListHistoryObj}
                  validate={(values: any) => {
                    let errors: any = {};
                    if (!values["Order#"]) {
                      errors["Order#"] = "Required";
                    }

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
                    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppTextInput
                            label="Network ID"
                            name="networkId"
                            //  placeholder="12018102"
                            type="text"
                            value={values.networkId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.networkId &&
                              (isSubmitted || touched.networkId)
                                ? true
                                : false
                            }
                            helperText={
                              errors.networkId &&
                              (isSubmitted || touched.networkId) &&
                              errors.networkId
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <Box display="flex" flexDirection="row">
                            <AppTextInput
                              disabled
                              label="Resource ID"
                              name="resourceid"
                              //  placeholder="12018102"
                              type="text"
                              value={values.resourceid}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                errors.resourceid &&
                                (touched.resourceid || isSubmitted)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.resourceid &&
                                (touched.resourceid || isSubmitted) &&
                                errors.resourceid
                              }
                            />
                            <IconButton
                              color="primary"
                              sx={{
                                backgroundColor: "#efefef",
                                marginTop: 2.5,
                                padding: 1.5,
                                "&.MuiIconButton-root:hover": {
                                  backgroundColor: "#efefef",
                                },
                              }}
                              onClick={() => {
                                setResourceSearchDialog({
                                  isOpen: true,
                                  type: "Resource",
                                  search:"checklisthistory",
                                  tableName: TABLE_NAMES.RESOURCE,
                                });
                              }}
                            >
                              <QueueIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppSelectInput
                            disabled
                            label="Checklist Type"
                            name="checklisttype"
                            // placeholder="Checklist Type"
                            value={values.checklisttype}
                            menuItems={[]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.checklisttype &&
                              (touched.checklisttype || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.checklisttype &&
                              (touched.checklisttype || isSubmitted) &&
                              errors.checklisttype
                            }
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppDatePicker
                            label="Start Date"
                            name="startDate"
                            // type="text"
                            value={values.startDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.startDate &&
                              (isSubmitted || touched.startDate)
                                ? true
                                : false
                            }
                            helperText={
                              errors.startDate &&
                              (isSubmitted || touched.startDate) &&
                              errors.startDate
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <AppDatePicker
                            label="End Date"
                            name="endDate"
                            value={values.endDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.endDate && (touched.endDate || isSubmitted)
                                ? true
                                : false
                            }
                            helperText={
                              errors.endDate &&
                              (touched.endDate || isSubmitted) &&
                              errors.endDate
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box
                            display="flex"
                            justifyContent="start"
                            alignItems="end"
                            height="100%"
                          >
                            <AppButton
                              // style={{ background: "none", color: "black" }}
                              btnText="Get"
                              disabled
                              //   onClick={() => {
                              //     getList(values);
                              //   }}
                              //   startIcon={<SearchIcon />}
                              type="submit"
                              variant="contained"
                              color="primary"
                              className="ml-2"
                            />
                            <AppButton
                              disabled
                              btnText="EXPORT"
                              type="submit"
                              variant="contained"
                              color="primary"
                              className="ml-2"
                            >
                              <PictureAsPdfIcon />
                            </AppButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {resourceSearchDialog.isOpen && (
        <ObjectSearchDialogComponent
          title={`${resourceSearchDialog.type} Search`}
          onClose={handleDialogClose}
          tableName={resourceSearchDialog?.tableName?.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ChecklistComponent;

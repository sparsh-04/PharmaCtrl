import * as React from "react";
import { Grid, Card, CardContent, IconButton } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "../common/CustomDialogComponent";

import { useState } from "react";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import moment from "moment";
import { LIST_SV, TABLE_NAMES } from "index/Constant";
interface WorkOrderComponentProps {}

const WorkOrderComponent: React.FC<WorkOrderComponentProps> = () => {
  const [workOrderDialog, setworkOrderDialog] = useState({
    isOpen: false,
    type: "",
    tableName: "",
    data: {},
  } as { isOpen: boolean; type: string; tableName: string; data?: any });

  const handleDialogClose = (data: any) => {
    setworkOrderDialog({
      isOpen: false,
      type: "",
      tableName: "",
      data: {},
    });
  };
  const list = [
    {
      value: "one",
    },
    {
      value: "two",
    },
    {
      value: "three",
    },
    {
      value: "four",
    },
    {
      value: "five",
    },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Allocate Workorder</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  ORDER_HEADERID: "",
                  DESCRIPTION: "",
                  ORDER_STATUSID: "",
                  WORKORDER_TYPESID: "",
                  RECIPEID: "",
                  RECIPENAME: "",
                  RECIPEREVISION: "",
                  RECIPEPROCESSINSTRUCTIONSNAME: "",
                  BOMID: "",
                  BOMNAME: "",
                  BOMREVISION: "",
                  COMPANY: "",
                  CREATED_BY: "",
                  CREATED_DATE: "",
                }}
                validate={(values: any) => {
                  let errors: any = {};
                  if (!values["Order#"]) {
                    errors["Order#"] = "Required";
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
                        <Grid container style={{ padding: "16px" }}>
                          <Grid item md={6} className="flex-1">
                            <AppTextInput
                              disabled
                              name="ORDER_HEADERID"
                              label="Order#"
                              type="text"
                              value={values.ORDER_HEADERID}
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
                                setworkOrderDialog({
                                  isOpen: true,
                                  type: "Work Order",
                                  tableName: TABLE_NAMES.ORDER_HEADER,
                                  data: {
                                    methodListName:
                                      LIST_SV.getWorkOrderTypesListSV,
                                    autoLoad: false,
                                    showListDropDown: true,
                                    filterByList: false,
                                  },
                                });
                              }}
                            >
                              <QueueIcon />
                            </IconButton>
                          </Grid>
                        </Grid>

                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={3} md={3} lg={6}>
                              <AppTextInput
                                name="DESCRIPTION"
                                label="Description"
                                type="text"
                                value={values.DESCRIPTION}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  touched.DESCRIPTION && errors.DESCRIPTION
                                    ? true
                                    : false
                                }
                                errorText={errors.DESCRIPTION}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppSelectInput
                                disabled
                                name="ORDER_STATUSID"
                                label="Order Status"
                                value={values.ORDER_STATUSID}
                                // value={BOMvalue}
                                menuItems={list.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppSelectInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppSelectInput
                                disabled
                                name="WORKORDER_TYPESID"
                                label="Order Type"
                                value={values.WORKORDER_TYPESID}
                                // value={BOMvalue}
                                menuItems={list.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppSelectInput>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              lg={3}
                              className="flex-1"
                            >
                              <AppTextInput
                                disabled
                                name="RECIPEID"
                                label="Recipe"
                                type="text"
                                value={values.RECIPEID}
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
                                  setworkOrderDialog({
                                    isOpen: true,
                                    type: "Recipe",
                                    tableName: TABLE_NAMES.RECIPE,
                                  });
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppTextInput
                                disabled
                                name="RECIPENAME"
                                label="Recipe Name"
                                type="text"
                                value={values.RECIPENAME}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppTextInput
                                disabled
                                name="RECIPEREVISION"
                                label="Recipe Revision"
                                type="text"
                                value={values.RECIPEREVISION}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <Grid container>
                                <Grid item className="flex-1">
                                  <AppTextInput
                                    disabled
                                    name="RECIPEPROCESSINSTRUCTIONSNAME"
                                    label="Process Instruction"
                                    type="text"
                                    value={values.RECIPEPROCESSINSTRUCTIONSNAME}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  ></AppTextInput>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    disabled
                                    color="primary"
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
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <Grid container>
                                <Grid item className="flex-1">
                                  <AppTextInput
                                    disabled
                                    name="BOMID"
                                    label="BOM"
                                    type="text"
                                    value={values.BOMID}
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
                                      setworkOrderDialog({
                                        isOpen: true,
                                        type: "BOM",
                                        tableName: TABLE_NAMES.BOM,
                                      });
                                    }}
                                  >
                                    <QueueIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="BOMNAME"
                                label="BOM Name"
                                type="text"
                                value={values.BOMNAME}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppDatePicker
                                disabled
                                name="BOMREVISION"
                                label="BOM Revision"
                                value={values.BOMREVISION}
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = "";
                                  if (e) {
                                    tempValue = moment(e).toISOString();
                                  }
                                  setFieldValue(values.BOMREVISION, tempValue);
                                }}
                              ></AppDatePicker>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="COMPANY"
                                label="Company"
                                type="text"
                                value={values.COMPANY}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="CREATED_BY"
                                label="Created By"
                                type="text"
                                value={values.CREATED_BY}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="CREATED_DATE"
                                label="Created On"
                                type="text"
                                value={values.CREATED_DATE}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
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
                    </form>
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {workOrderDialog.isOpen && (
        <CustomDialogComponent
          title={`${workOrderDialog.type} Search`}
          onClose={(data: any) => handleDialogClose(data)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            data={workOrderDialog?.data}
            tableName={workOrderDialog?.tableName?.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default WorkOrderComponent;

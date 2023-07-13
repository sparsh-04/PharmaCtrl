import * as React from "react";
import { Grid, Card, CardContent, IconButton, Typography } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "../common/CustomDialogComponent";

import { useState } from "react";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import moment from "moment";
import { TABLE_NAMES } from "index/Constant";
interface BOMComponentProps {}

const BOMComponent: React.FC<BOMComponentProps> = () => {
  const [bomSearchDialog, setBomSearchDialog] = useState({
    isOpen: false,
    type: "",
  } as { isOpen: boolean; type: string });

  const handleDialogClose = (data: any) => {
    setBomSearchDialog({
      isOpen: false,
      type: "",
    });
  };
  const [statusValue, setStatusValue] = React.useState("In Process");
  const handleStatusChange = (newValue: any) => {
    console.log(newValue);
    setStatusValue(newValue?.value || undefined);
  };
  const statusList = [
    {
      value: "In Process",
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
        <Grid
          style={{ padding: "16px" }}
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <h2 className="header-margin">BOM</h2>
          </Grid>
          <Grid item>
            <AppButton
              btnText="Create Wip"
              type="submit"
              variant="outlined"
              color="primary"
            ></AppButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  NAME: "",
                  REVISION: "",
                  EFFECTIVE_DATE: "",
                  DESCRIPTION: "",
                  BOM_STATUSID:"",
                  BATCH_SIZE:""
                }}
                validate={(values: any) => {
                  let errors: any = {};
                  if (!values["NAME"]) {
                    errors["NAME"] = "Required";
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
                              lg={4}
                              className="flex-1"
                            >
                              <AppTextInput
                                disabled
                                name="NAME"
                                label="Name"
                                type="text"
                                value={values.NAME}
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
                                  setBomSearchDialog({
                                    isOpen: true,
                                    type: "BOM",
                                  });
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>

                            <Grid item xs={12} sm={5} md={3} lg={8}>
                              <AppTextInput
                                disabled
                                name="DESCRIPTION"
                                label="Description"
                                type="text"
                                value={values.DESCRIPTION}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={5} md={3} lg={3}>
                              <AppSelectInput
                              disabled
                                name="BOM_STATUSID"
                                label="Status"
                                // value={values.BOM_STATUSID}
                                value={statusValue}
                                menuItems={statusList.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleStatusChange}
                              ></AppSelectInput>
                            </Grid>
                            <Grid
                              container
                              item
                              xs={12}
                              sm={5}
                              md={3}
                              lg={3}
                              className="flex-1"
                            >
                              <AppTextInput
                                disabled
                                name="REVISION"
                                label="Revision"
                                type="text"
                                value={values.REVISION}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                              disabled
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
                                  setBomSearchDialog({
                                    isOpen: true,
                                    type: "Material",
                                  });
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3}>
                            <AppDatePicker
                                name="EFFECTIVE_DATE"
                                label="Effective Date"
                                value={values.EFFECTIVE_DATE}
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.EFFECTIVE_DATE, tempValue);
                                  }}
                              ></AppDatePicker>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3}>
                               <AppTextInput
                                name="BATCH_SIZE"
                                label="Batch Size"
                                type="text"
                                value={values.BATCH_SIZE}
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
                                btnText="Delete"
                                type="submit"
                                variant="outlined"
                                color="primary"
                              />
                            </Grid>
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

      {bomSearchDialog.isOpen && (
        <CustomDialogComponent
          title={`${bomSearchDialog.type} Search`}
          onClose={(data: any) => handleDialogClose(data)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName={TABLE_NAMES.BOM.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default BOMComponent;

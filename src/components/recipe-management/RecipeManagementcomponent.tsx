import * as React from "react";
import { Grid, Card, CardContent, IconButton, Typography } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import QueueIcon from "@mui/icons-material/Queue";
import AppButton from "index/shared/inputs/AppButton";

import { useState } from "react";
import moment from "moment";
import { TABLE_NAMES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
interface RecipeManagementComponentProps {}

const RecipeManagementComponent: React.FC<
  RecipeManagementComponentProps
> = () => {
  const [recipeSearchDialog, setRecipeSearchDialog] = useState({
    isOpen: false,
    type: "",
    tableName:""
  } as { isOpen: boolean; type: string ,tableName:string});

  const handleDialogClose = (data: any) => {
    if(data){
      console.log(data);
    }
    setRecipeSearchDialog({
      isOpen: false,
      type: "",
      tableName:"",
    });
  };
  const [instructionValue, setInstructionValue] = React.useState("aa");
  const handleInstructionChange = (newValue: any) => {
    console.log(newValue);
    setInstructionValue(newValue?.value || undefined);
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
  const processInstructionList = [
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
        <Grid
          style={{ padding: "16px" }}
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <h2 className="header-margin">Recipe</h2>
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
                  RECIPE_STATUSID: "",
                  RECIPEID: "",
                  EFFECTIVE_DATE: "",
                  PROCESS_INSTRUCTIONSID: "",
                  DESCRIPTION: "",
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
                                  setRecipeSearchDialog({
                                    isOpen: true,
                                    type: "Recipe",
                                    tableName:TABLE_NAMES.RECIPE,
                                  });
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="REVISION"
                                label="Revision"
                                type="text"
                                value={values.REVISION}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={4}>
                              <AppSelectInput
                                disabled
                                name="RECIPE_STATUSID"
                                label="Recipe Status"
                                value={values.RECIPE_STATUSID}
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
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppTextInput
                                disabled
                                name="RECIPEID"
                                label="Recipe Id"
                                type="text"
                                value={values.RECIPEID}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={8}>
                              <AppTextInput
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
                            <Grid item xs={12} sm={5} md={3} lg={4}>
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
                            <Grid item xs={12} sm={5} md={3} lg={4}>
                              <AppSelectInput
                                name="PROCESS_INSTRUCTIONSID"
                                label="Process Instructions"
                                // value={values.PROCESS_INSTRUCTIONSID}
                                value={instructionValue}
                                menuItems={processInstructionList.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleInstructionChange}
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

      {recipeSearchDialog.isOpen && (
          <ObjectSearchDialogComponent
          title={`${recipeSearchDialog.type} Search`}
            onClose={(data: any) => handleDialogClose(data)}
            tableName={recipeSearchDialog?.tableName?.toLocaleLowerCase()}
          />
      )}
    </React.Fragment>
  );
};

export default RecipeManagementComponent;

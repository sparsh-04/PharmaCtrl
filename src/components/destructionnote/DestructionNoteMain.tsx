import * as React from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
interface DestructionNoteMainProps {}

const DestructionNoteMain: React.FC<DestructionNoteMainProps> = () => {
  const [search, setSearch] = React.useState<any>({});
  const menuItems = [
    {
      value: "abc",
    },
    {
      value: "abcd",
    },
    {
      value: "abcde",
    },
    {
      value: "abcdef",
    },
    {
      value: "abcdefg",
    },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2 className="header-margin">Destruction Note</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  DESTRUCTION_NOTE_ID: "",
                  NOTE_DATE: "",
                  REQUISTION_FROM: "",
                  DESTRUCTION_NOTE_STATUSID: "",
                  MATERIAL_NAME: "",
                  CONTAINER_ID: "",
                  AVAILABLE_QUANTITY: "",
                  MANUFACTURED_BY: "",
                  VENDOR_BATCH_NO: "",
                  MANUFACTURING_DATE: "",
                  EXPIRATION_DATE: "",
                  DESTRUCTION_REASON: "",
                  METHOD_OF_DESTRUCTION: "",
                }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.DESTRUCTION_NOTE_ID) {
                    errors.DESTRUCTION_NOTE_ID = "Required";
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
                  resetForm,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item lg={12}>
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              name="DESTRUCTION_NOTE_ID"
                              label="Destruction Note ID"
                              type="text"
                              value={values.DESTRUCTION_NOTE_ID}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={<SearchIcon
                                className="pointer"
                                onClick={() => {
                                  console.log("test");
                                } } />}
                              error={touched.DESTRUCTION_NOTE_ID &&
                                errors.DESTRUCTION_NOTE_ID
                                ? true
                                : false}
                              errorText={errors.DESTRUCTION_NOTE_ID} fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="NOTE_DATE"
                              label="Requisition Date"
                              value={values.NOTE_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="REQUISTION_FROM"
                              label="Requisition From"
                              type="text"
                              value={values.REQUISTION_FROM}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppSelectInput
                              name="DESTRUCTION_NOTE_STATUSID"
                              label="Status"
                              value={values.DESTRUCTION_NOTE_STATUSID}
                              menuItems={menuItems.map((x) => {
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
                                setFieldValue(values.DESTRUCTION_NOTE_STATUSID, tempValue);
                              }}
                            ></AppSelectInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="MATERIAL_NAME"
                              label="Material"
                              type="text"
                              value={values.MATERIAL_NAME}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="CONTAINER_ID"
                              label="Container"
                              type="text"
                              value={values.CONTAINER_ID}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="AVAILABLE_QUANTITY"
                              label="Quantity"
                              type="text"
                              value={values.AVAILABLE_QUANTITY}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="MANUFACTURED_BY"
                              label="Manufacturer / Supplier"
                              type="text"
                              value={values.MANUFACTURED_BY}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="VENDOR_BATCH_NO"
                              label="Batch Number"
                              type="text"
                              value={values.VENDOR_BATCH_NO}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="MANUFACTURING_DATE"
                              label="Manufactured Date"
                              value={values.MANUFACTURING_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="EXPIRATION_DATE"
                              label="Expiry Date"
                              value={values.EXPIRATION_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <AppTextInput
                              disabled
                              name="DESTRUCTION_REASON"
                              label="Reason for Destruction"
                              type="text"
                              value={values.DESTRUCTION_REASON}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <AppTextInput
                              disabled
                              name="METHOD_OF_DESTRUCTION"
                              label="Method for Destruction"
                              type="text"
                              value={values.METHOD_OF_DESTRUCTION}
                              onBlur={handleBlur}
                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item>
                            <AppButton
                              btnText="Cancel"
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
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DestructionNoteMain;

import { Divider, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
interface ServiceRequestDetailsDialogProps {
  onClose: Function;
}

const ServiceRequestDetailsDialog: React.FC<
  ServiceRequestDetailsDialogProps
> = ({ onClose }) => {
  const [detailsSearch, setDetailsSearch] = React.useState({
    REPAIRS_REQUIRED: "",
    RESOURCE_AVAILABLE_DATE: "",
    WORK_PERFORMED: "",
    BREAKDOWN_ANALYSIS: "",
  });
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            enableReinitialize
            initialValues={detailsSearch}
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
                  <AppTextInput
                    name="REPAIRS_REQUIRED"
                    label="Repairs Required"
                    type="text"
                    value={values.REPAIRS_REQUIRED}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></AppTextInput>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <AppDatePicker
                        name="RESOURCE_AVAILABLE_DATE"
                        label="Commitment date"
                        value={values.RESOURCE_AVAILABLE_DATE}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppDatePicker>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <AppTextInput
                    name="WORK_PERFORMED"
                    label="Description of the work performed:"
                    type="text"
                    value={values.WORK_PERFORMED}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></AppTextInput>
                </Grid>
                <Grid item xs={12}>
                  <AppTextInput
                    name="BREAKDOWN_ANALYSIS"
                    label="Breakdown analysis if any"
                    type="text"
                    value={values.BREAKDOWN_ANALYSIS}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></AppTextInput>
                </Grid>
                <Divider style={{ padding: "0px" }} />
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <br />
                  <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <AppButton
                        size="medium"
                        btnText="Cancel"
                        variant="outlined"
                        type="button"
                        className="cancel-btn"
                        color="primary"
                        onClick={() => onClose()}
                      />
                    </Grid>
                    <Grid item>
                      <AppButton
                        btnText="Save"
                        type="button"
                        onClick={() => {
                          onClose();
                        }}
                        variant="contained"
                        className="add-btn"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Status Message:</Typography>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ServiceRequestDetailsDialog;

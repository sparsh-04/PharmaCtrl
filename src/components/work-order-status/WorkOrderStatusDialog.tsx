import { Grid, Typography, Divider, IconButton } from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";

import * as React from "react";
interface WorkOrderStatusDialogProps {
  onClose: Function;
}

const WorkOrderStatusDialog: React.FC<WorkOrderStatusDialogProps> = ({
  onClose,
}) => {
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
  ];
  const [selectedValue, setValues] = React.useState("one");
  const handleselectedChange = (newValue: any) => {
    setValues(newValue?.value || undefined);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{ orderId: "", stageName: "",taskName:"",comments:"",statusId:"",userId:"",password:""}}
        validate={(values) => {
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
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      disabled
                      name="orderId"
                      label="Order"
                      type="text"
                      value={values.orderId}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.orderId && errors.orderId ? true : false
                      }
                      errorText={errors.orderId}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      disabled
                      name="stageName"
                      label="Stage"
                      type="text"
                      value={values.stageName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.stageName && errors.stageName ? true : false
                      }
                      errorText={errors.stageName}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      disabled
                      name="taskName"
                      label="Task"
                      type="text"
                      value={values.taskName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.taskName && errors.taskName ? true : false
                      }
                      errorText={errors.taskName}
                    ></AppTextInput>
                  </Grid>
                </Grid>
              </Grid>
              <Divider style={{ paddingTop: "10px" }} />
              <Grid item lg={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <AppTextInput
                      name="comments"
                      label="Comments"
                      type="text"
                      value={values.comments}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.comments && errors.comments ? true : false
                      }
                      errorText={errors.comments}
                    ></AppTextInput>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppSelectInput
                      name="statusId"
                      label="Status"
                      // value={values.statusId}
                      value={selectedValue}
                      menuItems={list.map((x) => {
                        return {
                          label: x.value,
                          value: x.value,
                        };
                      })}
                      onBlur={handleBlur}
                      onChange={handleselectedChange}
                    ></AppSelectInput>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      disabled
                      name="userId"
                      label="User Id"
                      type="text"
                      value={values.userId}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.userId && errors.userId ? true : false
                      }
                      errorText={errors.userId}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      name="password"
                      label="Password"
                      type="text"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.password && errors.password ? true : false
                      }
                      errorText={errors.password}
                    ></AppTextInput>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ paddingTop: "10px" }} />
            <Grid item lg={12} style={{ paddingTop: "10px" }}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <AppButton
                    btnText="cancel"
                    type="submit"
                    variant="outlined"
                    onClick={() => onClose()}
                  />
                </Grid>
                <Grid item>
                  <AppButton
                    disabled
                    btnText="Submit"
                    type="submit"
                    variant="contained"
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>Status Message:</Typography>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default WorkOrderStatusDialog;

import { Grid, Typography, Divider, IconButton } from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import QueueIcon from "@mui/icons-material/Queue";

import * as React from "react";
interface ResourceCheckListDialogProps {
  onClose: Function;
  data: any;
  curMonth: any;
  resourceNames: any;
}

const ResourceCheckListDialog: React.FC<ResourceCheckListDialogProps> = ({
  onClose,
  data,
  curMonth,
  resourceNames,
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
  React.useEffect(() => {
    console.log("test", data, onClose);
  }, []);
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{ NAME: "", RESOURCEID: "", selectedCLType: "" }}
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
                    <Grid container>
                      <Grid item className="flex-1">
                        <AppTextInput
                          disabled
                          name="NAME"
                          label="Resource"
                          type="text"
                          value={resourceNames}
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppTextInput
                      disabled
                      name="RESOURCEID"
                      label="Resource Id"
                      type="text"
                      value={values.RESOURCEID}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.RESOURCEID && errors.RESOURCEID ? true : false
                      }
                      errorText={errors.RESOURCEID}
                    ></AppTextInput>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AppSelectInput
                      name="selectedCLType"
                      label="Checklist Type"
                      // value={values.selectedCLType}
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
                {curMonth != true && (
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography fontWeight="bold" color="#f44336">
                        You have selected an expired/future plan you can not
                        take checklist now
                      </Typography>
                    </Grid>
                  </Grid>
                )}
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

export default ResourceCheckListDialog;

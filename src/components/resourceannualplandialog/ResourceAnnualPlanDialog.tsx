import { Grid, Typography, Divider } from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
interface ResourceBuyPlanDialogProps {
  onClose: Function;
  data: any;
  resourceNames: any;
  resourceMonth: any;
  year: any;
}

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

const ResourceBuyPlanDialog: React.FC<ResourceBuyPlanDialogProps> = ({
  onClose,
  data,
  resourceMonth,
  resourceNames,
  year,
}) => {
  const [search, setSearch] = React.useState<any>({});
  React.useEffect(() => {
    console.log("test", data, onClose);
  }, []);
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{ NAME: "", RESOURCEID: "" }}
        validate={(values) => {
          let errors: any = {};
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
          resetForm,
        }) => (
          <div>
            <Grid container spacing={4}>
              <Grid item lg={12}>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justifyContent="center"
                >
                  <Grid item>
                    <h2 className="header-margin">
                      Do you want to plan
                    </h2>
                  </Grid>
                  <Grid item>
                    <p>
                      Audit for {resourceNames} in {year} {resourceMonth}
                    </p>
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
                        btnText="no"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={() => onClose()}    
                      />
                    </Grid>
                    <Grid item>
                      <AppButton
                        btnText="yes"
                        type="submit"
                        variant="outlined"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ResourceBuyPlanDialog;

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

interface ResourceAllocationComponentProps {}

const ResourceAllocationComponent: React.FunctionComponent<
  ResourceAllocationComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    resourceid: "",
    name: "",
    site: "",
    plant: "",
    line: "",
    mfg_stageid: "",
  });
  const [sites, setSites] = useState([]);
  const [plants, setPlants] = useState([]);
  const [lines, setLines] = useState([]);
  const [stages, setStages] = useState([]);
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
          <h2 className="header-margin">Resource Allocation</h2>
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
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={sites}
                            label="Site"
                            name="site"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("site", tempValue);
                            }}
                            value={values.site}
                            error={
                              errors.site && (touched.site || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.site &&
                              (touched.site || isSubmited) &&
                              errors.site
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={plants}
                            label="Plant"
                            name="plant"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("plant", tempValue);
                            }}
                            value={values.plant}
                            error={
                              errors.plant && (touched.plant || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.plant &&
                              (touched.plant || isSubmited) &&
                              errors.plant
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={lines}
                            label="Line"
                            name="line"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("line", tempValue);
                            }}
                            value={values.line}
                            error={
                              errors.line && (touched.line || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.line &&
                              (touched.line || isSubmited) &&
                              errors.line
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                          <AppSelectInput
                            menuItems={stages}
                            label="Stage"
                            name="mfg_stageid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue("mfg_stageid", tempValue);
                            }}
                            value={values.mfg_stageid}
                            error={
                              errors.mfg_stageid &&
                              (touched.mfg_stageid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.mfg_stageid &&
                              (touched.mfg_stageid || isSubmited) &&
                              errors.mfg_stageid
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

export default ResourceAllocationComponent;

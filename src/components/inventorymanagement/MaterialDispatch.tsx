/* eslint-disable react/jsx-no-undef */
import {
  FormControlLabel,
  FormLabel,
  FormControl,
  Grid,
  Radio,
  Card,
  CardContent,
  RadioGroup,
  Tabs,
  Tab,
  Divider,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { StatusContext } from "index/providers/StatusProvider";
import { getCompany } from "index/services/util/UtilService";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import SearchIcon from "@mui/icons-material/Search";

import * as React from "react";
import Loading from "../common/Loading";
import AppButton from "index/shared/inputs/AppButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AppRadioGroupInput from "index/shared/inputs/AppRadioGroupInput";
import moment from "moment";

interface MaterialDispatchProps {}

const MaterialDispatch: React.FunctionComponent<MaterialDispatchProps> = () => {
  // React.useEffect(() => {
  //   let company = getCompany();
  //   if (company) {
  //     setCompanyName(company);
  //   }
  // }, []);
  const [search, setSearch] = React.useState<any>({});

  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [companyName, setCompanyName] = React.useState("");
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

  const [value, setValue] = React.useState("Material Dispatch");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [BOMvalue, setBOMValue] = React.useState("1");
  const handleBomChange = (event: React.SyntheticEvent, newValue: string) => {
    setBOMValue(newValue);
  };
  const [radioValue, setValues] = React.useState("workOrder");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((event.target as HTMLInputElement).value);
  };
  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Material Dispatch</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs
                value={value}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab
                  className={
                    value === "Material Dispatch"
                      ? "active-tab"
                      : "in-active-tab"
                  }
                  value="Material Dispatch"
                  label="Material Dispatch"
                />
                <Tab
                  className={
                    value === "Material Dispatch History"
                      ? "active-tab"
                      : "in-active-tab"
                  }
                  value="Material Dispatch History"
                  label="Material Dispatch History"
                />
              </Tabs>
              <Divider style={{ padding: "0px" }} />
              {value === "Material Dispatch" && (
                <Formik
                  enableReinitialize
                  initialValues={{
                    "Order#": "",
                    containerId: "",
                    Line: "",
                    Product_Name: "",
                    "Order Created On": "",
                    "Order Status": "",
                    MATERIAL_TYPEID: "",
                    batch_quantity: "",
                    selectedBom: "",
                    selectedMaterial: "",
                    EFFECTIVE_DATE: "",
                    MATERIAL_DESCRIPTION: "",
                    DEFAULT_QUANTITY: "",
                    DISPATCHED_BY: "",
                    DISPATCHED_ON: "",
                    APPROVED_BY: "",
                    APPROVED_ON: "",
                    DISPATCH_NO: "",
                    ...list,
                  }}
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
                  }) => (
                    <div style={{ padding: "16px" }}>
                      <form onSubmit={handleSubmit}>
                        <FormControl>
                          <Grid
                            container
                            direction="row"
                            justifyContent={{xs:"start",sm:"start",md:"center"}}
                            alignItems="center"
                            spacing={{ xs: 0, sm: 2, md: 8, lg: 10, xl: 10 }}
                          >
                            <Grid item>
                              <FormLabel id="demo-row-radio-buttons-group-label">
                                Material Issue
                              </FormLabel>
                            </Grid>
                            <Grid item>
                              <AppRadioGroupInput
                                row={true}
                                value={radioValue}
                                onChange={handleRadioChange}
                                menuItems={[
                                  { label: "Work Order", value: "workOrder" },
                                  { label: "Others", value: "others" },
                                  {
                                    label: "Physical Verification",
                                    value: "physicalVerification",
                                  },
                                ]}
                              />
                            </Grid>
                          </Grid>
                        </FormControl>

                        <Grid container spacing={2}>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                {radioValue === "workOrder" && (
                                  <AppTextInput
                                    name="Order#"
                                    label="Work Order"
                                    type="text"
                                    value={values["Order#"]}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                      <SearchIcon
                                        className="pointer"
                                        onClick={() => {
                                          console.log("material");
                                        }}
                                      />
                                    }
                                    error={
                                      touched["Order#"] && errors["Order#"]
                                        ? true
                                        : false
                                    }
                                    errorText={errors["Order#"]}
                                  ></AppTextInput>
                                )}
                                {(radioValue === "others" ||
                                  radioValue === "physicalVerification") && (
                                  <AppTextInput
                                    name="containerId"
                                    label="Container ID"
                                    type="text"
                                    value={values.containerId}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                      <SearchIcon
                                        className="pointer"
                                        onClick={() => {
                                          console.log("material");
                                        }}
                                      />
                                    }
                                    error={
                                      touched["Order#"] && errors["Order#"]
                                        ? true
                                        : false
                                    }
                                    errorText={errors["Order#"]}
                                  ></AppTextInput>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="Line"
                                  label="Line"
                                  type="text"
                                  value={values["Line"]}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    touched["Line"] && errors["Line"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["Line"]}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="Product_Name"
                                  label="Product Name"
                                  type="text"
                                  value={values["Product_Name"]}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    touched["Product_Name"] &&
                                    errors["Product_Name"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["Product_Name"]}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
                                  name="Order Created On"
                                  label="Created On"
                                  value={values["Order Created On"]}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values["Order Created On"], tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="Status"
                                  label="Status"
                                  type="text"
                                  value={values["Order Status"]}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="MATERIAL_TYPEID"
                                  label="FG/SFG Code"
                                  type="text"
                                  value={values.MATERIAL_TYPEID}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="batch_quantity"
                                  label="Batch Size"
                                  type="text"
                                  value={values.batch_quantity}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppSelectInput
                                  name="selectedBom"
                                  label="BOM Version"
                                  value="selectedBom"
                                  menuItems={list.map((x) => {
                                    return {
                                      label: x.value,
                                      value: x.value,
                                    };
                                  })}
                                  onBlur={handleBlur}
                                  onChange={handleBomChange}
                                ></AppSelectInput>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
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
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppSelectInput
                                  disabled
                                  name="selectedMaterial"
                                  label="Material"
                                  // value={values.selectedMaterial}
                                  value={BOMvalue}
                                  menuItems={list.map((x) => {
                                    return {
                                      label: x.value,
                                      value: x.value,
                                    };
                                  })}
                                  onBlur={handleBlur}
                                  onChange={handleBomChange}
                                ></AppSelectInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="MATERIAL_DESCRIPTION"
                                  label="Material Description"
                                  type="text"
                                  value={values.MATERIAL_DESCRIPTION}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
                                  name="DEFAULT_QUANTITY"
                                  label="Quantity Required"
                                  value={values.DEFAULT_QUANTITY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.DEFAULT_QUANTITY, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="DISPATCHED_BY"
                                  label="Dispatched By"
                                  type="text"
                                  value={values.DISPATCHED_BY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="DISPATCHED_ON"
                                  label="Dispatched On"
                                  type="text"
                                  value={values.DISPATCHED_ON}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  name="APPROVED_BY"
                                  label="Approved By"
                                  type="text"
                                  value={values.APPROVED_BY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  name="APPROVED_ON"
                                  label="Approved On"
                                  value={values.APPROVED_ON}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.APPROVED_ON, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                <AppTextInput
                                  disabled
                                  name="DISPATCH_NO"
                                  label="Material Dispatch NoteID"
                                  type="text"
                                  value={values.DISPATCH_NO}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  )}
                </Formik>
              )}
              {value === "Material Dispatch History" && (
                <Formik
                  enableReinitialize
                  initialValues={{
                    "Order#": "",
                    Line: "",
                    "Order Created On": "",
                    "Order Status": "",
                    fgSfgCode: "",
                    batch_quantity: "",
                    selectedMaterial: "",
                    EFFECTIVE_DATE: "",
                    MATERIAL_DESCRIPTION: "",
                    DEFAULT_QUANTITY: "",
                    DISPATCHED_BY: "",
                    DISPATCHED_ON: "",
                    APPROVED_BY: "",
                    APPROVED_ON: "",
                    RECEIVED_BY: "",
                    RECEIVED_ON: "",
                    DISPATCH_NO: "",
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
                          <Grid
                            style={{ padding: "16px" }}
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item md={3}>
                              <AppTextInput
                                name="Order#"
                                label="Work Order"
                                type="text"
                                value={values["Order#"]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <SearchIcon
                                    className="pointer"
                                    onClick={() => {
                                      console.log("material");
                                    }}
                                  />
                                }
                                error={
                                  touched["Order#"] && errors["Order#"]
                                    ? true
                                    : false
                                }
                                errorText={errors["Order#"]}
                              ></AppTextInput>
                            </Grid>

                            <Grid item>
                              <AppButton
                                disabled
                                btnText="EXPORT"
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                <PictureAsPdfIcon />
                              </AppButton>
                            </Grid>
                          </Grid>

                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  name="DISPATCH_NO#"
                                  label="Material Dispatch NoteID"
                                  type="text"
                                  value={values["DISPATCH_NO"]}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  endAdornment={
                                    <SearchIcon
                                      className="pointer"
                                      onClick={() => {
                                        console.log("material");
                                      }}
                                    />
                                  }
                                  error={
                                    touched["DISPATCH_NO"] &&
                                    errors["DISPATCH_NO"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["DISPATCH_NO"]}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="Line"
                                  label="Line"
                                  type="text"
                                  value={values["Line"]}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    touched["Line"] && errors["Line"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["Line"]}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
                                  name="Order Created On"
                                  label="Created On"
                                  value={values["Order Created On"]}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values["Order Created On"], tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="Status"
                                  label="Status"
                                  type="text"
                                  value={values["Order Status"]}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="fgSfgCode"
                                  label="FG/SFG Code"
                                  type="text"
                                  value={values.fgSfgCode}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="batch_quantity"
                                  label="Batch Size"
                                  type="text"
                                  value={values.batch_quantity}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
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
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppSelectInput
                                  disabled
                                  name="selectedMaterial"
                                  label="Material"
                                  value={values.selectedMaterial}
                                  // value={BOMvalue}
                                  menuItems={list.map((x) => {
                                    return {
                                      label: x.value,
                                      value: x.value,
                                    };
                                  })}
                                  onBlur={handleBlur}
                                  onChange={handleBomChange}
                                ></AppSelectInput>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="MATERIAL_DESCRIPTION"
                                  label="Material Description"
                                  type="text"
                                  value={values.MATERIAL_DESCRIPTION}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
                                  name="DEFAULT_QUANTITY"
                                  label="Quantity Required"
                                  value={values.DEFAULT_QUANTITY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.DEFAULT_QUANTITY, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="DISPATCHED_BY"
                                  label="Dispatched By"
                                  type="text"
                                  value={values.DISPATCHED_BY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="DISPATCHED_ON"
                                  label="Dispatched On"
                                  type="text"
                                  value={values.DISPATCHED_ON}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppTextInput
                                  disabled
                                  name="APPROVED_BY"
                                  label="Approved By"
                                  type="text"
                                  value={values.APPROVED_BY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  disabled
                                  name="APPROVED_ON"
                                  label="Approved On"
                                  value={values.APPROVED_ON}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.APPROVED_ON, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  name="RECEIVED_BY"
                                  label="Received By"
                                  value={values.RECEIVED_BY}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.RECEIVED_BY, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={3}>
                                <AppDatePicker
                                  name="RECEIVED_ON"
                                  label="Received On"
                                  value={values.RECEIVED_ON}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.RECEIVED_ON, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  )}
                </Formik>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MaterialDispatch;

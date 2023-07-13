import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Fab,
  FormLabel,
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
import AppRadioGroupInput from "index/shared/inputs/AppRadioGroupInput";
import { TABLE_NAMES } from "index/Constant";

interface ProductComplaintFormComponentProps {}

const ProductComplaintFormComponent: React.FunctionComponent<
  ProductComplaintFormComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    product_complaintsid: "",
    complaint_date: "",
    complaint_receipt_mode: "",
    complaint_from: "",
    complaint_from_address: "",
    productid: "",
    batch_no: "",
    manufacturing_date: "",
    sample_receipt_status: "",
    expiration_date: "",
    sample_condition: "",
    classification_of_complaint: "",
    nature_of_complaint: "",
    reply_date: "",
    followup_comments: "",
    remarks: "",
  });
  const [auditLocations, setAuditLocations] = useState([]);
  const [inspectionStatuses, setInspectionStatuses] = useState([]);
  const [observations, setObservations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [productComplaintDialogInfo, setProductComplaintDialogInfo] = useState({
    isOpen: false,
    data: {},
  });
  const [productSearchDialogInfo, setProductSearchDialogInfo] = useState({
    isOpen: false,
    data: {},
  });

  const handleProductSearchDialogOpen = (data?: any) => {
    setProductSearchDialogInfo({ data, isOpen: true });
  };
  const handleProductSearchDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setProductSearchDialogInfo({ data: {}, isOpen: false });
  };

  const handleProductComplaintDialogOpen = (data?: any) => {
    setProductComplaintDialogInfo({ data, isOpen: true });
  };
  const handleProductComplaintDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setProductComplaintDialogInfo({ data: {}, isOpen: false });
  };

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Product Complaint Form</h2>
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              disabled={true}
                              name="product_complaintsid"
                              label="Product Compliant Number"
                              type="text"
                              value={values.product_complaintsid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.product_complaintsid &&
                                (touched.product_complaintsid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.product_complaintsid &&
                                (touched.product_complaintsid || isSubmited) &&
                                errors.product_complaintsid
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
                                onClick={() =>
                                  handleProductComplaintDialogOpen()
                                }
                              >
                                <QueueIcon />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled={true}
                            required={true}
                            label="Date of COmplaint"
                            name="complaint_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("complaint_date", tempValue);
                            }}
                            value={values?.complaint_date || ""}
                            error={
                              errors.complaint_date &&
                              (touched.complaint_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.complaint_date &&
                              (touched.complaint_date || isSubmited) &&
                              errors.complaint_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 0, sm: 2, md: 8, lg: 10, xl: 10 }}
                          >
                            <Grid item>
                              <FormLabel id="demo-row-radio-buttons-group-label">
                                Mode of Receipt:
                              </FormLabel>
                            </Grid>
                            <Grid item>
                              <AppRadioGroupInput
                                row={true}
                                value={values?.complaint_receipt_mode}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                menuItems={[
                                  { label: "Mail", value: "Mail" },
                                  { label: "E-Mail", value: "E-Mail" },
                                  {
                                    label: "Letter",
                                    value: "Letter",
                                  },
                                ]}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            required={true}
                            name="complaint_from"
                            label="Complaint Form"
                            type="text"
                            value={values.complaint_from}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.complaint_from &&
                              (touched.complaint_from || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.complaint_from &&
                              (touched.complaint_from || isSubmited) &&
                              errors.complaint_from
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="complaint_from_address"
                            label="Address"
                            type="text"
                            value={values.complaint_from_address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.complaint_from_address &&
                              (touched.complaint_from_address || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.complaint_from_address &&
                              (touched.complaint_from_address || isSubmited) &&
                              errors.complaint_from_address
                            }
                          />
                          <Typography
                            variant="caption"
                            display="flex"
                            justifyContent="end"
                            color={
                              values?.complaint_from_address &&
                              String(values.complaint_from_address)?.length >
                                2000
                                ? "red"
                                : "inherit"
                            }
                          >
                            {values.complaint_from_address
                              ? String(values.complaint_from_address)?.length
                              : 0}
                            /2000
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Box display="flex">
                                <AppTextInput
                                  disabled={true}
                                  required={true}
                                  name="productid"
                                  label="Product ID"
                                  type="text"
                                  value={values.productid}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    errors.productid &&
                                    (touched.productid || isSubmited)
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    errors.productid &&
                                    (touched.productid || isSubmited) &&
                                    errors.productid
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
                                    onClick={() =>
                                      handleProductSearchDialogOpen()
                                    }
                                  >
                                    <QueueIcon />
                                  </IconButton>
                                </div>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            required={true}
                            disabled={true}
                            name="batch_no"
                            label="Lot / Batch Number"
                            type="text"
                            value={values.batch_no}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.batch_no &&
                              (touched.batch_no || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.batch_no &&
                              (touched.batch_no || isSubmited) &&
                              errors.batch_no
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled={true}
                            required={true}
                            label="Mfg Date"
                            name="manufacturing_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("manufacturing_date", tempValue);
                            }}
                            value={values?.manufacturing_date || ""}
                            error={
                              errors.manufacturing_date &&
                              (touched.manufacturing_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.manufacturing_date &&
                              (touched.manufacturing_date || isSubmited) &&
                              errors.manufacturing_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            name="sample_receipt_status"
                            label="Sample Receipt Status"
                            type="text"
                            value={values.sample_receipt_status}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.sample_receipt_status &&
                              (touched.sample_receipt_status || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.sample_receipt_status &&
                              (touched.sample_receipt_status || isSubmited) &&
                              errors.sample_receipt_status
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled={true}
                            required={true}
                            label="Exp Date"
                            name="expiration_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("expiration_date", tempValue);
                            }}
                            value={values?.expiration_date || ""}
                            error={
                              errors.expiration_date &&
                              (touched.expiration_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.expiration_date &&
                              (touched.expiration_date || isSubmited) &&
                              errors.expiration_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            required={true}
                            name="sample_condition"
                            label="Condition of the sample"
                            type="text"
                            value={values.sample_condition}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.sample_condition &&
                              (touched.sample_condition || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.sample_condition &&
                              (touched.sample_condition || isSubmited) &&
                              errors.sample_condition
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            required={true}
                            name="classification_of_complaint"
                            label="Classification of Complaint"
                            type="text"
                            value={values.classification_of_complaint}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.classification_of_complaint &&
                              (touched.classification_of_complaint ||
                                isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.classification_of_complaint &&
                              (touched.classification_of_complaint ||
                                isSubmited) &&
                              errors.classification_of_complaint
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            required={true}
                            name="nature_of_complaint"
                            label="Nature of Complaint"
                            type="text"
                            value={values.nature_of_complaint}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.nature_of_complaint &&
                              (touched.nature_of_complaint || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.nature_of_complaint &&
                              (touched.nature_of_complaint || isSubmited) &&
                              errors.nature_of_complaint
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppDatePicker
                            disabled={true}
                            required={true}
                            label="Date for Reply"
                            name="reply_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("reply_date", tempValue);
                            }}
                            value={values?.reply_date || ""}
                            error={
                              errors.reply_date &&
                              (touched.reply_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.reply_date &&
                              (touched.reply_date || isSubmited) &&
                              errors.reply_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="followup_comments"
                            label="Follow Up (if any)"
                            type="text"
                            value={values.followup_comments}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.followup_comments &&
                              (touched.followup_comments || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.followup_comments &&
                              (touched.followup_comments || isSubmited) &&
                              errors.followup_comments
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="remarks"
                            label="Remarks"
                            type="text"
                            value={values.remarks}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            rows={2}
                            error={
                              errors.remarks && (touched.remarks || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.remarks &&
                              (touched.remarks || isSubmited) &&
                              errors.remarks
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
      {productComplaintDialogInfo?.isOpen && (
        <CustomDialogComponent
          title="Product Complaint Search"
          onClose={() => handleProductComplaintDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleProductComplaintDialogClose(data)}
            tableName={TABLE_NAMES.PRODUCT_COMPLAINTS.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
      {productSearchDialogInfo?.isOpen && (
        <CustomDialogComponent
          title="Product Search"
          onClose={() => handleProductSearchDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleProductSearchDialogClose(data)}
            tableName={TABLE_NAMES.PRODUCT_COMPLAINTS.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ProductComplaintFormComponent;

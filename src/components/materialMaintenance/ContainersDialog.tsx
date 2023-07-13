import {
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import QueueIcon from "@mui/icons-material/Queue";
import * as React from "react";
import CustomDialogComponent from "../common/CustomDialogComponent";
import VendorsDialog from "./VendorsDialog";
import moment from "moment";
interface ContainersDialogProps {
  onContainersClose: Function;
  materialSearchData:any;
}

const ContainersDialog: React.FC<ContainersDialogProps> = ({
  onContainersClose,materialSearchData
}) => {
  const [containerDetailsSearch, setContainerDetailsSearch] = React.useState({
    CONTAINER_ID: "",
    VENDOR_BATCH_NO: "",
    CONTROL_NUMBER: "",
    MANUFACTURED_BY: "",
    MANUFACTURING_DATE: "",
    EXPIRATION_DATE: "",
    RECEIVED_BY: materialSearchData.MODIFIEDBY,
    RECEIVED_DATE: materialSearchData.MODIFIEDON,
    RETEST_PERIOD: "",
    RECEIVED_QUANTITY: "",
    GROSS_WEIGHT: "",
    GRADE: "",
    NET_QUANTITY: "",
    TARE_WEIGHT: "",
    WAREHOUSE_LOCATIONID: "",
    MATERIAL_STATUSID: "",
  });
  const [isVendorDialog, setIsVendorDialog] = React.useState(false);
  const vendorDialog = (data:any) => {
     console.log(materialSearchData)
    if(data){
      setShipmentSearch({
        // ...shipmentSearch,
        ...data,
        NAME:materialSearchData.NAME,
        Type:materialSearchData.Material_Type,
        UOM:materialSearchData.UOM,
      });
    }
    setIsVendorDialog(false);
  };
  const [shipmentSearch, setShipmentSearch] = React.useState({
    NAME:materialSearchData.NAME,
    Type:materialSearchData.Material_Type,
    UOM: materialSearchData.UOM,
    VENDOR_DETAILSID: "",
    SHIPMENT_DETAILSID: "",
    SHIPMENT_DT: "",
    DELIVERY_CHALLAN_NO: "",
    INVOICE_NUMBER: "",
    INVOICE_DATE: "",
    PO_NUMBER: "",
    PO_DATE: "",
    COA: "",
    VEHICLE_DETAILS: "",
    SHIPMENT_NOTES: "",
  });
  const [value, setValue] = React.useState("SHIPMENT DETAILS");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const wareHouseLocation = [
    {
      value: "wareHouseLocation",
    },
    {
      value: "wareHouseLocation",
    },
    {
      value: "wareHouseLocation",
    },
    {
      value: "wareHouseLocation",
    },
  ];
  const materialStatus = [
    {
      value: "Hold",
    },
    {
      value: "Hold",
    },
    {
      value: "Hold",
    },
    {
      value: "Hold",
    },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <h3 className="header">SHIPMENT DETAILS</h3>
        </Grid> */}
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab
              className={
                value === "SHIPMENT DETAILS" ? "active-tab" : "in-active-tab"
              }
              value="SHIPMENT DETAILS"
              label="SHIPMENT DETAILS"
            />
            <Tab
              className={
                value === "CONTAINER DETAILS" ? "active-tab" : "in-active-tab"
              }
              value="CONTAINER DETAILS"
              label="CONTAINER DETAILS"
            />
          </Tabs>
          <Divider style={{ padding: "0px" }} />
          {value === "SHIPMENT DETAILS" && (
            <Formik
              enableReinitialize
              initialValues={shipmentSearch}
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
              }) => (
                <div style={{ padding: "16px" }}>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Grid item xs={12} spacing={2}>
                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="NAME"
                              label="Material"
                              type="text"
                              value={values.NAME}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="Type"
                              label="Type"
                              type="text"
                              value={values.Type}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="UOM"
                              label="UOM"
                              type="text"
                              value={values.UOM}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Grid container>
                              <Grid item className="flex-1">
                                <AppTextInput
                                  required
                                  name="VENDOR_DETAILSID"
                                  label="Vendor"
                                  type="text"
                                  value={values.VENDOR_DETAILSID}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {}}
                                ></AppTextInput>
                              </Grid>
                              <Grid item>
                                <IconButton
                                  color="primary"
                                  onClick={() => setIsVendorDialog(true)}
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
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppSelectInput
                              name="SHIPMENT_DETAILSID"
                              label="Shipment Method"
                              value={values.SHIPMENT_DETAILSID}
                              menuItems={wareHouseLocation.map((x) => {
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
                                setFieldValue(values.SHIPMENT_DETAILSID, tempValue);
                              }}
                            ></AppSelectInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppDatePicker
                              disabled
                              name="SHIPMENT_DT"
                              label="Shipment Date"
                              value={values.SHIPMENT_DT}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="DELIVERY_CHALLAN_NO"
                              label="Delivery Challen No"
                              type="text"
                              value={values.DELIVERY_CHALLAN_NO}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="INVOICE_NUMBER"
                              label="Invoice No"
                              type="text"
                              value={values.INVOICE_NUMBER}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppDatePicker
                              disabled
                              name="INVOICE_DATE"
                              label="Invoice Date"
                              value={values.INVOICE_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="PO_NUMBER"
                              label="PO No"
                              type="text"
                              value={values.PO_NUMBER}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppDatePicker
                              disabled
                              name="PO_DATE"
                              label="PO Date"
                              value={values.PO_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="COA"
                              label="COA"
                              type="text"
                              value={values.COA}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="SHIPMENT_DETAILSID"
                              label="Shipment Number"
                              type="text"
                              value={values.SHIPMENT_DETAILSID}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="VEHICLE_DETAILS"
                              label="Vehicle Details"
                              type="text"
                              value={values.VEHICLE_DETAILS}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <AppTextInput
                              required
                              name="SHIPMENT_NOTES"
                              label="Shipment Notes"
                              type="text"
                              value={values.SHIPMENT_NOTES}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid
                            container
                            spacing={2}
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
                                onClick={() => onContainersClose()}
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

                        <Divider style={{ padding: "0px", margin: "12px" }} />

                        <Grid item xs={12}>
                          <Typography>Status Message:</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              )}
            </Formik>
          )}
          {value === "CONTAINER DETAILS" && (
            <Formik
              enableReinitialize
              initialValues={containerDetailsSearch}
              validate={(values: any) => {
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
                setFieldValue,
              }) => (
                <div style={{ padding: "20px" }}>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Grid item xs={12} spacing={2}>
                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="CONTAINER_ID"
                              label="Container Id"
                              type="text"
                              value={values.CONTAINER_ID}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="VENDOR_BATCH_NO"
                              label="Batch No"
                              type="text"
                              value={values.VENDOR_BATCH_NO}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="CONTROL_NUMBER"
                              label="Control No"
                              type="text"
                              value={values.CONTROL_NUMBER}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="MANUFACTURED_BY"
                              label="Manufactured By"
                              type="text"
                              value={values.MANUFACTURED_BY}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppDatePicker
                              disabled
                              name="MANUFACTURING_DATE"
                              label="Expiry Date"
                              value={values.MANUFACTURING_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppDatePicker
                              disabled
                              name="EXPIRATION_DATE"
                              label="Expiry Date"
                              value={values.EXPIRATION_DATE}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="RECEIVED_BY"
                              label="Received By"
                              type="text"
                              value={values.RECEIVED_BY}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              name="RECEIVED_DATE"
                              label="Received Date"
                              type="text"
                              value={values.RECEIVED_DATE}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="RETEST_PERIOD"
                              label="Retest Period"
                              type="text"
                              value={values.CONTAINER_ID}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="RECEIVED_QUANTITY"
                              label="Received Quantity"
                              type="text"
                              value={values.RECEIVED_QUANTITY}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="GROSS_WEIGHT"
                              label="Gross Weight"
                              type="text"
                              value={values.GROSS_WEIGHT}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="GRADE"
                              label="Grade"
                              type="text"
                              value={values.GRADE}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          xs={12}
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="NET_QUANTITY"
                              label="Net Quantity"
                              type="text"
                              value={values.NET_QUANTITY}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppTextInput
                              required
                              name="TARE_WEIGHT"
                              label="Tare Weight"
                              type="text"
                              value={values.TARE_WEIGHT}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppSelectInput
                              required
                              name="WAREHOUSE_LOCATIONID"
                              label="Warehouse Location"
                              value={values.WAREHOUSE_LOCATIONID}
                              menuItems={wareHouseLocation.map((x) => {
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
                                setFieldValue(values.WAREHOUSE_LOCATIONID, tempValue);
                              }}
                            ></AppSelectInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} lg={3}>
                            <AppSelectInput
                              required
                              name="MATERIAL_STATUSID"
                              label="Status"
                              value={values.MATERIAL_STATUSID}
                              menuItems={materialStatus.map((x) => {
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
                                setFieldValue(values.MATERIAL_STATUSID, tempValue);
                              }}
                            ></AppSelectInput>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid
                            container
                            spacing={2}
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
                                onClick={() => onContainersClose()}
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

                        <Divider style={{ padding: "0px", margin: "12px" }} />

                        <Grid item xs={12}>
                          <Typography>Status Message:</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </Grid>
      </Grid>
      {isVendorDialog && (
        <CustomDialogComponent
          title="Containers"
          onClose={() => vendorDialog(undefined)}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <VendorsDialog onContainersClose={vendorDialog} />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ContainersDialog;

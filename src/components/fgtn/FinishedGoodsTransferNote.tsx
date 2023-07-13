import { Card, CardContent, Grid, IconButton } from "@mui/material";
import { Formik } from "formik";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
import QueueIcon from "@mui/icons-material/Queue";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomDialogComponent from "../common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import { TABLE_NAMES } from "index/Constant";
interface FinishedGoodsTransferNoteProps {}

const FinishedGoodsTransferNote: React.FC<
  FinishedGoodsTransferNoteProps
> = () => {
  const [fgtnHeader, setFGTNHeader] = React.useState({
    FGTN_HEADERID: "",
    MFG_LINEID: "",
    FGTN_STATUSID: "",
    CREATED_BY: "",
    CREATED_DATE: "",
  });
  const [fgtnDetails, setFGTNDetails] = React.useState({
    ORDER_HEADERID: "",
    PRODUCTNAME: "",
    BATCH_QTY: "",
    BATCH_NO: "",
    MFG_DATE: "",
    PACK_SIZE: "",
    CUMULATIVE_QUANTITY: "",
    QUANTITY: "",
    NO_OF_BOXES: "",
  });
  const [FGTNSearch, setIsFGTNSearch] = React.useState({
    isOpen: false,
    data: {},
  } as { isOpen: boolean; data: object });
  const fgtnSearch =(data:any)=>{
    setIsFGTNSearch({
      isOpen: false,
      data: {},
    })
  }
  const productionLineList = [
    {
      value: "Bachupalli-FTO1-Line1",
    },
    {
      value: "Bachupalli-FTO1-Line1",
    },
    {
      value: "Bachupalli-FTO1-Line1",
    },
    {
      value: "Bachupalli-FTO1-Line1",
    },
  ];
  const statusList = [
    {
      value: "In Process",
    },
    {
      value: "In Process",
    },
    {
      value: "In Process",
    },
    {
      value: "In Process",
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
            <h2 className="header-margin">FGTN</h2>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={fgtnHeader}
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4} md={4}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="FGTN_HEADERID"
                                label="FGTN No"
                                type="text"
                                value={values.FGTN_HEADERID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setIsFGTNSearch({
                                    data: {},
                                    isOpen: true,
                                  })
                                }
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

                        <Grid item xs={12} sm={6} lg={4} md={4}>
                          <AppSelectInput
                            name="MFG_LINEID"
                            label="Production Line"
                            value={values.MFG_LINEID}
                            menuItems={productionLineList.map((x) => {
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
                              setFieldValue(values.MFG_LINEID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} md={4}>
                          <AppSelectInput
                            disabled
                            name="FGTN_STATUSID"
                            label="Status"
                            value={values.FGTN_STATUSID}
                            menuItems={statusList.map((x) => {
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
                              setFieldValue(values.FGTN_STATUSID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={3} md={3}>
                          <AppTextInput
                            disabled
                            name="CREATED_BY"
                            label="Created By"
                            type="text"
                            value={values.CREATED_BY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3} md={3}>
                          <AppDatePicker
                            disabled
                            name="CREATED_DATE"
                            label="Date"
                            value={values.CREATED_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
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
                )}
              </Formik>
              <Formik
                enableReinitialize
                initialValues={fgtnDetails}
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={2.4} md={2.4}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                name="ORDER_HEADERID"
                                label="WO Number"
                                type="text"
                                value={values.ORDER_HEADERID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <SearchOutlinedIcon
                                color="primary"
                                onClick={() =>
                                    {}
                                }
                                sx={{
                                  backgroundColor: "#ddd",
                                  marginTop: "10%",
                                  borderRadius: "50%",
                                  fontSize: "30px",
                                  padding:"5px"
                                }}
                              >
                                <QueueIcon />
                              </SearchOutlinedIcon>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={2.4} md={2.4}>
                          <AppTextInput
                            disabled
                            name="PRODUCTNAME"
                            label="Product"
                            type="text"
                            value={values.PRODUCTNAME}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={2.4} md={2.4}>
                          <AppTextInput
                            disabled
                            name="BATCH_QTY"
                            label="Batch Quantity"
                            type="text"
                            value={values.BATCH_QTY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2.4} md={2.4}>
                          <AppTextInput
                            disabled
                            name="BATCH_NO"
                            label="Batch No"
                            type="text"
                            value={values.BATCH_NO}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2.4} md={2.4}>
                          <AppDatePicker
                            disabled
                            name="MFG_DATE"
                            label="Mfg Date"
                            value={values.MFG_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={3} md={3}>
                          <AppTextInput
                            name="PACK_SIZE"
                            label="Pack Size"
                            type="text"
                            value={values.PACK_SIZE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>

                        
                        <Grid item xs={12} sm={6} lg={3} md={3}>
                        <AppTextInput
                            name="CUMULATIVE_QUANTITY"
                            label="Cumulative"
                            type="text"
                            value={values.CUMULATIVE_QUANTITY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3} md={3}>
                        <AppTextInput
                            name="QUANTITY"
                            label="Quantity"
                            type="number"
                            value={values.QUANTITY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3} md={3}>
                        <AppTextInput
                            name="NO_OF_BOXES"
                            label="No Of Boxes"
                            type="number"
                            value={values.NO_OF_BOXES}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
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
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {FGTNSearch?.isOpen && (
        <CustomDialogComponent
          title="FGTN Search"
          onClose={() => fgtnSearch(undefined)}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            tableName={TABLE_NAMES.FGTN_HEADER.toLocaleLowerCase()}
            onClose={(data: any) => fgtnSearch(data)}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default FinishedGoodsTransferNote;

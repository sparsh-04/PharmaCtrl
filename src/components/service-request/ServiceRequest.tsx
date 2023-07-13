import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppButton from "index/shared/inputs/AppButton";
import * as React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Formik } from "formik";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import CustomDialogComponent from "../common/CustomDialogComponent";
import ServiceRequestSearchDialog from "./service-request-search-dialog";
import ESignatureDialog from "./e-signature-dialog";
import QueueIcon from "@mui/icons-material/Queue";
import AddIcon from '@mui/icons-material/Add';
import ServiceRequestDetailsDialog from "./service-request-details-dialog";
import moment from "moment";
interface ServiceRequestProps {}

const ServiceRequest: React.FC<ServiceRequestProps> = () => {
  const [isSearchDialog, setIsSearchDialog] = React.useState(false);
  const [isServiceRequestDetailsDialog, setIsServiceRequestDetailsDialog] = React.useState(false);
  const [isESignatureDialog, setIsESignatureDialog] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [search, setSearch] = React.useState({
    SERVICE_REQUEST_HEADERID: "",
    AUDIT_LOCATIONSID: "",
    REQUESTED_BY: "",
    REQUESTED_DATE: "",
    RESOURCEID: "",
    SERVICE_REQUEST_STATUSID: "",
    LOCATION: "",
    PROBLEM_DESCRIPTION: "",
    EMERGENCY_REMARKS: "",
  });
  const serviceRequestSearchDialog = (data: any) => {
    if (data) {
      setSearch({
        ...data,
        SERVICE_REQUEST_HEADERID: data.SERVICE_REQUEST_HEADERID,
        REQUESTED_BY: data["Requested By"],
        REQUESTED_DATE: data["Requested Date"],
        LOCATION: data.Location,
        PROBLEM_DESCRIPTION: data["Problem Description"],
        EMERGENCY_REMARKS: data["Emergency Remarks"],
      });
    }
    setIsSearchDialog(false);
  };
  const eSignatureDialog = () => {
    setIsESignatureDialog(false);
  };
  const serviceRequestDetailsDialog =()=>{
    setIsServiceRequestDetailsDialog(false)
  }
  const departmentsList = [
    {
      value: "Maintenance",
    },
    {
      value: "Packaging",
    },
    {
      value: "Maintenance",
    },
    {
      value: "Maintenance",
    },
    {
      value: "Maintenance",
    },
  ];
  const equipmentsList = [
    {
      value: "equipmentsList",
    },
    {
      value: "equipmentsList",
    },
    {
      value: "equipmentsList",
    },
    {
      value: "equipmentsList",
    },
    {
      value: "equipmentsList",
    },
  ];
  const statusList = [
    {
      value: "Approved",
    },
    {
      value: "Approved",
    },
    {
      value: "Approved",
    },
    {
      value: "Approved",
    },
  ];
  const tableHeaders = [
    { name: "Signature Group" },
    { name: "Signature Role" },
    { name: "Signed By" },
    { name: "Signed On" },
    { name: "Co Signed By" },
  ];
  const searchArray = [
    {
      "Signature Group": "",
      "Signature Role": "superadmin",
      "Signed By": "2018-11-14T18:10:51",
      "Signed On": 0,
      "Co Signed By": "",
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
            <h2 className="header-margin">Service Request</h2>
          </Grid>
          <Grid item>
            <AppButton
              btnText="EXPORT"
              type="submit"
              variant="contained"
              color="warning"
            >
              <PictureAsPdfIcon />
            </AppButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={search}
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
                      <Grid container spacing={2} direction="row">
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="SERVICE_REQUEST_HEADERID"
                                label="Request No"
                                type="text"
                                value={values.SERVICE_REQUEST_HEADERID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() => setIsSearchDialog(true)}
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
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppSelectInput
                            name="AUDIT_LOCATIONSID"
                            label="Department"
                            value={values.AUDIT_LOCATIONSID}
                            menuItems={departmentsList.map((x) => {
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
                              setFieldValue(values.AUDIT_LOCATIONSID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppTextInput
                            disabled
                            name="REQUESTED_BY"
                            label="Requested By"
                            type="text"
                            value={values.REQUESTED_BY}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppDatePicker
                            disabled
                            name="REQUESTED_DATE"
                            label="Requested On"
                            value={values.REQUESTED_DATE}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppDatePicker>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppSelectInput
                            name="RESOURCEID"
                            label="Equipment Name"
                            value={values.RESOURCEID}
                            menuItems={equipmentsList.map((x) => {
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
                              setFieldValue(values.RESOURCEID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppSelectInput
                            name="SERVICE_REQUEST_STATUSID"
                            label="Status"
                            value={values.SERVICE_REQUEST_STATUSID}
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
                              setFieldValue(values.SERVICE_REQUEST_STATUSID, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppTextInput
                            disabled
                            name="LOCATION"
                            label="Location"
                            type="text"
                            value={values.LOCATION}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <AppTextInput
                        disabled
                        name="PROBLEM_DESCRIPTION"
                        label="Problem Observed"
                        type="text"
                        value={values.PROBLEM_DESCRIPTION}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>

                    <Grid item xs={12}>
                      <AppTextInput
                        disabled
                        name="EMERGENCY_REMARKS"
                        label="Remarks on Emergency"
                        type="text"
                        value={values.EMERGENCY_REMARKS}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>

                    {search.SERVICE_REQUEST_HEADERID && (
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item className="flex-1">
                            <TableContainer
                              className="bordered-table"
                              sx={{
                                "&::-webkit-scrollbar": { width: "8px" },
                                "&::-webkit-scrollbar-thumb": {
                                  bgcolor: "#002699",
                                },
                                "&::-webkit-scrollbar-track": {
                                  bgcolor: "#f1f1f1",
                                },
                              }}
                            >
                              <Table style={{ border: "1px solid black" }}>
                                <TableHead
                                  style={{ backgroundColor: "#248f8f" }}
                                >
                                  <TableRow>
                                    {tableHeaders.map((ele) => (
                                      <TableCell key={""}>
                                        <Typography
                                          fontWeight="bold"
                                          color="white"
                                          fontSize={15}
                                          maxWidth="100%"
                                          lineHeight={1}
                                        >
                                          {ele.name}
                                        </Typography>
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {/* <TableRow style={{ backgroundColor: "lightGray" }}> */}
                                  {searchArray.map((ele, index: any) => (
                                    <TableRow
                                      key={index}
                                      className={`${
                                        selectedIndex === index
                                          ? "selected-table-row"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedIndex(index);
                                      }}
                                    >
                                      <TableCell>
                                        {ele["Signature Group"]}
                                      </TableCell>
                                      <TableCell>
                                        {ele["Signature Role"]}
                                      </TableCell>
                                      <TableCell>{ele["Signed By"]}</TableCell>
                                      <TableCell>{ele["Signed On"]}</TableCell>
                                      <TableCell>
                                        {ele["Co Signed By"]}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                  {/* </TableRow> */}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid item>
                            <AppButton
                              // disabled={isSubmitting}
                              onClick={() => setIsESignatureDialog(true)}
                              btnText="COLLECT SIGNATURES"
                              type="submit"
                              variant="contained"
                              color="primary"
                              sx={{whiteSpace:"nowrap"}}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )}

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
          {search.SERVICE_REQUEST_HEADERID && (
            <React.Fragment>
              <Grid
                container
                spacing={0.5}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h2>Service Request Details</h2>
                <Grid item>
                  <AddIcon
                    color="primary"
                    onClick={() =>
                        setIsServiceRequestDetailsDialog(true)
                    }
                    sx={{
                      backgroundColor: "#ddd",
                      marginTop: "10%",
                      borderRadius: "50%",
                      fontSize: "30px",
                    }}
                  >
                    <QueueIcon />
                  </AddIcon>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      {isSearchDialog && (
        <CustomDialogComponent
          title="Service Request Search"
          onClose={() => serviceRequestSearchDialog(undefined)}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <ServiceRequestSearchDialog onClose={serviceRequestSearchDialog} />
        </CustomDialogComponent>
      )}
      {isESignatureDialog && (
        <CustomDialogComponent
          title="E-Signature"
          onClose={() => eSignatureDialog()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <ESignatureDialog onClose={eSignatureDialog} />
        </CustomDialogComponent>
      )}
      {isServiceRequestDetailsDialog && (
        <CustomDialogComponent
          title="Service Request Details"
          onClose={() => serviceRequestDetailsDialog()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <ServiceRequestDetailsDialog onClose={serviceRequestDetailsDialog} />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ServiceRequest;

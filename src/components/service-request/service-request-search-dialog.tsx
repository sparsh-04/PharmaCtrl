import {
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppTextInput from "index/shared/inputs/AppTextInput";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
interface ServiceRequestSearchDialogProps {
  onClose: Function;
}

const ServiceRequestSearchDialog: React.FC<ServiceRequestSearchDialogProps> = ({
  onClose,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [search, setSearch] = React.useState<any>();

  const list = [
    { name: "SERVICE_REQUEST_HEADERID" },
    { name: "MODIFIEDBY" },
    { name: "MODIFIEDON" },
    { name: "STATUS" },
    { name: "PARENTID" },
    { name: "AUDIT_LOCATIONSID" },
    { name: "RESOURCEID" },
    { name: "Requested By" },
    { name: "Requested Date" },
    { name: "Location" },
    { name: "SERVICE_REQUEST_STATUSID" },
    { name: "Problem Description" },
    { name: "Emergency Remarks" },
    { name: "Company" },
  ];

  const searchArray = [
    {
      SERVICE_REQUEST_HEADERID: 12018195,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      AUDIT_LOCATIONSID: 11501100196,
      RESOURCEID: 12018102,
      "Requested By": "superadmin",
      "Requested Date": "17-08-2018",
      Location: "Dispensing Area",
      SERVICE_REQUEST_STATUSID: "11501100072",
      "Problem Description": "Dangerous",
      "Emergency Remarks": "Dangerous",
      Company: "PharmaLite",
    },
    {
      SERVICE_REQUEST_HEADERID: 12018195,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      AUDIT_LOCATIONSID: 11501100196,
      RESOURCEID: 12018102,
      "Requested By": "superadmin",
      "Requested Date": "17-08-2018",
      Location: "Dispensing Area",
      SERVICE_REQUEST_STATUSID: "11501100072",
      "Problem Description": "Dangerous",
      "Emergency Remarks": "Dangerous",
      Company: "PharmaLite",
    },
    {
      SERVICE_REQUEST_HEADERID: 12018195,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      AUDIT_LOCATIONSID: 11501100196,
      RESOURCEID: 12018102,
      "Requested By": "superadmin",
      "Requested Date": "17-08-2018",
      Location: "Dispensing Area",
      SERVICE_REQUEST_STATUSID: "11501100072",
      "Problem Description": "Dangerous",
      "Emergency Remarks": "Dangerous",
      Company: "PharmaLite",
    },
    {
      SERVICE_REQUEST_HEADERID: 12018195,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      AUDIT_LOCATIONSID: 11501100196,
      RESOURCEID: 12018102,
      "Requested By": "superadmin",
      "Requested Date": "17-08-2018",
      Location: "Dispensing Area",
      SERVICE_REQUEST_STATUSID: "11501100072",
      "Problem Description": "Dangerous",
      "Emergency Remarks": "Dangerous",
      Company: "PharmaLite",
    },
  ];
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={search}
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <AppTextInput
                  onChange={() => console.log("search")}
                  type="search"
                  value=""
                  label="Search For"
                  // color="primary"
                  fullWidth={true}
                  onBlur={handleBlur}
                  // variant="standard"
                  name="search"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  startIcon={<SearchIcon />}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    boxShadow: 5,
                    fontSize: 13,
                  }}
                >
                  search
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableContainer
                  className="bordered-table"
                  sx={{
                    "&::-webkit-scrollbar": { width: "8px" },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "#002699" },
                    "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
                  }}
                >
                  <Table style={{ border: "1px solid black" }}>
                    <TableHead style={{ backgroundColor: "#248f8f" }}>
                      <TableRow>
                        {list.map((plans) => (
                          <TableCell key={""}>
                            <Typography
                              fontWeight="bold"
                              color="white"
                              fontSize={15}
                              maxWidth="100%"
                              lineHeight={1}
                            >
                              {plans.name}
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
                            selectedIndex === index ? "selected-table-row" : ""
                          }`}
                          onClick={() => {
                            setSelectedIndex(index);
                          }}
                        >
                          <TableCell>{ele.SERVICE_REQUEST_HEADERID}</TableCell>
                          <TableCell>{ele.MODIFIEDBY}</TableCell>
                          <TableCell>{ele.MODIFIEDON}</TableCell>
                          <TableCell>{ele.STATUS}</TableCell>
                          <TableCell>{ele.PARENTID}</TableCell>
                          <TableCell>{ele.AUDIT_LOCATIONSID}</TableCell>
                          <TableCell>{ele.RESOURCEID}</TableCell>
                          <TableCell>{ele["Requested By"]}</TableCell>
                          <TableCell>{ele["Requested Date"]}</TableCell>
                          <TableCell>{ele.Location}</TableCell>
                          <TableCell>{ele.SERVICE_REQUEST_STATUSID}</TableCell>
                          <TableCell>{ele["Problem Description"]}</TableCell>
                          <TableCell>{ele["Emergency Remarks"]}</TableCell>
                          <TableCell>{ele.Company}</TableCell>
                        </TableRow>
                      ))}
                      {/* </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {/* <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid> */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <br />
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <AppButton
                      size="medium"
                      btnText="Cancel"
                      variant="outlined"
                      // sx={{
                      //   boxShadow: 4,
                      //   color: "black",
                      //   fontWeight: "bold",
                      //   borderRadius: 1,
                      // }}
                      type="button"
                      className="cancel-btn"
                      color="primary"
                      onClick={() => onClose()}
                    />
                  </Grid>
                  <Grid item>
                    <AppButton
                      btnText="Select"
                      type="button"
                      onClick={() => {
                        onClose(searchArray[selectedIndex]);
                      }}
                      variant="contained"
                      className="add-btn"
                      color="primary"
                      disabled={selectedIndex == -1}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>Status Message:</Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ServiceRequestSearchDialog;

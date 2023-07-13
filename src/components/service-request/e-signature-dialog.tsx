import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Divider,
} from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
interface ESignatureDialogProps {
  onClose: Function;
}

const ESignatureDialog: React.FC<ESignatureDialogProps> = ({ onClose }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [eSignatureSearch, setESignatureSearch] = React.useState({
    COMMENTS: "",
    SIGNED_BY: "",
    COSIGNED_BY: "",
    Password: "",
    COSIGNED_PASSWORD: "",
  });
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
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                  <TableHead style={{ backgroundColor: "#248f8f" }}>
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
                          selectedIndex === index ? "selected-table-row" : ""
                        }`}
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                      >
                        <TableCell>{ele["Signature Group"]}</TableCell>
                        <TableCell>{ele["Signature Role"]}</TableCell>
                        <TableCell>{ele["Signed By"]}</TableCell>
                        <TableCell>{ele["Signed On"]}</TableCell>
                        <TableCell>{ele["Co Signed By"]}</TableCell>
                      </TableRow>
                    ))}
                    {/* </TableRow> */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Divider style={{ padding: "0px" }} />
        <Grid item xs={12}>
          <Formik
            enableReinitialize
            initialValues={eSignatureSearch}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AppTextInput
                    name="COMMENTS"
                    label="Comments"
                    type="text"
                    value={values.COMMENTS}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></AppTextInput>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <AppTextInput
                        name="SIGNED_BY"
                        label="User ID"
                        type="text"
                        value={values.SIGNED_BY}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <AppTextInput
                        name="COSIGNED_BY"
                        label="Co Signed By"
                        type="text"
                        value={values.COSIGNED_BY}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <AppTextInput
                        name="Password"
                        label="User Password"
                        type="text"
                        value={values.Password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <AppTextInput
                        name="COSIGNED_PASSWORD"
                        label="Co Signed Password"
                        type="text"
                        value={values.COSIGNED_PASSWORD}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></AppTextInput>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Grid>
        <Divider style={{ padding: "0px" }} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <AppButton
                size="medium"
                btnText="Cancel"
                variant="outlined"
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
    </React.Fragment>
  );
};

export default ESignatureDialog;

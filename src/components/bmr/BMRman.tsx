import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { IGRNdetails } from "index/vm";
import BMRmat from "./Materal";
import BMRSearch from "./BmrSearchDialog";
// import AppTextInput from "";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import QueueIcon from "@mui/icons-material/Queue";
import CustomDialogComponent from "../common/CustomDialogComponent";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppButton from "index/shared/inputs/AppButton";

interface BMRcancelProps {}

const BMRman: React.FunctionComponent<BMRcancelProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [isDialog2, setIsDialog2] = useState(false);
  const [data, setData] = useState(false);
  const handleDialogClose = () => {
    setIsDialog(false);
  };
  const handleDialogClose2 = () => {
    setIsDialog2(false);
  };
  const containerDetails = [
    { name: "Container ID" },
    { name: "Vendor Batch No" },
    { name: "Manufacturing Date" },
    { name: "Exp Date" },
    { name: "Material Status" },
    { name: "Checklist" },
    { name: "Net Quantity" },
    { name: "Available Quantity" },
    { name: "Distr.Note" },
  ];
  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <Typography fontWeight="bold">BMR Cancellation Requisition</Typography>
          <Grid item xs={12}>
            <Formik
              initialValues={
                {
                  bmrNumber: "",
                  ReqDate: "",
                  desc: "",
                  BMRtype: "",
                  ManType: "",
                  BMRstatus: "",
                  BatchNum:"",
                  Material:"",
                  MfgDate:"",
                  BatchSize:"",
                  ExpDate:"",
                  ReqBy:"",
                  RecBy:"",
                 
                } 
                
              }
             
              onSubmit ={ values => {
                const obj = { ...values };
                console.log(obj);
              }}
            >
              {({
                values,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm,
              }) => (
                <Card sx={{ px:8 ,my:2}}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={5.5} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="bmrNumber"
                            label="BMR Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.bmrNumber}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={0.5}>
                        <IconButton
                          color="primary"
                          onClick={() => setIsDialog(true)}
                          sx={{
                            backgroundColor: "whitesmoke",
                            marginTop: "55%",
                          }}
                        >
                          <QueueIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="ReqDate"
                            label="Requisition Date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ReqDate}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="desc"
                            label="Description"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.desc}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="BMRtype"
                            label="BMR Type"
                            menuItems={[{label:"sjcbjd",value:"sjvbsbdv"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("BMRtype", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.BMRtype}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="ManType"
                            label="Manufacturing type"
                            menuItems={[{label:"sjcbjd",value:"sjvbsbdv"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("ManType", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.ManType}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                     <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="BMRstatus"
                            label="BMR Status"
                            menuItems={[{label:"sjcbjd",value:"sjvbsbdv"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("BMRstatus", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.BMRstatus}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>

                   <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="BatchNum"
                            label="Batch Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.BatchNum}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="Material"
                            label="Material"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.Material}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={0.5}>
                        <IconButton
                          color="primary"
                          onClick={() => setIsDialog2(true)}
                          sx={{
                            backgroundColor: "whitesmoke",
                            marginTop: "55%",
                          }}
                        >
                          <QueueIcon />
                        </IconButton>
                      </Grid>

                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="MfgDate"
                            label="Manufacturing Date"
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.MfgDate}
                          />
                        </FormControl>
                      </Grid>
                       <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="BatchSize"
                            label="Batch Size"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.BatchSize}
                          />
                        </FormControl>
                      </Grid>
                     <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="ExpDate"
                            label="Exp Date"
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.ExpDate}
                          />
                        </FormControl>
                      </Grid>
                       <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="ReqBy"
                            label="Request By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.ReqBy}
                          />
                        </FormControl>
                      </Grid>
                       <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="RecBy"
                            label="Received By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.RecBy}
                          />
                        </FormControl>
                      </Grid>

                    
                       

                     
                     
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <br />
                        <Grid container justifyContent="flex-end" spacing={2} marginBottom={2}>
                          <Grid item>
                            <AppButton
                              variant="outlined"
                              color="primary"
                              className="clear-btn"
                              onClick={()=>resetForm()}
                              btnText="Clear"/>
                            
                          </Grid>
                          <Grid item>
                            <AppButton
                              type="submit"
                              variant="contained"
                              className="add-btn"
                              color="primary"
                              disabled={isSubmitting}
                              onClick={() => setIsSubmitted(true)}
                              btnText="Submit"/>
                            
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                  {data && (
                    <Grid item xs={12}>
                      <Typography fontWeight="bold">
                        Container Details
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead style={{ backgroundColor: "#248f8f" }}>
                            <TableRow>
                              {containerDetails.map((container,index) => (
                                <TableCell key={index}>
                                  <Typography
                                    fontWeight="bold"
                                    color="white"
                                    fontSize={15}
                                    maxWidth="100%"
                                    lineHeight={1}
                                  >
                                    {container.name}
                                  </Typography>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}
                </Card>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
      {isDialog && (
        <CustomDialogComponent
          title="GRN Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <BMRSearch onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
      {isDialog2 && (
        <CustomDialogComponent
          title="GRN Search"
          onClose={() => handleDialogClose2()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <BMRmat onClose={handleDialogClose2} />
        </CustomDialogComponent>
      )}
    </>
  );
};

export default BMRman;

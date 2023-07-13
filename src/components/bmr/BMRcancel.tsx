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

const BMRcancel: React.FunctionComponent<BMRcancelProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [data, setData] = useState(false);
  const handleDialogClose = () => {
    setIsDialog(false);
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
          <h2 className="header-margin">BMR Cancellation Requisition</h2>
          <Grid item xs={12}>
            <Formik
              initialValues={
                {
                  bmrNumber: "",
                  Product: "",
                  BatchNumber: "",
                  ReasonCanc: "",
                  MFGdate: "",
                  EXPdate: "",
                  CancelWreq:"",
                  matDisp:"",
                  Warehouse:"",
                  RetNum:"",
                 
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
                      <Grid item xs={5} sm={5} md={5} lg={5}>
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
                      <Grid item xs={1}>
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
                            name="Product"
                            label="Product"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Product}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="BatchNumber"
                            label="Batch Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.BatchNumber}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="ReasonCanc"
                            label="Reason For Cancellation"
                            menuItems={[{label:"sjcbjd",value:"sjvbsbdv"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("ReasonCanc", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.ReasonCanc}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="MFGdate"
                            label="MFG Date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        
                            value={values.MFGdate}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="EXPdate"
                            label="EXP Date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.EXPdate}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">Whether the cancelled returned along with request</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                
                                    name="CancelWreq"
                                    onChange={handleChange}
                                    onBlur={handleBlur}                    
                                    value={values.CancelWreq}
                                                        
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">Whether Material Dispensed</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                
                                    name="matDisp"
                                    onChange={handleChange}
                                    onBlur={handleBlur}                    
                                    value={values.matDisp}
                                                        
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                        </FormControl>
                      </Grid>
                       

                     {(values.matDisp=='yes')?<Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">If yes, whether returned to Warehouse</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                
                                    name="Warehouse"
                                    onChange={handleChange}
                                    onBlur={handleBlur}                    
                                    value={values.Warehouse}
                                                        
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                        </FormControl>
                      </Grid>:<Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">If yes, whether returned to Warehouse</FormLabel>
                                <RadioGroup
                                   
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                
                                    name="Warehouse"
                                    onChange={handleChange}
                                    onBlur={handleBlur}                    
                                    value={values.Warehouse}
                                                        
                                >
                                    <FormControlLabel  disabled value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel  disabled value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                        </FormControl>
                      </Grid>}  
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="RetNum"
                            label="Material Return Note number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        
                            value={values.RetNum}
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
    </>
  );
};

export default BMRcancel;

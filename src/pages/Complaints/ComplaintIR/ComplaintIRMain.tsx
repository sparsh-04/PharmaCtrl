import * as React from "react";
import { Grid, Card, CardContent, Button,IconButton } from "@mui/material";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import ProductComplainSearch from "./ProductComplainSearch";
import QueueIcon from "@mui/icons-material/Queue";
import {useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import CustomDialogComponent from "../../../components/common/CustomDialogComponent";


interface ComplaintIRMainProps {}

const ComplaintIRMain: React.FC<ComplaintIRMainProps> = () => {
    const [isDialog, setIsDialog] = useState(false);
    const [isContainersDialog, setIsContainersDialog] = useState(false);

    const handleDialogClose = () => {
        setIsDialog(false);
      };
      const containersDialog = ()=>{
        setIsContainersDialog(false)
      }
      
    return(
        
        <>
        <React.Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={12} sm={10} md={10} lg={10}>
                        <h3>Complaint Investigation Report</h3>
                    </Grid>
                    <Grid item>
                    <AppButton 
                        disabled
                        btnText="Export"
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Formik
                    enableReinitialize
                    initialValues={{
                    COMPLAINT_REF_ID: "",
                    PRODUCT_NAME: "",
                    VENDOR_BATCH_NO: "",
                    COMPLAINT_DATE:"",
                    MANUFACTURING_DATE:"",
                    INVESTIGATION_DATE:"",
                    EXPIRY_DATE:"",
                    COMPLAINT_FROM:"",
                    COMPLAINT_ADDRESS:"",
                    COMPLAINT_REASON:"",
                    INVESTIGATION_DETAILS:"",
                    SUMMARY_CONCLUSION_DETAIL:"",
                    ACTION_TAKEN:"",
                    INVESTIGATED_BY:"",
                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.COMPLAINT_REF_ID) {
                          errors.COMPLAINT_REF_ID = "Required";
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
                        resetForm,
                    })=>(
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={6} md={6} lg={5}>
                                           <AppTextInput
                                            disabled
                                            name="COMPLAINT_REF_ID"
                                            label="Complaint Ref No"
                                            type="text"
                                            value={values.COMPLAINT_REF_ID}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={touched.COMPLAINT_REF_ID &&
                                                errors.COMPLAINT_REF_ID
                                                ? true
                                                : false}
                                            errorText={errors.COMPLAINT_REF_ID} fullWidth={false}                            ></AppTextInput>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                onClick={() => setIsDialog(true)}
                                                sx={{
                                                backgroundColor: "#ddd",
                                                marginTop: "10%",
                                                }}
                                            >
                                            <QueueIcon />
                                            </IconButton>
                                        </Grid>
                                        {/* <ProductComplainSearch 
                                         /> */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                           <AppTextInput
                                            disabled
                                            name="PRODUCT_NAME"
                                            label="Product"
                                            type="text"
                                            value={values.PRODUCT_NAME}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            errorText={errors.PRODUCT_NAME} fullWidth={false}   ></AppTextInput>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                           <AppTextInput
                                            disabled
                                            name="VENDOR_BATCH_NO"
                                            label="B No/ Lot No"
                                            type="text"
                                            value={values.VENDOR_BATCH_NO}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            errorText={errors.VENDOR_BATCH_NO} fullWidth={false}   ></AppTextInput>
                                        </Grid>
                                    </Grid>      
                                </Grid>  
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <AppTextInput
                                                disabled
                                                name="COMPLAINT_DATE"
                                                label="Date of Complaint"
                                                type="text"
                                                value={values.COMPLAINT_DATE}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid> 
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <AppTextInput
                                                disabled
                                                name="MANUFACTURING_DATE"
                                                   label="Mfg Date"
                                                type="text"
                                                value={values.MANUFACTURING_DATE}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid> 
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <AppTextInput
                                                disabled
                                                name="INVESTIGATION_DATE"
                                                label="Investigation Date*"
                                                type="text"
                                                value={values.INVESTIGATION_DATE}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid> 
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <AppTextInput
                                                disabled
                                                name="EXPIRY_DATE"
                                                label="Exp Date"
                                                type="text"
                                                value={values.EXPIRY_DATE}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid> 
                                    </Grid>
                                </Grid> 
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                              disabled
                                              name="COMPLAINT_FROM"
                                              label="Complaint From"
                                              type="text"
                                              value={values.COMPLAINT_FROM}
                                              onBlur={handleBlur}
                                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid>    
                                    </Grid>    
                                </Grid>  
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                              disabled
                                              name=" COMPLAINT_ADDRESS"
                                              label="Address"
                                              type="text"
                                              value={values. COMPLAINT_ADDRESS}
                                              onBlur={handleBlur}
                                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid>    
                                    </Grid>    
                                </Grid> 
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                              disabled
                                              name=" COMPLAINT_REASON"
                                              label="Nature of Complaint"
                                              type="text"
                                              value={values. COMPLAINT_REASON}
                                              onBlur={handleBlur}
                                              onChange={(e: any) => { } } fullWidth={false}                            ></AppTextInput>
                                        </Grid>    
                                    </Grid>    
                                </Grid>    
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput    
                                                name="INVESTIGATION_DETAILS"
                                                label="Investigation Details*"
                                                type="text"
                                                value={values.INVESTIGATION_DETAILS}
                                                onBlur={handleBlur}
                                                onChange={handleChange } fullWidth={false}                            ></AppTextInput>   
                                        </Grid>
                                    </Grid>    
                                </Grid>
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                                name="SUMMARY_CONCLUSION_DETAIL"
                                                label="Summary & Conclusion*"
                                                type="text"
                                                value={values.SUMMARY_CONCLUSION_DETAIL}
                                                onBlur={handleBlur}
                                                onChange={handleChange } fullWidth={false}                            ></AppTextInput>   
                                        </Grid>
                                    </Grid>    
                                </Grid> 
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                                name="ACTION_TAKEN"
                                                label="Corrective Action*"
                                                type="text"
                                                value={values.ACTION_TAKEN}
                                                onBlur={handleBlur}
                                                onChange={handleChange } fullWidth={false}                            ></AppTextInput>   
                                        </Grid>
                                    </Grid>    
                                </Grid> 
                                <Grid item lg={12}>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <AppTextInput
                                                name="INVESTIGATED_BY"
                                                label="Investigated By*"
                                                type="text"
                                                value={values.INVESTIGATED_BY}
                                                onBlur={handleBlur}
                                                onChange={handleChange } fullWidth={false}                            ></AppTextInput>   
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
                                          size="large"
                                          variant="outlined"
                                          color="primary"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <AppButton
                                          disabled={isSubmitting}
                                          btnText="Save"
                                          size="large"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                        />
                                    </Grid>
                                  </Grid>
                                </Grid> 
                            </Grid>
                        </form>
                    )}
                    </Formik>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
        {isDialog && (
        <CustomDialogComponent
          title="Product Complain Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <ProductComplainSearch onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
     
        </React.Fragment>
        </>
    )
};

export default ComplaintIRMain;
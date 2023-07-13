// 'use client';
import {

  Card,
  FormControl,
  Grid,
  IconButton,

} from "@mui/material";
import { Formik , Field } from "formik";
import {
  Page,
  Text,
  View,
  Document,

  StyleSheet,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

import { IGRNdetail } from "index/vm";
import { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "../common/CustomDialogComponent";
import Search from "./Search";
import Product_Search from "./Product_Search";
// import { saveAs } from "file-saver";

interface GrnComponentProps {

}
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  { ssr: false }
);
const PdfDocument = ({ data }) => {

  const {
    prNumber,
    pcDate,
    moRecipt,
    cForm,
    address,
    pID,
    batchNumber,
    mfgDate,
    receiptStatus,
    expDate,
    conditionOfSample,
    classificationOfComplaint,
    natureOfComplaint,
    dateOfReply,
    followUp,
    remark,
  } = data;
  return (
    // console.log(data),
    
    <Document>
    <Page>
      <View>
        <Text>Product Compliant Number: {data.prNumber}</Text>
        <Text>Date of Complaint: {data.pcDate}</Text>
        <Text>Mode of Recipt: {data.moRecipt}</Text>
        <Text>Complaint From: {data.cForm}</Text>
        <Text>Address: {data.address}</Text>
        <Text> Product ID: {data.pID}</Text>
        <Text>Lot / Batch Number: {data.batchNumber}</Text>
        <Text>Mfg Date: {data.mfgDate}</Text>
        <Text>Sample Receipt Status: {data.receiptStatus}</Text>
        <Text>Exp Date: {data.expDate}</Text>
        <Text>Condition of the Sample: {data.conditionOfSample}</Text>
        <Text>Classification of Complaint: {data.classificationOfComplaint}</Text>
        <Text>Nature of Complaint: {data.natureOfComplaint}</Text>
        <Text>Date of Reply: {data.dateOfReply}</Text>
        <Text>Follow Up (if any): {data.followUp}</Text>
        <Text>Remarks: {data.remark}</Text>
      </View>
    </Page>
  </Document>
);
};
const downloadPdf = (pdfData) => {
  const blob = new Blob([<PdfDocument data={pdfData} />],
   {
    type: "application/pdf",
  }
  );
  // saveAs(blob, "movielist.pdf");
};

const Compliant: React.FunctionComponent<GrnComponentProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [psDialog, setpsDialog] = useState(false);
  
  const [search, setSearch] = useState({
    prNumber:"",
    pcDate:"",
    moRecipt:"",
    cForm:"",
    address:"",
    pID:"",
    batchNumber:"",
    mfgDate:"",
    receiptStatus:"",
    expDate:"",
    conditionOfSample:"",
    classificationOfComplaint:"",
    natureOfComplaint:"",
    dateOfReply:"",
    followUp:"",
    remark:"",
  });
  const handleDialogClose = (data: any) => {
    if (data) {

      console.log(data);

      setSearch({
        ...search,
        ...data,
        
      });

    }
    setIsDialog(false);
    setpsDialog(false);
  };

  const re=()=>{
setSearch({
    prNumber:"",
    pcDate:"",
    moRecipt: "",
    cForm:"",
    address:"",
    pID:"",
    batchNumber:"",
    mfgDate:"",
    receiptStatus:"",
    expDate:"",
    conditionOfSample:"",
    classificationOfComplaint:"",
    natureOfComplaint:"",
    dateOfReply:"",
    followUp:"",
    remark:"",
})
  };



  // const containerDetails = [
  //   { name: "Container ID" },
  //   { name: "Vendor Batch No" },
  //   { name: "Manufacturing Date" },
  //   { name: "Exp Date" },
  //   { name: "Material Status" },
  //   { name: "Checklist" },
  //   { name: "Net Quantity" },
  //   { name: "Available Quantity" },
  //   { name: "Distr.Note" },
  // ];
  

  return (
    <>


      <Grid container >
        <Grid item xs={12}>
        <Grid item xs={4}>

          <h2 className="header-margin" >Product Complaint Form

          {typeof window !== "undefined" && (
            <PDFDownloadLink
            document={<PdfDocument data={search} />}
            fileName="ProductComplaintForm.pdf"
            style={{
              textDecoration: "none",
              padding: "4px",
              marginLeft:"250%",
              color: "white",
              backgroundColor: "red",
              border: "1px solid #4a4a4a",
              justifyContent:"center",
              // bgcolour:"red",
            }}
            onClick={() => {
              downloadPdf(search);
              console.log(search);
            }
          } // Pass search data to downloadPdf
          >
          {({ loading }) => (loading ? "Loading document..." : "Export")}
        </PDFDownloadLink>
      )}
      </h2>
      </Grid>
          <Grid item xs={12}>
            <Formik
              // initialValues={
              //   {
              //     prNumber: "",
              //     pcDate: "",
              //     moRecipt: "",
              //     cForm: "",
              //     mfgDate: "",
              //     address: "",
              //     pID: "",
              //     batchNumber: "",
              //     receiptStatus: "",
              //     expDate: "",
              //     conditionOfSample: "",
              //     classificationOfComplaint: "",
              //     natureOfComplaint: "",
              //     dateOfReply: "",
              //     qaApprovedBy: "",
              //     qaApprovedOn: "",
              //     followUp: "",
              //     remark: "",
              //   } as IGRNdetail
              // }
              validate={(values: IGRNdetail) => {
                let errors: any = {};
                if (!values.prNumber) {
                  errors.prNumber = "Required";
                }
                return errors;
              }}
              enableReinitialize
                initialValues={search}
                // validate={(values) => {
                //   let errors: any = {};
                //   if (!values.shipmentNumber) {
                //     errors.shipmentNumber = "Required";
                //   }
                //   return errors;
                // }}


              onSubmit={async (values, { setSubmitting }) => {
                const obj = { ...values };
                console.log(values);

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
                handleReset,
              }) => (
                <Card sx={{ px:4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            disabled
                            name="prNumber"
                            label="Product Compliant Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            error={errors.prNumber &&
                              (isSubmitted || touched.prNumber)
                              ? true
                              : false}
                            helperText={errors.prNumber &&
                              (isSubmitted || touched.prNumber) &&
                              errors.prNumber}
                            value={values.prNumber} fullWidth={false}                      />
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
                      <Grid item  sm={5} md={5} lg={5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            disabled
                            name="pcDate"
                            label="Date of Complaint*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                                value={values.pcDate}                     />
                        </FormControl>
                      </Grid>

                      {/* <Grid item xs={3}></Grid>
                      <Grid item xs={3}></Grid> */}




                      <Grid item xs={3} sm={2} md={1} lg={1} >
                        <div>
                        Mode of Recipt:
                          </div>
                        </Grid>
                      <Grid item xs={1} sm={0} md={0} lg={0} >
                        <FormControl margin="normal" >






                          {/* <AppTextInput
                            name="moRecipt"
                            label="Mail"
                            type="radio"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.moRecipt &&
                              (isSubmitted || touched.moRecipt)
                              ? true
                              : false}
                              helperText={errors.moRecipt &&
                                (isSubmitted || touched.moRecipt) &&
                                errors.moRecipt}
                                value="Mail"     
                                // checked= {values.moRecipt === "Mail"}
                                
                                /> */}
                                 <label>
                                  <Field type="radio" name="moRecipt" value="Mail" />
                                     Mail
                                  </label>

                        </FormControl>
</Grid>



                        <Grid item xs={1} sm={0} md={0} lg={0} >
<FormControl margin="normal" >



                                    <label>
                                  <Field type="radio" name="moRecipt" value="Email" />
                                  Email
                                   </label>
                        </FormControl>
</Grid>





<Grid item xs={1} sm={0} md={0} lg={0} >
<FormControl margin="normal" >


                                <label>
                                  <Field type="radio" name="moRecipt" value="Letter" />
                                  Letter
                                   </label>
                              {/* <AppTextInput
                            name="moRecipt"
                            label="Letter"
                            type="radio"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.moRecipt &&
                              (isSubmitted || touched.moRecipt)
                              ? true
                              : false}
                              helperText={errors.moRecipt &&
                                (isSubmitted || touched.moRecipt) &&
                                errors.moRecipt}
                                value="Letter"                   /> */}

                                </FormControl>
                                </Grid>






                      <Grid item xs={12} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="cForm"
                            label="Complaint From*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.cForm &&
                              (isSubmitted || touched.cForm)
                              ? true
                              : false}
                            helperText={errors.cForm &&
                              (isSubmitted || touched.cForm) &&
                              errors.cForm}
                            value={values.cForm} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="address"
                            label="Address"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}                         />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                           disabled
                            name="pID"
                            label="Product ID"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.pID}                        />
                        </FormControl>
                      </Grid>
                      <Grid item xs={0.5}>
                        <IconButton
                          color="primary"
                          onClick={() => setpsDialog(true)}
                          sx={{
                            backgroundColor: "whitesmoke",
                            marginTop: "55%",
                          }}
                          >
                          <QueueIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={6} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            disabled
                            name="batchNumber"
                            label="Lot / Batch Number*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.batchNumber}                        />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                           disabled
                            name="mfgDate"
                            label="Mfg Date*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mfgDate}      />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="receiptStatus"
                            label="Sample Receipt Status"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.receiptStatus && (isSubmitted || touched.receiptStatus)
                              ? true
                              : false}
                            helperText={errors.receiptStatus &&
                              (isSubmitted || touched.receiptStatus) &&
                              errors.receiptStatus}
                            value={values.receiptStatus} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                           disabled
                            name="expDate"
                            label="Exp Date*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expDate}                    />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={12}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="conditionOfSample"
                            label="Condition of the Sample*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.conditionOfSample &&
                              (isSubmitted || touched.conditionOfSample)
                              ? true
                              : false}
                            helperText={errors.conditionOfSample &&
                              (isSubmitted || touched.conditionOfSample) &&
                              errors.conditionOfSample}
                            value={values.conditionOfSample} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="classificationOfComplaint"
                            label="Classification of Complaint*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.classificationOfComplaint &&
                              (isSubmitted || touched.classificationOfComplaint)
                              ? true
                              : false}
                            helperText={errors.classificationOfComplaint &&
                              (isSubmitted || touched.classificationOfComplaint) &&
                              errors.classificationOfComplaint}
                            value={values.classificationOfComplaint} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} >
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="natureOfComplaint"
                            label="Nature of Complaint*"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.natureOfComplaint &&
                              (isSubmitted || touched.natureOfComplaint)
                              ? true
                              : false}
                            helperText={errors.natureOfComplaint &&
                              (isSubmitted || touched.natureOfComplaint) &&
                              errors.natureOfComplaint}
                            value={values.natureOfComplaint} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="dateOfReply"
                            label="Date of Reply"
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.dateOfReply &&
                              (isSubmitted || touched.dateOfReply)
                              ? true
                              : false}
                            helperText={errors.dateOfReply &&
                              (isSubmitted || touched.dateOfReply) &&
                              errors.dateOfReply}
                            value={values.dateOfReply} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="followUp"
                            label="Follow Up (if any)"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.followUp &&
                              (isSubmitted || touched.followUp)
                              ? true
                              : false}
                            helperText={errors.followUp &&
                              (isSubmitted || touched.followUp) &&
                              errors.followUp}
                            value={values.followUp} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="remark"
                            label="Remarks"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.remark &&
                              (isSubmitted || touched.remark)
                              ? true
                              : false}
                            helperText={errors.remark &&
                              (isSubmitted || touched.remark) &&
                              errors.remark}
                            value={values.remark} fullWidth={false}                          />
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
                              onClick={re}
                              btnText="Clear"/>
                          </Grid>
                          <Grid item>
                            <AppButton
                              type="submit"
                              variant="contained"
                              className="add-btn"
                              color="primary"
                              disabled={isSubmitting}
                              onClick={() => {
                                setIsSubmitted(true);
                                re(); }}
                              btnText="Submit"/>
                            
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                  {/* {data && (
                    <Grid item xs={12} marginBottom={7}>
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
                  )} */}
                </Card>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
       {isDialog && (
        <CustomDialogComponent
          title="Product Complaint Search"
          onClose={() => handleDialogClose(undefined)}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <Search onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
      {psDialog && (
         <CustomDialogComponent
           title="Product Search"
          onClose={() => handleDialogClose(undefined)}
          isOpen={true}
          variant='lg'
          hideCloseButton
        >
          <Product_Search onClose={handleDialogClose} />
        </CustomDialogComponent>
      )} 
    </>
  );
};

export default Compliant;

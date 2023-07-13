import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import * as React from "react";
  import SearchIcon from "@mui/icons-material/Search";
  import AppButton from "index/shared/inputs/AppButton";
  import AppTextInput from "index/shared/inputs/AppTextInput";
  import { Formik } from "formik";

  interface ProductComplainSearchProps{
    onClose: Function;
  }

  const ProductComplainSearch: React.FunctionComponent<ProductComplainSearchProps> = ({
    onClose
  }) =>{
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [search, setSearch] = React.useState<any>();
 
  const list = [
    { name: "PRODUCT_COMPLAINTSID" },
    { name: "MODIFIEDBY" },
    { name: "MODIFIEDON" },
    { name: "STATUS" },
    { name: "PARENTID" },
    { name: "COMPLAINT_DATE" },
    { name: "Mode_of_Receipt" },
    { name: "Complaint_From" },
    { name: "Complaint_From_Address" },
    { name: "PRODUCT_ID" },
    { name: "Batch_No" },
    { name: "Manufacturing_Date" },
    { name: "Exp_Date" },
    { name: "Sample_Condition" },
    { name: "Classification_of_Complaint" },
    { name: "Nature_of_Complaint" },
    { name: "Date_of_Reply" },
    { name: "Follow_up" },
    { name: "Remarks" },
    { name: "Company" },



  ];
  
  const productSearchArray = [
    {
        PRODUCT_COMPLAINTSID: 12018145,
        MODIFIEDBY: "superadmin",
        MODIFIEDON: "2018-11-14T18:10:51",
        STATUS: 0,
        PARENTID: "",
        COMPLAINT_DATE: "06-08-2018",
        Mode_of_Receipt: "Activated Carbon",
        Complaint_From: "Letter",
        Complaint_From_Address:"A-1",
        PRODUCT_ID: "",
        Batch_No: 12018131,
        Manufacturing_Date:"31-08-2018",
        Exp_Date:"15-09-2019",
        Sample_Receipt_Status:"",
        Sample_Condition:"sample",
        Classification_of_Complaint:"classification",
        Nature_of_Complaint:"Nature",
        Date_of_Reply:"",
        Follow_up:"",
        Remarks:"",
        Company:"PharmaLite",
    },
    {
        PRODUCT_COMPLAINTSID: 1201817 ,
        MODIFIEDBY: "quaser4",
        MODIFIEDON: "2018-11-14T18:10:51",
        STATUS: 0,
        PARENTID: "",
        COMPLAINT_DATE: "23-08-2018",
        Mode_of_Receipt: "E-Mail",
        Complaint_From: "Paracetamol tablets are damaged",
        Complaint_From_Address: "Kothapet, Dlsukhnagar",
        PRODUCT_ID: "1160100061",
        Batch_No:"12018170",
        Manufacturing_Date:"11-08-2018",
        Exp_Date:"31-08-2018",
        Sample_Receipt_Status:"Approved",
        Sample_Condition:"damaged inside",
        Classification_of_Complaint:"packing wrong",
        Nature_of_Complaint:"tablet low quality",
        Date_of_Reply:"23-08-2018",
        Follow_up:"Not Needed",
        Remarks:"Discard",
        Company:"PharmaLite",
    },
    {
        PRODUCT_COMPLAINTSID:1201818,
        MODIFIEDBY: "qauser4",
        MODIFIEDON: "2018-11-14T18:10:51",
        STATUS: 0,
        PARENTID: "",
        COMPLAINT_DATE: "23-08-2018",
        Mode_of_Receipt: "Letter",
        Complaint_From: "sumatra",
        Complaint_From_Address: "",
        PRODUCT_ID: "1160100017",
        Batch_No:"120185",
        Manufacturing_Date:"02-08-2018",
        Exp_Date:"01-07-2018",
        Sample_Receipt_Status:"",
        Sample_Condition:"spoiled",
        Classification_of_Complaint:"bad sample",
        Nature_of_Complaint:"substandard",
        Date_of_Reply:"",
        Follow_up:"",
        Remarks:"",
        Company:"PharmaLite",
    },
    {
        PRODUCT_COMPLAINTSID:120231095 ,
        MODIFIEDBY: "superadmin",
        MODIFIEDON: "2018-11-14T18:10:51",
        STATUS: 0,
        PARENTID: "",
        COMPLAINT_DATE: "28-06-2023",
        Mode_of_Receipt: "online",
        Complaint_From: "admin",
        Complaint_From_Address:"test",
        PRODUCT_ID: "12023298",
        Batch_No:"120185",
        Manufacturing_Date:"20-06-2023",
        Exp_Date:"26-06-2023",
        Sample_Receipt_Status:"pending",
        Sample_Condition:"test",
        Classification_of_Complaint:"test",
        Nature_of_Complaint:"test",
        Date_of_Reply:"",
        Follow_up:"yet",
        Remarks:"test",
        Company:"PharmaLite",
    },
  ];
  return (
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
                                {productSearchArray.map((ele, index: any) => (
                                    <TableRow
                                    key={index}
                                    className={`${selectedIndex===index?'selected-table-row':''}`}
                                    onClick={() => {
                                        setSelectedIndex(index);
                                    }}
                                    >
                                     <TableCell>{ele.PRODUCT_COMPLAINTSID}</TableCell>
                                     <TableCell>{ele.MODIFIEDBY}</TableCell>
                                     <TableCell>{ele.MODIFIEDON}</TableCell>
                                     <TableCell>{ele.STATUS}</TableCell>
                                     <TableCell>{ele.PARENTID}</TableCell>
                                     <TableCell>{ele.COMPLAINT_DATE}</TableCell>
                                     <TableCell>{ele.Mode_of_Receipt}</TableCell>
                                     <TableCell>{ele.Complaint_From}</TableCell>
                                     <TableCell>{ele.Complaint_From_Address}</TableCell>
                                     <TableCell>{ele.PRODUCT_ID}</TableCell>
                                     <TableCell>{ele.Batch_No}</TableCell>
                                     <TableCell>{ele.Manufacturing_Date}</TableCell>
                                     <TableCell>{ele.Exp_Date}</TableCell>
                                     <TableCell>{ele.Sample_Condition}</TableCell>
                                     <TableCell>{ele.Classification_of_Complaint}</TableCell>
                                     <TableCell>{ele.Nature_of_Complaint}</TableCell>
                                     <TableCell>{ele.Date_of_Reply}</TableCell>
                                     <TableCell>{ele.Follow_up}</TableCell>
                                     <TableCell>{ele.Remarks}</TableCell>
                                     <TableCell>{ele.Company}</TableCell>
                                 </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </Grid>
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
                                onClick={()=>{onClose(productSearchArray[selectedIndex])}}
                                variant="contained"
                                className="add-btn"
                                color="primary"
                                disabled={selectedIndex==-1}
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
  );
};

export default ProductComplainSearch
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

interface SearchProps {
  onClose: Function;
}
const Search: React.FunctionComponent<SearchProps> = ({
  onClose
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [search, setSearch] = React.useState<any>();

  const list = [
    { Name: "PRODUCT_COMPLAINTSID"},
    { Name: "MODIFIEDBY"},
    { Name: "MODIFIEDON"},
    { Name: "STATUS"},
    { Name: "PARENTID"},
    { Name: "Complaint Date" },
    { Name: "SHIPMENT_DETAILSID"},
    { Name: "Mode of Receipt "},
    { Name: "Complaint From "},
    { Name: "Complaint From Address"},
    { Name: "PRODUCTID"},
    { Name: "Batch No "},
    { Name: "Manufacturing Date "},
    { Name: "Exp Date "},
    { Name: "Sample Receipt Status"},
    { Name: "Sample Condition "},
    { Name: "Classification of Compliant"},
    { Name: "Nature of Complaint  "},
    { Name: "Date of Reply"},
    { Name: "Followup (if any)"},
    { Name: "Remarks  "},
    { Name: "Company"},
  ];

  const SearchArray = [
    {
      prNumber: 12018145,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2023-07-03",
      STATUS: 0,
      PARENTID: "",
      pcDate: "2018-11-14T18:10:51",
      moRecipt: "Letter",
      cForm: "A-1",
      address:"",
      pID: "1160100061",
      batchNumber: "12018131",
      mfgDate:"31-08-2018",
      expDate:"5-09-2018",
      receiptStatus:"",
      conditionOfSample:"sample",
      classificationOfComplaint:"classification",
      natureOfComplaint:"Nature",
      dateOfReply:"	21-07-2023",
      followUp:"",
      remark:"",
      Company:"Pharmalite",
    },
    {
      prNumber: 12234,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2023-05-01",
      STATUS: 0,
      PARENTID: "",
      pcDate: "16-03-2018",
      moRecipt: "Mail",
      cForm: "C-1",
      address:"",
      pID: "116011241",
      batchNumber: "32532",
      mfgDate:"1-08-2018",
      expDate:"15-09-2018",
      receiptStatus:"",
      conditionOfSample:"samp",
      classificationOfComplaint:"classifin",
      natureOfComplaint:"ure",
      dateOfReply:"1-07-2023",
      followUp:"",
      remark:"",
      Company:"Pharmalite",
    },
    {
      prNumber: 8145,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2016-07-03",
      STATUS: 2,
      PARENTID: "fef",
      pcDate: "26-08-2018",
      moRecipt:"Online",
      cForm: "F-1",
      address:"jkfnweei rn rewr hewrhewr",
      pID: "1160",
      batchNumber: "1231",
      mfgDate:"31-10-2018",
      expDate:"5-12-2018",
      receiptStatus:"",
      conditionOfSample:"mple",
      classificationOfComplaint:"sification",
      natureOfComplaint:"Natre",
      dateOfReply:"	21-12-2021",
      followUp:"dklfw",
      remark:"wefewfe",
      Company:"Pharmalite",
    },
    {
      prNumber: 122,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2021-05-01",
      STATUS: 1,
      PARENTID: "",
      pcDate: "12-03-2018",
      moRecipt: "Mail",
      cForm: "B-1",
      address:"",
      pID: "1241",
      batchNumber: "312332",
      mfgDate:"11-08-2018",
      expDate:"1-09-2018",
      receiptStatus:"",
      conditionOfSample:"sampe",
      classificationOfComplaint:"claifin",
      natureOfComplaint:"ueerre",
      dateOfReply:"1-07-2020",
      followUp:"Yes",
      remark:"no",
      Company:"Pharmalite",
    },
    {
      prNumber: 81422315,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2021-05-11",
      STATUS: 19,
      PARENTID: "fesdfvsf",
      pcDate: "2013-11-14T18:10:51",
      moRecipt: "Letter",
      cForm: "K",
      address:"jkfnweei rn rewr hewrhewr",
      pID: "110",
      batchNumber: "231",
      mfgDate:"30-10-2016",
      expDate:"25-12-2018",
      receiptStatus:"",
      conditionOfSample:"ple",
      classificationOfComplaint:"fication",
      natureOfComplaint:"Natre",
      dateOfReply:"	2021-05-01",
      followUp:"lfw",
      remark:"ewfe",
      Company:"Pharmalite",
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
          value=''
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
                      {plans.Name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow style={{ backgroundColor: "lightGray" }}> */}
              {SearchArray.map((ele, index: any) => (
                <TableRow
                  key={index}
                  className={`${selectedIndex===index?'selected-table-row':''}`}
                  onClick={() => {

                    setSelectedIndex(index);
                  }}
                >
                  <TableCell>{ele.prNumber}</TableCell>
                  <TableCell>{ele.MODIFIEDBY}</TableCell>
                  <TableCell>{ele.MODIFIEDON}</TableCell>
                  <TableCell>{ele.STATUS}</TableCell>
                  <TableCell>{ele.PARENTID}</TableCell>
                  <TableCell>{ele.pcDate}</TableCell>
                  <TableCell>{ele.moRecipt}</TableCell>
                  <TableCell>{ele.cForm}</TableCell>
                  <TableCell>{ele.address}</TableCell>
                  <TableCell>{ele.pID}</TableCell>
                  <TableCell>{ele.batchNumber}</TableCell>
                  <TableCell>{ele.mfgDate}</TableCell>
                  <TableCell>{ele.expDate}</TableCell>
                  <TableCell>{ele.receiptStatus}</TableCell>
                  <TableCell>{ele.conditionOfSample}</TableCell>
                  <TableCell>{ele.natureOfComplaint}</TableCell>
                  <TableCell>{ele.dateOfReply}</TableCell>
                  <TableCell>{ele.followUp}</TableCell>
                  <TableCell>{ele.remark}</TableCell>
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
              onClick={()=>{onClose(SearchArray[selectedIndex])}}
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
export default Search;

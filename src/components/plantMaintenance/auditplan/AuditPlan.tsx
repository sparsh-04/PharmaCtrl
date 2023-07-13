import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TableBody,
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import AppTextInput from "index/shared/inputs/AppTextInput";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import ResourceCheckListDialog from "index/components/resourcechecklist/ResourceCheckListDialog";
import ResourceBuyPlanDialog from "index/components/resourceannualplandialog/ResourceAnnualPlanDialog";
import moment from "moment";
interface AuditPlanProps {
  // onClick: Function;
  type: string;
}

interface Column {
  id:
    | "month"
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
  label: string;
  minWidth?: number;
  align?: "right";
  // weight:"bold"
  format?: (value: number) => string;
}

interface Data {
  month: string;
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
}

const AuditPlan: React.FC<AuditPlanProps> = ({
  type
  
}) => {
  const [search, setSearch] = React.useState<any>({});
  const [resourceCheckListDialog, setResourceCheckListDialog] = useState({
    isOpen: false,
    data: undefined,
    curMonth: false,
    resourceNames: "",
    resourceMonth: "",
    year: "",
  } as { isOpen: boolean; data: any; curMonth: boolean; resourceNames: string; resourceMonth: string; year: string });

  const handleDialogClose = (data: any) => {
    setResourceCheckListDialog({
      data: undefined,
      isOpen: false,
      curMonth: false,
      resourceNames: "",
      resourceMonth: "",
      year: "",
    });
  };
  
  const list = [
    {
      value: "2020",
      key: "2020",
    },
    {
      value: "2021",
      key: "2021",
    },
    {
      value: "2022",
      key: "2022",
    },
    {
      value: "2023",
      key: "2023",
    },
    {
      value: "2024",
      key: "2024",
    },
    {
      value: "2025",
      key: "2025",
    },
  ];

  var today = new Date();

  let curMonth = false;
  
  function createData(
    month: string,
    january: string,
    february: string,
    march: string,
    april: string,
    may: string,
    june: string,
    july: string,
    august: string,
    september: string,
    october: string,
    november: string,
    december: string
  ): Data {
    return {
      month,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    };
  }

  const columns: Column[] = [
    { id: "month", label: "Month", minWidth: 30 },
    { id: "january", label: "January", minWidth: 30 },
    { id: "february", label: "February", minWidth: 30 },
    { id: "march", label: "March", minWidth: 30 },
    { id: "april", label: "April", minWidth: 30 },
    { id: "may", label: "May", minWidth: 30 },
    { id: "june", label: "June", minWidth: 30 },
    { id: "july", label: "July", minWidth: 30 },
    { id: "august", label: "August", minWidth: 30 },
    { id: "september", label: "September", minWidth: 30 },
    { id: "october", label: "October", minWidth: 30 },
    { id: "november", label: "November", minWidth: 30 },
    { id: "december", label: "December", minWidth: 30 },
  ];

  const rows = [
    createData(
      "Dispensing Booth",
      "",
      "Planned",
      "",
      "Planned",
      "",
      "",
      "Planned",
      "Planned",
      "Planned",
      "Planned",
      "Planned",
      ""
    ),
    createData(
      "Sorting Machine",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Labelling Machine",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Sampling Booth",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Mechanical sifter",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Sigma Blade Mixer",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData("Multi Mill", "", "", "", "", "", "", "", "", "", "", "", ""),
    createData(
      "Octagonal Blender 1",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Fulid Bed Drier",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Double Rotary Compression 51 stn (GIGA Press)",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData("Auto Coater", "", "", "", "", "", "", "", "", "", "", "", ""),
    createData(
      "12 Track Tablet counting Machine",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Blister Packing Machine",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Conveyor Belt 1 Primrary Line",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Purified Water loop system",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Over Head Water storage tanks",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Air Handling Unit",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Forced Draft Ventilation unit",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Dust Extraction unit",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "Air Compressor",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "82.5 KVA DG Set",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData(
      "ozone water system",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ),
    createData("Sample", "", "", "", "", "", "", "", "", "", "", "", ""),
    createData("Resource", "", "", "", "", "", "", "", "", "", "", "", ""),
  ];

  const [yearValue, setYearValue] = React.useState("2023");
  const handleYearChange = (newValue: any) => {
    console.log(newValue);
    setYearValue(newValue?.value || undefined);
  };

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
            {type == 'Yearly' && (
                          <h2 className="header-margin">Annual Plan</h2>
            )}
            {type == 'Monthly' && (
                          <h2 className="header-margin">Monthly Plan</h2>
            )}
           
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
                initialValues={{
                  PREPARED_BY: "",
                  PREPARED_DATE: "",
                  APPROVED_BY: "",
                  APPROVED_PASSWORD: "",
                  APPROVED_DATE: "",
                  YEAR: "",
                }}
                validate={(values: any) => {
                  let errors: any = {};
                  if (!values.DISPATCH_NO) {
                    errors.DISPATCH_NO = "Required";
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
                  setFieldValue,
                }) => (
                  <div>
                    <Paper sx={{ width: "100%" }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" colSpan={1}>
                                Year
                              </TableCell>
                              <TableCell
                                align="left"
                                colSpan={1}
                                style={{
                                  width: "10%",
                                }}
                              >
                                <AppSelectInput
                                  name="YEAR"
                                  value={yearValue}
                                  menuItems={list.map((x) => {
                                    return {
                                      label: x.value,
                                      value: x.value,
                                    };
                                  })}
                                  onBlur={handleBlur}
                                  onChange={handleYearChange}
                                ></AppSelectInput>
                              </TableCell>
                              <TableCell align="center" colSpan={11}>
                              {type == 'Yearly' && (
                                <Typography fontWeight="bold">
                                  Preventive Maintenance Annual Schedule
                                </Typography>
                              )}
                              {type == 'Monthly' && (
                                <Typography fontWeight="bold">
                                  Preventive Maintenance Monthly Schedule
                                </Typography>
                              )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    top: 30,
                                    minWidth: column.minWidth,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row,rowIndex) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={`row_${rowIndex}`}
                                >
                                  {columns.map((column, columnIndex) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                        onDoubleClick={() => {
                                          let monthIndex = today.getMonth();
                                          if (
                                            monthIndex + 1 <= columnIndex ||
                                            value
                                          ) {
                                            if (monthIndex + 1 == columnIndex) {
                                              curMonth = true;
                                            }
                                            setResourceCheckListDialog({
                                              isOpen: true,
                                              data: value,
                                              curMonth: curMonth,
                                              resourceNames: row.month,
                                              resourceMonth: column.label,
                                              year: yearValue,
                                            });
                                          }
                                        }}
                                      >
                                        {value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                    {type == 'Yearly' && (
                    <div style={{ padding: "16px" }}>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item lg={12}>
                            <Grid container spacing={3} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AppTextInput
                                  disabled
                                  name="PREPARED_BY"
                                  label="Prepared By"
                                  type="text"
                                  value={values.PREPARED_BY}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    touched.PREPARED_BY && errors.PREPARED_BY
                                      ? true
                                      : false
                                  }
                                  errorText={errors.PREPARED_BY}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AppDatePicker
                                  disabled
                                  name="PREPARED_DATE"
                                  label="DATE"
                                  value={values.PREPARED_DATE}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                     setFieldValue(values.PREPARED_DATE, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item lg={12}>
                            <Grid container spacing={2} direction="row">
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AppTextInput
                                  name="APPROVED_BY"
                                  label="Approved By"
                                  type="text"
                                  value={values.APPROVED_BY}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                ></AppTextInput>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AppTextInput
                                  name="APPROVED_PASSWORD"
                                  label="Password"
                                  type="text"
                                  value={values.APPROVED_PASSWORD}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                ></AppTextInput>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AppDatePicker
                                  name="APPROVED_DATE"
                                  label="DATE"
                                  value={values.APPROVED_DATE}
                                  onBlur={handleBlur}
                                  onChange={(e: any) => {
                                    let tempValue = "";
                                    if (e) {
                                      tempValue = moment(e).toISOString();
                                    }
                                    setFieldValue(values.APPROVED_DATE, tempValue);
                                  }}
                                ></AppDatePicker>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                      <Grid item lg={12}  style={{ padding: "16px" }}>
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
                            />
                          </Grid>
                          <Grid item>
                            <AppButton
                              btnText="Save"
                              type="submit"
                              variant="contained"
                              color="primary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    )}
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {resourceCheckListDialog.isOpen && resourceCheckListDialog.data && (
        <CustomDialogComponent
          title="Resource Checklist"
          onClose={() => handleDialogClose(undefined)}
          isOpen={true}
          variant="md"
          hideCloseButton
        >
          <ResourceCheckListDialog
            data={resourceCheckListDialog.data}
            onClose={handleDialogClose}
            curMonth={resourceCheckListDialog.curMonth}
            resourceNames={resourceCheckListDialog.resourceNames}
          />
        </CustomDialogComponent>
      )}
      {resourceCheckListDialog.isOpen &&
        resourceCheckListDialog.data === "" 
         && (
          <CustomDialogComponent
            onClose={() => handleDialogClose(undefined)}
            isOpen={true}
            variant="md"
            hideCloseButton
          >
            <ResourceBuyPlanDialog
              data={resourceCheckListDialog.data}
              resourceNames={resourceCheckListDialog.resourceNames}
              resourceMonth={resourceCheckListDialog.resourceMonth}
              year={resourceCheckListDialog.year}
              onClose={handleDialogClose}
            />
          </CustomDialogComponent>
        )}
    </React.Fragment>
  );
};

export default AuditPlan;

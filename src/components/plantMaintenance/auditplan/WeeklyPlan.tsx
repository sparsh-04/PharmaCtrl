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
interface WeeklyPlanProps {
  type: string;
}

interface Column {
  id?:
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

const WeeklyPlan: React.FC<WeeklyPlanProps> = ({ type }) => {
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
  const resourcesList = [
    {
      value: "Dispensing Booth",
    },
    {
      value: "Labelling Machine",
    },
    {
      value: "Sampling Booth",
    },
    {
      value: "Sigma Blade Mixer",
    },
    {
      value: "Octagonal Blender 1",
    },
    {
      value: "Fulid Bed Drier",
    },
    {
      value: "Double Rotary Compression 51 stn (GIGA Press)",
    },
    {
      value: "Auto Coater",
    },
    {
      value: "Purified Water loop system",
    },
  ];

  var today = new Date();

  let curMonth = false;

  function createData(
    month?: string,
    january?: string,
    february?: string,
    march?: string,
    april?: string,
    may?: string,
    june?: string,
    july?: string,
    august?: string,
    september?: string,
    october?: string,
    november?: string,
    december?: string
  ): any {
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

  const monthColumns: any = [
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

  const columns: any = [
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weeklyPlanMonths: any[] = [];
  let presentMonths: any[] = [];
  weeklyPlanMonths.push({ id: "month", label: "Month", minWidth: 30 });
  let monthIndex = today.getMonth();
  columns.map((x: any, index: any) => {
    if (monthIndex + 1 >= index) {
      if (index > today.getMonth() - 2) {
        presentMonths.push(x);
      }
    }
  });

  monthColumns.forEach((ele: any) => {
    presentMonths.forEach((month) => {
      if (month == ele.label) {
        weeklyPlanMonths.push(ele);
        console.log(weeklyPlanMonths, "weeklyPlanMonths");
      }
    });
  });

  const rows = [
    createData("1", "", "", "", "", "Planned", "", "", "", "", "", "", ""),
    createData("2", "", "", "", "", "Planned", "", "", "", "", "", "", ""),
    createData("3", "", "", "", "", "", "Planned", "", "", "", "", "", ""),
    createData("4", "", "", "", "", "", "", "Planned", "", "", "", "", ""),
  ];

  const [yearValue, setYearValue] = React.useState("2023");
  const handleYearChange = (newValue: any) => {
    console.log(newValue);
    setYearValue(newValue?.value || undefined);
  };
  const [resourceValue, setResourceValue] = React.useState("Dispensing Booth");
  const handleResourceChange = (newValue: any) => {
    console.log(newValue);
    setResourceValue(newValue?.value || undefined);
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
            <h2 className="header-margin">Weekly Plan</h2>
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
                                <AppSelectInput
                                  name="YEAR"
                                  label="Resources"
                                  value={resourceValue}
                                  menuItems={resourcesList.map((x) => {
                                    return {
                                      label: x.value,
                                      value: x.value,
                                    };
                                  })}
                                  onBlur={handleBlur}
                                  onChange={handleResourceChange}
                                ></AppSelectInput>
                              </TableCell>
                              <TableCell
                                align="left"
                                colSpan={1}
                                style={{
                                  width: "10%",
                                }}
                              >
                                <AppSelectInput
                                  disabled
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
                              <TableCell align="center" colSpan={2}>
                                <Typography fontWeight="bold">
                                  Preventive Maintenance Weekly Schedule
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {weeklyPlanMonths.map((column, columnIndex) => (
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
                            {rows.map((row, rowIndex) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={`row_${rowIndex}`}
                                >
                                  {weeklyPlanMonths.map(
                                    (column: any, columnIndex: any) => {
                                      const value = row[column.id];
                                      console.log(value, "value");
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
                                              if (
                                                monthIndex + 1 ==
                                                columnIndex
                                              ) {
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
                                    }
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
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
        resourceCheckListDialog.data === "" && (
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

export default WeeklyPlan;

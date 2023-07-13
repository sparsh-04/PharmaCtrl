import {
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import * as React from "react";
import QueueIcon from "@mui/icons-material/Queue";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import CustomDialogComponent from "../common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import { ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { TABLE_NAMES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
interface UserAllocationProps {}

const UserAllocation: React.FC<UserAllocationProps> = () => {
    const [rowData, setRowData] = React.useState([]);
    const columnDefs: ColDef[] = [
        { headerName: "user_allocationsid", field: "userAllocationsId" },
        { headerName: "MODIFIEDBY", field: "modifiedBy" },
        { headerName: "MODIFIEDON", field: "modifiedOn" },
        { headerName: "	mfg_stageid", field: "mfgStageId" },
        { headerName: "Stage Name", field: "stageName" },
        { headerName: "mfg_lineid", field: "mfgLineId" },
        { headerName: "Line Name", field: "lineName" },
        { headerName: "mfg_plantid", field: "mfgPlantId" },
        { headerName: "Plant Name", field: "plantName" },
        { headerName: "mfg_siteid", field: "mfgSiteId" },
        { headerName: "Site Name", field: "siteName" },
      ];
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [userAllocationSearch, setUserAllocationSearch] = React.useState({
    NETWORKID: "",
    NAME: "",
    SITE: "",
    PLANT: "",
    LINE: "",
    MFG_STAGEID: "",
  });
  const [isEmployeeSearch, setIsEmployeeSearch] = React.useState({
    isOpen: false,
    data: {},
    tableName:""
  } as { isOpen: boolean; data: object, tableName:string });
  const employeeSearch = (data: any) => {
    if (data) {
      console.log(data);
      setUserAllocationSearch({
        ...userAllocationSearch,
       
      });
    }
    setIsEmployeeSearch({ data: {}, isOpen: false, tableName:"" });
  };
  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    suppressCellSelection: true,
    suppressContextMenu: true,
    suppressRowClickSelection: true,
  };
  
  const siteList = [
    {
      value: "kukatpally",
    },
    {
      value: "kukatpally",
    },
    {
      value: "kukatpally",
    },
    {
      value: "kukatpally",
    },
  ];
  const plantList = [
    {
      value: "testPlant",
    },
    {
      value: "testPlant",
    },
    {
      value: "testPlant",
    },
    {
      value: "testPlant",
    },
  ];
  const lineList = [
    {
      value: "Line1",
    },
    {
      value: "Line2",
    },
  ];
  const stageList = [
    {
      value: "stage-1",
    },
    {
      value: "stage-2",
    },
  ];
  
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
            <h2 className="header-margin">User Allocation</h2>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={userAllocationSearch}
                validate={(values: any) => {
                  let errors: any = {};

                  return errors;
                  //   return errors;
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container>
                            <Grid item className="flex-1">
                              <AppTextInput
                                disabled
                                name="NETWORKID"
                                label="User Id"
                                type="text"
                                value={values.NETWORKID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppTextInput>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  setIsEmployeeSearch({
                                    data: {},
                                    isOpen: true,
                                    tableName:TABLE_NAMES.EMPLOYEE
                                  })
                                }
                                sx={{
                                  backgroundColor: "#ddd",
                                  marginTop: "10%",
                                }}
                              >
                                <QueueIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AppTextInput
                            disabled
                            name="NAME"
                            label="Name"
                            type="text"
                            value={values.NAME}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          ></AppTextInput>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                          <AppSelectInput
                            name="SITE"
                            label="Site"
                            value={values.SITE}
                            menuItems={siteList.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.SITE, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                          <AppSelectInput
                            name="PLANT"
                            label="Plant"
                            value={values.PLANT}
                            menuItems={plantList.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.PLANT, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                          <AppSelectInput
                            name="LINE"
                            label="Line"
                            value={values.LINE}
                            menuItems={lineList.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.LINE, tempValue);
                            }}
                          ></AppSelectInput>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                          <AppSelectInput
                            name="MFG_STAGEID"
                            label="Stage"
                            value={values.MFG_STAGEID}
                            menuItems={stageList.map((x) => {
                              return {
                                label: x.value,
                                value: x.value,
                              };
                            })}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(values.MFG_STAGEID, tempValue);
                            }}
                          ></AppSelectInput>
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
                            disabled={isSubmitting}
                            btnText="Save"
                            type="submit"
                            variant="contained"
                            color="primary"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact gridOptions={gridOptions} />
        </div>
      </Grid>
      </Grid>
      {isEmployeeSearch?.isOpen && (
        <ObjectSearchDialogComponent
        title="Employee Search"
        onClose={employeeSearch}
        data={isEmployeeSearch?.data}
        tableName={isEmployeeSearch?.tableName?.toLocaleLowerCase()}
      ></ObjectSearchDialogComponent>
      )}
    </React.Fragment>
  );
};

export default UserAllocation;

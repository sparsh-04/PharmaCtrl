import * as React from "react";
import { Grid, Card, CardContent, IconButton } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { Formik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import CustomDialogComponent from "../common/CustomDialogComponent";
import AddIcon from '@mui/icons-material/Add';
import ContainersDialog from "./ContainersDialog";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import { TABLE_NAMES } from "index/Constant";
import ObjectSearchDialogComponent from "index/shared/ObjectSearchDialogComponent";
interface MaterialMaintenanceMainProps {}

const MaterialMaintenanceMain: React.FC<MaterialMaintenanceMainProps> = () => {
  const [isDialog, setIsDialog] = useState(false);
  const [containersDialog, setContainersDialog] = useState({
    isOpen:false,
    data:undefined
  } as {isOpen:boolean;data:any});
  const [search, setSearch] = useState({
    NAME: "",
    Material_Type: "",
    UOM: "",
    MATERIAL_MASTERID: "",
    DESCRIPTION: "",
    GRN_NUMBER: "",
    shipmentNumber: "",
  });
  let materialSearchData = {}
  const handleDialogClose = (data: any) => {
    if (data) {
      console.log(data);
      materialSearchData = data
      setSearch({
        ...search,
        DESCRIPTION:data.description,
        NAME:data.name,
        MATERIAL_MASTERID:data.material_masterid,
      });
    }
    setIsDialog(false);
  };
  const onContainersClose = ()=>{
    setContainersDialog({isOpen:false,data:undefined})
  }
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="header-margin">Material Receipts</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={search}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.shipmentNumber) {
                    errors.shipmentNumber = "Required";
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
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={5} md={3} lg={4}>
                            <Grid container>
                              <Grid item className="flex-1">
                                <AppTextInput
                                  disabled
                                  name="NAME"
                                  label="Material"
                                  type="text"
                                  value={values.NAME}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  //   endAdornment={
                                  //     <ContentCopyIcon
                                  //       className="pointer"
                                  //       onClick={() => {
                                  //         console.log("test");
                                  //       }}
                                  //     />
                                  //   }
                                ></AppTextInput>
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
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="Material_Type"
                              label="Type"
                              type="text"
                              value={values.Material_Type}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="UOM"
                              label="UOM"
                              type="text"
                              value={values.UOM}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="MATERIAL_MASTERID"
                              label="Material ID"
                              type="text"
                              value={values.MATERIAL_MASTERID}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={8} lg={8}>
                            <AppTextInput
                              disabled
                              name="DESCRIPTION"
                              label="Description"
                              type="text"
                              value={values.DESCRIPTION}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="GRN_NUMBER"
                              label="GR Number"
                              type="text"
                              value={values.GRN_NUMBER}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              name="shipmentNumber"
                              label="ShipmentNumber"
                              type="number"
                              value={values.shipmentNumber}
                              endAdornment={
                                <SearchIcon
                                  className="pointer"
                                  onClick={() => {
                                    console.log("test");
                                  }}
                                />
                              }
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touched.shipmentNumber && errors.shipmentNumber
                                  ? true
                                  : false
                              }
                              errorText={errors.shipmentNumber}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
          {search.NAME && (
            <React.Fragment>
              <Grid
                container
                spacing={0.5}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h2>Container</h2>
                <Grid item>
                  <AddIcon
                    color="primary"
                    onClick={() =>
                      setContainersDialog({
                        isOpen: true,
                        data: search,
                      })
                    }
                    sx={{
                      backgroundColor: "#ddd",
                      marginTop: "10%",
                      borderRadius: "50%",
                      fontSize: "30px",
                    }}
                  >
                    <QueueIcon />
                  </AddIcon>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      {isDialog && (
        <ObjectSearchDialogComponent
          title="Material Search"
          onClose={handleDialogClose}
          tableName={TABLE_NAMES.MATERIAL_MASTER.toLocaleLowerCase()}
        ></ObjectSearchDialogComponent>
      )}
      {containersDialog.isOpen && (
         <CustomDialogComponent
         title="Containers"
         onClose={() => setContainersDialog({isOpen:false,data:undefined})}
         isOpen={true}
         variant="lg"
         // hideCloseButton
       >
         <ContainersDialog materialSearchData={containersDialog.data} onContainersClose={onContainersClose} />
       </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default MaterialMaintenanceMain;

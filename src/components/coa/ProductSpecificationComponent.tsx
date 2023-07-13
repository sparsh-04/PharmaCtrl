import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { Formik } from "formik";
import Loading from "index/components/common/Loading";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
import { useState, useEffect } from "react";
import Delete from "@mui/icons-material/Delete";
import  PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import  Queue from "@mui/icons-material/Queue";
import  Search from "@mui/icons-material/Search";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import moment from "moment";
import AppButton from "index/shared/inputs/AppButton";
import CustomDialogComponent from "../common/CustomDialogComponent";
import ObjectSearchComponent from "index/shared/ObjectSearch";
import SignaturesTable from "index/shared/signature/SignaturesTable";
import { AgGridReact } from "ag-grid-react";
import { customCell, customDateCell } from "index/shared/Shared";
import { ICellRendererParams } from "ag-grid-community";
import { TABLE_NAMES } from "index/Constant";

interface ProductSpecificationComponentProps {}

const ProductSpecificationComponent: React.FunctionComponent<
  ProductSpecificationComponentProps
> = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [initialData, setInitialData] = useState({
    specification_typesid: "",
    name: "",
    specification_headerid: "",
    specification_statusid: "",
    material_masterid: "",
    manufcatured_by: "",
    description: "",
    effective_date: "",
    revision: "",
    created_by: "",
    created_date: "",
    test: "",
    specification: "",
  });
  const [specificationList, setSpecificationList] = useState([]);
  const [coaStatusList, setCoaStatusList] = useState([]);
  const [isCollectSigDisabled, setIsCollectSigDisabled] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, data: {} });
  const [materialSearchDialogInfo, setMaterialSearchDialogInfo] = useState({
    isOpen: false,
    data: {},
  });
  const [isCompletedSpecification, setIsCompletedSpecification] =
    useState(false);

  const customDeleteCell = (cellprops: ICellRendererParams) => {
    return (
      <span>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => handleDelete(cellprops.data, cellprops.rowIndex)}
          >
            <Delete color="error" />
          </IconButton>
        </Tooltip>
      </span>
    );
  };

  const handleDelete = (data: any, index: number) => {};

  const handleDialogOpen = (data?: any) => {
    setDialogInfo({ data, isOpen: true });
  };
  const handleDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setDialogInfo({ data: {}, isOpen: false });
  };

  const handleMaterialSearchDialogOpen = (data?: any) => {
    setMaterialSearchDialogInfo({ data, isOpen: true });
  };
  const handleMaterialSearchDialogClose = (data?: any) => {
    if (data) {
      console.log(data);
    }
    setMaterialSearchDialogInfo({ data: {}, isOpen: false });
  };

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <h2 className="header-margin">
                COA Product Specification
              </h2>
            </Grid>
            <Grid item>
              <AppButton
                disabled={!isCompletedSpecification}
                variant="contained"
                color="primary"
                btnText="Export"
                startIcon={<PictureAsPdf />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={initialData}
                validate={(values: any) => {
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
                  setFieldValue,
                  resetForm,
                }) => (
                  <div style={{ padding: "16px" }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <AppSelectInput
                                menuItems={specificationList}
                                label="Specification Type"
                                name="specification_headerid"
                                onBlur={handleBlur}
                                onChange={(e: any) => {
                                  let tempValue = e?.value || null;
                                  setFieldValue(
                                    "specification_headerid",
                                    tempValue
                                  );
                                }}
                                value={values.specification_headerid}
                                error={
                                  errors.specification_headerid &&
                                  (touched.specification_headerid || isSubmited)
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.specification_headerid &&
                                  (touched.specification_headerid ||
                                    isSubmited) &&
                                  errors.specification_headerid
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Box display="flex" justifyContent="end">
                                <AppButton
                                  disabled={!isCompletedSpecification}
                                  variant="contained"
                                  color="primary"
                                  btnText="Delete"
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <Box display="flex">
                            <AppTextInput
                              name="name"
                              label="Name"
                              type="text"
                              value={values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.name && (touched.name || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.name &&
                                (touched.name || isSubmited) &&
                                errors.name
                              }
                            />
                            <div>
                              <IconButton
                                color="primary"
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  handleDialogOpen();
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppTextInput
                            disabled
                            name="specification_headerid"
                            label="Specification ID"
                            type="text"
                            value={values.specification_headerid}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.specification_headerid &&
                              (touched.specification_headerid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.specification_headerid &&
                              (touched.specification_headerid || isSubmited) &&
                              errors.specification_headerid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <AppSelectInput
                            disabled={!values?.specification_headerid}
                            menuItems={coaStatusList}
                            label="Specification Status"
                            name="specification_statusid"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = e?.value || null;
                              setFieldValue(
                                "specification_statusid",
                                tempValue
                              );
                            }}
                            value={values.specification_statusid}
                            error={
                              errors.specification_statusid &&
                              (touched.specification_statusid || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.specification_statusid &&
                              (touched.specification_statusid || isSubmited) &&
                              errors.specification_statusid
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box display="flex">
                            <AppTextInput
                              disabled
                              name="material_masterid"
                              label="Material Id"
                              type="text"
                              value={values.material_masterid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                errors.material_masterid &&
                                (touched.material_masterid || isSubmited)
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.material_masterid &&
                                (touched.material_masterid || isSubmited) &&
                                errors.material_masterid
                              }
                            />
                            <div>
                              <IconButton
                                color="primary"
                                sx={{
                                  backgroundColor: "#efefef",
                                  marginTop: 1.5,
                                  padding: 1.5,
                                  "&.MuiIconButton-root:hover": {
                                    backgroundColor: "#efefef",
                                  },
                                }}
                                onClick={() => {
                                  handleMaterialSearchDialogOpen();
                                }}
                              >
                                <Queue />
                              </IconButton>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <AppTextInput
                            disabled
                            name="manufcatured_by"
                            label="Material Name"
                            type="text"
                            value={values.manufcatured_by}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.manufcatured_by &&
                              (touched.manufcatured_by || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.manufcatured_by &&
                              (touched.manufcatured_by || isSubmited) &&
                              errors.manufcatured_by
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="description"
                            label="Description"
                            type="text"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.description &&
                              (touched.description || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.description &&
                              (touched.description || isSubmited) &&
                              errors.description
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppDatePicker
                            label="Effective Date"
                            name="effective_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("effective_date", tempValue);
                            }}
                            value={values?.effective_date || ""}
                            minDate={moment()}
                            error={
                              errors.effective_date &&
                              (touched.effective_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.effective_date &&
                              (touched.effective_date || isSubmited) &&
                              errors.effective_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppTextInput
                            disabled
                            name="revision"
                            label="Revision"
                            type="text"
                            value={values.revision}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.revision &&
                              (touched.revision || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.revision &&
                              (touched.revision || isSubmited) &&
                              errors.revision
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppTextInput
                            disabled
                            name="created_by"
                            label="Created By"
                            type="text"
                            value={values.created_by}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.created_by &&
                              (touched.created_by || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.created_by &&
                              (touched.created_by || isSubmited) &&
                              errors.created_by
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                          <AppDatePicker
                            disabled
                            label="Created On"
                            name="created_date"
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue("created_date", tempValue);
                            }}
                            value={values?.created_date || ""}
                            minDate={moment()}
                            error={
                              errors.created_date &&
                              (touched.created_date || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.created_date &&
                              (touched.created_date || isSubmited) &&
                              errors.created_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="test"
                            label="Test"
                            type="text"
                            value={values.test}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.test && (touched.test || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.test &&
                              (touched.test || isSubmited) &&
                              errors.test
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <AppTextInput
                            name="specification"
                            label="Specification"
                            type="text"
                            value={values.specification}
                            multiline={true}
                            rows={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.specification &&
                              (touched.specification || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors.specification &&
                              (touched.specification || isSubmited) &&
                              errors.specification
                            }
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <AppButton
                            variant="outlined"
                            color="primary"
                            size="medium"
                            onClick={() => resetForm()}
                            btnText="Clear"
                          />
                        </Grid>
                        <Grid item>
                          <AppButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              if (!isSubmited) {
                                setSubmitted(true);
                              }
                            }}
                            disabled={isSubmitting}
                            btnText="Save"
                          />
                        </Grid>
                      </Grid>
                      {values?.specification_headerid && (
                        <React.Fragment>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography fontWeight={700}>
                                Specifications
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <div
                                style={{
                                  minHeight: "160px",
                                  height: "calc(100vh - 600px)",
                                }}
                              >
                                <AgGridReact
                                  rowData={[]}
                                  columnDefs={[
                                    {
                                      field: "test",
                                      headerName: "Test",
                                      colId: "test".toLowerCase(),
                                      filter: "agTextColumnFilter",
                                      cellRenderer: customCell,
                                    },
                                    {
                                      field: "specification",
                                      headerName: "Specification",
                                      colId: "specification".toLowerCase(),
                                      filter: "agTextColumnFilter",
                                      cellRenderer: customCell,
                                    },
                                    {
                                      field: "delete",
                                      headerName: "Delete",
                                      colId: "delete".toLowerCase(),
                                      filter: "agTextColumnFilter",
                                      cellRenderer: customDeleteCell,
                                    },
                                  ]}
                                  className="custom-grid ag-theme-alpine"
                                  rowHeight={36}
                                  animateRows={true}
                                  defaultColDef={defaultColDef}
                                  pagination={false}
                                  suppressMovableColumns={true}
                                  context={{
                                    customDateCell,
                                    customCell,
                                    customDeleteCell,
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                          <br />
                          <SignaturesTable
                            rowDefs={[]}
                            isCollectSigDisabled={isCollectSigDisabled}
                          />
                        </React.Fragment>
                      )}
                    </form>
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
          <br />
          <br />
        </Grid>
      </Grid>
      {dialogInfo?.isOpen && (
        <CustomDialogComponent
          title="Specification Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleDialogClose(data)}
            tableName={TABLE_NAMES.SPECIFICATION_HEADER.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
      {materialSearchDialogInfo?.isOpen && (
        <CustomDialogComponent
          title="Material Search"
          onClose={() => handleMaterialSearchDialogClose()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <ObjectSearchComponent
            onClose={(data: any) => handleMaterialSearchDialogClose(data)}
            tableName={TABLE_NAMES.MATERIAL_MASTER.toLocaleLowerCase()}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default ProductSpecificationComponent;

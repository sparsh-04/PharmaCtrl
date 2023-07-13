import { Divider, Grid, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import AppTextInput from "../inputs/AppTextInput";
import AppButton from "../inputs/AppButton";
import { customCell, customDateCell } from "../Shared";

interface CollectSignatureDialogProps {
  rowDefs: any;
  onClose: Function;
}

const CollectSignatureDialog: React.FunctionComponent<
  CollectSignatureDialogProps
> = ({ rowDefs, onClose }) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);
  const [rowData, setRowData] = useState<any>([...rowDefs]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([
    {
      field: "group_name",
      headerName: "Signature Group",
      colId: "group_name".toLowerCase(),
      filter: "agTextColumnFilter",
      cellRenderer: customCell,
    },
    {
      field: "role_name",
      headerName: "Signature Role",
      colId: "role_name".toLowerCase(),
      filter: "agTextColumnFilter",
      cellRenderer: customCell,
    },
    {
      field: "signed_by",
      headerName: "Signed By",
      colId: "signed_by".toLowerCase(),
      filter: "agTextColumnFilter",
      cellRenderer: customCell,
    },
    {
      field: "signed_on",
      headerName: "Signed On",
      colId: "signed_on".toLowerCase(),
      filter: "agDateColumnFilter",
      cellRenderer: customDateCell,
    },
    {
      field: "cosigned_by",
      headerName: "Co Signed By",
      colId: "cosigned_by".toLowerCase(),
      filter: "agTextColumnFilter",
      cellRenderer: customCell,
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [statusMessage, setStatusMessage] = useState("");

  const [signatureObj, setSignatureObj] = useState({
    comments: "",
    signed_by: "",
    cosigned_by: "",
    password: "",
    cosigned_password: "",
    cosigned_on: "",
    esig_valuesid: "",
  });

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

  const onSelectionChanged = () => {
    let selectedRow = gridRef.current?.api.getSelectedRows();
    if (selectedRow && selectedRow.length > 0 && selectedRow[0]) {
      let data = selectedRow[0];
      let hiddenColumns = Object.keys(data).filter((e) => e.includes("_hide"));
      hiddenColumns.forEach((column) => {
        data[column.split("_hide")[0]] = data[column];
      });
      setSelectedItem(data);
      setSignatureObj({
        comments: data?.comments || "",
        cosigned_by: data?.cosigned_by || "",
        signed_by: data?.signed_by || "",
        password: "",
        cosigned_password: "",
        cosigned_on: data?.cosigned_on || "",
        esig_valuesid: data?.esig_valuesid || "",
      });
      //   setSearch(data);
      //   setIsEdit(true);
    }
  };
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={signatureObj}
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                minHeight:"160px",
                height: "calc(100vh - 600px)",
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                className="custom-grid ag-theme-alpine"
                rowSelection="single"
                rowHeight={36}
                animateRows={true}
                defaultColDef={defaultColDef}
                pagination={false}
                onSelectionChanged={onSelectionChanged}
                suppressMovableColumns={true}
                context={{
                  customDateCell,
                  customCell,
                }}
              />
            </div>
            <Divider />
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <AppTextInput
                  label="Comments"
                  name="comments"
                  value={values?.comments}
                  fullWidth={true}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.comments && (touched.comments || isSubmited)
                      ? true
                      : false
                  }
                  helperText={
                    errors.comments &&
                    (touched.comments || isSubmited) &&
                    errors.comments
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AppTextInput
                  label="User ID"
                  name="signed_by"
                  value={values?.signed_by}
                  fullWidth={true}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.signed_by && (touched.signed_by || isSubmited)
                      ? true
                      : false
                  }
                  helperText={
                    errors.signed_by &&
                    (touched.signed_by || isSubmited) &&
                    errors.signed_by
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AppTextInput
                  label="Co Signed By"
                  name="cosigned_by"
                  value={values?.cosigned_by}
                  fullWidth={true}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.cosigned_by && (touched.cosigned_by || isSubmited)
                      ? true
                      : false
                  }
                  helperText={
                    errors.cosigned_by &&
                    (touched.cosigned_by || isSubmited) &&
                    errors.cosigned_by
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AppTextInput
                  label="User Password"
                  name="password"
                  value={values?.password}
                  fullWidth={true}
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.password && (touched.password || isSubmited)
                      ? true
                      : false
                  }
                  helperText={
                    errors.password &&
                    (touched.password || isSubmited) &&
                    errors.password
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <AppTextInput
                  label="Co Signed Password"
                  name="cosigned_password"
                  value={values?.cosigned_password}
                  fullWidth={true}
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.cosigned_password &&
                    (touched.cosigned_password || isSubmited)
                      ? true
                      : false
                  }
                  helperText={
                    errors.cosigned_password &&
                    (touched.cosigned_password || isSubmited) &&
                    errors.cosigned_password
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <br />
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <AppButton
                      size="medium"
                      btnText="Cancel"
                      variant="outlined"
                      type="button"
                      className="cancel-btn"
                      color="primary"
                      onClick={() => onClose()}
                    />
                  </Grid>
                  <Grid item>
                    <AppButton
                      btnText="Submit"
                      type="submit"
                      onClick={() => {
                        onClose(selectedItem);
                      }}
                      variant="contained"
                      className="add-btn"
                      color="primary"
                      disabled={!selectedItem}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>Status Message:{statusMessage || ""}</Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CollectSignatureDialog;

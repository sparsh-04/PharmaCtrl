import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { useState, useEffect } from "react";
import AppButton from "../inputs/AppButton";
import CollectSignatureDialog from "./CollectSignatureDialog";
import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import { customCell, customDateCell } from "../Shared";
import { ICellRendererParams } from "ag-grid-community";
import Delete from "@mui/icons-material/Delete";

interface SignaturesTableProps {
  rowDefs: any[];
  isCollectSigDisabled?: boolean;
}

const SignaturesTable: React.FunctionComponent<SignaturesTableProps> = ({
  rowDefs,
  isCollectSigDisabled = false,
}) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );
  const [isOpen, setIsOpen] = useState(false);

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

  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = (data?: any) => {
    if (data) {
    }
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <div
            style={{
              minHeight:"160px",
              height: "calc(100vh - 600px)"
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              className="custom-grid ag-theme-alpine"
              rowHeight={36}
              animateRows={true}
              defaultColDef={defaultColDef}
              pagination={false}
              suppressMovableColumns={true}
              context={{
                customDateCell,
                customCell,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <Box display="flex" justifyContent="end">
            <AppButton
              btnText="Collect Signatures"
              onClick={() => {
                openDialog();
              }}
              variant="contained"
              color="primary"
              disabled={isCollectSigDisabled}
            />
          </Box>
        </Grid>
      </Grid>
      {isOpen && (
        <CustomDialogComponent
          title="E-Signature"
          onClose={() => closeDialog()}
          isOpen={true}
          fullWidth
          variant="lg"
          hideCloseButton
        >
          <CollectSignatureDialog
            rowDefs={rowDefs || []}
            onClose={(data: any) => closeDialog(data)}
          />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default SignaturesTable;

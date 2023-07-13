import { Grid, Typography, Divider, IconButton } from "@mui/material";
import { Formik } from "formik";
import AppButton from "index/shared/inputs/AppButton";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";

import * as React from "react";
interface WorkOrderProcessInstructionDialogProps {
  onClose: Function;
}

const WorkOrderProcessInstructionDialog: React.FC<WorkOrderProcessInstructionDialogProps> = ({
  onClose,
}) => {
  const list = [
    {
      value: "one",
    },
    {
      value: "two",
    },
    {
      value: "three",
    },
    {
      value: "four",
    },
  ];
 
  return (
    <React.Fragment>
        <Grid item lg={12}>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justifyContent="center"
                >
                  <Grid item>
                    <p>
                      Checked
                    </p>
                  </Grid>
                </Grid>
                <Divider style={{ paddingTop: "10px" }} />
                <Grid item lg={12} style={{ paddingTop: "10px" }}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    
                    <Grid item>
                      <AppButton
                        btnText="Cancel"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={() => onClose()}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
    </React.Fragment>
  );
};

export default WorkOrderProcessInstructionDialog;

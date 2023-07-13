import { Grid, Typography, Divider } from "@mui/material";
import AppButton from "index/shared/inputs/AppButton";
import * as React from "react";
interface SelfInspectionAuditPlanDialogProps {
  onClose: Function;
  data: any;
  resourceNames: any;
  resourceMonth: any;
  year: any;
}

const SelfInspectionAuditPlanDialog: React.FC<SelfInspectionAuditPlanDialogProps> = ({
  onClose,
  data,
  resourceMonth,
  resourceNames,
  year,
}) => {
  React.useEffect(() => {
    console.log("test", data, onClose);
  }, []);
  return (
    <React.Fragment>
          <div>
            <Grid container spacing={4}>
              <Grid item lg={12}>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography fontWeight="bold" fontSize={18}>
                      Do you want to plan
                    </Typography>
                  </Grid>
                  <Grid item>
                    <p>
                    Self inspection audit plan for  {resourceNames} in {year} {resourceMonth}
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
                        btnText="no"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={() => onClose()}    
                      />
                    </Grid>
                    <Grid item>
                      <AppButton
                        btnText="yes"
                        type="submit"
                        variant="outlined"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
    </React.Fragment>
  );
};

export default SelfInspectionAuditPlanDialog;

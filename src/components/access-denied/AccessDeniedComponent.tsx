import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import Loading from "../common/Loading";

interface AccessDeniedProps {}

const AccessDeniedComponent: React.FunctionComponent<
  AccessDeniedProps
> = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <React.Fragment>
      {isLoading && <Loading message="loading.." />}
      <Grid container justifyContent="center" style={{ paddingTop: "80px" }}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card variant="outlined">
            <CardContent style={{ padding: "20px" }}>
              <Grid
                container
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item>
                  <Typography
                    fontWeight="750"
                    fontSize={28}
                    style={{ color: "#f44336;" }}
                  >
                    Access Denied
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight="600">
                    The page you are trying to view is not authorized for you.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AccessDeniedComponent;

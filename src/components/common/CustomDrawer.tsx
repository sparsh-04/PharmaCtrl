import {
  IconButton,
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { DrawerWidth } from "index/Constant";

interface CustomDrawerComponentProps {
  title?: any;
  isOpen?: boolean;
  class?: string;
  variant?: "fullDrawer" | "medium" | "large" | "small";
  children: React.ReactNode;
  onClose: Function;
  onSubmit?: Function;
}

const CustomDrawerComponent: React.FunctionComponent<
  CustomDrawerComponentProps
> = (props) => {
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        variant="temporary"
        //   hideBackdrop={true}
        disableEscapeKeyDown={true}
        open={props?.isOpen === false ? false : true}
        sx={{
          width: DrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DrawerWidth,
            boxSizing: "border-box",
          },
        }}
        onClose={() => props.onClose()}
      >
        {props.title && (
          <AppBar
            component="div"
            color="default"
            position="relative"
            sx={{ display: "flex" }}
          >
            <Toolbar
              variant="dense"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                {props.title}
              </Typography>

              <Grid>
                <IconButton onClick={() => props.onClose()}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <React.Fragment>{props.children}</React.Fragment>
      </Drawer>
    </React.Fragment>
  );
};

export default CustomDrawerComponent;

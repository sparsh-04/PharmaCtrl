import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  hideCloseButton?: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, hideCloseButton, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2,backgroundColor:'#1aa3ff' }}
      {...other}
      component="h1"
      variant="h6"
      color="white"
      noWrap
    >
      {children}
      {!hideCloseButton ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface CustomDialogComponentProps {
  title?: any;
  isOpen?: boolean;
  className?: string;
  onClose: Function;
  variant?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  fullScreen?: boolean;
  showFooter?: boolean;
  children?: React.ReactNode;
  hideCloseButton?: boolean;
}

const CustomDialogComponent: React.FunctionComponent<
  CustomDialogComponentProps
> = (props) => {
  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        className={`custom-dialog ${props?.className || ""}`}
        open={props?.isOpen === false ? false : true}
        fullWidth={props?.fullWidth || false}
        maxWidth={props?.variant ? props.variant : "sm"}
        sx={{borderRadius:1}}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            props.onClose();
          }
        }}
        fullScreen={props?.fullScreen ? true : false}
      >
        {props.title && (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={() => props.onClose()}
            hideCloseButton={props?.hideCloseButton}
           
          >
            {props?.title || ""}
          </BootstrapDialogTitle>
        )}
        <DialogContent dividers>{props?.children}</DialogContent>
        {props.showFooter && (
          <DialogActions>
            <Button autoFocus onClick={() => props.onClose()}>
              Save changes
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomDialogComponent;

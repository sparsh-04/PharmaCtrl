import * as React from "react";
import { StatusContext } from "../../providers/StatusProvider";
import { Paper, Typography } from "@mui/material";
import { FOOTER_COLORS } from "index/Constant";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  const { message, type } = React.useContext(StatusContext);
  return (
    <React.Fragment>
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          position: "fixed",
          paddingX: "24px",
          display: "flex",
          height: "32px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize={14}
          fontWeight={600}
          textAlign="center"
        >
          Status Message:{" "}
          <Typography
            component="span"
            color={FOOTER_COLORS[type || "success"]}
            variant="subtitle2"
          >
            {message || ""}
          </Typography>
        </Typography>
      </Paper>
    </React.Fragment>
  );
};

export default Footer;

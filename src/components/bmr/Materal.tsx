import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import React, { useEffect, useState } from "react";

import Select from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "index/shared/inputs/AppButton";
import MenuItem from '@mui/material/MenuItem';
import { getAllGrn } from "index/services/grn/GrnService";
import { IGRNdetails } from "index/vm";
import AppTextInput from "index/shared/inputs/AppTextInput";

interface BMRSearchProps {
  onClose: Function;
}
const BMRmat: React.FunctionComponent<BMRSearchProps> = ({ onClose }) => {
  const list = [
    { name: "Order#" },
    { name: "MODIFIEDBY" },
    { name: "MODIFIEDON" },
    { name: "STATUS" },
    { name: "PARENTID" },
    { name: "Description" },
    { name: "PRODUCTID" },
    { name: "RECIPEID" },
    { name: "BOMID" },
  ];
  useEffect(() => {
    fetchAllGrn();
  }, []);
  const [row, setRow] = useState<IGRNdetails[]>([]);
  const fetchAllGrn = async () => {
    let result = await getAllGrn();
    if (result && result.resultMessage) {
      setRow(result?.dTable || []);
      let obj = {};
      result?.dTable &&
        result?.dTable.length > 0 &&
        result?.dTable.forEach((ele) => {
          obj = { ...obj };
        });
      // setRow(obj);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4.5}>
        <AppTextInput
                  onChange={() => console.log("search")}
                  type="search"
                  label="Search For"

                  fullWidth={true}

                  name="search" onBlur={undefined} value={undefined}        />
      </Grid>
      <Grid item xs={4.5}>
            <AppSelectInput
                  name="type"
                  label="Type"
                  menuItems={[{ label: "sjcbjd", value: "sjvbsbdv" }]} value={undefined} onChange={(e:any)=>{console.log(e.value)}} onBlur={undefined}                        
                          ></AppSelectInput>
      </Grid>
      <Grid item xs={3}>
        <AppButton
          startIcon={<SearchIcon />}
          
          btnText="Search"
        />
      </Grid>
     
      
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <br />
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <AppButton
              size="medium"
              variant="outlined"
              
              className="cancel-btn"
              onClick={() => onClose()}
              btnText="Cancel"
            />
          </Grid>
          <Grid item>
            <AppButton
              type="submit"
            
              variant="contained"
              className="add-btn"
              color="primary"
              btnText="Select"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Status Message:</Typography>
      </Grid>
    </Grid>
  );
};
export default BMRmat;


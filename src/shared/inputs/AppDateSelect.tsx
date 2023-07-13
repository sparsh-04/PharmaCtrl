import React from "react";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

function AppDatePicker({
  name,
  value,
  label,
  onChange,
  onBlur,
  className,
  disabled,
  error,
  errorText,
  helperText,
  maxDate,
  minDate,
  required,
  encrypted,
  ...rest
}: {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  maxDate?: any;
  minDate?: any;
  required?:boolean
  encrypted?:boolean
}) {
  return (
    <FormControl fullWidth margin="dense">
      <DatePicker
        label={`${encrypted?'#':''}${label}${required?'*':''}`}
        format="DD/MM/YYYY"
        value={value ? moment(value) : ""}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        slotProps={{
          textField: {
            name: name,
            variant: "standard",
            onBlur: onBlur,
            error: error || errorText ? true : false,
            helperText: errorText || helperText,
          },
        }}
        {...rest}
      />
    </FormControl>
  );
}

export default AppDatePicker;

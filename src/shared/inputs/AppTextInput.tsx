import React from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorIcon from "@mui/icons-material/Error";

function AppTextInput({
  type,
  name,
  onChange,
  onBlur,
  value,
  rows,
  placeholder,
  className,
  label,
  error,
  icon,
  multiline,
  errorText,
  helperText,
  endIcon,
  mBottom,
  disabled,
  required,
  encrypted,
  startAdornment,
  endAdornment,
  fullWidth,
  maxLength,
  ...rest
}: {
  type?: string;
  name?: string;
  onChange?: any;
  onBlur?: any;
  value: any;
  rows?: any;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: boolean;
  icon?: any;
  multiline?: boolean;
  errorText?: any;
  helperText?: any;
  endIcon?: any;
  mBottom?: any;
  disabled?: boolean;
  required?: boolean;
  encrypted?: boolean;
  startAdornment?: string;
  endAdornment?: any;
  fullWidth?: boolean;
  maxLength?:number;
}) {
  return (
    <FormControl fullWidth margin="dense">
      {label && (
        <Typography variant="caption" color={disabled ? "#00000061" : ""}>
          {encrypted ? "#" : ""}
          {label}
          {required ? "*" : ""}
        </Typography>
      )}
      <TextField
        variant="standard"
        size="small"
        name={name}
        type={type || "text" || "number"}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={error || errorText ? true : false}
        helperText={errorText || helperText}
        value={value}
        disabled={disabled}
        multiline={multiline || rows ? true : false}
        rows={rows || 1}
        fullWidth={fullWidth}
        sx={{
          bgcolor: "background.grid",
          color: "background.grid",
          marginBottom: mBottom,
          "&.selectedText": {
            bgcolor: "background.grid",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: 0,
              borderBottom: "3px dotted",
            },
          },
        }}
        {...rest}
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        }}
        inputProps={{ maxLength: maxLength || undefined }}
      />
    </FormControl>
  );
}

export default AppTextInput;

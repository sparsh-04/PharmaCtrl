import React from "react";
import {
  FormControl,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

function AppSelectInput({
  name,
  value,
  label,
  onChange,
  onBlur,
  menuItems,
  className,
  disabled,
  touched,
  error,
  errorText,
  helperText,
  required,
  encrypted,
  disableClearable = false,
  ...rest
}: {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  menuItems: { label: string; value?: string }[];
  required?: boolean;
  encrypted?: boolean;
  disableClearable?: boolean;
}) {
  return (
    <FormControl fullWidth margin="dense" disabled={disabled}>
      <Typography variant="caption" color={disabled ? "#00000061" : ""}>
        {encrypted ? "#" : ""}
        {label}
        {required ? "*" : ""}
      </Typography>
     
      <Autocomplete
        value={(value || value===0) ? menuItems.find((e) =>e.value === value) : ""}
        className={className}
        options={menuItems?.length?menuItems:[]}
        disabled={disabled}
        getOptionLabel={(option) =>
          typeof option !== "string" ? option.label : option
        }
        onChange={(e, value) => {
          onChange(value);
        }}
        disableClearable={disableClearable}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            size="small"
            disabled={disabled}
            name={name}
            error={error || errorText ? true : false}
            helperText={errorText || helperText}
          />
        )}
      />
      
    </FormControl>
  );
}

export default AppSelectInput;


 {/* <Select
        variant="standard"
        size="small"
        name={name}
        defaultValue={''}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        error={error || errorText ? true : false}
        disabled={disabled}
        label={label}
        className={className}
        {...rest}
      >
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
      </Select> */}
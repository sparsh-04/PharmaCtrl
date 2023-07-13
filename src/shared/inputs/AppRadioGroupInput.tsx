import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function AppRadioGroupInput({
  name,
  value,
  label,
  onChange,
  onBlur,
  className,
  row,
  disabled,
  required,
  touched,
  error,
  errorText,
  helperText,
  labelPlacement,
  color,
  menuItems,
  ...rest
}: {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  row?: boolean;
  required?: boolean;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  labelPlacement?: "start" | "end" | "top" | "bottom";
  menuItems: { label: string; value?: string }[];
}) {
  return (
    <FormControl
      fullWidth
      sx={row ? { flexDirection: "row", alignItems: "center" } : {}}
    >
      {label && (
        <FormLabel sx={row ? { marginRight: 4 } : {}}>{label}</FormLabel>
      )}
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        color={color}
      >
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.value}
              control={<Radio color="secondary" />}
              label={item.label}
              labelPlacement={labelPlacement}
            />
          ))}
      </RadioGroup>
      {(error || errorText) && (
        <Typography variant="caption" color="error">
          {errorText || helperText}
        </Typography>
      )}
    </FormControl>
  );
}

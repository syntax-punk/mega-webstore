import { FormControlLabel, Checkbox } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled?: boolean;
}
function AppCheckbox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox 
          {...field}
          color="secondary"
          checked={field.value}
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  )
}

export { AppCheckbox }
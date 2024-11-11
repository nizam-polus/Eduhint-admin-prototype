import { Checkbox, FormControlLabel } from "@mui/material";
import { useInput } from "react-admin";

const CustomBooleanInput = ({ source, label }: any) => {
  const {
    field,
    fieldState: { isTouched, error },
    formState: { isSubmitted },
  } = useInput({ source });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.checked);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!field.value}
          onChange={handleChange}
          sx={{
            color: "DarkSlateBlue",
            "&.Mui-checked": {
              color: "DarkSlateBlue",
            },
          }}
        />
      }
      label={label}
    />
  );
};
export default CustomBooleanInput;

import { TextField } from "@mui/material";
import { UseForbReturn, validator, Validator } from "forb";
import { useRef } from "react";

export function InputField({
  name,
  label,
  forb,
  validators,
  defaultValue,
  type,
}: {
  name: string;
  label: string;
  forb: UseForbReturn;
  validators?: Validator[];
  defaultValue?: string;
  type?: string;
}) {
  const data = useRef(defaultValue ?? "");
  return forb.register({
    validator: () => validator(data.current, validators ?? []),
    render: (errorMessage) => (
      <TextField
        fullWidth
        name={name}
        label={label}
        defaultValue={data.current}
        onChange={(e) => (data.current = e.target.value)}
        helperText={errorMessage}
        error={!!errorMessage}
        variant="outlined"
        type={type}
      />
    ),
  });
}

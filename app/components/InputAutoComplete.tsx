import { Autocomplete, TextField } from "@mui/material";
import { UseForbReturn, Validator, validator } from "forb";

function InputAutocomplete<TOption>({
  forb,
  label,
  value,
  options,
  onChange,
  onInputChange,
  validators,
  noOptionsText,
  getOptionLabel,
  isOptionEqualToValue,
}: {
  forb: UseForbReturn;
  label: string;
  value: TOption | null;
  options: TOption[];
  onChange: (value: TOption | null) => void;
  onInputChange: (value: string) => void;
  validators?: Validator[];
  noOptionsText?: string;
  getOptionLabel: (option: TOption) => string;
  isOptionEqualToValue: (option: TOption, value: TOption) => boolean;
}) {
  return (
    <Autocomplete<TOption>
      value={value}
      onChange={(_, value) => onChange(value)}
      onInputChange={(_, value) => {
        onInputChange(value);
      }}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={(x) => x}
      noOptionsText={noOptionsText}
      sx={{ "& .MuiAutocomplete-clearIndicator": { display: "none" } }}
      renderInput={(params) =>
        forb.register({
          validator: () => validator(value ? getOptionLabel(value) : null, validators ?? []),
          render: (errorMessage) => (
            <TextField {...params} label={label} helperText={errorMessage} error={!!errorMessage} />
          ),
        })
      }
    />
  );
}

export { InputAutocomplete };

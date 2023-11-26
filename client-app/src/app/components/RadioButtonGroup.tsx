import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"

interface Props {
  options: { value: string, label: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={onChange}>
        {options.map(({ value, label }, idx) => (
          <FormControlLabel key={idx} value={value} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export { RadioButtonGroup }
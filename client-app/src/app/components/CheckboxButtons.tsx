import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

function CheckboxButtons({ items, checked, onChange }: Props ) {

  const [ checkedItems, setCheckedItems ] = useState<string[]>(checked || []);

  function handleCheck(value: string) {
    let newCheckedItems: string[];
    const valueIndex = checkedItems.indexOf(value);
    if (valueIndex === -1)
      newCheckedItems = [...checkedItems, value];
    else 
      newCheckedItems = checkedItems.filter(item => item !== value);

    setCheckedItems(newCheckedItems);
    onChange(newCheckedItems);
  }

  return (
    <FormGroup>
      {items.map((item, idx) => (
        <FormControlLabel 
          key={idx}
          label={item}
          control={
            <Checkbox 
              checked={checkedItems.indexOf(item) !== -1} 
              onChange={() => handleCheck(item)}
            />
          }/>
      ))}
    </FormGroup>
  )
}

export { CheckboxButtons };


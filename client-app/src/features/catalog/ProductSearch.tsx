import { TextField, debounce } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

function ProductSearch() {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector(({catalogSlice}) => catalogSlice);
  const [searchInput, setSearchInput] = useState<string>(productParams.searchTerm || "");

  const debouncedSerach = debounce((searchTerm: string) => {
    dispatch(setProductParams({ searchTerm }))
  }, 1000);

  return (
    <TextField 
      label="Search" 
      variant="outlined" 
      fullWidth
      value={searchInput}
      onChange={(event) => {
        const input = event.target.value;
        setSearchInput(input);
        debouncedSerach(input);
      }}
    />
  )
}

export { ProductSearch }
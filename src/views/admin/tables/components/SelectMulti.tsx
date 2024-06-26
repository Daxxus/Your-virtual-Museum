
import { Theme, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        // backgroundColor: theme.palette.background.paper
  };
}

interface SelectProps  {
    selectType: any  
  }

export default function MultipleSelectChip({selectType}: SelectProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);  
  // console.log(theme)
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {target: { value }} = event;
    setPersonName( // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );   
  }; 
  
  const objectByType = selectType?.facets?.filter((el: { name: string; }) => el.name ==="type")
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label" color="primary">Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          className="bg-white"          
          // multiple
          value={personName}          
        //  variant="filled"
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
         {objectByType?.[0]?.facets?.map(({key}:{key:string}) => (
             <MenuItem           
             key={key}
             value={key}
             style={getStyles(key, personName, theme)}
           >
             {key}
           </MenuItem>

         ))}          
          
        </Select>
      </FormControl>
    </div>
  );
}

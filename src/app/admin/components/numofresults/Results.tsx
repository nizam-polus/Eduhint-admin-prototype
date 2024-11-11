import React, { useState } from "react";
import { Box, InputLabel, TextField as MuiTextField } from "@mui/material";

function Results() {
  const [inputValue, setInputValue] = useState<any>("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <Box paddingTop={2} padding={2} display="flex" alignItems="center">
        <InputLabel htmlFor="new-input" sx={{ marginRight: 1 }}>
          Number of results
        </InputLabel>
        <MuiTextField
          id="new-input"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ width: "300px" }}
        />
      </Box>
    </div>
  );
}

export default Results;

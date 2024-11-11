import React, { useState } from "react";
import {
  Box,
  InputLabel,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
function Price() {
  const [inputValue, setInputValue] = useState<any>("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <div style={{ marginTop: "16px" }}>
        <h3> This one leads you to a different site: </h3>
        <Box padding={2} gap={"10px"}>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <InputLabel htmlFor="new-input" sx={{ marginRight: 1 }}>
              price:€
            </InputLabel>
            <MuiTextField
              id="new-input"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
              sx={{ width: "300px" }}
            />
            <Typography padding={1}>
              per hour
              <a
                style={{ position: "absolute" }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InfoIcon sx={{ color: "#1976d2" }} />
              </a>
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default Price;

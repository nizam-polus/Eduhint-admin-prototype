import {
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { Typography } from "antd";
import React, { useState, useEffect } from "react";

const FormDropdown: React.FC = () => {
  const [dropdownValue, setDropdownValue] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleSearch = () => {
    console.log("Searching with:", {
      dropdownValue,
      checkboxChecked,
      inputValue,
    });
  };
  const handleReset = () => {
    setDropdownValue("");
    setCheckboxChecked(false);
    setInputValue("");
    console.log("Resetting form values");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);
  return (
    <div>
      <Typography>
        <h5>Form with Dropdown, Checkbox, and Input</h5>
      </Typography>
      <Box component="form" sx={{ marginTop: 2 }}>
        <div>
          <Typography>
            <h6>Dropdown</h6>
          </Typography>
          <Select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ minWidth: 200 }}
            open={isDropdownOpen}
            onOpen={() => setIsDropdownOpen(true)}
            onClose={() => setIsDropdownOpen(false)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={10}>Option 1</MenuItem>
            <MenuItem value={20}>Option 2</MenuItem>
            <MenuItem value={30}>Option 3</MenuItem>
          </Select>
        </div>
        <div style={{ marginTop: 16 }}>
          <Typography>
            <h6>Input Field</h6>
          </Typography>
          <MuiTextField
            label="User Id"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant="outlined"
            sx={{ width: 200 }}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Typography>
            <h6>Checkbox</h6>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                sx={{
                  color: "DarkSlateBlue",
                  "&.Mui-checked": {
                    color: "DarkSlateBlue",
                  },
                }}
              />
            }
            label="Custom Standalone Checkbox"
          />
        </div>
      </Box>
      <div style={{ marginTop: 16 }}>
        <Typography>
          <h3>Buttons at the End of the Form</h3>
        </Typography>
        <Box display="flex" gap={2} marginTop={2}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default FormDropdown;

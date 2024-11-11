import React, { useState } from "react";
import { Box, Tooltip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Typography } from "antd";

function Tooltipbtn() {
  const [toggleValue, setToggleValue] = useState("option1");
  const handleToggleChange = (event: any, newValue: any) => {
    if (newValue !== null) {
      setToggleValue(newValue);
    }
  };
  return (
    <div>
      <Typography>
        <h3>Text associated with a component (sometimes with tooltip):</h3>
      </Typography>
      <div className="parent-tool">
        <div className="tooltip">
          <Box paddingTop={2} padding={2} textAlign="start">
            <Tooltip
              title="or the latest version of the license has been removed"
              arrow
              placement="top"
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#ffff",
                    color: "rgb(128 128 128)",
                    fontSize: "14px",
                    padding: "8px",
                    borderRadius: "4px",
                  },
                  "& .MuiTooltip-arrow": {
                    color: "gray",
                  },
                },
              }}
            >
              <span style={{ cursor: "pointer", color: "rgb(128 128 128)" }}>
                Removed
              </span>
            </Tooltip>
          </Box>
        </div>
        <div className="toggle-btn">
          <Box paddingTop={2} padding={2} textAlign="start">
            <ToggleButtonGroup
              value={toggleValue}
              exclusive
              onChange={handleToggleChange}
              aria-label="toggle feature"
            >
              <ToggleButton value="option1" aria-label="Option 1">
                Yes
              </ToggleButton>
              <ToggleButton value="option2" aria-label="Option 2">
                Not
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Tooltipbtn;

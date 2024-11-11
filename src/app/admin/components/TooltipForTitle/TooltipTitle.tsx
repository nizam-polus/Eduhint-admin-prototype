import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { Typography } from "antd";

function TooltipTitle() {
  return (
    <div>
      <Typography>
        <h3>Title with Tootip:</h3>
      </Typography>
      <div className="parent-tool">
        <div className="tooltip">
          <Box paddingTop={2} padding={2} textAlign="start">
            <Tooltip
              title="tooltip with title"
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
              <span style={{ cursor: "pointer" }}>
                <h1>Title</h1>
              </span>
            </Tooltip>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default TooltipTitle;

import { Box, Button, TextField as MuiTextField } from "@mui/material";
import { Typography } from "antd";
import React, { useState } from "react";
function MultipleSelect() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItemSelection = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selected) => selected !== item)
        : [...prevSelectedItems, item]
    );
  };
  return (
    <div>
      <div style={{ marginTop: 16 }}>
        <Typography>
          <h3>Toggle with two or more options:</h3>
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" marginTop={2}>
          {["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"].map(
            (item) => (
              <Button
                key={item}
                variant={
                  selectedItems.includes(item) ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => toggleItemSelection(item)}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: selectedItems.includes(item)
                    ? "darkblue"
                    : "transparent",
                  color: selectedItems.includes(item) ? "white" : "inherit",
                }}
              >
                {item}
              </Button>
            )
          )}
        </Box>
        <Box marginTop={2}>
          <Typography>Selected Options:</Typography>
          {selectedItems.length > 0 ? (
            <ul>
              {selectedItems.map((selectedItem) => (
                <li key={selectedItem}>{selectedItem}</li>
              ))}
            </ul>
          ) : (
            <Typography color="textSecondary">No options selected</Typography>
          )}
        </Box>
      </div>
    </div>
  );
}

export default MultipleSelect;

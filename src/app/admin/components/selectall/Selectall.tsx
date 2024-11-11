import React, { useState } from "react";
import {
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { MdAdminPanelSettings } from "react-icons/md";
function Selectall() {
  const [checkedItems, setCheckedItems] = useState<any>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
  });
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  const handleSelectAll = () => {
    const allChecked = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setCheckedItems(allChecked);
  };
  const handleUnselectAll = () => {
    const allUnchecked = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });
    setCheckedItems(allUnchecked);
  };
  const selectedItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  );
  return (
    <div style={{ marginTop: 16 }}>
      <Typography>
        <h3>Checkboxgroup:</h3>
      </Typography>
      <Box
        sx={{
          border: "1px solid black",
          margin: 2,
        }}
      >
        <Typography
          sx={{
            padding: 2,
            borderBottom: "1px solid black",
          }}
        >
          <h4>Roles</h4>
        </Typography>

        <Box
          display="flex"
          gap={2}
          paddingTop={2}
          sx={{
            borderBottom: "1px solid black",
          }}
        >
          <Button variant="text" color="primary" onClick={handleSelectAll}>
            Select All Roles
          </Button>
          <Button variant="text" color="primary" onClick={handleUnselectAll}>
            Unselect All Roles
          </Button>
        </Box>

        <FormGroup sx={{ padding: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item1}
                onChange={handleCheckboxChange}
                name="item1"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} />{" "}
                Administrator
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item2}
                onChange={handleCheckboxChange}
                name="item2"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} />{" "}
                Anonymous
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item3}
                onChange={handleCheckboxChange}
                name="item3"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Student
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item4}
                onChange={handleCheckboxChange}
                name="item4"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Teacher
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item5}
                onChange={handleCheckboxChange}
                name="item5"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Test
                mode
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item6}
                onChange={handleCheckboxChange}
                name="item6"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Demo
                student
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item7}
                onChange={handleCheckboxChange}
                name="item7"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Demo
                Teacher
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.item8}
                onChange={handleCheckboxChange}
                name="item8"
              />
            }
            label={
              <>
                <MdAdminPanelSettings style={{ marginRight: "8px" }} /> Content
                Manager
              </>
            }
          />
        </FormGroup>
        <Box paddingTop={2} padding={2}>
          <Typography variant="h6">Selected Roles:</Typography>
          {selectedItems.length === 0 ? (
            <Typography>No roles selected</Typography>
          ) : (
            <Box padding={2}>
              <ul>
                {selectedItems.map((item, index) => {
                  const roleLabel = {
                    item1: "Administrator",
                    item2: "Anonymous",
                    item3: "Student",
                    item4: "Teacher",
                    item5: "Test mode",
                    item6: "Demo student",
                    item7: "Demo Teacher",
                    item8: "Content Manager",
                  }[item];
                  return <li key={index}>{roleLabel}</li>;
                })}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Selectall;

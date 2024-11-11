import React, { useState, MouseEvent, useEffect } from "react";
import { Box, Button, Popover } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Typography } from "@mui/material";

const NewCredit: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleButtonClick = (buttonName: string) => {
    alert(`You clicked ${buttonName}`);
    handleClose();
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    const handleScroll = () => {
      handleClose();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Add New Credit (dropdown)
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            padding: "10px 20px",
            borderRadius: "8px",
          }}
          onClick={handleClick}
        >
          <PersonAddIcon /> New Credit
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center", 
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box sx={{ padding: "16px", minWidth: "200px" }}>
            <Typography variant="h6">Add New Credit</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleButtonClick("New School Credit")}
              sx={{ marginBottom: "8px", width: "100%" }}
            >
              New School Credit
            </Button>
            <br />
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "100%" }}
              onClick={() => handleButtonClick("New Class Credit")}
            >
              New Class Credit
            </Button>
          </Box>
        </Popover>
      </Box>
    </div>
  );
};
export default NewCredit;

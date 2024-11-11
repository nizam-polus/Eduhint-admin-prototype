import React from "react";
import { Box, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

function NewuserBtn() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/tenants");
  };
  return (
    <div style={{ marginTop: 16 }}>
      <Typography>
        <h3>Button to go to detail page:</h3>
      </Typography>
      <Typography>
        <h5>New user</h5>
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
            borderRadius: "8px",
          }}
          onClick={handleButtonClick}
        >
          <PersonAddIcon /> New user
        </Button>
      </Box>
    </div>
  );
}

export default NewuserBtn;

import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField as MuiTextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface PopupState {
  inputValue: string;
}
const Popup: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");
  const [errorFirstInput, setErrorFirstInput] = useState<boolean>(false);
  const [errorSecondInput, setErrorSecondInput] = useState<boolean>(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleFirstInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstInput(event.target.value);
  };

  const handleSecondInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondInput(event.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!firstInput) {
      setErrorFirstInput(true);
      isValid = false;
    } else {
      setErrorFirstInput(false);
    }

    if (!secondInput) {
      setErrorSecondInput(true);
      isValid = false;
    } else {
      setErrorSecondInput(false);
    }

    return isValid;
  };
  const handleConfirm = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      console.log("Form submitted");
      setDialogOpen(false);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <div style={{ marginTop: 16 }} className="pop-up">
        <Typography>
          <h3>Button that gives a pop-up:</h3>
        </Typography>
        <Box padding={2}>
          <Button
            variant="outlined"
            onClick={handleDialogOpen}
            style={{ marginLeft: "10px" }}
          >
            Open Popup
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>Popup Title</DialogTitle>
            <DialogContent>
              <Box display="flex" width="100%" padding={2}>
                <Box width="40%" padding={2}>
                  <Typography variant="h6">Custom Form Section</Typography>
                  <form>
                    <Box paddingBottom={2}>
                      <InputLabel htmlFor="select-input">
                        Select an Option
                      </InputLabel>
                      <Select
                        id="select-input"
                        label="Select an Option"
                        fullWidth
                      >
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                      </Select>
                    </Box>
                    <Box paddingBottom={2}>
                      <MuiTextField
                        id="text-input-1"
                        label="First Input"
                        variant="outlined"
                        fullWidth
                        value={firstInput}
                        onChange={handleFirstInputChange}
                        error={errorFirstInput}
                        helperText={
                          errorFirstInput ? "This field is required" : ""
                        }
                      />
                    </Box>
                    <Box paddingBottom={2}>
                      <MuiTextField
                        id="text-input-2"
                        label="Second Input"
                        variant="outlined"
                        fullWidth
                        value={secondInput}
                        onChange={handleSecondInputChange}
                        error={errorSecondInput}
                        helperText={
                          errorSecondInput ? "This field is required" : ""
                        }
                      />
                    </Box>
                    <Box paddingBottom={2}>
                      <MuiTextField
                        id="text-input-3"
                        label="Third Input"
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                    <Typography variant="body2" paragraph>
                      This is a description related to the input fields.
                    </Typography>
                    <Box paddingBottom={2}>
                      <InputLabel>Select Roles</InputLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Editor"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Viewer"
                        />
                      </FormGroup>
                    </Box>
                    <Typography variant="body2" paragraph>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minima quam, repudiandae tempora quibusdam rem ex.
                    </Typography>
                    <Typography variant="h6">Additional Select</Typography>
                    <Box paddingBottom={2}>
                      <Select label="Another Select" fullWidth>
                        <MenuItem value="choice1">Choice 1</MenuItem>
                        <MenuItem value="choice2">Choice 2</MenuItem>
                        <MenuItem value="choice3">Choice 3</MenuItem>
                      </Select>
                    </Box>
                  </form>
                </Box>
                <Box width="60%" padding={2}>
                  <Typography variant="h6">Additional Information</Typography>
                  <Typography variant="body1">
                    This area can be used for displaying additional context,
                    help text, or other components relevant to the dialog.
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default Popup;

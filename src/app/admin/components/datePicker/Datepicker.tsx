import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Box, TextField, Typography, InputLabel } from '@mui/material';

const Datepicker: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs>(dayjs());
  const [hour, setHour] = useState<number>(selectedDateTime.hour());
  const [minute, setMinute] = useState<number>(selectedDateTime.minute());
  const [second, setSecond] = useState<number>(selectedDateTime.second());

  useEffect(() => {
    setHour(selectedDateTime.hour());
    setMinute(selectedDateTime.minute());
    setSecond(selectedDateTime.second());
  }, [selectedDateTime]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography><h3>An input field that gets filled with a date (and time) selector:</h3></Typography>
      <div style={{ border: '1px solid black', marginLeft: "20px" }}>
        <Box padding={2} display="flex" flexDirection="column" width={'25%'}>
          {/* DateTime Picker */}
          <InputLabel htmlFor="datetime-picker" sx={{ marginBottom: 1 }}>
            Select Date and Time:
          </InputLabel>
          <DateTimePicker
            value={selectedDateTime}
            onChange={(newValue: Dayjs | null) => {
              if (newValue) {
                setSelectedDateTime(newValue);
              }
            }}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  id="datetime-picker"
                  variant="outlined"
                />
              ),
            }}
          />
        </Box>
      </div>
    </LocalizationProvider>
  );
};
export default Datepicker;

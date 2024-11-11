import {
  Autocomplete,
  Box,
  FormControlLabel,
  Radio,
  TextField as MuiTextField,
} from "@mui/material";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";

const RadioBtnGroup = () => {
  const [tenantName, setTenantName] = useState<any>(null);
  const dataProvider = useDataProvider();
  const [tenantChoice, setTenantChoice] = useState<any>(null);
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    dataProvider
      .getList("tenants", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "name", order: "ASC" },
        filter: {},
      })
      .then(({ data }: any) => {
        setTenants(data);
      });
  }, [dataProvider]);
  return (
    <div>
      <Box marginTop={2}>
        <Typography>
          <h3>Radio button group:</h3>
        </Typography>
        <Autocomplete
          options={tenants}
          getOptionLabel={(option) => `${option.name} (${option.id})`}
          value={tenants.find((tenant) => tenant.id === tenantChoice) || null}
          onChange={(event, newValue) => {
            setTenantChoice(newValue ? newValue.id : null);
            setTenantName(newValue ? newValue.name : null);
          }}
          renderInput={(params) => (
            <MuiTextField {...params} label="Tenant" sx={{ width: "300px" }} />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <FormControlLabel
                control={<Radio checked={tenantChoice === option.id} />}
                label={option.name}
              />
            </li>
          )}
        />
      </Box>
    </div>
  );
};

export default RadioBtnGroup;

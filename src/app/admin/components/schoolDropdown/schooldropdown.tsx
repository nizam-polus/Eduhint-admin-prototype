import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { baseUrl } from "@/config";
interface Tenant {
  id: number;
  name: string;
}
interface School {
  id: number;
  name: string;
  tenantId: number;
}
interface Class {
  id: number;
  name: string;
}
interface SchoolClassStudentSelectorProps {
  record?: {
    tenantId?: number;
    schoolId?: number;
    classId?: number;
  };
}
const SchoolClassStudentSelector: React.FC<SchoolClassStudentSelectorProps> = ({
  record,
}) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loadingTenants, setLoadingTenants] = useState<boolean>(true);
  const [loadingSchools, setLoadingSchools] = useState<boolean>(false);
  const [loadingClasses, setLoadingClasses] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log("Fetching tenants...");
    fetch(`${baseUrl}/tenants/dropdown`)
      .then((response) => response.json())
      .then((data: Tenant[]) => {
        setTenants(data);
        if (record?.tenantId) {
          const tenant = data.find((t: Tenant) => t.id === record.tenantId);
          if (tenant) {
            setSelectedTenant(tenant.id.toString());
          }
        }
      })
      .catch(() => setError("Failed to load tenants."))
      .finally(() => setLoadingTenants(false));
  }, [record?.tenantId]);

  useEffect(() => {
    if (selectedTenant) {
      setLoadingSchools(true);
      console.log(`Fetching schools for tenant ${selectedTenant}...`);
      fetch(`${baseUrl}/schools/dropdown/${selectedTenant}`)
        .then((response) => response.json())
        .then((data: School[]) => {
          setSchools(data);
          setSelectedSchool(null);
          setClasses([]);
        })
        .catch(() => setError("Failed to load schools."))
        .finally(() => setLoadingSchools(false));
    } else {
      setSchools([]);
      setClasses([]);
    }
  }, [selectedTenant]);

  useEffect(() => {
    if (selectedSchool) {
      setLoadingClasses(true);
      console.log(`Fetching classes for school ${selectedSchool}...`);
      fetch(`${baseUrl}/schools/classes/dropdown/${selectedSchool}`)
        .then((response) => response.json())
        .then((data: Class[]) => {
          setClasses(data);
        })
        .catch(() => setError("Failed to load classes."))
        .finally(() => setLoadingClasses(false));
    } else {
      setClasses([]);
    }
  }, [selectedSchool]);

  const handleTenantChange = (e: SelectChangeEvent<string | null>) => {
    setSelectedTenant(e.target.value);
  };

  const handleSchoolChange = (e: SelectChangeEvent<string | null>) => {
    setSelectedSchool(e.target.value);
  };

  const handleClassChange = (e: SelectChangeEvent<string | null>) => {
    setSelectedClass(e.target.value);
  };
  const selectedTenantObj = tenants.find(
    (t) => t.id.toString() === selectedTenant
  );
  const selectedSchoolObj = schools.find(
    (s) => s.id.toString() === selectedSchool
  );
  const selectedClassObj = classes.find(
    (c) => c.id.toString() === selectedClass
  );
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Box width="50%">
        <Typography variant="h4">
          Components that connect to each other:
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box marginBottom={2}>
          <FormControl fullWidth variant="outlined" disabled={loadingTenants}>
            <InputLabel>Select Tenant</InputLabel>
            <Select
              value={selectedTenant || ""}
              onChange={handleTenantChange}
              label="Select Tenant"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loadingTenants ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                tenants.map((tenant) => (
                  <MenuItem key={tenant.id} value={tenant.id.toString()}>
                    {tenant.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>Choose a tenant</FormHelperText>
          </FormControl>
        </Box>
        <Box marginBottom={2}>
          <FormControl
            fullWidth
            variant="outlined"
            disabled={loadingSchools || !selectedTenant}
          >
            <InputLabel>Select School</InputLabel>
            <Select
              value={selectedSchool || ""}
              onChange={handleSchoolChange}
              label="Select School"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loadingSchools ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                schools.map((school) => (
                  <MenuItem key={school.id} value={school.id.toString()}>
                    {school.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>Choose a school</FormHelperText>
          </FormControl>
        </Box>
        <Box marginBottom={2}>
          <FormControl
            fullWidth
            variant="outlined"
            disabled={loadingClasses || !selectedSchool}
          >
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass || ""}
              onChange={handleClassChange}
              label="Select Class"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loadingClasses ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id.toString()}>
                    {cls.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>Choose a class</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box width="45%" padding={2} borderLeft="1px solid #ddd">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Selected Data:
        </Typography>
        <br />
        <Typography>
          <strong>Tenant:</strong> {selectedTenantObj?.name || "None selected"}
        </Typography>
        <Typography>
          <strong>School:</strong> {selectedSchoolObj?.name || "None selected"}
        </Typography>
        <Typography>
          <strong>Class:</strong> {selectedClassObj?.name || "None selected"}
        </Typography>
      </Box>
    </Box>
  );
};
export default SchoolClassStudentSelector;

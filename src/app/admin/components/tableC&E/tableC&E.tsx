import React, { useState, useEffect } from "react";
import {
  Datagrid,
  List,
  TextField,
  useDataProvider,
  DataProvider,
} from "react-admin";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
interface SchoolData {
  id: string;
  name: string;
  tenantName: string;
  isActive: boolean;
}
interface TableCopyProps {
  dataProvider?: DataProvider;
}
const TableCopy: React.FC<TableCopyProps> = ({ dataProvider }) => {
  const [data, setData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const defaultDataProvider = useDataProvider();
  const providerToUse = dataProvider || defaultDataProvider;
  useEffect(() => {
    if (!providerToUse) {
      console.error("dataProvider is not defined");
      return;
    }
    providerToUse
      .getList<SchoolData>("test-harness", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      })
      .then((response: any) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [providerToUse]);
  const handleExport = () => {
    if (data.length === 0) {
      alert("No data available to export.");
      return;
    }
    const exportData = data.map((item) => ({
      id: item.id,
      name: item.name,
      tenantName: item.tenantName,
      isActive: item.isActive ? "Active" : "Inactive",
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const headers = Object.keys(exportData[0]);
    headers.forEach((header, index) => {
      const cellRef = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!worksheet[cellRef]) return;
      worksheet[cellRef].s = { font: { bold: true } };
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Schools");
    XLSX.writeFile(workbook, "schools.xlsx");
  };
  const handleCopy = () => {
    if (data.length === 0) {
      alert("No data available to copy.");
      return;
    }
    const header = Object.keys(data[0]).join("\t");
    const rows = data.map((item) => Object.values(item).join("\t")).join("\n");
    const textToCopy = `${header}\n${rows}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Data copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div style={{ marginTop: "16px" }}>
        <h3>Table that displays data (Copy to clipboard and Export)</h3>
      </div>
      <List>
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={handleCopy}
          >
            Copy
          </Button>
          <Button variant="contained" color="secondary" onClick={handleExport}>
            Export
          </Button>
        </div>
        {data.length > 0 && (
          <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="School Name" />
            <TextField source="tenantName" label="Tenant Name" />
            <TextField source="isActive" label="Status" />
          </Datagrid>
        )}
      </List>
    </div>
  );
};

export default TableCopy;

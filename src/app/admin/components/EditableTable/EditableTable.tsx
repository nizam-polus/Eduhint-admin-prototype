import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { useDataProvider } from "react-admin";
interface RowData {
  id: number;
  name: string;
  isActive: boolean;
  tenantName: string;
  numberOfActiveClasses: number;
  isTextToSpeechEnabled: boolean;
  isGamificationEnabled: boolean;
  isAvatarShopEnabled: boolean;
  isActivationAllowed: boolean;
}
export const EditableTable: React.FC = () => {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<RowData[]>([]);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editedRows, setEditedRows] = useState<RowData[]>([]);
  const dataProvider = useDataProvider();
  const handleChange = <T extends keyof RowData>(
    rowIndex: number,
    field: T,
    value: RowData[T]
  ) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][field] = value;
    setEditedData(updatedData);
  };
  useEffect(() => {
    dataProvider
      .getList("test-harness", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      })
      .then((response: any) => {
        setEditedData(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }, [dataProvider]);
  const handleEdit = (rowIndex: number) => {
    setEditingRowId(rowIndex);
  };
  const handleSave = () => {
    setEditedRows(editedData);
    setIsDialogOpen(true);
    setEditingRowId(null);
  };
  const handleCancelEdit = () => {
    setEditedData([...editedData]);
    setEditingRowId(null);
  };
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleConfirmSave = () => {
    console.log("Confirmed Save", editedRows);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Box marginTop={2}>
        <Typography variant='h5'>A table with checkboxes that can only be adjusted if the form is editable: 
        </Typography>
      </Box>
      <Box marginTop={5}>
        <div>Editable</div>
        <FormControlLabel
          control={
            <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
          }
          label={isSwitchOn ? "Yes" : "No"}
        />
        <br />
        <Button
          style={{ marginRight: 10 }}
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={editingRowId === null}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancelEdit}
          disabled={editingRowId === null}
        >
          Cancel
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {isSwitchOn ? <TableCell>Edit</TableCell> : <TableCell />}
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Is Active</TableCell>
                <TableCell>Tenant Name</TableCell>
                <TableCell>Number of Active Classes</TableCell>
                <TableCell>Text to Speech</TableCell>
                <TableCell>Gamification Enabled</TableCell>
                <TableCell>Avatar Shop Enabled</TableCell>
                <TableCell>Activation Allowed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedData.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {isSwitchOn && editingRowId !== rowIndex ? (
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(rowIndex)}
                      >
                        Edit
                      </Button>
                    ) : (
                      editingRowId === rowIndex && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setEditingRowId(null)}
                        >
                          Done
                        </Button>
                      )
                    )}
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <TextField
                        value={row.name}
                        onChange={(e) =>
                          handleChange(rowIndex, "name", e.target.value)
                        }
                        fullWidth
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <Checkbox
                        checked={row.isActive}
                        onChange={(e) =>
                          handleChange(rowIndex, "isActive", e.target.checked)
                        }
                      />
                    ) : (
                      <Checkbox checked={row.isActive} disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <TextField
                        value={row.tenantName}
                        onChange={(e) =>
                          handleChange(rowIndex, "tenantName", e.target.value)
                        }
                        fullWidth
                      />
                    ) : (
                      row.tenantName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <TextField
                        value={row.numberOfActiveClasses}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          handleChange(
                            rowIndex,
                            "numberOfActiveClasses",
                            value
                          );
                        }}
                        fullWidth
                      />
                    ) : (
                      row.numberOfActiveClasses
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <Checkbox
                        checked={row.isTextToSpeechEnabled}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            "isTextToSpeechEnabled",
                            e.target.checked
                          )
                        }
                      />
                    ) : (
                      <Checkbox checked={row.isTextToSpeechEnabled} disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <Checkbox
                        checked={row.isGamificationEnabled}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            "isGamificationEnabled",
                            e.target.checked
                          )
                        }
                      />
                    ) : (
                      <Checkbox checked={row.isGamificationEnabled} disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <Checkbox
                        checked={row.isAvatarShopEnabled}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            "isAvatarShopEnabled",
                            e.target.checked
                          )
                        }
                      />
                    ) : (
                      <Checkbox checked={row.isAvatarShopEnabled} disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === rowIndex ? (
                      <Checkbox
                        checked={row.isActivationAllowed}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            "isActivationAllowed",
                            e.target.checked
                          )
                        }
                      />
                    ) : (
                      <Checkbox checked={row.isActivationAllowed} disabled />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Changes</DialogTitle>
          <DialogContent>
            {editedRows.map((row) => (
              <div key={row.id} style={{ marginBottom: "16px" }}>
                <div>
                  <strong>Name:</strong> {row.name}
                </div>
                <div>
                  <strong>Is Active:</strong> {row.isActive ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Tenant Name:</strong> {row.tenantName}
                </div>
                <div>
                  <strong>Number of Active Classes:</strong>{" "}
                  {row.numberOfActiveClasses}
                </div>
                <div>
                  <strong>Text to Speech Enabled:</strong>{" "}
                  {row.isTextToSpeechEnabled ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Gamification Enabled:</strong>{" "}
                  {row.isGamificationEnabled ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Avatar Shop Enabled:</strong>{" "}
                  {row.isAvatarShopEnabled ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Activation Allowed:</strong>{" "}
                  {row.isActivationAllowed ? "Yes" : "No"}
                </div>
                <hr />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmSave} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default EditableTable;

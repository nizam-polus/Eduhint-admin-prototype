import {
  BooleanField,
  useDataProvider,
  Datagrid,
  List,
  TextField,
  TextInput,
  useListContext,
  SimpleForm,
  SelectInput,
  Form,
} from "react-admin";
import TenantField from "../../components/TenantField";
import {
  Button,
  Box,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Popover,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers"; // Import DateTimePicker and LocalizationProvider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the adapter for Day.js
import "../../../styles/styles.css";
import TableCopy from "../../components/tableC&E/tableC&E";
import Popup from "../../components/popup/Popup";
import Datepicker from "../../components/datePicker/Datepicker";
import Selectall from "../../components/selectall/Selectall";
import Tooltipbtn from "../../components/tootlipwithbtn/Tooltip";
import Price from "../../components/priceInput/Price";
import Results from "../../components/numofresults/Results";
import NewuserBtn from "../../components/newUserbtn/NewuserBtn";
import NewCredit from "../../components/newCredit/NewCredit";
import FormDropdown from "../../components/formInputDropdown/FormDropdown";
import MultipleSelect from "../../components/Multipleselect/MultipleSelect";
import SchoolClassStudentSelector from "../../components/schoolDropdown/schooldropdown";
import EditableTable from "../../components/EditableTable/EditableTable";
import RadioBtnGroup from "../../components/radioBtnGroup/RadioBtnGroup";
import TooltipTitle from "../../components/TooltipForTitle/TooltipTitle";
import TitlewithText from "../../components/Title&Text/TitlewithText";

const CustomBooleanInput = ({ source, label }: any) => {
  const { filterValues, setFilters } = useListContext();
  const handleChange = (event: any) => {
    const checked = event.target.checked;
    setFilters({ ...filterValues, [source]: checked ? true : undefined });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!filterValues[source]}
          onChange={handleChange}
          sx={{
            color: "DarkSlateBlue",
            "&.Mui-checked": {
              color: "DarkSlateBlue",
            },
          }}
        />
      }
      label={label}
    />
  );
};

export const Schooltest = (props: any) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const dataProvider = useDataProvider();
  const [data, setData] = useState<any>([]);
  const [editableName, setEditableName] = useState(false);
  const [editableEmail, setEditableEmail] = useState(false);
  const [editableSchool, setEditableSchool] = useState(false);

  const toggleNameEdit = () => setEditableName(!editableName);
  const toggleEmailEdit = () => setEditableEmail(!editableEmail);
  const toggleSchoolEdit = () => setEditableSchool(!editableSchool);

  const toggleAdvancedSearch = () => {
    setShowAdvanced((prevState) => !prevState);
  };
  useEffect(() => {
    dataProvider
      .getList("test-harness", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      })

      .then((response: any) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dataProvider]);
  const basicFilters = [
    <TextInput source="name" label="Search by name" alwaysOn />,
    <TextInput source="id" label="Search by id" alwaysOn />,
    <TextInput source="prefix" label="Search by prefix" alwaysOn />,
    <TextInput source="brinNumber" label="BRIN" alwaysOn />,
    <CustomBooleanInput
      source="isActivationAllowed"
      label="Activation Allowed"
      alwaysOn
    />,
    <CustomBooleanInput source="isActive" label="Active" alwaysOn />,
  ];
  const advancedFilters = [
    <CustomBooleanInput
      source="isTextToSpeechEnabled"
      label="Text to Speech Enabled"
      alwaysOn
    />,
    <CustomBooleanInput
      source="isGamificationEnabled"
      label="Gamification Enabled"
      alwaysOn
    />,
    <CustomBooleanInput
      source="isAvatarShopEnabled"
      label="Avatar Shop Enabled"
      alwaysOn
    />,
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h2>Test-Harness Components</h2>
      </div>
      <div>
        <div>
          <Box margin={2}>
            <Button variant="contained" onClick={toggleAdvancedSearch}>
              {showAdvanced ? "Hide Advanced Search" : "Show Advanced Search"}
            </Button>
          </Box>
        </div>
        <Box padding={2}>
          <List
            filters={
              showAdvanced
                ? [...basicFilters, ...advancedFilters]
                : basicFilters
            }
            key="id"
          >
            <Box paddingTop={2}>
              <Datagrid
                sx={{
                  "& .MuiTableCell-root": {
                    padding: "15px 10px",
                  },
                }}
              >
                <TextField source="name" />
                <TextField source="id" />
                <TenantField source="tenant" />
                <TextField source="numberOfActiveClasses" />
                <BooleanField source="isActivationAllowed" />
                <BooleanField source="isGamificationEnabled" />
              </Datagrid>
            </Box>
          </List>
        </Box>
      </div>
      <Tooltipbtn />
      <Results />
      <FormDropdown />
      <Price />
      <MultipleSelect />
      <Selectall />
      <RadioBtnGroup />
      <NewuserBtn />
      <NewCredit />
      <Popup />
      <TableCopy />
      <SchoolClassStudentSelector />
      <Datepicker />
      <EditableTable />
      <TitlewithText/>
      <TooltipTitle/>
    </LocalizationProvider>
  );
};

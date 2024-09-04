import { BooleanField, BooleanInput, Datagrid, List, TextField, TextInput, useListContext } from 'react-admin';
import TenantField from '../../components/TenantField';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import "../../../styles/styles.css"

const CustomBooleanInput = ({ source, label} : any) => {
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
                        color: 'DarkSlateBlue',
                        '&.Mui-checked': {
                            color: 'DarkSlateBlue',
                        },
                    }}
                />
            }
            label={label}
        />
    );
};

export const SchoolList = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const toggleAdvancedSearch = () => {
        setShowAdvanced(prevState => !prevState);
    };
    // const handleFilterChange = (source : any, value : any) => {
    //     setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [source]: value,
    //     }));
    // };


    // Basic filters
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
        <CustomBooleanInput
            source="isActive"
            label="Active"
            alwaysOn
        />,
        // <TenantFilter/>
    ];

    // Additional filters for advanced search
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
        />
        // Add more filters as needed
    ];

    return (
        <div>
            <div>
                <Box margin={2}>
                    <Button variant="contained" onClick={toggleAdvancedSearch}>
                        {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
                    </Button>
                </Box>
            </div>
            <Box padding={2}>
                <List filters={showAdvanced ? [...basicFilters, ...advancedFilters] : basicFilters} key="id">
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
                            {/* <TextField source="prefix" /> */}
                            <TextField source="numberOfActiveClasses" />
                            <BooleanField source="isActivationAllowed" />
                            <BooleanField source="isGamificationEnabled" />
                        </Datagrid>
                    </Box>
                </List>
            </Box>

        </div>

    );
};
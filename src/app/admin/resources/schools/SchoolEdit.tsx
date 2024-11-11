import { Edit, NumberInput, RichTextField, SimpleForm, TextInput, useDataProvider, useGetOne, useNotify, useRedirect } from 'react-admin';
import CustomBooleanInput from "../../components/CustumBooleanInput";
import { useEffect, useState } from 'react';
import { Autocomplete, TextField, Radio, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
 
export const SchoolEdit = () => {
    const dataProvider = useDataProvider();
    const [tenants, setTenants] = useState<any[]>([]);
    const [tenantChoice, setTenantChoice] = useState<any>(null);
    const { id } = useParams(); // Get the ID from the route
    const [tenantName, setTenantName] = useState<any>(null)
    const { data: record } = useGetOne('schools', { id }); // Fetch the school record
    const notify = useNotify();
    const redirect = useRedirect();
 
    // Fetch tenants from API
    useEffect(() => {
        dataProvider.getList('tenants', {
            pagination: { page: 1, perPage: 100 }, // Adjust pagination as needed
            sort: { field: 'name', order: 'ASC' },
            filter: {},
        }).then(({ data }) => {
            setTenants(data);
            if (record?.tenantId) {
                // Preselect the tenant based on school data
                const tenant = data.find((t: any) => t.id === record.tenantId);
                if (tenant) {
                    setTenantChoice(tenant.id); // Set the tenant ID as the initial value
                }
            }
        });
    }, [dataProvider, record?.tenantId]);
 
    const handleSubmit = async (data: any) => {
        try {
            await dataProvider.update('schools', {
                id: record.id,
                data: { ...data, tenantId: tenantChoice, tenantName: tenantName }, // Pass the selected tenant ID
                previousData: record, // Pass the previous data as well
            });
            notify('School updated successfully');
            redirect('list', 'schools');
        } catch (error: any) {
            notify(`Error: ${error.message}`, { type: 'warning' });
        }
    };
 
    if (!record) {
        // Optionally handle loading state
        return <div>Loading...</div>;
    }
 
    return (
        <Edit>
            <SimpleForm onSubmit={handleSubmit}>
                <RichTextField source="id" defaultValue={record.id} />
                <TextInput source="name" defaultValue={record.name} />
                <CustomBooleanInput source="isTextToSpeechEnabled" label="Text to Speech Enabled" defaultValue={record.isTextToSpeechEnabled} />
                <CustomBooleanInput source="isGamificationEnabled" label="Gamification Enabled" defaultValue={record.isGamificationEnabled} />
                <CustomBooleanInput source="isAvatarShopEnabled" label="Avatar Shop Enabled" defaultValue={record.isAvatarShopEnabled} />
                <CustomBooleanInput source="isActivationAllowed" label="Activation Allowed" defaultValue={record.isActivationAllowed} />
 
                {/* Custom dropdown with radio buttons for tenants */}
                <Autocomplete
                    options={tenants}
                    getOptionLabel={(option: any) => `${option.name} (${option.id})`}
                    value={tenants.find((tenant: any) => tenant.id === tenantChoice) || null} // Set selected tenant
                    onChange={(event, newValue) => {
                        setTenantChoice(newValue ? newValue.id : null); // Update the selected tenant ID
                        setTenantName(newValue.name)
                    }}
                    renderInput={(params) => <TextField {...params} label="Tenant" fullWidth />}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <FormControlLabel
                                control={<Radio checked={tenantChoice === option.id} />}
                                label={option.name}
                            />
                        </li>
                    )}
                />
                <CustomBooleanInput source="isEditAllowed" label="Edit Allowed" defaultValue={record.isEditAllowed} />
                <TextInput source="numberOfActiveClasses" defaultValue={record.numberOfActiveClasses} />
                <CustomBooleanInput source="isTeacherEnvironmentAllowed" label="Teacher Environment Allowed" defaultValue={record.isTeacherEnvironmentAllowed} />
                <CustomBooleanInput source="copyClassLayoutFromEntree" label="Copy Class Layout from Entree" defaultValue={record.copyClassLayoutFromEntree} />
                <TextInput source="versionId" defaultValue={record.versionId} />
                <CustomBooleanInput source="isActive" label="Active" defaultValue={record.isActive} />
                <CustomBooleanInput source="isAdminSchoolPageAllowed" label="Admin School Page Allowed" defaultValue={record.isAdminSchoolPageAllowed} />
            </SimpleForm>
        </Edit>
    );
};
 
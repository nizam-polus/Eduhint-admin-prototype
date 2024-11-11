// in src/resources/tenants/TenantEdit.tsx
import { Edit, TabbedForm, FormTab, TextInput, required } from 'react-admin';
import CustomBooleanInput from '../../components/CustumBooleanInput';

export const TenantEdit = () => (
  <Edit title="Edit Tenant">
    <TabbedForm>
      {/* General Info Tab */}
      <FormTab label="General Info">
        <TextInput source="name" label="Tenant Name" validate={required()} fullWidth />
        <CustomBooleanInput source="isActive" label="Is Active" />
        <CustomBooleanInput source="isAdminPageAllowed" label="Admin Page Allowed" />
        <CustomBooleanInput source="isDeleteAllowed" label="Delete Allowed" />
        <CustomBooleanInput source="isEditAllowed" label="Edit Allowed" />
      </FormTab>

      {/* Payment & Integration Tab */}
      <FormTab label="Payment & Integrations">
        <CustomBooleanInput source="multiSafepayEnabled" label="MultiSafepay Enabled" />
        <CustomBooleanInput source="exactOnlineEnabled" label="Exact Online Enabled" />
        <CustomBooleanInput source="impressEnabled" label="Impress Enabled" />
        <CustomBooleanInput source="bolEnabled" label="Bol Enabled" />
        <CustomBooleanInput source="licensePaymentsEnabled" label="License Payments Enabled" />
      </FormTab>

      {/* Features Tab */}
      <FormTab label="Features">
        <CustomBooleanInput source="activationCodesEnabled" label="Activation Codes Enabled" />
        <CustomBooleanInput source="gamificationEnabled" label="Gamification Enabled" />
        <CustomBooleanInput source="textToSpeechEnabled" label="Text to Speech Enabled" />
        <CustomBooleanInput source="virtualSkillsLabEnabled" label="Virtual Skills Lab Enabled" />
      </FormTab>

      {/* Miscellaneous Tab */}
      <FormTab label="Miscellaneous">
        <CustomBooleanInput source="eckEnabled" label="ECK Enabled" />
        <CustomBooleanInput source="entreeEnabled" label="Entree Enabled" />
        <CustomBooleanInput source="webshopEnabled" label="Webshop Enabled" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

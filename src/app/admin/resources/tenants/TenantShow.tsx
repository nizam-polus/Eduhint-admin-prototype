// in src/resources/tenants/TenantShow.tsx
import { Show, TabbedShowLayout, TextField, BooleanField, Tab } from 'react-admin';

export const TenantShow = () => (
  <Show title="Tenant Details">
    <TabbedShowLayout>
      {/* General Info Tab */}
      <Tab label="General Info">
        <TextField source="name" label="Tenant Name" />
        <BooleanField source="isActive" label="Is Active" />
        <BooleanField source="isAdminPageAllowed" label="Admin Page Allowed" />
        <BooleanField source="isDeleteAllowed" label="Delete Allowed" />
        <BooleanField source="isEditAllowed" label="Edit Allowed" />
      </Tab>

      {/* Payment & Integration Tab */}
      <Tab label="Payment & Integrations">
        <BooleanField source="multiSafepayEnabled" label="MultiSafepay Enabled" />
        <BooleanField source="exactOnlineEnabled" label="Exact Online Enabled" />
        <BooleanField source="impressEnabled" label="Impress Enabled" />
        <BooleanField source="bolEnabled" label="Bol Enabled" />
        <BooleanField source="licensePaymentsEnabled" label="License Payments Enabled" />
      </Tab>

      {/* Features Tab */}
      <Tab label="Features">
        <BooleanField source="activationCodesEnabled" label="Activation Codes Enabled" />
        <BooleanField source="gamificationEnabled" label="Gamification Enabled" />
        <BooleanField source="textToSpeechEnabled" label="Text to Speech Enabled" />
        <BooleanField source="virtualSkillsLabEnabled" label="Virtual Skills Lab Enabled" />
      </Tab>

      {/* Miscellaneous Tab */}
      <Tab label="Miscellaneous">
        <BooleanField source="eckEnabled" label="ECK Enabled" />
        <BooleanField source="entreeEnabled" label="Entree Enabled" />
        <BooleanField source="webshopEnabled" label="Webshop Enabled" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

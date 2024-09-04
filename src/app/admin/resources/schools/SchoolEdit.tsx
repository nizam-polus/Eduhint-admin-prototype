import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const SchoolEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            {/* <TextInput source="prefix" /> */}
            <BooleanInput source="isTextToSpeechEnabled" />
            <BooleanInput source="isGamificationEnabled" />
            <BooleanInput source="isAvatarShopEnabled" />
            <BooleanInput source="isActivationAllowed" />
            <BooleanInput source="isKennisnetAccessByLoginAllowed" />
            <BooleanInput source="isKennisnetRegistrationAllowed" />
            <NumberInput source="tenant.id" />
            <BooleanInput source="isEditAllowed" />
            <TextInput source="numberOfActiveClasses" />
            <BooleanInput source="isTeacherEnvironmentAllowed" />
            <BooleanInput source="copyClassLayoutFromEntree" />
            <TextInput source="versionId" />
            <BooleanInput source="isActive" />
            <TextInput source="tenant.name" />
            <BooleanInput source="isAdminSchoolPageAllowed" />
        </SimpleForm>
    </Edit>
);
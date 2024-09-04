import React from 'react';
import { useRecordContext } from 'react-admin';
import Typography from '@mui/material/Typography';

const TenantField = ({source}: any) => {
    const record = useRecordContext();
    return record ? (
        <Typography variant="body2">
            <Typography variant="subtitle1" component="span">
            </Typography> {record.tenant.name}({record.tenant.id})
        </Typography>
    ) : null;
};

export default TenantField;

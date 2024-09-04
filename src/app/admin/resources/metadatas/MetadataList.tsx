// src/admin/resources/metadatas/MetadataList.tsx
import React from 'react';
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin';
import { Row, Col } from 'antd';

const MetadataList = () => {
  return (
    <List>
      <Row gutter={16}>
        <Col >
          <h3>Metadata List</h3>
          <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Name" />
            <DateField source="creationTimestamp" label="Creation Date" />
            <BooleanField source="isActive" label="Active" />
            <TextField source="type" label="Type" />
            <BooleanField source="isResourceCategory" label="isResource Category" />
            <TextField source="tenant" label="Tenant" />
          </Datagrid>
        </Col>
      </Row>
    </List>
  );
};

export default MetadataList;
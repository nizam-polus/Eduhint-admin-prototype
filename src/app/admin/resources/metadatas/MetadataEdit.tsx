import React, { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  useDataProvider,
} from 'react-admin';
import MetadataTree from './MetadataTree';
// import CustomImageInput from '../../components/CustomImageInput';
import Image from 'next/image';
import { Row, Col, Card, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MetadataEdit = (props: any) => {
  const dataProvider = useDataProvider();
  const [treeData, setTreeData] = useState<any>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const { data }: any = await dataProvider.getList('metadatas', {
          pagination: { page: 1, perPage: 100 },
        });

        const transformedTreeData: any = data.map((item: any) => ({
          key: item.id.toString(),
          title: item.name,
          icon: item.option?.icon?.filePath,
          children: item.option?.children?.map((child: any) => ({
            key: child.id.toString(),
            title: child.name,
            icon: child.icon?.filePath,
            children: [], // Assuming no deeper nesting
          })) || [],
        }));

        setTreeData(transformedTreeData);
      } catch (error) {
        console.error('Error fetching metadata tree data:', error);
      }
    };

    fetchTreeData();
  }, [dataProvider]);

  const findNodeByKey = (nodes: any[], key: string): any => {
    for (let node of nodes) {
      if (node.key === key) return node;
      if (node.children) {
        const found = findNodeByKey(node.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  const handleNodeSelect = (key: string) => {
    const node = findNodeByKey(treeData, key);
    if (node) {
      setSelectedNode(node);
      setUploadedImage(node.icon || null); 
    } else {
      setSelectedNode(null); 
      setUploadedImage(null); 
    }
  };
  const handleImageUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false; // Prevent auto upload
  };


  const handleTreeUpdate = (newData: any) => {
    setTreeData(newData);
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" />
        <NumberInput source="id" label="ID" disabled />
        <BooleanInput source="isCurrent" label="Is Current" />
        <BooleanInput source="isDeleted" label="Is Deleted" />
        <NumberInput source="actionId" label="Action ID" />
        <NumberInput source="tenantId" label="Tenant ID" />
        <BooleanInput source="isForAllMethods" label="Is For All Methods" />
        <BooleanInput source="isForAllMethodsOfTenant" label="Is For All Methods Of Tenant" />
        <BooleanInput source="isPageAllowed" label="Is Page Allowed" />
        <BooleanInput source="isEditAllowed" label="Is Edit Allowed" />
        <BooleanInput source="isDeleteAllowed" label="Is Delete Allowed" />
        <BooleanInput source="isExportAllowed" label="Is Export Allowed" />
        <BooleanInput source="isAllowedToPublishToProduction" label="Is Allowed To Publish To Production" />
        <BooleanInput source="isProductionStatusCheckAllowed" label="Is Production Status Check Allowed" />
        <BooleanInput source="isActive" label="Is Active" />
        <BooleanInput source="isAdminMetadataPropertyPageAllowed" label="Is Admin Metadata Property Page Allowed" />
        <Row gutter={16}>
          <Col>
            <h3>Options</h3>
            <MetadataTree
              data={treeData}
              onNodeSelect={handleNodeSelect}
              onTreeUpdate={handleTreeUpdate}
            />
          </Col>
          <Col span={16}>
            {selectedNode && (
              <Card title="Node Details" bordered={false}> 
                <div style={{ marginBottom: '16px' }}>
                  <Input
                    type="number"
                    value={selectedNode.key}
                    disabled
                    style={{ marginBottom: '8px' }}
                  />
                  <Input
                    value={selectedNode?.title}
                    onChange={(e) => setSelectedNode({ ...selectedNode, title: e.target.value })}
                    placeholder="Node Name"
                    style={{ marginBottom: '8px' }}
                  />
                  {uploadedImage && (
                    <Image
                      src={uploadedImage}
                      width={200}
                      height={200}
                      alt="Node Icon"
                      style={{ marginBottom: '8px' }}
                    />
                  )}
                  <br />
                  <Upload
                    customRequest={({ file, onSuccess }: any) => {
                      handleImageUpload(file);
                      onSuccess && onSuccess(null, file);
                    }}
                    showUploadList={false}
                    accept="image/*"
                    style={{ marginBottom: '8px' }}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                  {/* <CustomImageInput source={selectedNode.icon} /> */}
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </SimpleForm>
    </Edit>
  );
};

export default MetadataEdit;

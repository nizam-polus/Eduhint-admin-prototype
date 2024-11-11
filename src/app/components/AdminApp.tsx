// in src/components/AdminApp.tsx
"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import { SchoolList } from "../admin/resources/schools/SchoolList"
import { SchoolEdit } from "../admin/resources/schools/SchoolEdit";
import { baseUrl } from "@/config";
import MetadataList from "../admin/resources/metadatas/MetadataList";
import MetadataEdit from "../admin/resources/metadatas/MetadataEdit";
import { Schooltest } from "../admin/resources/Schooltest/Schooltest";
import { TenantEdit } from "../admin/resources/tenants/TenantEdit";
import { TenantCreate } from "../admin/resources/tenants/TenantCreate";

const dataProvider = simpleRestProvider(baseUrl);

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="schools"
      list={SchoolList}
      edit={SchoolEdit}
      recordRepresentation="name"
    />
        <Resource
    name="tenants"
    list={ListGuesser}
    edit={TenantEdit}
    create={TenantCreate}
    />
    <Resource
      name="metadatas"
      list={MetadataList}
      edit={MetadataEdit}
      recordRepresentation="name"
    />
      <Resource
      name="test-harness"
      list={Schooltest}
      recordRepresentation="name"
    />
  </Admin>
);

export default AdminApp;



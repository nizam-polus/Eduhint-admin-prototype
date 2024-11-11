import React, { useState } from "react";
import { FormDataConsumer } from "react-admin";
import { Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const CustomImageInput = ({ source }: any) => {
  const [imageUrl, setImageUrl] = useState("");
  console.log("this is props", source);
  return (
    <FormDataConsumer>
      {({ formData, setFieldValue }: any) => {
        const currentImageUrl = formData[source];
        if (currentImageUrl && currentImageUrl !== imageUrl) {
          setImageUrl(currentImageUrl);
        }
        const handleChange = (info: any) => {
          if (info.file.status === "done") {
            const updatedImageUrl = info.file.response.url;
            setFieldValue(source, updatedImageUrl);
            setImageUrl(updatedImageUrl);
          }
        };
        return (
          <div>
            {imageUrl && <Image width={200} src={imageUrl} alt="Current" />}
            <Upload
              action="/upload"
              showUploadList={false}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </div>
        );
      }}
    </FormDataConsumer>
  );
};
export default CustomImageInput;

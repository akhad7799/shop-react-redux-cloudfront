import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);
    localStorage.setItem("authorization_token", "YWtoYWQ6YWtoYWQxMjM=");

    const token = localStorage.getItem("authorization_token");

    const data = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file ? file.name : ""),
      },
      headers: {
        "content-type": "application/json",
        authorization: `Basic ${token}`,
      },
    });
    console.log("File to upload: ", file?.name);
    console.log("Uploading to: ", data.data);
    const result = await fetch(data.data, {
      method: "PUT",
      body: file,
    });
    console.log("Result: ", result);
    setFile(undefined);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}

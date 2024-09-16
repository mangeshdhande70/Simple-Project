import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET;
const FOLDER_NAME = import.meta.env.VITE_SUPABASE_FOLDER;
const SUPABASE_ENDPOINT = import.meta.env.VITE_SUPABASE_ENDPOINT
const SECRET_KEY = import.meta.env.VITE_SUPABASE_SECRET_KEY
const ACCESS_ID= import.meta.env.VITE_SUPABASE_ACCESS_ID
const BLOB_URL= import.meta.env.VITE_SUPBASE_BLOB_URL



const client = new S3Client({
    forcePathStyle: true,
    region: 'ap-south-1',
    endpoint: `${SUPABASE_ENDPOINT}`,
    credentials: {
        accessKeyId: `${ACCESS_ID}`,
        secretAccessKey: `${SECRET_KEY}`,
    },
});

const FileUpload = () => {
    const [file, setfile] = useState(null);
    const [fileName, setfileName] = useState('');
    const [fileUrl, setfileUrl] = useState('');
    const navigate = useNavigate();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setfile(reader.result);
            };
            reader.readAsDataURL(file);

          // console.log("BUCKET_NAME ",BUCKET_NAME);
          // console.log("FOLDER_NAME ",FOLDER_NAME);
          // console.log("BASE_URL {}",BASE_URL);
          // console.log("Env {}",import.meta.env);


            // Upload to Supabase
            const params = {
                Bucket: `${BUCKET_NAME}`,
                Key: `${FOLDER_NAME}/${file.name}`,
                Body: file,
                ContentType: file.type,
            };

            try {
                const command = new PutObjectCommand(params);
                await client.send(command);
                console.log('File uploaded successfully');
                const url = `${BLOB_URL}/${BUCKET_NAME}/${FOLDER_NAME}/${file.name}`;
                setfileUrl(url);
                setfileName(file.name);
                console.log(url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
          // console.log("fileUrl",fileUrl);
          // console.log("filename",fileName);
          // console.log("BASE_URL {}",BASE_URL);
          // console.log("Env {}",import.meta.env);
          const payload = {
            fileName: fileName,  // The name of the file
            fileUrl: fileUrl  // The URL associated with the file
          };
          try {
            const response = await fetch(`${BASE_URL}/post`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
            if (response.ok) {
              alert('File data saved successfully in the DB!');
            } else {
              alert('File data upload in the DB failed!');
            }
          } catch (error) {
            console.error('Error uploading file data in DB:', error);
            alert('File data upload in the DB failed!');
          }
        } else {
          alert('No file selected!');
        }
      };

      const handleGetBlob = async () => {
        try {
            const response = await fetch(`${BASE_URL}/getAllBlob`); // Adjust URL if necessary
            const result = await response.json();
            console.log("result : ",result)
            // Navigate to the /data route and pass data via state
            navigate('/data', { state: { data: result } });
        } catch (error) {
            console.error('Error fetching blob data:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload file
              </label>
              <div className="mt-1 flex items-center">
                <input 
                  type="file"
                  onChange={handleFileChange}
                  className="file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded file:border-none file:cursor-pointer"
                />
              </div>
              {fileName && <p className="mt-2 text-sm text-gray-500">Selected file: {fileName}</p>}
            </div>
    
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          <button
                onClick={handleGetBlob} 
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
            >
                Get Blob
            </button>
        </div>
       
      );
    };
    
    export default FileUpload;

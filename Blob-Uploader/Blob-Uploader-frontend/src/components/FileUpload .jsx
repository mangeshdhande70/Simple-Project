import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useNavigate } from 'react-router-dom';

const client = new S3Client({
    forcePathStyle: true,
    region: 'ap-south-1',
    endpoint: 'https://dyoubvrmtbkozfsqcryx.supabase.co/storage/v1/s3',
    credentials: {
        accessKeyId: '2108d2009d6a5b8ed8190ebd4345d12a',
        secretAccessKey: 'af66835ade464134fbfad3d8f5eec50c83b747b616726c6d55057aa6ab1aaca6',
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

            // Upload to Supabase
            const params = {
                Bucket: 'ekaiwaa',
                Key: `avatars/${file.name}`,
                Body: file,
                ContentType: file.type,
            };

            try {
                const command = new PutObjectCommand(params);
                await client.send(command);
                console.log('File uploaded successfully');
                const url = `https://dyoubvrmtbkozfsqcryx.supabase.co/storage/v1/object/public/ekaiwaa/avatars/${file.name}`;
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
          console.log("fileUrl",fileUrl);
          console.log("filename",fileName);

          const payload = {
            fileName: fileName,  // The name of the file
            fileUrl: fileUrl  // The URL associated with the file
          };
          try {
            const response = await fetch('http://localhost:9090/blob/post', {
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
            const response = await fetch('http://localhost:9090/blob/getAllBlob'); // Adjust URL if necessary
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
                onClick={handleGetBlob} // Changed from form to button
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
            >
                Get Blob
            </button>
        </div>
       
      );
    };
    
    export default FileUpload;

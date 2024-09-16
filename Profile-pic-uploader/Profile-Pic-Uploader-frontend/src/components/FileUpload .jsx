import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handlePictureChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
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
                setImageUrl(url);
                console.log(url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="profile_picture">
                Upload profile picture
            </label>
            <input
                type="file"
                id="profile_picture"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePictureChange}
            />
            <div className="mt-4 relative w-24 h-24">
                <label htmlFor="profile_picture" className="cursor-pointer">
                    <img
                        src={profilePicture || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                        id="profile_image"
                        onClick={() => imageUrl && window.open(imageUrl, '_blank')}
                    />
                    {!profilePicture && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-full">
                            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                        </div>
                    )}
                </label>
            </div>
            {imageUrl && (
                <div className="mt-4">
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {/* View Uploaded Image */}
                    </a>
                </div>
            )}
        </div>
    );
}

export default FileUpload;

import React from 'react';
import { useLocation } from 'react-router-dom';

const DataDisplay = () => {
    const location = useLocation();
    const { data } = location.state || { data: [] };

    const handleDownload = (url) => {
        window.location.href = url;
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blob Data</h1>
            {data.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{item.fileName}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDownload(item.fileLink)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default DataDisplay;

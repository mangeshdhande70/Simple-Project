import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload '
import DataDisplay from './components/DataDisplay'


import { Button } from "flowbite-react";

 function App() {
  // return <Button>Click me</Button>;
  return (
    <Router>
        <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/data" element={<DataDisplay />} />
        </Routes>
    </Router>
);
}

export default App

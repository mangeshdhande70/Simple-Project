import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/FileUpload '
import Dashboard from './components/Dashboard'
import ProfileHeader from './components/ProfileHeader'

import { Button } from "flowbite-react";

 function App() {
  // return <Button>Click me</Button>;
  return (
    <div>
        {/* <FileUpload /> */}
        {/* <Dashboard/> */}
        <FileUpload/>
    </div>
);
}

export default App

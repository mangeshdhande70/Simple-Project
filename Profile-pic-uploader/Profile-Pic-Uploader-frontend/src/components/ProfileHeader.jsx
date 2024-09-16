import React, { useState, useEffect } from 'react';
import { getInitialDarkMode, saveDarkMode } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ProfileHeader = () => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      saveDarkMode(newMode);
      return newMode;
    });
  };

  useEffect(() => {
    saveDarkMode(darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-white text-xl">K.</a>
          <div className="space-x-4">
            <a href="#home" className="text-gray-300 hover:text-white">Home</a>
            <a href="#works" className="text-gray-300 hover:text-white">Works</a>
            <a href="#resume" className="text-gray-300 hover:text-white">Resume</a>
            <a href="#shelf" className="text-gray-300 hover:text-white">Shelf</a>
          </div>
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 bg-gray-700 text-white rounded"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
      </nav>

      <div className="container mx-auto text-center my-10">
        {/* Email can be added here if needed */}
        {/* Profile Illustration would be an img tag here */}
        {/* Name and description below */}
        <h1 className={darkMode ? 'text-4xl text-white' : 'text-4xl text-gray-800'}>it's me Omijigho K. Jimmy</h1>
        {/* Description Text */}
        <p className={darkMode ? 'mt-4 text-gray-400' : 'mt-4 text-gray-600'}>
          A.K.A Gijiggle. Software Developer also known as Gijiggle,
          with rock-solid experience in building competitive
          applications with cutting-edge technologies.
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
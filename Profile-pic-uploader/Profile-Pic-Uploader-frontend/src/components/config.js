export const getInitialDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  };
  
  export const saveDarkMode = (mode) => {
    localStorage.setItem('darkMode', JSON.stringify(mode));
  };
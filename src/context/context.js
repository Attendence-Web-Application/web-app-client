import React, { useState, useEffect } from 'react';

const AttendanceContext = React.createContext();

const AttendanceProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [type, setType] = useState();
    const [token, setToken] = useState();

    return <AttendanceContext.Provider value={{isAuthenticated, setIsAuthenticated, type, setType, token, setToken}}>
        {children}
    </AttendanceContext.Provider>
}


export { AttendanceProvider, AttendanceContext };
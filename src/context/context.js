import React, { useState, useEffect } from 'react';

const AttendanceContext = React.createContext();

const AttendanceProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [type, setType] = useState();
    const [token, setToken] = useState();
    const [id, setUserId] = useState();
    const [name, setName] = useState();

    return <AttendanceContext.Provider value={{isAuthenticated, setIsAuthenticated, type, setType, token, setToken, id, setUserId, name, setName}}>
        {children}
    </AttendanceContext.Provider>
}


export { AttendanceProvider, AttendanceContext };
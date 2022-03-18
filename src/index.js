import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AttendanceProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <AttendanceProvider>
      <App />
    </AttendanceProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';


export const AppRputer = () => {
  return (
    <Router>
        <Routes>
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/" element={<CalendarScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
  )
}

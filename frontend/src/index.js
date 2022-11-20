import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import './styling/base.scss'
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme";
import {ThemeProvider} from "@emotion/react";
import './styling/base.scss'
import {BrowserRouter as Router} from "react-router-dom";
import {UserProvider} from "./utils/auth";


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <UserProvider>
            <Router>
                <App />
            </Router>
        </UserProvider>
    </ThemeProvider>,
  document.getElementById('root')
);
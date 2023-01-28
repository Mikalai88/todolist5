import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {pink, lightBlue} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: pink,
        secondary: lightBlue,
        mode: "dark"
    }
})

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        {/*<CssBaseline/> // сброс стилей - фон черный*/}
    <App />
    </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


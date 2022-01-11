import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'TT Commons',
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

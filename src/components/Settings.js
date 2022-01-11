import { Button, TextField } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Settings() {
    return (
        <div id="settings">
            <Sidebar />
            <TextField
                id="outlined-email-input"
                label="Email"
                size="small"
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                size="small"
            />
            <Button
                type="submit"
                variant="outlined"
                disableElevation
                id="main-button"
            >Sign In</Button>
            <p style={{ textAlign: "center" }}>Don't have an account? <a href="/signup"><strong>Create an account</strong></a></p>
            <Footer />
        </div>
    )
}

export default Settings;

import React, { useRef, useState } from 'react';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function SignIn() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            await signIn(emailRef.current.value, passwordRef.current.value);

        } catch (err) {
            throw err;
        }

        setLoading(false);
    }

    return (
        <div className="login-box">
            <h1 style={{ textAlign: "center" }}>Sign in</h1>
            <FormControl id="login-form">
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    size="small"
                    inputRef={emailRef}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    inputRef={passwordRef}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                    disabled={loading}
                    type="submit"
                    variant="outlined"
                    disableElevation
                    id="main-button"
                    onClick={handleSubmit}
                >Sign In</Button>
                <p style={{ textAlign: "center" }}>Don't have an account? <a href="/signup"><strong>Create an account</strong></a></p>
            </FormControl>
        </div>
    )

}

export default SignIn;
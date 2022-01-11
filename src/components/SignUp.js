import React, { useRef, useState } from 'react';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function SignUp() {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const jenkinsUsernameRef = useRef();
    const jenkinsPasswordRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(
                usernameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value,
                jenkinsUsernameRef.current.value,
                jenkinsPasswordRef.current.value
            );
        } catch (err) {
            setError('Failed to create an account');
            console.log(err);
        }

        setLoading(false);

    }

    return (
        <div className="signup-box">
            <h1 style={{ textAlign: "center" }}>Sign up</h1>
            <FormControl id="signup-form">
                <TextField
                    id="outlined-username-input"
                    label="Username"
                    size="small"
                    inputRef={usernameRef}
                />
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
                <TextField
                    id="outlined-passwordconfirm-input"
                    label="Password Confirmation"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    inputRef={passwordConfirmRef}
                />
                <p>Type the username and password of your Jenkins account below:</p>
                <TextField
                    id="outlined-password-input"
                    label="Jenkins Username"
                    size="small"
                    inputRef={jenkinsUsernameRef}
                />
                <TextField
                    id="outlined-password-input"
                    label="Jenkins Password"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    inputRef={jenkinsPasswordRef}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                    type="submit"
                    disabled={loading}
                    variant="outlined"
                    disableElevation
                    id="main-button"
                    onClick={handleSubmit}
                >Create an account</Button>
                <p style={{ textAlign: "center" }}>Already have an account? <a href="/signin"><strong>Sign in</strong></a></p>
            </FormControl>

        </div>
    )

}

export default SignUp;
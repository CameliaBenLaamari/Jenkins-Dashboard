import { Alert, Button, TextField } from '@mui/material';
import { deleteUser, updateEmail, updatePassword } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getUser, setUser } from '../firebase';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Settings() {

    const [currentUser, setCurrentUser] = useState({});
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(uid) {
            await getUser(uid).then((result) => {
                setCurrentUser(result);
            })
        }
        getData(auth.currentUser.uid);
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value && (passwordRef.current.value !== passwordConfirmRef.current.value)) {
            return setError('Passwords do not match');
        }

        try {
            console.log(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
            setError('');
            setLoading(true);
            currentUser['username'] = (usernameRef.current.value) ? usernameRef.current.value : currentUser['username'];
            console.log(currentUser);
            setUser(
                currentUser['uid'],
                usernameRef.current.value,
                currentUser['email'],
                currentUser['password'],
                currentUser['jenkinsUsername'],
                currentUser['jenkinsPassword']
            ).then(() => console.log(currentUser));
            if (emailRef.current.value) {
                console.log('b');
                updateEmail(currentUser, emailRef.current.value).then(() => {
                    // Email updated
                }).catch((error) => {
                    setError('Failed to update email');
                    console.log(error);
                });
            }
            console.log('c');
            if (passwordRef.current.value) {
                updatePassword(currentUser, passwordRef.current.value).then(() => {
                    // Password updated
                }).catch((error) => {
                    setError('Failed to update password');
                    console.log(error);
                });
            }
            window.location.reload();
        } catch (error) {
            setError('Failed to submit changes');
            console.log(error);
        }

        setLoading(false);
    }

    function deleteAccount(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            deleteUser(currentUser).then(() => {
                // User deleted.
            }).catch((error) => {
                console.log(error)
            });
            navigate('/');
        } catch (error) {
            setError('Failed to delete account');
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <div id="settings">
            <Sidebar />
            <h1>Account settings</h1>
            <p style={{ fontSize: "2.5vh", margin: "3vh 0 3vh 0" }}>Currently logged in as <strong>{currentUser['username']}</strong></p>
            <p style={{ fontSize: "2vh", margin: "4vh 0 1vh 0" }}>Change your username:</p>
            <TextField
                id="outlined-input"
                label="New username"
                size="small"
                inputRef={usernameRef}
                style={{ background: "rgba(255, 255, 255, 0.5)" }}
            />
            <br />
            <p style={{ fontSize: "2vh", margin: "2vh 0 1vh 0" }}>Change your email:</p>
            <TextField
                id="outlined-input"
                label="New email"
                type="email"
                size="small"
                inputRef={emailRef}
                style={{ background: "rgba(255, 255, 255, 0.5)" }}
            />
            <br />
            <p style={{ fontSize: "2vh", margin: "2vh 0 1vh 0" }}>Change your password:</p>
            <div className='container'>
                <TextField
                    id="outlined-input"
                    label="New password"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    inputRef={passwordRef}
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                />
                <TextField
                    id="outlined-input"
                    label="New password confirmation"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    inputRef={passwordConfirmRef}
                    style={{ marginLeft: "3vh", background: "rgba(255, 255, 255, 0.5)" }}
                />
            </div>
            <div className='container'>
                <Button
                    type="submit"
                    variant="outlined"
                    disableElevation
                    id="main-button"
                    onClick={handleSubmit}
                    style={{ margin: "4vh 0 0 0" }}
                    disabled={loading}
                >Submit changes</Button>
                <Button
                    type="submit"
                    variant="outlined"
                    disableElevation
                    id="red-button"
                    onClick={deleteAccount}
                    disabled={loading}
                >Delete account</Button>
            </div>
            {error && <Alert severity="error" style={{ marginTop: "4vh" }}>{error}</Alert>}
            <Footer />
        </div>
    )
}

export default Settings;

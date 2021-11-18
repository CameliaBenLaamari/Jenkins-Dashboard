import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import fetchData from '../jenkins';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    function handleUsername(e) {
        setLoading(false)
        e.preventDefault()
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setLoading(false)
        e.preventDefault()
        setPassword(e.target.value);
    }

    async function submit() {
        fetchData(username, password);
        navigate('/home');
    }

    return (
        <div className="box">
            <img src="jenkins.png" alt="Jenkins Logo" style={{ width: '7vh', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3vh' }} />
            <TextField label="Username" size="small" onChange={handleUsername} className="input" />
            <TextField label="Password" size="small" onChange={handlePassword} className="input" />
            <Button disabled={loading} onClick={submit}>Sign In</Button>
        </div>
    )

}

export default Login
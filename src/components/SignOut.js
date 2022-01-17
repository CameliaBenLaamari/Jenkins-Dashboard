import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStateIfMounted } from 'use-state-if-mounted';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function SignOut() {

    const { signOut } = useAuth();
    const [error, setError] = useStateIfMounted('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signOut();
            navigate('/login');
        } catch (err) {
            setError('Failed to sign out');
            console.log(err);
        }

        setLoading(false);

    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={handleSubmit} disabled={loading}>Sign Out</Button>
        </>
    )
}

export default SignOut;
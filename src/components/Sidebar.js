import { Button, IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Sidebar() {

    const navigate = useNavigate();

    function exit() {
        signOut(auth).then(() => {
            console.log("Signing out...");
            navigate('/signin');
        }).catch((error) => {
            console.log(error);
        });
    }

    function goToSettings() {
        navigate('/settings');
    }

    function goToHome() {
        navigate('/home');
    }

    function goToAbout() {
        navigate('/about');
    }

    return (
        <div id="sidebar">
            <div className="column">
                <img src="jenkins.png" alt="Jenkins Logo" className="sidebar-logo" />
                <ul>
                    <Button id="icon" onClick={goToHome}><img src="icons/accueil.png" alt="home" style={{ height: '3.4vh' }}></img></Button>
                    <Button id="icon" onClick={goToAbout}><img src="icons/info.png" alt="about" style={{ height: '3.4vh' }}></img></Button>
                    {/*<Button id="icon"><img src="icons/user.png" alt="account" style={{ height: '3.4vh' }}></img></Button>*/}
                    <Button id="icon" onClick={goToSettings}><img src="icons/setting.png" alt="settings" style={{ height: '3.4vh' }}></img></Button>
                </ul>
                <IconButton id="exit" onClick={exit}><img src="icons/exit.png" alt="logout" style={{ height: '3vh' }}></img></IconButton>
            </div>
        </div>
    )
}

export default Sidebar

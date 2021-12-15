import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, Input, InputAdornment } from '@mui/material'
import fetchData from '../jenkins';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function handleUsername(e) {
        e.preventDefault()
        setUsername(e.target.value);
    }

    function handlePassword(e) {
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
            <Input label="Username" size="small" onChange={handleUsername} className="input" />
            <Input label="Password" size="small" onChange={handlePassword} className="input"
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Button onClick={submit}>Sign In</Button>
        </div>
    )

}

export default Login
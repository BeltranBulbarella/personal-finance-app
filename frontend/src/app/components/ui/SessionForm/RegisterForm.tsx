'use client';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Box>
            <Typography variant="h4" component="div" sx={{textAlign: 'left', mb: 2}}>
                Create an account
            </Typography>
            <Typography variant="body1" component="div" sx={{textAlign: 'left', mb: 2}}>
                Enter your details to get started with Invest.
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="John"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Surname"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Doe"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                >
                    Register
                </Button>
            </form>
        </Box>
    )
}
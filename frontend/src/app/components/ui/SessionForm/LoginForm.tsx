'use client';
import {Box, IconButton, InputAdornment} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
// import VisibilityIcon from '@mui/icons-material/visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useLogin} from "@/app/hooks/useAuth";
import {ErrorToast} from "@/app/components/common/Toast/Toast";

export const LoginForm = () => {
    const login = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login(email, password)
        } catch (error) {
            ErrorToast('Failed to login');
        }
    };

    return (
        <Box>
            <Typography variant="h4" component="div" sx={{textAlign: 'left', mb: 2}}>
                Welcome back!
            </Typography>
            <Typography variant="body1" component="div" sx={{textAlign: 'left', mb: 2}}>
                Enter your email and password to access your account
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{marginRight: '1px'}}
                                >
                                    {/*{showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}*/}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    size="small"
                    sx={{
                        mt: 1,
                        mb: 2,
                        float: 'right',
                        backgroundColor: 'transparent',
                        color: 'gray',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'normal',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline'
                        }
                    }}
                >
                    Forgot password?
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </form>
        </Box>
    )
}

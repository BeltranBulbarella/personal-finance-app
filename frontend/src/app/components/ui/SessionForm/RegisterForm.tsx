import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";

export const RegisterForm = () => {

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
                    placeholder="John Doe"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="example@mail.com"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                >
                    Sign In
                </Button>
            </form>
        </Box>
    )
}

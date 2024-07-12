'use client';
import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButtons from "@/app/components/common/ToggleButtons/ToggleButtons";
import {Box} from "@mui/material";
import {LoginForm} from "@/app/components/ui/SessionForm/LoginForm";
import {RegisterForm} from "@/app/components/ui/SessionForm/RegisterForm";

const AuthCard: React.FC = () => {
    const [mode, setMode] = useState('login');

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    return (
        <Box sx={{ padding: 20 }}>
            <ToggleButtons value={mode} onChange={handleModeChange}/>
            <Card variant="outlined" sx={{
                mt: 2,
                padding: '20px',
                width: '50vw',
                maxWidth: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '10px',
                border: '2px solid #f0f0f0',
                borderColor: '#f0f0f0',
            }}>
                <CardContent>
                    {mode === 'login' ? (
                        <LoginForm/>
                    ) : (
                        <RegisterForm/>
                    )}
                </CardContent>
            </Card>
        </Box>

    );
};

export default AuthCard;

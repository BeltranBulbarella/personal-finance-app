'use client';
import React, {useState} from 'react';
import {Box, Grid, Paper} from '@mui/material';
import {LoginForm} from '@/app/components/ui/SessionForm/LoginForm';
import ToggleButtons from '@/app/components/common/ToggleButtons/ToggleButtons';
import {RegisterForm} from '@/app/components/ui/SessionForm/RegisterForm';

const AuthCard: React.FC = () => {
  const [mode, setMode] = useState('login');

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string,
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 120px)', // Account for the height of the bars
        padding: {xs: 2, sm: 4},
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          maxWidth: '100%', // Ensure it doesn't overflow on small screens
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Box
            sx={{
              width: '100%',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ToggleButtons value={mode} onChange={handleModeChange} />
          </Box>
          <Paper
            elevation={3}
            sx={{
              p: {xs: 2, sm: 3, md: 4},
              borderRadius: 2,
              backgroundColor: '#fff',
            }}
          >
            {mode === 'login' ? <LoginForm /> : <RegisterForm />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthCard;

'use client';
import React, {useState} from 'react';
import ToggleButtons from '@/app/components/common/ToggleButtons/ToggleButtons';
import {Box} from '@mui/material';
import {LoginForm} from '@/app/components/ui/SessionForm/LoginForm';
import {RegisterForm} from '@/app/components/ui/SessionForm/RegisterForm';
import {CommonCard} from '@/app/components/common/Card/CommonCard';

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
    <Box sx={{padding: 20}}>
      <ToggleButtons value={mode} onChange={handleModeChange} />
      <CommonCard>
        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </CommonCard>
    </Box>
  );
};

export default AuthCard;

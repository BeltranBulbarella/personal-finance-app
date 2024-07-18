'use client';
import {Box} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import useAuthStore from '@/app/store/authStore';

export const Dashboard = () => {
  const {user} = useAuthStore();
  console.log('u', user);

  return (
    <>
      <Box>
        <Button variant='contained' color='primary'>
          Hello World
        </Button>
      </Box>
    </>
  );
};

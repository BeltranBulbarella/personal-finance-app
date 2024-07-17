'use client';
import {Box} from '@mui/material';
import React from 'react';

export const Dashboard = () => {
  return (
    <Box>
      <h1>Dashboard</h1>
      <Box>
        <Box style={{height: '500px', width: '100%'}}></Box>
        <Box
          sx={{
            marginTop: '40px',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

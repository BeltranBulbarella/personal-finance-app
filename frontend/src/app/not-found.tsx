import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Oops, something went wrong!
      </Typography>
      <Typography variant='subtitle1'>
        The page you're looking for doesn't exist. Please check the URL or go
        back to the homepage.
      </Typography>
      <Link href='/dashboard' passHref>
        <Button variant='contained' color='primary' sx={{mt: 3}}>
          Go to HomePage
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;

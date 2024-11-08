import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';

interface PortfolioCardProps {
  title: string;
  amount: string;
  percentageChange: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  amount,
  percentageChange,
}) => {
  return (
    <Card variant='outlined' sx={{minWidth: 200, m: 2}}>
      <CardContent>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {title}
        </Typography>
        <Typography variant='h4'>{amount}</Typography>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography
            variant='body2'
            color={percentageChange.startsWith('-') ? 'error' : 'success.main'}
          >
            {percentageChange}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

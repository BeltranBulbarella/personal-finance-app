import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type {ReactNode} from 'react';

export const CommonCard = ({children}: {children: ReactNode}) => {
  return (
    <Card
      variant='outlined'
      sx={{
        mt: 2,
        padding: '20px',
        width: '50vw',
        maxWidth: '100%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        border: '2px solid #f0f0f0',
        borderColor: '#f0f0f0',
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

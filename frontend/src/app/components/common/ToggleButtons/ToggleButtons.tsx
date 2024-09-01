import type {FC} from 'react';
import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

interface ToggleButtonsProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, value: string) => void;
}

const ToggleButtons: FC<ToggleButtonsProps> = ({value, onChange}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label='Authentication mode'
      fullWidth
      sx={{
        width: '98%',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        mb: 2,
        '& .MuiToggleButtonGroup-grouped': {
          border: 0,
          '&.Mui-selected': {
            backgroundColor: '#ffffff',
            color: '#000000',
          },
          '&:not(:last-of-type)': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&:not(:first-of-type)': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          '&.MuiToggleButton-root': {
            padding: {xs: '8px 16px', sm: '10px 20px'},
            fontSize: {xs: '14px', sm: '16px'},
          },
        },
      }}
    >
      <ToggleButton value='login' aria-label='login'>
        Login
      </ToggleButton>
      <ToggleButton value='register' aria-label='register'>
        Register
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;

import React from 'react';
import {Box, ToggleButton, ToggleButtonGroup} from '@mui/material';
import Typography from '@mui/material/Typography';

interface SelectInputProps {
  value: string;
  onChange: (event: any, value: any) => void;
  title: string;
  items: {value: string; label: string}[];
}

export const SelectInput = (props: SelectInputProps) => {
  return (
    <Box sx={{mt: 2, mb: 2}}>
      <Typography variant='body1'>{props.title}</Typography>
      <ToggleButtonGroup
        color='primary'
        value={props.value}
        exclusive
        onChange={props.onChange}
        fullWidth
      >
        {props.items.map((item) => (
          <ToggleButton value={item.value} key={item.value}>
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

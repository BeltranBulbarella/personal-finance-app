import {TextField} from '@mui/material';
import React from 'react';

interface CommonInputProps {
  label: string;
  type: 'text' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: object;
}

export const CommonInput = (props: CommonInputProps) => {
  return (
    <TextField
      label={props.label}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      fullWidth
      margin='normal'
      InputProps={props.inputProps}
    />
  );
};

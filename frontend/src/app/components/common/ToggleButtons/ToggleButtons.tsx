import type {FC} from "react";
import * as React from 'react';
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
            aria-label="Authentication mode"
            fullWidth
            sx={{
                '& .MuiToggleButtonGroup-grouped': {
                    border: 0,
                    borderRadius: '12px',
                    '&:not(:last-of-type)': {
                        marginRight: '8px',
                    },
                },
            }}
        >
            <ToggleButton value="login" aria-label="login">
                Login
            </ToggleButton>
            <ToggleButton value="register" aria-label="register">
                Register
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ToggleButtons;

'use client';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    components: {
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f0f0f0',
                    borderRadius: '10px',
                    padding: '4px',
                    display: 'inline-flex',
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 0,
                    borderRadius: '12px',
                    '&:not(:last-of-type)': {
                        marginRight: '8px',
                    },
                    '&.Mui-selected': {
                        color: 'black',
                        backgroundColor: 'white',
                    },
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.54)',
                        '&.Mui-focused': {
                            color: 'rgba(0, 0, 0, 0.54)',
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontSize: '16px',
                    '&:hover': {
                        backgroundColor: '#333',
                    }
                }
            }
        }
    }
});

export default lightTheme;

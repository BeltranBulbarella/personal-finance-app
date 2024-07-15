'use client';
import {useThemeStore} from '@/app/store/themeStore';
import lightTheme from '@/app/styles/themes/lightTheme';
import {ThemeProvider as MUIThemeProvider} from '@mui/material';

export const ThemeProvider = ({children}: {children: any}) => {
  const {theme} = useThemeStore();

  return <MUIThemeProvider theme={lightTheme}>{children}</MUIThemeProvider>;
};

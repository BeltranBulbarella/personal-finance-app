'use client';
import {useThemeStore} from '@/app/store/themeStore';
import {DarkModeOutlined, LightModeOutlined} from '@mui/icons-material';

export const ThemeIcon = () => {
  const {theme} = useThemeStore();

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    useThemeStore.setState({theme: newTheme});
  };

  return theme === 'light' ? (
    <LightModeOutlined onClick={handleThemeChange} />
  ) : (
    <DarkModeOutlined onClick={handleThemeChange} />
  );
};

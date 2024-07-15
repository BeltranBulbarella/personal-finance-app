import {Box} from '@mui/material';
import type {ReactNode} from 'react';

interface BarItem {
  content: ReactNode;
  textAlign: 'left' | 'center' | 'right';
}

interface BarProps {
  position: 'top' | 'bottom';
  items: BarItem[];
}

export const Bar = ({position, items}: BarProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        [position]: 0,
        left: 0,
        zIndex: 1100,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent:
              item.textAlign === 'center'
                ? 'center'
                : item.textAlign === 'left'
                  ? 'flex-start'
                  : 'flex-end',
            padding: '0 20px',
          }}
        >
          <Box display='flex' alignItems='center' alignContent='center'>
            {item.content}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

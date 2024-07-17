'use client';
import React, {useState} from 'react';
import {Box} from '@mui/material';
import {Menu, Savings} from '@mui/icons-material';
import {ThemeIcon} from '@/app/components/common/Theme/ThemeIcon';
import {Bar} from '@/app/components/common/Bar/Bar';
import Sidebar from '@/app/components/common/Sidebar/Sidebar';

export const Layout = ({children}: {children: any}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Bar
        position='top'
        items={[
          {
            content: (
              <>
                <Menu
                  onClick={() => setOpen(!open)}
                  sx={{marginRight: '10px', cursor: 'pointer'}}
                />
                Invest
              </>
            ),
            textAlign: 'left',
          },
          {content: <ThemeIcon />, textAlign: 'right'},
        ]}
      />

      <Box sx={{display: 'flex'}}>
        <Sidebar open={open} setOpen={setOpen} />
        <Box
          component='main'
          sx={{
            transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          {children}
        </Box>
      </Box>

      <Bar
        position='bottom'
        items={[
          {
            content: (
              <>
                <Savings sx={{marginRight: '10px'}} />
                Invest
              </>
            ),
            textAlign: 'left',
          },
          {
            content: '© 2024 Invest. All rights reserved.',
            textAlign: 'right',
          },
        ]}
      />
    </Box>
  );
};

import React from 'react';
import {Box} from '@mui/material';
import {Savings} from '@mui/icons-material';
import {Bar} from '@/app/components/common/Bar/Bar';

export const Layout = ({children}: {children: any}) => {
  return (
    <Box>
      <Bar
        position='top'
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
        ]}
      />

      {children}

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

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Link from 'next/link';

export const drawerWidth = 240;
export const miniWidth = 60;

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Drawer
      variant='permanent'
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'fixed',
          top: '60px',
          height: `calc(100% - 60px)`,
          width: open ? drawerWidth : miniWidth,
          overflowX: 'hidden',
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
        },
      }}
    >
      <List>
        {[
          {icon: <DashboardIcon />, text: 'Dashboard', href: 'dashboard'},
          {icon: <AccountBalanceWalletIcon />, text: 'Stocks', href: 'stocks'},
          {icon: <CurrencyBitcoinIcon />, text: 'Crypto', href: 'crypto'},
          {icon: <AttachMoneyIcon />, text: 'Cash', href: 'cash'},
        ].map((item, index) => (
          <ListItem key={index} button>
            <Link href={'/' + item.href}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

'use client';
import type {Dispatch, SetStateAction} from 'react';
import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import {AddOutlined} from '@mui/icons-material';
import {useModalStore} from '@/app/store/useModalStore';
import {sidebarElements} from '@/app/components/common/Sidebar/sidebarElements';

export const drawerWidth = 240;
export const miniWidth = 60;

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {setSelectedModal} = useModalStore();

  return (
    <>
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
            height: `calc(100% - 120px)`,
            width: open ? drawerWidth : miniWidth,
            overflowX: 'hidden',
            transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
          },
        }}
      >
        <List>
          {sidebarElements.map((item, index) => (
            <ListItem key={index}>
              <Link href={'/' + item.href}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </Box>
              </Link>
              {open && item.modal && (
                <IconButton
                  onClick={() => {
                    setSelectedModal(item.modal, {});
                  }}
                >
                  <AddOutlined />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

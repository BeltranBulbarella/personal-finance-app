import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {ModalEnum} from '@/app/components/common/Modal/ModalProvider';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import React from 'react';

export const sidebarElements = [
  {icon: <DashboardIcon />, text: 'Dashboard', href: 'dashboard'},
  {
    icon: <AccountBalanceWalletIcon />,
    text: 'Stocks',
    href: 'stocks',
    modal: ModalEnum.StockTransaction,
  },
  {
    icon: <CurrencyBitcoinIcon />,
    text: 'Crypto',
    href: 'crypto',
    modal: ModalEnum.CryptoTransaction,
  },
  {
    icon: <AttachMoneyIcon />,
    text: 'Cash',
    href: 'cash',
    modal: ModalEnum.CashTransaction,
  },
];

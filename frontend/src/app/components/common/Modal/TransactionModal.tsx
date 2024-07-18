import React, {useState} from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import type {Asset} from '@/app/store/useAssetsStore';

interface TransactionModalProps {
  onClose: () => void;
  title: string;
  assets: Asset[]; // Passing assets directly
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  title,
  assets,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');

  const handleTransactionTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: 'BUY' | 'SELL',
  ) => {
    if (newType) {
      setTransactionType(newType);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{mt: 2, mb: 2}}>
          <Typography variant='body1'>Transaction Type</Typography>
          <ToggleButtonGroup
            color='primary'
            value={transactionType}
            exclusive
            onChange={handleTransactionTypeChange}
            fullWidth
          >
            <ToggleButton value='BUY'>Buy</ToggleButton>
            <ToggleButton value='SELL'>Sell</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Autocomplete
          options={assets}
          value={selectedAsset}
          onChange={(event: any, newValue: Asset | null) => {
            setSelectedAsset(newValue);
          }}
          getOptionLabel={(option) => `${option.name} (${option.symbol})`}
          renderInput={(params) => (
            <TextField {...params} label='Symbol' margin='normal' fullWidth />
          )}
        />
        <TextField
          label='Quantity'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Price'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button onClick={onClose} color='error'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log({selectedAsset, quantity, price, transactionType});
              onClose();
            }}
            color='primary'
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

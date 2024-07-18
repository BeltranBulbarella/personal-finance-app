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
import {transactionTypes} from '@/app/types/types';

interface TransactionModalProps {
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  assets?: Asset[];
  customLabel?: string;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  title,
  onSubmit,
  assets,
  customLabel = 'Symbol',
}) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState<
    transactionTypes.BUY | transactionTypes.SELL
  >(transactionTypes.BUY);

  const handleTransactionTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: transactionTypes,
  ) => {
    if (newType) {
      setTransactionType(newType);
    }
  };

  const handleSubmit = () => {
    const data = {
      assetId: selectedAsset?.id,
      quantity: parseFloat(quantity),
      pricePerUnit: parseFloat(price),
      transactionType,
    };
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          minWidth: 300,
        }}
      >
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
        {assets && (
          <Autocomplete
            options={assets}
            value={selectedAsset}
            onChange={(event: any, newValue: Asset | null) => {
              setSelectedAsset(newValue);
            }}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            renderInput={(params) => (
              <TextField
                {...params}
                label={customLabel}
                margin='normal'
                fullWidth
              />
            )}
          />
        )}
        <TextField
          label='Quantity'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin='normal'
        />
        {assets && (
          <TextField
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin='normal'
          />
        )}
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button onClick={onClose} color='error'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

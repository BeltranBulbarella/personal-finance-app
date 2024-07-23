import React, {useState} from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import {Asset} from '@/app/store/useAssetsStore';
import {AssetTypes, transactionTypes} from '@/app/types/types';
import {CommonInput} from '@/app/components/common/Input/CommonInput';
import {SelectInput} from '@/app/components/common/Input/SelectInput';

interface TransactionModalProps {
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  assets?: Asset[];
  customLabel?: string;
  type: AssetTypes;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  title,
  onSubmit,
  assets,
  customLabel = 'Symbol',
  type,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState('');
  const [moneySpent, setMoneySpent] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState<
    transactionTypes.BUY | transactionTypes.SELL
  >(transactionTypes.BUY);
  const [amountOrSpent, setAmountOrSpent] = useState<
    'quantity' | 'amountSpent'
  >('quantity');

  const handleTransactionTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: transactionTypes,
  ) => {
    if (newType) {
      setTransactionType(newType);
    }
  };

  const handleAmountOrSpentChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: 'quantity' | 'amountSpent',
  ) => {
    if (newType) {
      setAmountOrSpent(newType);
      setQuantity('');
      setMoneySpent('');
    }
  };

  const handleSubmit = () => {
    const data = {
      assetId: selectedAsset?.id,
      quantity: parseFloat(quantity) || 0,
      moneySpent: parseFloat(moneySpent) || 0,
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
        <SelectInput
          title={'Transaction Type'}
          value={transactionType}
          onChange={handleTransactionTypeChange}
          items={[
            {value: transactionTypes.BUY, label: transactionTypes.BUY},
            {value: transactionTypes.SELL, label: transactionTypes.SELL},
          ]}
        />
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
        {type !== AssetTypes.CASH && (
          <SelectInput
            title={'Quantity or Amount Spent?'}
            value={amountOrSpent}
            onChange={handleAmountOrSpentChange}
            items={[
              {value: 'quantity', label: 'Quantity'},
              {value: 'amountSpent', label: 'Amount spent'},
            ]}
          />
        )}
        {amountOrSpent === 'quantity' ? (
          <CommonInput
            label='Quantity'
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{inputProps: {min: 0}}}
          />
        ) : (
          <CommonInput
            label='Amount Spent'
            type='number'
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            inputProps={{inputProps: {min: 0}}}
          />
        )}
        {assets && (
          <CommonInput
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{inputProps: {min: 0}}}
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

import {AssetTypes} from '@/app/types/types';
import React, {FC, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle} from '@mui/material';
import {SelectInput} from '@/app/components/common/Input/SelectInput';
import {CommonInput} from '@/app/components/common/Input/CommonInput';

interface AssetsModalProps {
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  customLabel?: string;
}

export const AssetsModal: FC<AssetsModalProps> = ({
  onClose,
  title,
  onSubmit,
  customLabel = 'Symbol',
}) => {
  const [type, setType] = useState<AssetTypes>(AssetTypes.STOCK);
  const [symbol, setSymbol] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = () => {
    const data = {
      type,
      symbol,
      name,
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
          value={type}
          onChange={(e, value) => setType(value)}
          title='Type'
          items={[
            {value: AssetTypes.STOCK, label: 'Stock'},
            {value: AssetTypes.CRYPTO, label: 'Crypto'},
          ]}
        />
        <CommonInput
          label='Symbol'
          type='text'
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <CommonInput
          label='Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          inputProps={{inputProps: {min: 0}}}
        />
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

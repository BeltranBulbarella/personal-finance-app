import useAuthStore from '@/app/store/authStore';
import {ErrorToast} from '@/app/components/common/Toast/Toast';
import {Box} from '@mui/material';
import React from 'react';
import {useAssets} from '@/app/hooks/useAssets';
import {AssetsModal} from '@/app/components/common/Modal/GenericModals/AssetsModal';

export const CreateAssetModal = ({onClose}: any) => {
  const {createAsset} = useAssets();
  const {user} = useAuthStore();

  const handleModalSubmit = async (data: any) => {
    if (!user) {
      ErrorToast('User not found');
      return;
    }
    await createAsset(data);
  };

  return (
    <Box>
      <AssetsModal
        onClose={onClose}
        title='Add Assets'
        onSubmit={handleModalSubmit}
      />
    </Box>
  );
};

'use client';
import React from 'react';
import {CryptoTransactionModal} from '@/app/components/common/Modal/CryptoTransactionModal';
import {StockTransactionModal} from '@/app/components/common/Modal/StockTransactionModal';
import {useModalStore} from '@/app/store/useModalStore';

export enum ModalEnum {
  CryptoTransaction = 'cryptoTransactionModal',
  StockTransaction = 'stockTransactionModal',
}

const MODALS: Record<ModalEnum, React.ComponentType<any>> = {
  [ModalEnum.CryptoTransaction]: CryptoTransactionModal,
  [ModalEnum.StockTransaction]: StockTransactionModal,
};

export const ModalProvider = () => {
  const [selectedModal, closeModal, modalProps] = useModalStore((state) => [
    state.selectedModal,
    state.closeModal,
    state.modalProps,
  ]);
  if (!selectedModal) return null;
  const Modal = MODALS[selectedModal];

  return <Modal onClose={closeModal} {...modalProps} />;
};

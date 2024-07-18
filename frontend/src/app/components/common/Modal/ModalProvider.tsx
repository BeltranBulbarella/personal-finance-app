'use client';
import React from 'react';
import {CryptoTransactionModal} from '@/app/components/common/Modal/Modals/CryptoTransactionModal';
import {StockTransactionModal} from '@/app/components/common/Modal/Modals/StockTransactionModal';
import {useModalStore} from '@/app/store/useModalStore';
import {CashTransactionModal} from '@/app/components/common/Modal/Modals/CashTransactionModal';

export enum ModalEnum {
  CryptoTransaction = 'cryptoTransactionModal',
  StockTransaction = 'stockTransactionModal',
  CashTransaction = 'cashTransactionModal',
}

const MODALS: Record<ModalEnum, React.ComponentType<any>> = {
  [ModalEnum.CryptoTransaction]: CryptoTransactionModal,
  [ModalEnum.StockTransaction]: StockTransactionModal,
  [ModalEnum.CashTransaction]: CashTransactionModal,
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

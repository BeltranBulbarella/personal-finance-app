import {create} from 'zustand';
import type {ModalEnum} from '@/app/components/common/Modal/ModalProvider';

interface ModalState {
  selectedModal: ModalEnum | null;
  setSelectedModal: (
    selectedModal: ModalEnum,
    modalProps: Record<string, any>,
  ) => void;
  closeModal: () => void;
  modalProps: any;
}

export const useModalStore = create<ModalState>((set) => ({
  selectedModal: null,
  setSelectedModal: (selectedModal, modalProps) =>
    set({selectedModal, modalProps}),
  closeModal: () => set({selectedModal: null, modalProps: null}),
  modalProps: null,
}));

import React from 'react';
import { makeAutoObservable, observable } from 'mobx';

interface IModalItem {
  style?: string;
  children: React.ReactNode | null;
  name?: string;
  closeOverflow?: boolean;
}

interface IChangeModalProps {
  name: string;
  style: string;
}

class ModalStore {
  modalList: IModalItem[] = [];
  modalOverflow: 'scroll' | 'hidden' = 'scroll';

  constructor() {
    makeAutoObservable(this, { modalList: observable.shallow });
  }

  openModal = (modalData: IModalItem) => {
    this.modalList.push(modalData);
  };
  closeModal = () => {
    this.modalList.pop();
  };

  resetModalList = () => {
    this.modalList = [];
  };

  changeModalStyle = (data: IChangeModalProps) => {
    const filteredModal = this.modalList.find((el) => el.name === data.name);
    if (filteredModal) {
      filteredModal.style = data.style;
      const index = this.modalList.indexOf(filteredModal);
      this.modalList[index] = filteredModal;
    }
  };

  setModalOverflow = (value: 'scroll' | 'hidden') => {
    this.modalOverflow = value;
  };
}

export const modalStore = new ModalStore();

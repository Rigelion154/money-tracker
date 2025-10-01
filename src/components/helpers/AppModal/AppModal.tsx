import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { modalStore } from '../../../store/ModalStore';

import BaseLoader from '../BaseLoader.tsx';

import styles from './AppModal.module.css';

interface ITestModal {
  children: React.ReactNode | null;
  closeOverflow?: boolean;
}

const AppModal = observer(function AppModal({
  children,
  closeOverflow = true,
}: ITestModal) {
  const { modalOverflow } = modalStore;
  const [isLoading, setIsLoading] = useState(true);
  // const { width } = useScrollbarSize();

  const closeModalHandler = (e: any) => {
    if (e.target.closest('.modal__content') === null && closeOverflow) {
      modalStore.closeModal();
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div
      className={styles.overlay}
      style={{
        overflowY: modalOverflow,
      }}
      onMouseDown={closeModalHandler}
    >
      {isLoading && <BaseLoader />}
      {!isLoading && children}
    </div>
  );
});

export default AppModal;

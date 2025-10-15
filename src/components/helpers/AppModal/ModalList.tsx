import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../store/ModalStore.ts';
import AppModal from './AppModal.tsx';
import { useEffect } from 'react';

const ModalList = observer(function ModalList() {
  const { modalList } = modalStore;

  useEffect(() => {
    document.body.style.overflowY = modalList.length > 0 ? 'hidden' : 'scroll';
  }, [modalList.length]);

  return (
    <>
      {modalList.length > 0 &&
        modalList.map((modal, index) => (
          <AppModal key={index} closeOverflow={modal.closeOverflow}>
            {modal.children}
          </AppModal>
        ))}
    </>
  );
});

export default ModalList;

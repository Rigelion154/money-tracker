import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../store/ModalStore.ts';
import AppModal from './AppModal.tsx';

const ModalList = observer(function ModalList() {
  const { modalList } = modalStore;

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

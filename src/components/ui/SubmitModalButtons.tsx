import { Button } from 'react-bootstrap';
import { modalStore } from '../../store/ModalStore.ts';

interface ISubmitButtonsProps {
  id?: string;
  handler: () => Promise<void>;
}

const SubmitModalButtons = ({ id, handler }: ISubmitButtonsProps) => (
  <div>
    <div className="d-flex gap-2 justify-content-between">
      <Button variant="outline-success" className="border-0 rounded-3 px-3" type="submit">
        Принять
      </Button>
      <div className="d-flex gap-1">
        {id && (
          <Button variant="outline-danger" className="border-0 rounded-3 px-3" onClick={handler}>
            Удалить
          </Button>
        )}

        <Button
          variant="outline-secondary"
          className="border-0 rounded-3 px-3"
          onClick={modalStore.closeModal}
        >
          Отменить
        </Button>
      </div>
    </div>
  </div>
);

export default SubmitModalButtons;

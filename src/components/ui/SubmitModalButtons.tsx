import { Button, Collapse } from 'react-bootstrap';
import { modalStore } from '../../store/ModalStore.ts';
import { useState } from 'react';

interface ISubmitButtonsProps {
  id?: string;
  handler: () => Promise<void>;
  title?: string;
}

const SubmitModalButtons = ({ id, handler, title }: ISubmitButtonsProps) => {
  const [isWarningOpen, setWarningOpen] = useState(false);

  const handleWarning = () => setWarningOpen(!isWarningOpen);

  return (
    <div>
      <div className="d-flex gap-2 justify-content-between">
        <Button
          variant="outline-success"
          className="border-0 rounded-3 px-3 text-uppercase"
          type="submit"
        >
          Принять
        </Button>

        <div className="d-flex gap-1">
          {id && !isWarningOpen && (
            <Button
              variant="outline-danger"
              className="border-0 rounded-3 px-3 text-uppercase"
              onClick={handleWarning}
            >
              Удалить
            </Button>
          )}

          <Button
            variant="outline-secondary"
            className="border-0 rounded-3 px-3 text-uppercase"
            onClick={modalStore.closeModal}
          >
            Отменить
          </Button>
        </div>
      </div>

      <Collapse in={isWarningOpen}>
        <div>
          <div className="text-danger fs__small mb-2">
            Все транзакции {title} будут удалены! Вы хотите продолжить?
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <Button
              variant="outline-secondary"
              className="border-0 rounded-3 px-3 text-uppercase"
              size="sm"
              onClick={handleWarning}
            >
              Отменить
            </Button>
            <Button
              variant="outline-danger"
              className="border-0 rounded-3 px-3 text-uppercase"
              size="sm"
              onClick={handler}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SubmitModalButtons;

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PrevPageButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="warning" className="rounded-4 px-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i>
        Назад
      </Button>
    </div>
  );
};

export default PrevPageButton;
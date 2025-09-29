import { Spinner } from 'react-bootstrap';

const BaseLoader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center p-3 h-100">
      <Spinner variant="primary" />
    </div>
  );
};

export default BaseLoader;

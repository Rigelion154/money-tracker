import { Spinner } from 'react-bootstrap';

type TVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string;

const BaseLoader = ({ variant = 'primary' }: { variant?: TVariant }) => {
  return (
    <div className="d-flex align-items-center justify-content-center p-3 h-100 w-100 flex-grow-1">
      <Spinner variant={variant} />
    </div>
  );
};

export default BaseLoader;

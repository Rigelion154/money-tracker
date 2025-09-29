import { Field } from 'react-final-form';

const ErrorBar = ({ name }: { name: string }) => (
  <Field
    name={name}
    subscription={{
      touched: true,
      error: true,
      dirty: true,
      submitError: true,
    }}
    render={({ meta: { dirty, touched, error, submitError } }) => {
      return (
        <div style={{ height: '25px' }}>
          {(touched || dirty) && (error || submitError) ? (
            <p className="text-danger mb-0">{error || submitError}</p>
          ) : null}
        </div>
      );
    }}
  />
);

export default ErrorBar;

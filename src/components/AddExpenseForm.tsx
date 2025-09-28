import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import CategoryList from './CategoryList.tsx';

const AddExpenseForm = () => {
  const handleFormSubmit = (values: Record<string, string>) => {
    console.log(values);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CategoryList />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Form>
  );
};

export default AddExpenseForm;

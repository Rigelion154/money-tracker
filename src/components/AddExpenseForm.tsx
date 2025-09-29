import { Field, Form } from 'react-final-form';
import { Button, FormLabel } from 'react-bootstrap';
import CategoryList from './CategoryList.tsx';
import { dbClient } from '../db/dbClient.ts';

const AddExpenseForm = () => {
  const handleFormSubmit = async (values: Record<string, string>) => {
    console.log(values);
    try {
      const { data, error } = await dbClient.rpc('add_to_category_amount2', {
        category_uid: values.category,
        amount_to_add: parseFloat(values.amount), // преобразуем строку в число
      });

      if (error) {
        console.error('Error updating category amount:', error);
        return;
      }

      console.log('Category amount updated successfully', data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCat = async () => {
    const { data, error } = await dbClient.rpc('delete_category', {
      category_uid: '625a9701-8e99-4efd-a655-c9bb2d5b7608',
    });

    console.log(data);
    console.log(error);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormLabel className="fw-bold">Выбор категории:</FormLabel>
          <CategoryList />
          <div>
            <FormLabel className="fw-bold">Сумма:</FormLabel>
            <Field name="amount">
              {({ input }) => (
                <input className="d-block" type="number" {...input} />
              )}
            </Field>
          </div>

          <Button type="submit">Submit</Button>
          <Button onClick={deleteCat}>DeleteCat</Button>
        </form>
      )}
    </Form>
  );
};

export default AddExpenseForm;

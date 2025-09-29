import { Field, Form } from 'react-final-form';
import { Button, FormControl } from 'react-bootstrap';
import { dbClient } from '../db/dbClient.ts';
import { useState } from 'react';

const AuthForm = () => {
  const [type, setType] = useState<'login' | 'register'>('login');
  const handleSubmitForm = async (values: Record<string, string>) => {
    if (type === 'register') {
      await dbClient.auth.signUp({
        email: values.email,
        password: values.password,
      });
    }

    if (type === 'login') {
      await dbClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
    }
  };

  const handleSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="row align-items-center justify-content-center flex-column gap-2 w-100 h-100"
        >
          <h2
            className="text-center text-primary"
            style={{
              color: '#2c3e50',
              fontWeight: 600,
            }}
          >
            {type === 'register' ? 'Создайте аккаунт' : 'Войдите в систему'}
          </h2>
          <div className="col-12 col-md-6 col-xl-3">
            <Field name="email">
              {({ input }) => (
                <FormControl
                  {...input}
                  className="shadow-none"
                  type="email"
                  placeholder="Email"
                />
              )}
            </Field>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <Field name="password">
              {({ input }) => (
                <FormControl
                  {...input}
                  className="shadow-none"
                  type="password"
                  placeholder="Password"
                />
              )}
            </Field>
          </div>

          <div className="text-center">
            <Button type="submit">
              {type === 'register' ? 'Создать аккаунт' : 'Войти'}
            </Button>
            <Button variant="link" onClick={handleSwitchType}>
              {type === 'register' ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default AuthForm;

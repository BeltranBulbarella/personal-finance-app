'use client';
import {Box, Button, TextField, Typography} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {z} from 'zod';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useRegister} from '@/app/hooks/useAuth';
import {ErrorToast} from '@/app/components/common/Toast/Toast';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const RegisterForm = () => {
  const register = useRegister();

  return (
    <Box>
      <Typography variant='h4' component='div' sx={{textAlign: 'left', mb: 2}}>
        Create an account
      </Typography>
      <Typography
        variant='body1'
        component='div'
        sx={{textAlign: 'left', mb: 2}}
      >
        Enter your details to get started with Invest.
      </Typography>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          email: '',
          password: '',
        }}
        validationSchema={toFormikValidationSchema(registerSchema)}
        onSubmit={async (values, {setSubmitting}) => {
          try {
            await register(
              values.name,
              values.surname,
              values.email,
              values.password,
            );
          } catch (error) {
            ErrorToast('Failed to register');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({isSubmitting, errors, touched}) => (
          <Form noValidate autoComplete='off'>
            <Field
              name='name'
              as={TextField}
              label='Name'
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='John'
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Field
              name='surname'
              as={TextField}
              label='Surname'
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='Doe'
              error={touched.surname && !!errors.surname}
              helperText={touched.surname && errors.surname}
            />
            <Field
              name='email'
              as={TextField}
              label='Email'
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='example@mail.com'
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <Field
              name='password'
              as={TextField}
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
              margin='normal'
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{mt: 2}}
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

'use client';
import {
  Box,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Field, Form, Formik} from 'formik';
import {z} from 'zod';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useLogin} from '@/app/hooks/useAuth';
import {ErrorToast} from '@/app/components/common/Toast/Toast';
import {useState} from 'react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const LoginForm = () => {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Typography variant='h4' component='div' sx={{textAlign: 'left', mb: 2}}>
        Welcome back!
      </Typography>
      <Typography
        variant='body1'
        component='div'
        sx={{textAlign: 'left', mb: 2}}
      >
        Enter your email and password to access your account
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={async (values, {setSubmitting}) => {
          try {
            await login(values.email, values.password);
          } catch (error) {
            ErrorToast('Failed to login');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({isSubmitting, errors, touched}) => (
          <Form noValidate autoComplete='off'>
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
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              fullWidth
              margin='normal'
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      sx={{marginRight: '1px'}}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              size='small'
              sx={{
                mt: 1,
                mb: 2,
                float: 'right',
                backgroundColor: 'transparent',
                color: 'gray',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'normal',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot password?
            </Button>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

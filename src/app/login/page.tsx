'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import AuthLayout from '../../layouts/auth/AuthLayout';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username or email is required')
    .min(3, 'Must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await login({ username: data.username, password: data.password });
      enqueueSnackbar('Login successful!', { variant: 'success' });
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.detail ||
        error?.message || 
        'Invalid credentials';
      setError('root.serverError', { message: errorMessage });
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <AuthLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ textAlign: 'left', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Login to OpenSansad
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Access parliamentary data and insights
          </Typography>
        </Box>

        <Stack spacing={3}>
          {!!errors.root?.serverError && <Alert severity="error">{errors.root.serverError.message}</Alert>}

          <RHFTextField 
            name="username" 
            label="Username or Email" 
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              height: 56,
              fontSize: '1.0625rem',
              fontWeight: 700,
              mt: 1,
            }}
          >
            Login
          </LoadingButton>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <Link
            variant="body2"
            onClick={() => router.push('/signup')}
            sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Create account
          </Link>
          <Link
            variant="body2"
            onClick={() => router.push('/')}
            sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Back to home
          </Link>
        </Stack>
      </FormProvider>
    </AuthLayout>
  );
}

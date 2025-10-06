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
  MenuItem,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff, Person, Email, Lock, Business, Badge } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import AuthLayout from '../../layouts/auth/AuthLayout';
import { USER_TYPES } from '../../config/constants';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  first_name: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must be less than 50 characters'),
  last_name: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must be less than 50 characters'),
  user_type: Yup.string().required('User type is required'),
  organization: Yup.string()
    .max(100, 'Organization name must be less than 100 characters'),
});

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      user_type: 'citizen',
      organization: '',
    },
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await register(data);
      enqueueSnackbar('Account created successfully! Welcome to OpenSansad.', { variant: 'success' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error: any) {
      console.error(error);
      const errorMessage = 
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error?.message ||
        'Registration failed';
      setError('root.serverError', { message: errorMessage });
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <AuthLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ textAlign: 'left', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Join OpenSansad to access parliamentary data
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          {!!errors.root?.serverError && <Alert severity="error">{errors.root.serverError.message}</Alert>}

          {/* Info Box */}
          <Alert severity="info" sx={{ mb: 1 }}>
            Join OpenSansad to access 50,000+ parliamentary questions, debates, and bills with AI-powered search.
          </Alert>

          {/* Personal Information */}
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Personal Information
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField 
              name="first_name" 
              label="First Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField 
              name="last_name" 
              label="Last Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Account Credentials */}
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Account Credentials
          </Typography>

          <RHFTextField 
            name="username" 
            label="Username" 
            autoComplete="username"
            helperText="Alphanumeric characters, underscores, and hyphens only"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField 
            name="email" 
            label="Email Address" 
            autoComplete="email"
            helperText="We'll send you a verification email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            helperText="At least 8 characters with uppercase, lowercase, and number"
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

          <RHFTextField
            select
            name="user_type"
            label="User Type"
            helperText="Select your role to help us personalize your experience"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          >
            {USER_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFTextField>

          <RHFTextField 
            name="organization" 
            label="Organization (Optional)" 
            helperText="University, research institute, media organization, etc."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 1 }} />

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
              mt: 2,
            }}
          >
            Create Account
          </LoadingButton>

          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 2 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" component="span">
            Already have an account?{' '}
          </Typography>
          <Link
            variant="body2"
            onClick={() => router.push('/login')}
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Login here
          </Link>
        </Box>
      </FormProvider>
    </AuthLayout>
  );
}

import { LoginRequest } from '@fleet/shared-types';
import { Email, Lock } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[8],
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
  logo?: string;
  title?: string;
  companyName?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  logo,
  title = 'Sign In',
  companyName = 'AVL Fleet Management',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleFormSubmit = async (data: LoginRequest) => {
    try {
      await onSubmit(data);
    } catch (err) {
      // Error handled by parent component
    }
  };

  return (
    <LoginCard>
      <CardContent>
        <LogoBox>
          {logo ? (
            <img src={logo} alt={companyName} style={{ maxHeight: 60 }} />
          ) : (
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
              AVL
            </Typography>
          )}
        </LogoBox>

        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Welcome to {companyName}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Box mb={2}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email Address"
                  type="email"
                  startIcon={<Email />}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  startIcon={<Lock />}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                />
              )}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Checkbox checked={value} onChange={onChange} disabled={loading} />}
                  label="Remember me"
                />
              )}
            />

            <Link href="#" variant="body2" onClick={e => e.preventDefault()}>
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link href="#" onClick={e => e.preventDefault()}>
              Contact your administrator
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </LoginCard>
  );
};

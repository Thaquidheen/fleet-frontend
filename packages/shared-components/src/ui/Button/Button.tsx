import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outlined' | 'text';
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'loading'
})<ButtonProps>(({ theme, variant: customVariant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: 8,
  padding: '10px 20px',
  minHeight: 40,
  ...(customVariant === 'primary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(customVariant === 'secondary' && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  }),
  ...(customVariant === 'danger' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  ...(customVariant === 'success' && {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  }),
}));

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  variant = 'primary',
  ...props
}) => {
  const muiVariant = variant === 'outlined' ? 'outlined' : variant === 'text' ? 'text' : 'contained';

  return (
    <StyledButton
      variant={muiVariant}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : props.startIcon}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

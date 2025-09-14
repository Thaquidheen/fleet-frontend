import React, { forwardRef } from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
}));

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, endIcon, variant = 'outlined', ...props }, ref) => {
    return (
      <StyledTextField
        ref={ref}
        variant={variant}
        fullWidth
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
          ...props.InputProps,
        }}
        {...props}
      />
    );
  }
);

// Specialized input components
export const EmailInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => <Input ref={ref} type="email" {...props} />
);

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => <Input ref={ref} type="password" {...props} />
);

export const NumberInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => <Input ref={ref} type="number" {...props} />
);

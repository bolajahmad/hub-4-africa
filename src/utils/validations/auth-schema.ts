import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email must be provided'),
  password: Yup.string()
    .required('Password must be provided')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password canot exceed 16 xharacters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must containe an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter'),
});

export const ResetPasswordSchema = Yup.object().shape({
  verificationToken: Yup.string()
    .required('Provide verification token. Check your email')
    .length(5, 'Token length cannot exceed 5 characters'),
  password: Yup.string()
    .required('Password must be provided')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password canot exceed 16 xharacters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must containe an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { TextInput } from '../../../components';
import { LoaderComponent } from '../../../components/utils';
import { AuthService } from '../../../services';
import { StyledFormWrapper, StyledInputWrapper } from '../../../styles';
import { ResetPasswordSchema, useWindowDimensions } from '../../../utils';
import { AuthPageWrapper } from '../components';

export const ForgotPasswordPage: React.FC = () => {
  const { width } = useWindowDimensions();
  const [hasVerifiedEmail, setEmailVerified] = useState(false);

  const { mutate: verifyEmail, isLoading: isVerifying } = useMutation(
    AuthService.verifyEmail,
    {
      onSuccess: () => setEmailVerified(true),
    }
  );
  const { mutate: resetPassword, isLoading: isResetting } = useMutation(
    AuthService.resetPassword
  );

  const {
    handleSubmit,
    values: { email },
    isValid,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Please provide your email'),
    }),
    onSubmit: (model) => verifyEmail(model),
  });

  return (
    <AuthPageWrapper width={width}>
      <div className="container">
        <h1 className="bold-8">Welcome Back!</h1>
        <h4 className="bold-6 mt-3">
          Continue managing your account. Login as an admin
        </h4>

        {hasVerifiedEmail ? (
          <Formik
            initialValues={{
              email,
              password: '',
              confirmPassword: '',
              verificationToken: '',
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(model) => resetPassword(model)}
          >
            {({ handleSubmit, isValid }) => {
              return (
                <StyledFormWrapper width={width} onSubmit={handleSubmit}>
                  <div className="main">
                    <TextInput
                      name="verificationToken"
                      white
                      placeholder="Verification Token"
                    />
                    <TextInput
                      name="password"
                      white
                      placeholder="Password"
                      type="password"
                    />
                    <TextInput
                      name="confirmPassword"
                      white
                      placeholder="Password"
                      type="password"
                    />
                  </div>

                  <div className="footer mt-4">
                    <div>
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="submit__btn"
                      >
                        {isResetting ? <LoaderComponent /> : 'Reset Password'}
                      </button>
                    </div>
                  </div>
                </StyledFormWrapper>
              );
            }}
          </Formik>
        ) : (
          <StyledFormWrapper width={width} onSubmit={handleSubmit}>
            <div className="main">
              <StyledInputWrapper width={width}>
                <div className="body">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </StyledInputWrapper>
            </div>

            <div className="footer mt-4">
              <div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="submit__btn"
                >
                  {isVerifying ? <LoaderComponent /> : 'Verify Email'}
                </button>
              </div>
            </div>
          </StyledFormWrapper>
        )}
      </div>
    </AuthPageWrapper>
  );
};

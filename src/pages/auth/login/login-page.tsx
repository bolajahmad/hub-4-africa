import { Formik } from 'formik';
import React from 'react';
import { TextInput, TextLinkButton } from '../../../components';
import { LoaderComponent } from '../../../components/utils';
import { useAuthContext } from '../../../contexts/AuthContext';
import { LoginModel } from '../../../models';
import { StyledFormWrapper } from '../../../styles';
import { LoginSchema, useWindowDimensions } from '../../../utils';
import { AuthPageWrapper } from '../components';

export const LoginPage: React.FC = () => {
  const { width } = useWindowDimensions();
  const { login, isLoading } = useAuthContext()!;

  const logUserIn = (user: LoginModel) => login(user);

  return (
    <AuthPageWrapper width={width}>
      <div className="container">
        <h1 className="bold-8">Welcome Back!</h1>
        <h4 className="bold-6 mt-3">
          Continue managing your account. Login as an admin
        </h4>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(model) => logUserIn(model)}
        >
          {({ handleSubmit, isValid }) => {
            return (
              <StyledFormWrapper onSubmit={handleSubmit} width={width}>
                <div className="main">
                  <TextInput
                    name="email"
                    white
                    placeholder="Email Address"
                    type="email"
                  />
                  <TextInput
                    name="password"
                    white
                    placeholder="Password"
                    type="password"
                  />
                </div>

                <span
                  className="text-right"
                  style={{
                    color: '#0EBE7E',
                    fontWeight: 800,
                    display: 'block',
                  }}
                >
                  <TextLinkButton to="/forgot-password">
                    Forgot Password
                  </TextLinkButton>
                </span>

                <div className="footer mt-4">
                  <div>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="submit__btn"
                    >
                      {isLoading ? <LoaderComponent /> : 'Login'}
                    </button>
                  </div>
                </div>
              </StyledFormWrapper>
            );
          }}
        </Formik>
      </div>
    </AuthPageWrapper>
  );
};

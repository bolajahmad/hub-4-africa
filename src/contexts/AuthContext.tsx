import * as React from 'react';
import { ReactNode } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { AuthenticatedUser, LoginModel, TokenDetailsModel } from '../models';
import { AuthService, StorageService } from '../services';
import { StorageEnums } from '../utils';

interface AuthContextProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  login: (user: LoginModel) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setAccount: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  account: AuthenticatedUser | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error;
}

const Context = React.createContext<AuthContextInterface | undefined>(
  undefined
);

const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  const TOKEN = StorageService.getFromLocal<TokenDetailsModel>(
    StorageEnums.HUB_CURRENT_ADMIN
  )!;
  const userAccount = StorageService.getFromLocal<AuthenticatedUser>(
    StorageEnums.HUB_CURRENT_ADMIN
  );
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!TOKEN && !!TOKEN.token
  );
  const [account, setAccount] = React.useState<AuthenticatedUser | null>(
    userAccount
  );
  const history = useHistory();

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    AuthService.login,
    {
      onSuccess: ({ payload }) => {
        if (payload) {
          setAccount(payload);
          StorageService.setToLocal(StorageEnums.AUTH_TOKEN, payload.token);
          StorageService.setToLocal(StorageEnums.HUB_CURRENT_ADMIN, payload);
          StorageService.setToLocal(
            StorageEnums.REFRESH_TOKEN,
            payload.refreshToken,
            2592000000
          );
          history.push('/app/dashboard');
        }
      },
    }
  );

  const login = React.useCallback(
    (user: LoginModel) => {
      mutate(user);
    },
    [mutate]
  );

  const logout = React.useCallback(() => {
    StorageService.removeFromLocal([
      StorageEnums.HUB_CURRENT_ADMIN,
      StorageEnums.AUTH_TOKEN,
    ]);
    setAccount(null);
    setIsAuthenticated(false);
    history.push('/login');
  }, [history]);

  return (
    <Context.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        account,
        isLoading,
        setAccount,
        isError,
        isSuccess,
        error: error as Error,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAuthContext = () => React.useContext(Context);

export { AuthContext as default, useAuthContext };

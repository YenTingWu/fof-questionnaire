import { createContext, useState, useContext } from 'react';
import { UserCredential } from 'firebase/auth';

type User = UserCredential['user'] | null;

type AuthContextProps = {
  user: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

const initialState = {
  user: null,
  setUser: undefined,
};

const AuthContext = createContext<AuthContextProps>(initialState);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

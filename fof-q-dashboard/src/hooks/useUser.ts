import { useEffect } from 'react';
import { getSignInResult } from 'lib/firebase';
import { useAuthContext } from 'store/auth';

export const useUser = () => {
  const { user: userFromStore, setUser } = useAuthContext();

  useEffect(() => {
    (async () => {
      const user = await getSignInResult();
      if (user) {
        setUser && setUser(user);
      }
    })();
  }, [setUser]);

  return userFromStore;
};

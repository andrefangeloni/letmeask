import React from 'react';

import { firebase, firebaseAuth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  onGoogleSignIn: () => Promise<void>;
};

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const onGoogleSignIn = async () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();

      const response: any = await firebaseAuth.signInWithPopup(googleProvider);

      if (response.user) {
        const { displayName, photoURL, uid } = response.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, onGoogleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

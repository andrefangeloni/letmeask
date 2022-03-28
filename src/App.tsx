import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { auth, firebase } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  onGoogleSignIn: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);

const App = () => {
  const [user, setUser] = React.useState<User>();

  const onGoogleSignIn = async () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();

      const response: any = await auth.signInWithPopup(googleProvider);

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
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onGoogleSignIn }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;

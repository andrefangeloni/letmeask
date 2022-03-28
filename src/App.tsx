import { ToastContainer } from 'react-toastify';

import { AuthContextProvider } from './contexts/AuthContext';

import { AppRoutes } from './routes';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <AuthContextProvider>
    <ToastContainer />
    <AppRoutes />
  </AuthContextProvider>
);

export default App;

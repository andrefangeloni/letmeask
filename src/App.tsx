import { AuthContextProvider } from './contexts/AuthContext';

import { AppRoutes } from './routes';

const App = () => (
  <AuthContextProvider>
    <AppRoutes />
  </AuthContextProvider>
);

export default App;

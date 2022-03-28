import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;

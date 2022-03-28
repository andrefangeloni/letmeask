import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Login } from './pages/Auth/Login';
import { NewRoom } from './pages/Auth/NewRoom';
import { Room } from './pages/Room';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:roomId" element={<Room />} />
    </Routes>
  </BrowserRouter>
);

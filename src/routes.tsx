import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Login } from './pages/Auth/Login';
import { NewRoom } from './pages/Auth/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/Room/AdminRoom';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:roomId" element={<Room />} />

      <Route path="/admin/rooms/:roomId" element={<AdminRoom />} />
    </Routes>
  </BrowserRouter>
);

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:roomId" element={<Room />} />
    </Routes>
  </BrowserRouter>
);

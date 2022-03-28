import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
    </Routes>
  </BrowserRouter>
);

export default App;

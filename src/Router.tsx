import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
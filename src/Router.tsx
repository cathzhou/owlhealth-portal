import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import {AboutUsPage} from './pages/AboutUsPage';

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
    </Routes>
  );
}
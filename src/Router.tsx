import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import RecordsPage from './pages/RecordsPage';

import {AboutUsPage} from './pages/AboutUsPage';
import {ServicesPage} from './pages/ServicesPage';
import {BillingPage} from './pages/BillingPage';

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/health-record" element={< RecordsPage/>} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage/>} />
      <Route path="/billing" element={<BillingPage/>} />
    </Routes>
  );
}
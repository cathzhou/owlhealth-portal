import { AppShell } from '@mantine/core';
import { Suspense } from 'react';
import { Router } from './Router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loading } from './components/Loading';

export function App(): JSX.Element | null {
  return (
    <AppShell header={{ height: 80 }}>
      <Header />
      <AppShell.Main>
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
import React, { Suspense, lazy } from 'react';
import PortfolioPage from '@/pages/PortfolioPage';

// A página do currículo imprimível só é baixada em /cv.
const CvPage = lazy(() => import('@/pages/CvPage'));

// Sem biblioteca de rotas: o site só tem duas telas. O Netlify serve /cv com o cv.html pré-gerado no build (public/_redirects).
const isCvRoute = () => typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/cv';

function App() {
  return isCvRoute() ? (
    <Suspense fallback={null}>
      <CvPage />
    </Suspense>
  ) : (
    <PortfolioPage />
  );
}

export default App;

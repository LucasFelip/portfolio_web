import React from 'react';
import PortfolioPage from '@/pages/PortfolioPage';
import CvPage from '@/pages/CvPage';

// Sem biblioteca de rotas: o site só tem duas telas. O Netlify serve /cv com o mesmo index.html (public/_redirects).
const isCvRoute = () => window.location.pathname.replace(/\/+$/, '') === '/cv';

function App() {
  return isCvRoute() ? <CvPage /> : <PortfolioPage />;
}

export default App;

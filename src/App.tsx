import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ImpressumPage from '@/pages/ImpressumPage';
import DatenschutzPage from '@/pages/DatenschutzPage';
import AdminPage from '@/pages/AdminPage';
import { authLinkType } from '@/lib/supabase';

export default function App() {
  const [page, setPage] = useState(
    authLinkType === 'invite' || authLinkType === 'recovery' ? 'admin' : 'home'
  );

  const handleNavigate = (newPage: string) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    if (page !== 'home') {
      document.title = `Madame Nga – ${
        page === 'speisekarte'
          ? 'Speisekarte'
          : page === 'ueber-uns'
            ? 'Über uns'
            : page === 'kontakt'
              ? 'Kontakt'
              : page === 'impressum'
                ? 'Impressum'
                : page === 'admin'
                  ? 'Admin'
                  : 'Datenschutz'
      }`;
    } else {
      document.title = 'Madame Nga – Vietnamese Cuisine';
    }
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'speisekarte':
        return <MenuPage />;
      case 'ueber-uns':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'kontakt':
        return <ContactPage />;
      case 'impressum':
        return <ImpressumPage />;
      case 'datenschutz':
        return <DatenschutzPage />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

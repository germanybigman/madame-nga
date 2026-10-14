import { useEffect, useState } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'speisekarte', label: 'Speisekarte' },
  { id: 'ueber-uns', label: 'Über uns' },
  { id: 'kontakt', label: 'Kontakt' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(27,58,47,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <UtensilsCrossed
            className={`w-7 h-7 transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-cream'
            } group-hover:text-terracotta transition-colors`}
          />
          <span
            className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-cream'
            }`}
          >
            Madame Nga
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`px-5 py-2 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 relative ${
                currentPage === item.id
                  ? scrolled
                    ? 'text-terracotta'
                    : 'text-gold-light'
                  : scrolled
                    ? 'text-forest hover:text-terracotta'
                    : 'text-cream/90 hover:text-gold-light'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-terracotta transition-all duration-300 ${
                  currentPage === item.id ? 'w-6' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-1.5 transition-colors ${
            scrolled ? 'text-forest' : 'text-cream'
          }`}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <div className="bg-cream mx-6 rounded-2xl shadow-xl p-2 flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`px-5 py-3 text-left text-sm font-medium tracking-wide uppercase rounded-xl transition-colors ${
                currentPage === item.id
                  ? 'text-terracotta bg-cream-dark'
                  : 'text-forest hover:bg-cream-dark/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

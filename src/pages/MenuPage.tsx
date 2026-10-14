import { useState, useEffect, useRef } from 'react';
import { fetchMenuData } from '@/lib/menuApi';
import type { MenuCategory } from '@/lib/types';
import { Download, ChevronDown, Loader2 } from 'lucide-react';

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    fetchMenuData()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0].slug);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    isScrollingRef.current = true;
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      const offset = 115;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    if (categories.length === 0) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const offset = 200;
      let current = categories[0].slug;

      for (const cat of categories) {
        const el = document.getElementById(`cat-${cat.slug}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = cat.slug;
          }
        }
      }

      setActiveCategory(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  if (loading) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-terracotta font-serif text-2xl mb-2">Die Speisekarte konnte nicht geladen werden.</p>
          <p className="text-stone-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-28">
      <section className="py-16 px-6 text-center">
        <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
          Vietnamesische Küche &amp; Sushi
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-forest">
          Unsere Speisekarte
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6 mb-6" />
        <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Eine kulinarische Entdeckungsreise durch die vietnamesische Küche und
          unsere Sushi-Auswahl. Entdecken Sie aromatische Suppen, frische
          Reisnudelgerichte, knusprige Spezialitäten, vielfältige Bowls, Currys
          und köstliche Sushi-Kreationen.
        </p>
      </section>

      <div className="sticky top-14 z-30 bg-cream/95 backdrop-blur-md border-b border-stone-200/60 py-2 px-4 mb-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.slug)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCategory === cat.slug
                  ? 'bg-forest text-cream'
                  : 'text-forest hover:bg-cream-dark'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-20">
        {categories.map((category) => (
          <section
            key={category.id}
            id={`cat-${category.slug}`}
            className="scroll-mt-28"
          >
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-forest">
                {category.title}
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
              {category.subtitle && (
                <p className="text-stone-500 text-sm mt-4 max-w-xl mx-auto italic">
                  {category.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-5">
              {category.items?.map((item) => {
                const itemKey = `${category.id}-${item.id}`;
                const hasOptions = item.options && item.options.length > 0;
                const isExpanded = expandedItems.has(itemKey);

                return (
                  <div
                    key={item.id}
                    className="group bg-cream-light rounded-xl p-5 md:p-6 hover:shadow-md transition-shadow duration-300 border border-stone-200/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-serif text-xl text-forest">
                            {item.name}
                          </h3>
                          {hasOptions && (
                            <button
                              onClick={() => toggleItem(itemKey)}
                              className="text-xs text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
                            >
                              {isExpanded ? 'Weniger' : 'Optionen'}
                              <ChevronDown
                                className={`w-3 h-3 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="font-serif text-lg text-terracotta whitespace-nowrap shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {hasOptions && isExpanded && (
                      <div className="mt-4 pt-4 border-t border-stone-200/60 grid sm:grid-cols-2 gap-2 animate-fade-in">
                        {item.options!.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-center justify-between text-sm bg-cream-dark/40 rounded-lg px-3 py-2"
                          >
                            <span className="text-stone-600">{opt.name}</span>
                            <span className="text-terracotta font-medium">
                              {opt.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="py-16 px-6 bg-cream-dark/40">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream-light rounded-2xl p-8 md:p-10 border border-stone-200/50">
            <h2 className="font-serif text-2xl text-forest mb-4">
              Allergene und Zusatzstoffe
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Unsere Speisen können Allergene und kennzeichnungspflichtige
              Zusatzstoffe enthalten. Bitte informieren Sie unser Team vor Ihrer
              Bestellung über Allergien oder Unverträglichkeiten. Wir helfen
              Ihnen gerne weiter. Die vollständige Allergeninformation erhalten
              Sie auf Anfrage bei unserem Team.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Viele Gerichte sind auch zum Mitnehmen erhältlich. Bitte fragen Sie
              unser Team nach der aktuellen Verfügbarkeit.
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://madame-nga.de/wp-content/uploads/2024/01/menu2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-3.5 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Speisekarte als PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

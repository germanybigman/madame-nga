import { UtensilsCrossed, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-forest-dark text-cream/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <UtensilsCrossed className="w-6 h-6 text-gold-light" />
              <span className="font-serif text-2xl font-semibold text-cream">
                Madame Nga
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              Vietnamese Cuisine – vielfältige vietnamesische Küche und
              ausgewählte Sushi-Spezialitäten in Selb.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-gold-light mb-5">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-terracotta-light shrink-0" />
                <span>Schillerstraße 23, 95100 Selb</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta-light shrink-0" />
                <a
                  href="tel:+4992876659962"
                  className="hover:text-cream transition-colors"
                >
                  +49 9287 6659962
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta-light shrink-0" />
                <a
                  href="mailto:info@madame-nga.de"
                  className="hover:text-cream transition-colors"
                >
                  info@madame-nga.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-gold-light mb-5">
              Öffnungszeiten
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-terracotta-light shrink-0" />
                <div>
                  <p>Dienstag bis Sonntag</p>
                  <p className="text-cream/60">11:00–14:00 Uhr &amp; 17:00–22:00 Uhr</p>
                  <p className="text-cream/60 mt-1">Montag: Ruhetag</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider">
            {[
              { id: 'home', label: 'Home' },
              { id: 'speisekarte', label: 'Speisekarte' },
              { id: 'ueber-uns', label: 'Über uns' },
              { id: 'kontakt', label: 'Kontakt' },
              { id: 'impressum', label: 'Impressum' },
              { id: 'datenschutz', label: 'Datenschutz' },
              { id: 'admin', label: 'Admin' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-cream/50 hover:text-gold-light transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-cream/40">
            © Madame Nga. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

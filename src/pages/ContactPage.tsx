import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

const mapEmbedSrc =
  'https://www.openstreetmap.org/export/embed.html?bbox=12.13%2C50.16%2C12.17%2C50.18&layer=mapnik&marker=50.1706%2C12.1528';

export default function ContactPage() {
  return (
    <div className="bg-cream pt-28">
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
          Wir freuenuns auf Sie
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-forest">
          Kontakt
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6 mb-6" />
        <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
          Besuchen Sie Madame Nga – wir freuenuns auf Ihren Besuch in unserem
          Restaurant in Selb.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-cream-light rounded-2xl p-8 shadow-sm border border-stone-200/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold-light" />
              </div>
              <h2 className="font-serif text-2xl text-forest">Adresse</h2>
            </div>
            <div className="space-y-1 text-stone-600">
              <p className="font-medium text-forest">Madame Nga – Vietnamese Cuisine</p>
              <p>Schillerstraße 23</p>
              <p>95100 Selb</p>
              <p>Deutschland</p>
            </div>
            <a
              href="https://maps.google.com/?q=Schillerstraße+23,+95100+Selb"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-6 text-terracotta hover:text-terracotta-dark text-sm font-medium transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Anfahrt planen
            </a>
          </div>

          <div className="bg-cream-light rounded-2xl p-8 shadow-sm border border-stone-200/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold-light" />
              </div>
              <h2 className="font-serif text-2xl text-forest">Kontakt</h2>
            </div>
            <div className="space-y-4 text-stone-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta" />
                <a
                  href="tel:+4992876659962"
                  className="hover:text-forest transition-colors"
                >
                  +49 9287 6659962
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta" />
                <a
                  href="mailto:info@madame-nga.de"
                  className="hover:text-forest transition-colors"
                >
                  info@madame-nga.de
                </a>
              </div>
            </div>
            <p className="text-stone-500 text-sm mt-6 leading-relaxed">
              Rufen Sie uns an oder schreiben Sie uns eine E-Mail. Wir freuenuns,
              von Ihnen zu hören.
            </p>
          </div>
        </div>
      </section>

      {/* Öffnungszeiten */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-forest-dark rounded-2xl p-8 md:p-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-gold-light" />
              <h2 className="font-serif text-3xl text-cream">Öffnungszeiten</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-forest-light/30 rounded-xl p-6 border border-cream/10">
                <p className="text-gold-light font-medium mb-2">Dienstag bis Sonntag</p>
                <p className="text-cream/80 text-sm">11:00 – 14:00 Uhr</p>
                <p className="text-cream/80 text-sm">17:00 – 22:00 Uhr</p>
              </div>
              <div className="bg-forest-light/30 rounded-xl p-6 border border-cream/10">
                <p className="text-terracotta-light font-medium mb-2">Montag</p>
                <p className="text-cream/80 text-sm">Ruhetag</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200/50 h-[400px]">
            <iframe
              title="Karte – Madame Nga, Schillerstraße 23, 95100 Selb"
              src={mapEmbedSrc}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-center text-stone-500 text-sm mt-4">
            Anfahrt: Schillerstraße 23, 95100 Selb
          </p>
        </div>
      </section>
    </div>
  );
}

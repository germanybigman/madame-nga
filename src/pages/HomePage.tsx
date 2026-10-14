import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const heroImage = 'https://images.pexels.com/photos/6646022/pexels-photo-6646022.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
const phoImage = 'https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg?auto=compress&cs=tinysrgb&h=600&w=800';
const curryImage = 'https://images.pexels.com/photos/19992964/pexels-photo-19992964.jpeg?auto=compress&cs=tinysrgb&h=600&w=800';
const sushiImage = 'https://images.pexels.com/photos/38485707/pexels-photo-38485707.jpeg?auto=compress&cs=tinysrgb&h=600&w=800';
const bunBoImage = 'https://images.pexels.com/photos/34888274/pexels-photo-34888274.jpeg?auto=compress&cs=tinysrgb&h=600&w=800';

const recommendations = [
  {
    name: 'Pho Ha Noi',
    description: 'Traditionelle Reisbandnudelsuppe mit aromatischer Brühe, Kräutern und einer Auswahl an Einlagen.',
    price: 'ab 13,90 €',
    image: 'https://images.pexels.com/photos/6646034/pexels-photo-6646034.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  },
  {
    name: 'Bun Bo Nam Bo',
    description: 'Lauwarmes Rindfleisch mit Reisnudeln, Salat, Erdnüssen und asiatischen Kräutern.',
    price: '13,90 €',
    image: bunBoImage,
  },
  {
    name: 'Rotes Curry',
    description: 'Kokosmilch, Thai-Basilikum und Gemüse, serviert mit Reis und einer Einlage Ihrer Wahl.',
    price: 'ab 12,90 €',
    image: curryImage,
  },
  {
    name: 'Crunchy Salmon',
    description: 'Gebackene Sushi-Rolle mit Lachs, Avocado, Frischkäse, Rucola und Spargel.',
    price: '8,90 €',
    image: sushiImage,
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Vietnamesische Pho-Suppe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/50 via-forest-dark/30 to-forest-dark/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-light text-sm uppercase tracking-[0.3em] mb-6 animate-fade-in">
            Vietnamese Cuisine in Selb
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight text-shadow-lg animate-fade-up">
            Willkommen bei Madame Nga
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-gold-light mt-4 italic text-shadow-md animate-fade-up" style={{ animationDelay: '0.15s' }}>
            Vietnamesische Küche. Vielfalt, die begeistert.
          </p>
          <p className="text-cream/80 text-lg mt-8 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Entdecken Sie die aromatische Welt der vietnamesischen Küche. Freuen
            Sie sich auf duftende Suppen, frische Reisnudelgerichte, vielfältige
            Bowls, köstliche Currys und ausgewählte Sushi-Spezialitäten.
          </p>
          <div className="mt-10 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <button
              onClick={() => onNavigate('speisekarte')}
              className="group inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Speisekarte entdecken
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-cream/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Unsere Küche */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
              Entdecken Sie
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest">
              Unsere Küche
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vietnamesische Klassiker',
                description:
                  'Entdecken Sie traditionelle Pho-Suppen, frische Kräuter, aromatische Brühen und abwechslungsreiche Reisnudelgerichte – inspiriert von der vietnamesischen Küche.',
                image: phoImage,
              },
              {
                title: 'Aromatische Currys und Spezialitäten',
                description:
                  'Cremige Kokosmilch, fruchtige Mango, würzige Kräuter und knackiges Gemüse verbinden sich zu abwechslungsreichen Gerichten mit Reis.',
                image: curryImage,
              },
              {
                title: 'Sushi für jeden Geschmack',
                description:
                  'Von klassischen Maki und Nigiri bis hin zu knusprigen Rollen und besonderen Sushi-Kreationen – entdecken Sie unsere vielfältige Sushi-Auswahl.',
                image: sushiImage,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="group bg-cream-light rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-forest mb-3">
                    {card.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empfehlungen */}
      <section className="py-24 px-6 bg-cream-dark/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
              Besonders beliebt
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest">
              Unsere Empfehlungen
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((item) => (
              <div
                key={item.name}
                className="group bg-cream-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-forest">
                    {item.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-forest mb-2">
                    {item.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('speisekarte')}
              className="group inline-flex items-center gap-2 border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-3.5 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
            >
              Gesamte Speisekarte ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Ein Platz zum Genießen */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
            Bei Madame Nga
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-6">
            Ein Platz zum Genießen
          </h2>
          <p className="font-serif text-xl text-stone-600 italic mb-8">
            Gemeinsam essen. Neues entdecken. Wohlfühlen.
          </p>
          <p className="text-stone-600 leading-relaxed mb-4 max-w-2xl mx-auto">
            Ob ein entspanntes Mittagessen, ein Abendessen mit Freunden oder
            ein gemeinsamer Besuch mit der Familie – bei Madame Nga erwartet
            Sie eine vielseitige Speisekarte mit vietnamesischen Gerichten und
            Sushi-Spezialitäten.
          </p>
          <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Lassen Sie sich inspirieren und entdecken Sie Ihre persönlichen
            Favoriten.
          </p>
        </div>
      </section>

      {/* Besuchen Sie uns */}
      <section className="py-24 px-6 bg-forest-dark">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold-light text-sm uppercase tracking-[0.25em] mb-3">
            Wir freuenuns auf Sie
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Besuchen Sie uns
          </h2>
          <p className="font-serif text-2xl text-gold-light italic mb-12">
            Madame Nga – Vietnamese Cuisine
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-forest-light/30 rounded-2xl p-7 border border-cream/10">
              <MapPin className="w-6 h-6 text-gold-light mb-4" />
              <h3 className="font-serif text-lg text-cream mb-2">Adresse</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                Schillerstraße 23<br />
                95100 Selb<br />
                Deutschland
              </p>
            </div>
            <div className="bg-forest-light/30 rounded-2xl p-7 border border-cream/10">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-gold-light" />
                <Mail className="w-5 h-5 text-gold-light" />
              </div>
              <h3 className="font-serif text-lg text-cream mb-2">Kontakt</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                Telefon: +49 9287 6659962<br />
                E-Mail: info@madame-nga.de
              </p>
            </div>
            <div className="bg-forest-light/30 rounded-2xl p-7 border border-cream/10">
              <Clock className="w-6 h-6 text-gold-light mb-4" />
              <h3 className="font-serif text-lg text-cream mb-2">Öffnungszeiten</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                Di–So: 11:00–14:00 &amp; 17:00–22:00<br />
                Montag: Ruhetag
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="https://maps.google.com/?q=Schillerstraße+23,+95100+Selb"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 shadow-lg hover:scale-105"
            >
              Anfahrt planen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const aboutImage1 = 'https://images.pexels.com/photos/6646070/pexels-photo-6646070.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';
const aboutImage2 = 'https://images.pexels.com/photos/12386446/pexels-photo-12386446.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';
const aboutImage3 = 'https://images.pexels.com/photos/33662943/pexels-photo-33662943.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-cream pt-28">
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <p className="text-terracotta text-sm uppercase tracking-[0.25em] mb-3">
          Vietnamesische Küche in Selb
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-forest">
          Über uns
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img
                src={aboutImage1}
                alt="Vietnamesisches Gericht"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold rounded-2xl -z-10" />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6 leading-tight">
                Willkommen bei Madame Nga
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Willkommen bei Madame Nga – Ihrem Restaurant für vielfältige
                vietnamesische Küche und ausgewählte Sushi-Spezialitäten in Selb.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Unsere Speisekarte verbindet traditionelle vietnamesische Gerichte
                mit einer abwechslungsreichen Auswahl an Suppen, Reisnudeln,
                Bowls, Currys und Sushi.
              </p>
            </div>
          </div>

          {/* Mitte */}
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <p className="font-serif text-2xl md:text-3xl text-forest italic leading-relaxed">
              „Ob Sie aromatische Pho, gebratene Nudeln, ein cremiges Curry oder
              eine Sushi-Rolle bevorzugen: Entdecken Sie die Vielfalt unserer
              Speisekarte und finden Sie Ihr Lieblingsgericht.“
            </p>
          </div>

          {/* Bilder Gallery */}
          <div className="grid sm:grid-cols-2 gap-6 mb-20">
            <div className="relative overflow-hidden rounded-2xl group h-[350px]">
              <img
                src={aboutImage2}
                alt="Vietnamesische Sommerrollen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl group h-[350px]">
              <img
                src={aboutImage3}
                alt="Reisnudelgericht"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Closing */}
          <div className="text-center mb-16">
            <p className="text-stone-600 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Wir freuen uns darauf, Sie bei Madame Nga begrüßen zu dürfen.
            </p>
            <button
              onClick={() => onNavigate('speisekarte')}
              className="group inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 shadow-lg hover:scale-105"
            >
              Speisekarte ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Kontakt Quick Info */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-cream mb-2">
            Madame Nga – Vietnamese Cuisine
          </h2>
          <p className="text-gold-light mb-8">Schillerstraße 23 · 95100 Selb</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-cream/70 text-sm">
            <a
              href="tel:+4992876659962"
              className="hover:text-gold-light transition-colors"
            >
              +49 9287 6659962
            </a>
            <span className="text-cream/30">|</span>
            <a
              href="mailto:info@madame-nga.de"
              className="hover:text-gold-light transition-colors"
            >
              info@madame-nga.de
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

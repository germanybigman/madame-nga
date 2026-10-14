export default function ImpressumPage() {
  return (
    <div className="bg-cream pt-28">
      <section className="py-16 px-6 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-forest">Impressum</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </section>

      <section className="py-8 px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-cream-light rounded-2xl p-8 md:p-10 shadow-sm border border-stone-200/40 space-y-6 text-stone-600">
          <div>
            <h2 className="font-serif text-2xl text-forest mb-3">Angaben gemäß § 5 TMG</h2>
            <p>Madame Nga – Vietnamese Cuisine</p>
            <p>Schillerstraße 23</p>
            <p>95100 Selb</p>
            <p>Deutschland</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Kontakt</h2>
            <p>Telefon: +49 9287 6659962</p>
            <p>
              E-Mail:{' '}
              <a
                href="mailto:info@madame-nga.de"
                className="text-terracotta hover:text-terracotta-dark transition-colors"
              >
                info@madame-nga.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Verantwortlich für den Inhalt</h2>
            <p>Madame Nga – Vietnamese Cuisine</p>
            <p>Schillerstraße 23, 95100 Selb</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Haftungsausschluss</h2>
            <p className="text-sm leading-relaxed">
              Die Inhalte dieser Website werden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Die angegebenen Preise
              und Informationen sollten vor einem Besuch bestätigt werden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

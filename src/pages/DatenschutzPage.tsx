export default function DatenschutzPage() {
  return (
    <div className="bg-cream pt-28">
      <section className="py-16 px-6 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-forest">Datenschutz</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </section>

      <section className="py-8 px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-cream-light rounded-2xl p-8 md:p-10 shadow-sm border border-stone-200/40 space-y-6 text-stone-600">
          <div>
            <h2 className="font-serif text-2xl text-forest mb-3">Datenschutzerklärung</h2>
            <p className="text-sm leading-relaxed">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln
              Ihre personenbezogenen Daten vertraulich und entsprechend der
              gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser
              Datenschutzerklärung.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Verantwortlicher</h2>
            <p className="text-sm leading-relaxed">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="text-sm mt-2">
              Madame Nga – Vietnamese Cuisine<br />
              Schillerstraße 23<br />
              95100 Selb<br />
              E-Mail: info@madame-nga.de
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Erhebung von Daten</h2>
            <p className="text-sm leading-relaxed">
              Beim Aufruf dieser Website werden automatisch Informationen an
              unseren Server (Logfiles) gesendet, die Ihr Browser übermittelt.
              Dazu gehören Browsertyp und -version, das verwendete
              Betriebssystem, die Referrer-URL, die IP-Adresse und die Uhrzeit
              der Anfrage.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Ihre Rechte</h2>
            <p className="text-sm leading-relaxed">
              Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person
              gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck
              der Datenverarbeitung. Ferner steht Ihnen ein Recht auf
              Berichtigung, Sperrung oder Löschung dieser Daten zu.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-forest mb-3">Kontaktieren Sie uns</h2>
            <p className="text-sm leading-relaxed">
              Bei Fragen zum Datenschutz können Sie uns jederzeit unter
              info@madame-nga.de kontaktieren.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

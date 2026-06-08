import { Award, Factory, HeartHandshake, PackageCheck, ShieldCheck, Truck } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Tested for daily training',
    copy: 'Every product is chosen for grip, comfort, durability, and repeat use across real practice routines.',
  },
  {
    icon: PackageCheck,
    title: 'Curated, not crowded',
    copy: 'We keep the catalog focused so athletes can build a kit quickly without sorting through endless lookalikes.',
  },
  {
    icon: HeartHandshake,
    title: 'Support from real people',
    copy: 'Need help choosing gear or solving an order issue? Our team keeps the buying experience direct and human.',
  },
];

const milestones = [
  ['2024', 'Started with match-day footballs and training gloves for local athletes.'],
  ['2025', 'Expanded into running, basketball, tennis, hydration, and team bundles.'],
  ['2026', 'Serving 6k+ athletes with faster dispatch and clearer product guidance.'],
];

export function AboutPage({ onBackToStore }) {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div>
          <p className="eyebrow">About ApexGear</p>
          <h1>We build better kits for athletes who keep showing up.</h1>
        </div>
        <p>
          ApexGear is a performance equipment store for people who train after work,
          play on weekends, coach teams, chase personal bests, and still care about
          gear that looks sharp.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story-media" aria-hidden="true">
          <img src="/assets/apexgear-sports-hero.png" alt="" />
        </div>
        <div className="about-story-copy">
          <p className="eyebrow">Our story</p>
          <h2>Premium sports gear should feel simple to choose.</h2>
          <p>
            We started ApexGear after seeing athletes waste time comparing dozens of
            nearly identical products. Our answer is a tighter collection: proven
            essentials, clear pricing, fast delivery, and honest support.
          </p>
          <p>
            From footballs and basketballs to training gloves, bottles, tennis rackets,
            and running shoes, every item is selected around one idea: help people move
            better without turning shopping into homework.
          </p>
          <button className="primary-link about-action" type="button" onClick={onBackToStore}>
            Shop the store
          </button>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we stand for</p>
            <h2 id="about-values-title">A focused store for serious everyday athletes.</h2>
          </div>
        </div>
        <div className="about-value-grid">
          {values.map((value) => {
            const ValueIcon = value.icon;

            return (
              <article key={value.title}>
                <ValueIcon size={28} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-operations" aria-label="ApexGear operations">
        <div>
          <Factory size={30} aria-hidden="true" />
          <span>Curated warehouse</span>
          <strong>Mumbai, India</strong>
        </div>
        <div>
          <Truck size={30} aria-hidden="true" />
          <span>Dispatch promise</span>
          <strong>24 hour packing</strong>
        </div>
        <div>
          <Award size={30} aria-hidden="true" />
          <span>Customer rating</span>
          <strong>4.9 / 5 average</strong>
        </div>
      </section>

      <section className="about-timeline">
        <p className="eyebrow">Timeline</p>
        <div>
          {milestones.map(([year, copy]) => (
            <article key={year}>
              <strong>{year}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Questions about sizing, bundles, or team orders?</h2>
        </div>
        <div>
          <a href="mailto:care@apexgear.example">care@apexgear.example</a>
          <span>WhatsApp: +91 87885 56920</span>
          <span>Operations center: Bhiwandi, Mumbai</span>
        </div>
      </section>
    </main>
  );
}

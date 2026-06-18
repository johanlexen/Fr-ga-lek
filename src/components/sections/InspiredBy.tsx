"use client";

const NAMES = [
  "Apple Vision Pro",
  "AirPods Pro",
  "Apple Watch Ultra",
  "Stripe Sessions",
  "Linear",
  "Framer",
  "Resend",
  "Vercel",
  "Arc Browser",
  "Nothing",
];

/** Edge-faded infinite marquee acknowledging the craft this page chases. */
export function InspiredBy() {
  const row = [...NAMES, ...NAMES];
  return (
    <section className="relative border-y border-white/10 py-8">
      <div className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
        Standing on the shoulders of
      </div>
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-12">
          {row.map((n, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl font-medium text-white/30 transition-colors duration-300 hover:text-white/70 sm:text-2xl"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

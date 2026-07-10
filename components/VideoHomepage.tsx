import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { asset, heroVideo, heroPoster } from "@/lib/assets";
import { AddToCart } from "@/components/cart/AddToCart";
import {
  FadeUp,
  StaggerChildren,
  TextReveal,
  ImageRevealMask,
  MagneticButton,
} from "@/components/motion";

/**
 * ARCHETYPE G — Mixed-Media Hybrid Scroll (bakery shop edition)
 *   1 VIDEO hero → 2 IMAGE story → 3 TYPE manifesto →
 *   4 FEATURED BAKES (cart) → 5 SERVICES grid → 6 CTA
 */
export default function VideoHomepage() {
  return (
    <div className="relative">
      <VideoHeroSection />
      <ImageStorySection />
      <OversizedTypeSection />
      <FeaturedBakesSection />
      <ServicesGridSection />
      <CtaSection />
    </div>
  );
}

// ── Section 1 — VIDEO HERO ──────────────────────────────────────
function VideoHeroSection() {
  const video = heroVideo();
  const poster = heroPoster();
  return (
    <section className="relative min-h-screen bg-bg flex items-center justify-center px-6 overflow-hidden">
      {video ? (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src={poster}
          alt=""
          loading="eager"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/20 to-bg pointer-events-none" />

      <div className="relative max-w-4xl text-center">
        <div className="font-mono text-[11px] tracking-[0.4em] text-primary/90 uppercase mb-6">
          {siteConfig.company.tagline}
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-white">
          {siteConfig.hero.h1.map((line, i) => (
            <span key={i} className={`block ${line.accent ? "italic text-primary" : ""}`}>
              {line.text}
            </span>
          ))}
        </h1>
        <p className="mt-8 text-base md:text-lg text-white/75 max-w-xl mx-auto">
          {siteConfig.company.description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <MagneticButton
            as="a"
            href="/services"
            className="min-h-[48px] px-7 py-3.5 rounded-full bg-primary text-bg font-display font-medium text-sm hover:brightness-110 transition-all"
          >
            {siteConfig.cta.primary}
          </MagneticButton>
          <Link
            href="/about"
            className="min-h-[48px] px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-display font-medium text-sm backdrop-blur-md hover:bg-white/10 inline-flex items-center justify-center"
          >
            Our story
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-white/60 uppercase animate-pulse">
        Scroll ↓
      </div>
    </section>
  );
}

// ── Section 2 — IMAGE STORY ─────────────────────────────────────
function ImageStorySection() {
  const feature = siteConfig.features[0];
  const rest = siteConfig.features.slice(1, 4);
  return (
    <section className="relative min-h-screen bg-bg flex items-center px-6 py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
              Our craft
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl text-white font-light leading-[1.05] mb-6">
              {feature.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{feature.description}</p>
          </FadeUp>
          <StaggerChildren staggerDelay={0.08} initialDelay={0.3} className="space-y-3">
            {rest.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <div className="font-display font-semibold text-white text-sm">{f.title}</div>
                  <div className="text-white/60 text-sm mt-0.5">{f.description}</div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
        <div className="relative">
          <ImageRevealMask
            src={asset("section-about")}
            alt="Baker kneading dough by hand"
            aspectClass="aspect-[4/3]"
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-white/5 to-accent/20"
          />
        </div>
      </div>
    </section>
  );
}

// ── Section 3 — OVERSIZED TYPE ──────────────────────────────────
function OversizedTypeSection() {
  const themeWord = siteConfig.sectionThemeWord;
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12"
      style={{ background: siteConfig.brand.accent }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeUp>
          <div className="font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70" style={{ color: siteConfig.brand.bg }}>
            {siteConfig.whyUs.heading}
          </div>
        </FadeUp>
        <TextReveal
          as="h2"
          className="font-display font-light text-[80px] sm:text-[140px] md:text-[220px] lg:text-[300px] leading-[0.88] tracking-tight break-words"
          stagger={0.08}
        >
          {themeWord}
        </TextReveal>
        <FadeUp delay={0.4}>
          <p className="mt-10 max-w-xl text-base md:text-lg opacity-85" style={{ color: siteConfig.brand.bg }}>
            {siteConfig.whyUs.items[0].description}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Section 4 — FEATURED BAKES (add to cart) ────────────────────
function FeaturedBakesSection() {
  const { formatMajor } = { formatMajor: (c: number) => `₦${(c / 100).toLocaleString("en-NG")}` };
  return (
    <section id="shop" className="relative bg-bg flex items-center px-6 py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <FadeUp>
              <div className="font-mono text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-3">
                Fresh today
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl text-white font-light">Order our bakes</h2>
            </FadeUp>
          </div>
          <Link href="/services" className="font-mono text-xs text-primary/80 hover:text-primary transition-colors">
            View full menu →
          </Link>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.products.map((p) => (
            <div
              key={p.slug}
              className="group flex flex-col rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:border-primary/40 transition-all"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/25 via-white/5 to-accent/25">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-bg/70 text-primary backdrop-blur-md">
                  {p.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg text-white mb-1">{p.name}</h3>
                <p className="text-white/60 text-sm leading-snug mb-4 flex-1">{p.description}</p>
                <div className="flex items-center justify-between gap-3 mt-auto">
                  <span className="font-display text-primary text-lg">{formatMajor(p.priceCents)}</span>
                  <AddToCart
                    product={{
                      id: p.slug,
                      name: p.name,
                      priceCents: p.priceCents,
                      imageUrl: p.image,
                      href: "/services",
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-full bg-primary text-bg font-display font-medium text-sm hover:brightness-110 transition-all"
                  >
                    Add to cart
                  </AddToCart>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ── Section 5 — SERVICES GRID ───────────────────────────────────
function ServicesGridSection() {
  return (
    <section className="relative bg-bg flex items-center px-6 py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-3">
              What we bake
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl text-white font-light">
              {siteConfig.servicesHeading}
            </h2>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.services.slice(0, 6).map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group block rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:border-primary/40 transition-all h-full"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/30 via-white/5 to-accent/30">
                {svc.image && (
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-white mb-2">{svc.name}</h3>
                <p className="text-white/60 text-sm leading-snug line-clamp-2">{svc.description}</p>
                <div className="mt-3 font-mono text-xs text-primary/80 group-hover:text-primary transition-colors">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ── Section 6 — CTA ─────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative bg-bg py-32 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-display text-5xl md:text-7xl text-white font-light leading-[1.0] mb-6">
            {siteConfig.ctaBlock.heading}
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">{siteConfig.ctaBlock.description}</p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton
              as="a"
              href="/services"
              className="min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium hover:brightness-110"
            >
              {siteConfig.cta.primary}
            </MagneticButton>
            <Link
              href="/contact"
              className="min-h-[48px] px-8 py-4 rounded-full border border-white/20 text-white font-display font-medium hover:bg-white/5 inline-flex items-center justify-center"
            >
              Ask about custom cakes
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.45}>
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] md:text-[11px] text-white/50 font-mono uppercase tracking-wider">
            {siteConfig.trustBar.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

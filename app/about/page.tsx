import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { asset } from "@/lib/assets";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import {
  TextReveal,
  FadeUp,
  StaggerChildren,
  CardTiltLayer,
  NumberCounter,
  ImageRevealMask,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Amber Crumb Bakery — a small-batch Lagos bakery built on slow fermentation, cultured butter and a starter named Ada.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <SEOHead
        title={`About — ${siteConfig.company.name}`}
        description={siteConfig.aboutStory}
        path="/about"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "About", url: `${siteConfig.seo.siteUrl}/about` },
        ])}
      />
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-4">
              About {siteConfig.company.name}
            </div>
          </FadeUp>
          <TextReveal
            as="h1"
            className="font-display text-5xl md:text-7xl text-white font-light leading-[1.0] mb-8"
          >
            {siteConfig.aboutHeading}
          </TextReveal>
          <FadeUp delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{siteConfig.aboutStory}</p>
          </FadeUp>
        </div>

        {/* Founder feature */}
        <FadeUp>
          <section className="mb-20 grid md:grid-cols-2 gap-8 items-center">
            <ImageRevealMask
              src={asset("section-founder")}
              alt="Our head baker"
              aspectClass="aspect-[4/5]"
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-white/5 to-accent/20"
            />
            <div>
              <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-3">
                The hands behind the bread
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white font-light mb-4">
                Small batches, made with care.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Every loaf is shaped by hand and every cake decorated to order. We keep our batches
                small on purpose — it's the only way we know to hold our standard.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* Stats */}
        <FadeUp>
          <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10">
            {siteConfig.stats.map((stat, i) => {
              const num = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
              const suffix = stat.value.replace(/[0-9.]/g, "");
              return (
                <div key={i} className="text-center">
                  <div className="font-display text-4xl md:text-5xl text-white font-light">
                    {isNaN(num) ? (
                      stat.value
                    ) : (
                      <NumberCounter to={num} suffix={suffix} decimals={stat.value.includes(".") ? 1 : 0} />
                    )}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase mt-2">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </section>
        </FadeUp>

        {/* Values */}
        <section className="mb-20">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl text-white font-light mb-10">What we stand for</h2>
          </FadeUp>
          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.values.map((v, i) => (
              <CardTiltLayer
                key={i}
                intensity={0.2}
                lift={6}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/30 transition-colors"
              >
                <div className="font-mono text-xs text-primary mb-2">0{i + 1}</div>
                <h3 className="font-display text-xl text-white mb-2">{v.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{v.description}</p>
              </CardTiltLayer>
            ))}
          </StaggerChildren>
        </section>

        {/* Manifesto */}
        <FadeUp distance={60}>
          <section className="p-8 md:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6">Our promise</div>
            <p className="font-display text-2xl md:text-4xl text-white/90 italic leading-[1.3]">
              "{siteConfig.manifesto}"
            </p>
            <div className="mt-8 font-mono text-xs text-white/50 uppercase tracking-[0.2em]">
              — {siteConfig.company.name}
            </div>
          </section>
        </FadeUp>
      </div>
    </main>
  );
}

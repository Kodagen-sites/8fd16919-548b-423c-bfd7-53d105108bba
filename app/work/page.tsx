import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { TextReveal, FadeUp, StaggerChildren, CardTiltLayer, ImageRevealMask, MagneticButton } from "@/components/motion";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Our Bakes",
  description:
    "A gallery of Amber Crumb's celebration cakes, wedding tiers, sourdough bakes and corporate gift bundles — real orders baked fresh in Lagos.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <SiteChrome>
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <SEOHead
        title={`Our Bakes — ${siteConfig.company.name}`}
        description="A gallery of celebration cakes, wedding tiers and bakes we've made for Lagos."
        path="/work"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "Our Bakes", url: `${siteConfig.seo.siteUrl}/work` },
        ])}
      />
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-4">From our oven</div>
          </FadeUp>
          <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-white font-light leading-[1.0] mb-6">
            Bakes we're proud of
          </TextReveal>
          <FadeUp delay={0.3}>
            <p className="text-lg text-white/70 leading-relaxed">
              Every order tells a story — a wedding, a birthday, a Saturday morning bread run. Here are a few of our
              favourite bakes for the people of Lagos.
            </p>
          </FadeUp>
        </div>

        {/* Cases */}
        <StaggerChildren staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.work.map((c, i) => (
            <CardTiltLayer key={i} intensity={0.15} lift={8} className="group">
              <article
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:border-primary/40 transition-all"
                data-cursor-label="See bake"
              >
                <ImageRevealMask
                  src={siteConfig.gallery[i]?.src ?? ""}
                  alt={siteConfig.gallery[i]?.alt ?? c.title}
                  aspectClass="aspect-video"
                  className="bg-gradient-to-br from-primary/20 via-white/5 to-accent/20"
                  duration={1.2}
                  delay={i * 0.05}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">{c.service}</div>
                    <div className="font-mono text-[10px] text-white/40">{c.client}</div>
                  </div>
                  <h2 className="font-display text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-white/65 text-sm">{c.result}</p>
                </div>
              </article>
            </CardTiltLayer>
          ))}
        </StaggerChildren>

        <FadeUp>
          <div className="mt-24 text-center">
            <MagneticButton
              as="a"
              href="/services"
              className="min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium hover:brightness-110"
            >
              Order your own →
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </main>
    </SiteChrome>
  );
}

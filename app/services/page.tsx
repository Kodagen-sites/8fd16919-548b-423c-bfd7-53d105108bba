import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { TextReveal, FadeUp, StaggerChildren, CardTiltLayer, MagneticButton } from "@/components/motion";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Amber Crumb's signature bakes — sourdough loaves, hand-laminated pastries, celebration cakes, cookies and gift bundles. Order online in Lagos.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <SiteChrome>
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <SEOHead
        title={`Menu — ${siteConfig.company.name}`}
        description={siteConfig.servicesHeading}
        path="/services"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "Menu", url: `${siteConfig.seo.siteUrl}/services` },
        ])}
      />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-4">The menu</div>
          </FadeUp>
          <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-white font-light leading-[1.0] mb-6">
            {siteConfig.servicesHeading}
          </TextReveal>
          <FadeUp delay={0.3}>
            <p className="text-lg text-white/70 leading-relaxed">{siteConfig.company.description}</p>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((svc) => (
            <CardTiltLayer key={svc.slug} intensity={0.2} lift={10} className="h-full">
              <Link
                href={`/services/${svc.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-primary/40 transition-all"
                data-cursor-label="View bake"
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
                  {svc.price && (
                    <span className="absolute bottom-3 left-3 font-display text-sm px-3 py-1 rounded-full bg-bg/75 text-primary backdrop-blur-md">
                      {svc.price}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-2xl text-white mb-3">{svc.name}</h2>
                  <p className="text-white/65 text-sm leading-relaxed mb-4 flex-1">{svc.description}</p>
                  <div className="font-mono text-xs text-primary/80 group-hover:text-primary transition-colors">
                    View & order →
                  </div>
                </div>
              </Link>
            </CardTiltLayer>
          ))}
        </StaggerChildren>

        <FadeUp>
          <div className="mt-24 text-center">
            <MagneticButton
              as="a"
              href="/contact"
              className="min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium hover:brightness-110"
            >
              Order a custom cake
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </main>
    </SiteChrome>
  );
}

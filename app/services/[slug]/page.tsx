import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema, productSchema } from "@/lib/seo/structured-data";
import { AddToCart } from "@/components/cart/AddToCart";
import { TextReveal, FadeUp, StaggerChildren, StickyScrollSection, ImageRevealMask } from "@/components/motion";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Not found" };
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

const brand = { ...siteConfig.company, url: siteConfig.seo.siteUrl };

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = siteConfig.services.findIndex((s) => s.slug === slug);
  const nextService = siteConfig.services[(idx + 1) % siteConfig.services.length];
  const product = siteConfig.products.find((p) => p.slug === service.productSlug);
  const priceMajor = (service.priceCents ?? 0) / 100;

  return (
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <SEOHead
        title={`${service.name} — ${siteConfig.company.name}`}
        description={service.description}
        path={`/services/${slug}`}
        ogImage={service.image}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Menu", url: `${siteConfig.seo.siteUrl}/services` },
            { name: service.name, url: `${siteConfig.seo.siteUrl}/services/${slug}` },
          ]),
          productSchema({
            product: {
              name: service.name,
              description: service.description,
              slug,
              image: service.image,
              price: priceMajor || undefined,
              currency: siteConfig.currency,
              availability: "InStock",
            },
            brand,
            productUrl: `${siteConfig.seo.siteUrl}/services/${slug}`,
          }),
        ]}
      />
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white mb-8"
          >
            ← Full menu
          </Link>
        </FadeUp>

        {/* Hero + order card */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-20">
          <div>
            <FadeUp>
              <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-4">Signature bake</div>
            </FadeUp>
            <TextReveal as="h1" className="font-display text-4xl md:text-6xl text-white font-light leading-[1.0] mb-6">
              {service.name}
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-lg text-white/75 leading-relaxed mb-6">{service.description}</p>
            </FadeUp>
            {service.price && (
              <FadeUp delay={0.3}>
                <div className="font-display text-3xl text-primary mb-6">{service.price}</div>
              </FadeUp>
            )}
            <FadeUp delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-3">
                {product ? (
                  <AddToCart
                    product={{
                      id: product.slug,
                      name: product.name,
                      priceCents: product.priceCents,
                      imageUrl: product.image,
                      href: `/services/${slug}`,
                    }}
                    className="min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium text-center hover:brightness-110"
                  >
                    Add to cart →
                  </AddToCart>
                ) : (
                  <Link
                    href="/contact"
                    className="min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium text-center hover:brightness-110 inline-flex items-center justify-center"
                  >
                    Enquire to order →
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="min-h-[48px] px-8 py-4 rounded-full border border-white/20 text-white font-display font-medium text-center hover:bg-white/5 inline-flex items-center justify-center"
                >
                  Ask a question
                </Link>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <ImageRevealMask
              src={service.image ?? ""}
              alt={service.name}
              aspectClass="aspect-[4/5]"
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-white/5 to-accent/20"
            />
          </FadeUp>
        </div>

        {/* What's inside */}
        {service.highlights && (
          <section className="mb-20">
            <FadeUp>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-8">What makes it special</h2>
            </FadeUp>
            <StaggerChildren staggerDelay={0.06} className="grid sm:grid-cols-2 gap-3">
              {service.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-white/85">{h}</span>
                </div>
              ))}
            </StaggerChildren>
          </section>
        )}

        {/* How ordering works */}
        <section className="mb-20">
          <StickyScrollSection
            sticky={
              <div>
                <FadeUp>
                  <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-3">Ordering</div>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <h2 className="font-display text-4xl md:text-5xl text-white font-light leading-[1.05] mb-4">
                    How it works
                  </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-white/65 leading-relaxed">
                    From cart to warm-from-the-oven, here's what to expect.
                  </p>
                </FadeUp>
              </div>
            }
            scrolling={siteConfig.process.map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.05}>
                <div className="p-6 md:p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-colors">
                  <div className="font-mono text-primary text-sm mb-3">0{step.step}</div>
                  <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>
            ))}
          />
        </section>

        <FadeUp>
          <Link
            href={`/services/${nextService.slug}`}
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 rounded-full border border-white/20 text-white font-display font-medium hover:bg-white/5"
            data-cursor-label="Next bake"
          >
            Next: {nextService.name} →
          </Link>
        </FadeUp>
      </div>
    </main>
  );
}

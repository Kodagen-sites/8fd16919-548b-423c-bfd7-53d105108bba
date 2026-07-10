import VideoHomepage from "@/components/VideoHomepage";
import { SEOHead } from "@/components/seo/SEOHead";
import { siteConfig } from "@/content/site-config";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/structured-data";

const brand = {
  ...siteConfig.company,
  url: siteConfig.seo.siteUrl,
  logo: siteConfig.seo.defaultOgImage,
  socials: siteConfig.socials,
};

export default function HomePage() {
  const sd = siteConfig.seo.structuredData;
  return (
    <>
      <SEOHead
        path="/"
        jsonLd={[
          organizationSchema(brand, sd.address),
          websiteSchema({ brand }),
          localBusinessSchema({
            brand,
            address: sd.address,
            priceRange: sd.priceRange as "$" | "$$" | "$$$" | "$$$$",
            businessType: sd.businessType,
            rating: sd.rating ? { value: sd.rating.ratingValue, count: sd.rating.reviewCount } : undefined,
            geo: sd.geo ?? undefined,
            hours: sd.hours.map((h) => ({ dayOfWeek: h.days as any, opens: h.opens, closes: h.closes })),
          }),
        ]}
      />
      <VideoHomepage />
    </>
  );
}

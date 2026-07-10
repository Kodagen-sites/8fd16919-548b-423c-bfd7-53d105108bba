import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSiteContent } from "@/lib/site-content";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Amber Crumb Bakery for custom cakes, corporate gifting and catering across Lagos. Email, call or send us your order details.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const cms = await getSiteContent();
  return (
    <SiteChrome>
      <SEOHead
        title={`Contact — ${siteConfig.company.name}`}
        description="Get in touch for custom cakes, gifting and catering across Lagos."
        path="/contact"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "Contact", url: `${siteConfig.seo.siteUrl}/contact` },
        ])}
      />
      <ContactForm
        contactEmail={cms?.contact?.email}
        contactPhone={cms?.contact?.phone}
        contactLocation={cms?.contact?.address}
      />
    </SiteChrome>
  );
}

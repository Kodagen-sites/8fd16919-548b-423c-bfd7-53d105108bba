import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import SiteChrome from "@/components/SiteChrome";

const company = siteConfig.company.name;
const email = siteConfig.company.email;
const jurisdiction = siteConfig.company.location;
const effectiveDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of the ${company} website and orders.`,
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <SiteChrome>
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40 text-white">
      <SEOHead title={`Terms & Conditions — ${company}`} description={`Terms for using ${company}.`} path="/terms" noindex />
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight md:text-5xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-white/50">Effective {effectiveDate}</p>

      <div className="mt-12 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-medium [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-white [&_p]:text-white/75 [&_li]:text-white/75 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        <p>
          These Terms &amp; Conditions govern your use of the {company} website and the ordering of our products. By
          accessing or using this site, you agree to these terms. If you do not agree, please do not use the site.
        </p>

        <div>
          <h2>Use of the website</h2>
          <p>
            You may use this website for lawful purposes only. You agree not to use it in any way that damages, disables,
            or impairs the site, or interferes with anyone else&rsquo;s use of it.
          </p>
        </div>

        <div>
          <h2>Orders &amp; payment</h2>
          <p>
            Placing an order is an offer to purchase, which we accept when we confirm it. Prices are shown in Nigerian
            Naira and include applicable taxes unless stated otherwise. Payment is taken at checkout through our payment
            processor. We may decline or cancel an order and refund you where we cannot fulfil it.
          </p>
        </div>

        <div>
          <h2>Fulfilment, pickup &amp; delivery</h2>
          <p>
            Because our bakes are made fresh to order, delivery and pickup times are estimates. Custom cakes require
            advance notice as stated on the product. Please provide accurate delivery details; we are not responsible for
            delays caused by incorrect information.
          </p>
        </div>

        <div>
          <h2>Allergens</h2>
          <p>
            Our products are made in a kitchen that handles gluten, dairy, eggs, nuts, and other allergens. We cannot
            guarantee any product is free from traces of allergens. If you have an allergy, contact us before ordering.
          </p>
        </div>

        <div>
          <h2>Cancellations &amp; refunds</h2>
          <p>
            As our products are perishable and made to order, cancellations may not be possible once baking has begun.
            For issues with your order, contact us at{" "}
            <a className="underline text-primary" href={`mailto:${email}`}>{email}</a> and we&rsquo;ll make it right.
          </p>
        </div>

        <div>
          <h2>Intellectual property</h2>
          <p>
            All content on this website — text, graphics, logos, images, and design — is owned by {company} or its
            licensors and is protected by copyright and other laws. You may not reproduce, distribute, or create
            derivative works without our written permission.
          </p>
        </div>

        <div>
          <h2>No warranties</h2>
          <p>
            This website is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that the site
            will be uninterrupted, error-free, or free of harmful components, or that the content is accurate or complete.
          </p>
        </div>

        <div>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {company} is not liable for any indirect, incidental, or
            consequential damages arising from your use of this website.
          </p>
        </div>

        <div>
          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The effective date above shows when they were last revised.
            Continued use of the site after changes means you accept the updated terms.
          </p>
        </div>

        <div>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws applicable in {jurisdiction}.</p>
        </div>

        <div>
          <h2>Contact us</h2>
          <p>
            Questions about these terms? Email{" "}
            <a className="underline text-primary" href={`mailto:${email}`}>{email}</a>.
          </p>
        </div>
      </div>
    </main>
    </SiteChrome>
  );
}

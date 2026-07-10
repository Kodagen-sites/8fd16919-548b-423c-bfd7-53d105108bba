import { siteConfig } from "@/content/site-config";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { CartFlow } from "@/components/cart/CartFlow";
import { FilmGrain, Vignette, ScrollProgress } from "@/components/motion";
import { CookieConsent } from "@/components/CookieConsent";
import EditorBridge from "@/components/__kodagen/EditorBridge";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { getSiteConfig } from "@/lib/site-config";

export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const dbConfig = await getSiteConfig().catch(() => null);

  return (
    <CartProvider brandSlug={siteConfig.slug} currency={siteConfig.currency}>
      <ScrollProgress />
      <Header />
      <CartFlow />
      <main>{children}</main>
      <Footer />
      <Vignette />
      <FilmGrain opacity={0.04} />
      <CookieConsent />
      <EditorBridge />
      {dbConfig?.site_id ? <AnalyticsScripts siteId={dbConfig.site_id} /> : null}
    </CartProvider>
  );
}

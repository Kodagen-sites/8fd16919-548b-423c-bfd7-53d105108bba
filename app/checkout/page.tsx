import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Checkout from "@/components/cart/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <SiteChrome>
      <Checkout />
    </SiteChrome>
  );
}

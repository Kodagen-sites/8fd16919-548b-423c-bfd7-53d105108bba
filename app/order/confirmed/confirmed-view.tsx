"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Clock, Mail } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

interface Props {
  paid: boolean;
  reference: string | null;
  isPending: boolean;
}

export default function ConfirmedView({ paid, reference, isPending }: Props) {
  const { clear } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current && (paid || reference)) {
      cleared.current = true;
      clear();
    }
  // clear identity changes on every render — ref guards against the loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid, reference]);

  return (
    <main className="min-h-screen bg-parchment flex items-center justify-center py-16">
      <div className="container mx-auto px-6 lg:px-12 max-w-xl text-center">

        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-8"
          style={{ background: paid ? "rgba(166,130,60,0.1)" : "rgba(0,0,0,0.06)" }}>
          {isPending ? (
            <Mail size={24} className="text-flax" />
          ) : paid ? (
            <Check size={24} className="text-flax" />
          ) : (
            <Clock size={24} className="text-stone/40" />
          )}
        </div>

        {isPending ? (
          <>
            <h1 className="font-display font-light text-stone text-3xl lg:text-4xl mb-4">
              We received your order.
            </h1>
            <p className="text-stone/70 leading-relaxed mb-8">
              We'll be in touch shortly to arrange payment and confirm your order.
            </p>
          </>
        ) : paid ? (
          <>
            <h1 className="font-display font-light text-stone text-3xl lg:text-4xl mb-4">
              Payment confirmed.
            </h1>
            <p className="text-stone/70 leading-relaxed mb-8">
              Your order is being prepared. A confirmation has been sent to your email.
            </p>
            {reference && (
              <p className="text-xs uppercase tracking-widest text-stone/50 mb-8">
                Reference: <span className="text-stone tabular-nums">{reference}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="font-display font-light text-stone text-3xl lg:text-4xl mb-4">
              Order received.
            </h1>
            <p className="text-stone/70 leading-relaxed mb-8">
              Your order is placed. Payment confirmation is being processed — you'll receive an email once confirmed.
            </p>
            {reference && (
              <p className="text-xs uppercase tracking-widest text-stone/50 mb-8">
                Reference: <span className="text-stone tabular-nums">{reference}</span>
              </p>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-block bg-stone text-cream px-8 py-3.5 rounded-sm text-sm font-medium tracking-wide hover:bg-bark transition-colors"
          >
            Continue browsing
          </Link>
          <Link
            href="/"
            className="inline-block text-sm text-stone/60 hover:text-stone py-3.5 px-2 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

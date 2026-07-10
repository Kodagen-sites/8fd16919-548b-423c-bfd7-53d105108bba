"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { TextReveal, FadeUp, StaggerChildren, MagneticButton } from "@/components/motion";

export function ContactForm({
  contactEmail,
  contactPhone,
  contactLocation,
}: {
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
} = {}) {
  const email = contactEmail || siteConfig.company.email;
  const phone = contactPhone || siteConfig.company.phone;
  const location = contactLocation || siteConfig.company.location;

  const [formData, setFormData] = useState({ name: "", email: "", occasion: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const message = formData.occasion
      ? `Occasion: ${formData.occasion}\n\n${formData.message}`
      : formData.message;
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: siteConfig.slug,
          name: formData.name,
          email: formData.email,
          message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
    } catch {
      /* fall through to mailto */
    } finally {
      setSending(false);
    }
    // Graceful fallback when the backend is unreachable.
    const subject = encodeURIComponent(`Bakery enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOccasion: ${formData.occasion}\n\n${formData.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-4">Say hello</div>
          </FadeUp>
          <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-white font-light leading-[1.0] mb-4">
            Let's talk cake.
          </TextReveal>
          <FadeUp delay={0.3}>
            <p className="text-lg text-white/70 max-w-2xl">
              Planning a celebration or a custom order? Tell us what you have in mind — we usually reply within a day.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <FadeUp className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <StaggerChildren staggerDelay={0.05} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-primary"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-primary"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                      Occasion
                    </label>
                    <input
                      type="text"
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-primary"
                      placeholder="Birthday, wedding, corporate…"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                    Your order details
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-primary resize-y"
                    placeholder="Flavours, servings, delivery date, any inspiration…"
                  />
                </div>

                <MagneticButton
                  as="button"
                  className="w-full min-h-[48px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium hover:brightness-110 transition-all"
                  onClick={() => {
                    const form = document.querySelector("form") as HTMLFormElement;
                    form?.requestSubmit();
                  }}
                >
                  {submitted ? "Thanks — we'll be in touch" : sending ? "Sending…" : "Send enquiry →"}
                </MagneticButton>

                <p className="font-mono text-[10px] text-white/40 text-center">
                  Prefer to buy off-the-shelf bakes? Browse the{" "}
                  <a href="/services" className="text-primary hover:underline">
                    menu
                  </a>{" "}
                  and order online.
                </p>
              </StaggerChildren>
            </form>
          </FadeUp>

          {/* Contact details */}
          <div className="space-y-4">
            <FadeUp delay={0.1}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-4">Direct</div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="text-primary mt-1" />
                    <a href={`mailto:${email}`} className="text-white hover:text-primary text-sm">
                      {email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="text-primary mt-1" />
                    <a href={`tel:${phone}`} className="text-white hover:text-primary text-sm">
                      {phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary mt-1" />
                    <span className="text-white text-sm">{location}</span>
                  </li>
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-4">Bakery hours</div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Tue–Fri · 7:30am – 7:00pm</li>
                  <li>• Sat–Sun · 8:00am – 8:00pm</li>
                  <li>• Custom cakes: 48h notice</li>
                  <li>• Lagos-wide delivery</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </main>
  );
}

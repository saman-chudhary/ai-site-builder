'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: 'Perfect for solo operators and single-location businesses.',
    badge: null,
    color: 'border-white/5',
    btnClass: 'border border-white/10 text-paper hover:bg-white/5',
    features: [
      { text: '1 active website', included: true },
      { text: 'AI content generation', included: true },
      { text: '5 SEO pages', included: true },
      { text: 'Contact form', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Siteforge subdomain', included: true },
      { text: 'SSL certificate', included: true },
      { text: 'Online booking', included: false },
      { text: 'Custom domain', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: 'For businesses serious about their online presence.',
    badge: 'Most Popular',
    color: 'border-amber-500/30',
    btnClass: 'bg-amber-500 hover:bg-amber-400 text-ink',
    features: [
      { text: '3 active websites', included: true },
      { text: 'AI content generation', included: true },
      { text: '25 SEO pages', included: true },
      { text: 'Contact form', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Custom domain', included: true },
      { text: 'SSL certificate', included: true },
      { text: 'Online booking', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Unlimited regeneration', included: true },
    ],
  },
  {
    name: 'Agency',
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: 'Manage client websites at scale with white-label options.',
    badge: null,
    color: 'border-white/5',
    btnClass: 'border border-white/10 text-paper hover:bg-white/5',
    features: [
      { text: 'Unlimited websites', included: true },
      { text: 'AI content generation', included: true },
      { text: 'Unlimited SEO pages', included: true },
      { text: 'White-label option', included: true },
      { text: 'Client management portal', included: true },
      { text: 'Custom domain per site', included: true },
      { text: 'SSL certificate', included: true },
      { text: 'Online booking', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'API access', included: true },
    ],
  },
]

const FAQS = [
  {
    q: 'How does the free trial work?',
    a: 'You get 14 days to build and preview your website completely free — no credit card required. At the end of your trial, you choose a plan to publish your site.',
  },
  {
    q: 'Can I use my own domain name?',
    a: 'Yes! Growth and Agency plans support custom domains. Your site starts on a .siteforge.app subdomain and you can connect your domain in one click.',
  },
  {
    q: 'What happens if I don\'t like the AI-generated content?',
    a: 'You can regenerate any page or section unlimited times on Growth and Agency plans. All content is fully editable through our drag-and-drop editor.',
  },
  {
    q: 'Does the booking integration work with my calendar?',
    a: 'Yes — our booking system syncs with Google Calendar and sends automatic confirmation emails to both you and your customers.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel anytime from your dashboard. Your site stays live until the end of your billing period.',
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen mesh-bg text-paper">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-ink" fill="currentColor" />
          </div>
          <span className="font-display font-700 text-lg">Siteforge</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-paper/40 hover:text-paper text-sm font-body transition-colors">Sign in</Link>
          <Link href="/onboarding" className="bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 text-sm px-4 py-2 rounded-lg transition-colors">
            Build Free
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-800 tracking-tight mb-4"
          >
            Simple, honest<br />
            <span className="text-gradient-amber">pricing.</span>
          </motion.h1>
          <p className="text-paper/40 text-lg mb-8 font-body">14-day free trial · No credit card required · Cancel anytime</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-ink-muted border border-white/5 rounded-xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all ${!yearly ? 'bg-amber-500 text-ink font-600' : 'text-paper/40 hover:text-paper'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all flex items-center gap-2 ${yearly ? 'bg-amber-500 text-ink font-600' : 'text-paper/40 hover:text-paper'}`}
            >
              Yearly
              <span className="bg-electric/20 text-electric text-xs px-1.5 py-0.5 rounded-md font-mono">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-7 ${plan.color} ${
                plan.badge ? 'bg-amber-500/5 shadow-[0_0_60px_rgba(245,158,11,0.08)]' : 'bg-ink-muted'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 text-ink text-xs font-display font-700 px-3 py-1 rounded-full">{plan.badge}</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-700 text-xl mb-1">{plan.name}</h3>
                <p className="text-paper/40 text-sm font-body leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-800 text-5xl">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-paper/40 font-body">/month</span>
                </div>
                {yearly && (
                  <div className="text-electric text-xs font-mono mt-1">
                    Billed ${plan.yearlyPrice * 12}/year · Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                  </div>
                )}
              </div>

              <Link href="/onboarding"
                className={`block text-center py-3 rounded-xl font-display font-600 text-sm transition-all mb-6 ${plan.btnClass} ${plan.badge ? 'hover:scale-105' : ''}`}
              >
                Start Free Trial
              </Link>

              <div className="space-y-2.5">
                {plan.features.map((f, j) => (
                  <div key={j} className={`flex items-center gap-2.5 text-sm font-body ${f.included ? 'text-paper/70' : 'text-paper/20'}`}>
                    <Check size={14} className={f.included ? (plan.badge ? 'text-amber-400' : 'text-electric') : 'opacity-20'} />
                    {f.text}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-800 text-center mb-10">Common questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-ink-muted border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display font-600 text-paper text-base">{faq.q}</span>
                  <HelpCircle size={16} className={`shrink-0 ml-4 transition-colors ${openFaq === i ? 'text-amber-400' : 'text-paper/30'}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-5 pb-5"
                  >
                    <p className="text-paper/50 text-sm font-body leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-paper/40 font-body mb-4">Still have questions?</p>
          <a href="mailto:hello@siteforge.app" className="text-amber-400 hover:text-amber-300 font-body transition-colors flex items-center gap-2 justify-center">
            hello@siteforge.app <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

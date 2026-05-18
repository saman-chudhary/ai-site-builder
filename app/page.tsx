'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Zap, Globe, Search, Calendar, Star, ArrowRight,
  ChevronDown, Sparkles, Check, Code, Layers, Rocket,
  BarChart3, Shield, Clock, Users, TrendingUp, Play
} from 'lucide-react'

const BUSINESS_TYPES = [
  { icon: '💇', label: 'Salon & Spa', color: '#FF6B47' },
  { icon: '🔧', label: 'HVAC Service', color: '#38BDF8' },
  { icon: '🍕', label: 'Restaurant', color: '#F59E0B' },
  { icon: '🦷', label: 'Dental Clinic', color: '#A78BFA' },
  { icon: '🏋️', label: 'Gym & Fitness', color: '#00FF88' },
  { icon: '🐾', label: 'Pet Grooming', color: '#FB923C' },
  { icon: '📸', label: 'Photography', color: '#E879F9' },
  { icon: '🏠', label: 'Real Estate', color: '#34D399' },
  { icon: '👨‍💻', label: 'Tech Freelancer', color: '#60A5FA' },
  { icon: '🎨', label: 'Creative Studio', color: '#F472B6' },
  { icon: '⚖️', label: 'Law Firm', color: '#D1FAE5' },
  { icon: '🚗', label: 'Auto Repair', color: '#FDE68A' },
]

const MARQUEE_ITEMS = [
  'SALON', 'HVAC', 'RESTAURANT', 'DENTAL', 'PLUMBING', 'GYM', 'BAKERY', 'LEGAL',
  'PHOTOGRAPHY', 'LANDSCAPING', 'REAL ESTATE', 'CONSULTING', 'TUTORING', 'YOGA STUDIO',
]

const STEPS = [
  {
    num: '01',
    icon: <Layers size={20} />,
    title: 'Enter Business Type',
    desc: 'Type your business category and location. Our AI understands context — "Italian restaurant in downtown Chicago" works perfectly.',
  },
  {
    num: '02',
    icon: <Sparkles size={20} />,
    title: 'AI Builds Everything',
    desc: 'In under 60 seconds: homepage, about, services, gallery, contact — all with copy tailored to your industry.',
  },
  {
    num: '03',
    icon: <Search size={20} />,
    title: 'SEO Pages Auto-Created',
    desc: 'Location pages, service pages, FAQ — all structured for Google from day one. Zero extra effort required.',
  },
  {
    num: '04',
    icon: <Rocket size={20} />,
    title: 'Publish & Get Found',
    desc: 'One click deploys your site to a fast CDN. Connect your domain, add booking — you\'re live and open for business.',
  },
]

const FEATURES = [
  { icon: <Code size={18} />, label: 'No Code Required', color: 'var(--electric)' },
  { icon: <Search size={18} />, label: 'SEO Optimized', color: 'var(--amber)' },
  { icon: <Calendar size={18} />, label: 'Booking Ready', color: 'var(--coral)' },
  { icon: <Globe size={18} />, label: 'Custom Domain', color: 'var(--sky)' },
  { icon: <BarChart3 size={18} />, label: 'Analytics Built-in', color: 'var(--lavender)' },
  { icon: <Shield size={18} />, label: 'SSL & Security', color: 'var(--electric)' },
]

const TESTIMONIALS = [
  {
    name: 'Maria Santos',
    role: 'Owner, Glow Beauty Salon',
    avatar: 'MS',
    text: 'Got a full website in 45 seconds. My old agency charged $3,000 and took 3 weeks. This is insane.',
    stars: 5,
  },
  {
    name: 'Derek Chen',
    role: 'HVAC Technician, CoolFlow HVAC',
    avatar: 'DC',
    text: 'The SEO pages it generated actually rank. I got 3 calls from Google in the first week.',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Chef & Owner, Spice Route Kitchen',
    avatar: 'PN',
    text: 'It knew exactly what a restaurant website needs — menu, hours, online booking, the whole thing.',
    stars: 5,
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: 19,
    period: '/mo',
    badge: null,
    features: ['1 website', 'AI content generation', '5 SEO pages', 'Contact form', 'Mobile responsive', 'Siteforge subdomain'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Growth',
    price: 49,
    period: '/mo',
    badge: 'Most Popular',
    features: ['3 websites', 'Unlimited regeneration', '25 SEO pages', 'Online booking', 'Custom domain', 'Analytics dashboard', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Agency',
    price: 149,
    period: '/mo',
    badge: null,
    features: ['Unlimited websites', 'White-label option', 'Unlimited SEO pages', 'Client management', 'API access', 'Custom templates', 'Dedicated support'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-ink" fill="currentColor" />
          </div>
          <span className="font-display font-700 text-lg tracking-tight text-paper">Siteforge</span>
        </div>

        <div className="nav-links hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Pricing', 'Templates'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm text-paper/60 hover:text-paper transition-colors font-body">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-paper/60 hover:text-paper transition-colors">Sign in</Link>
          <Link href="/onboarding"
            className="bg-amber-500 hover:bg-amber-400 text-ink text-sm font-600 px-4 py-2 rounded-lg transition-colors font-display">
            Build Free
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  const [currentBusiness, setCurrentBusiness] = useState(0)
  const businesses = ['Salon', 'Restaurant', 'HVAC Company', 'Dental Clinic', 'Law Firm', 'Gym']

  useEffect(() => {
    const t = setInterval(() => setCurrentBusiness(p => (p + 1) % businesses.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="mesh-bg min-h-screen flex flex-col items-center justify-center pt-16 px-6 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="orb absolute w-96 h-96 bg-amber-500/20 top-20 -left-32 animate-float" />
      <div className="orb absolute w-64 h-64 bg-electric/10 bottom-20 -right-20 animate-float" style={{animationDelay: '2s'}} />
      <div className="orb absolute w-80 h-80 bg-lavender/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 pill bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
          AI-powered • Live in 60 seconds
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-none tracking-tight mb-6"
        >
          Your{' '}
          <span className="relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentBusiness}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-gradient-amber"
              >
                {businesses[currentBusiness]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />website,{' '}
          <span className="italic text-paper/40">built</span> in{' '}
          <span className="text-gradient-amber">60s.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-paper/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          Enter your business type. Get a complete, SEO-ready website with booking integration,
          service pages, and content — crafted by AI, owned by you.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/onboarding"
            className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            <Sparkles size={20} />
            Build My Website Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-2 text-paper/60 hover:text-paper transition-colors font-body">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
              <Play size={14} className="ml-0.5" />
            </div>
            Watch demo (48s)
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-paper/40 font-body"
        >
          <span className="flex items-center gap-1.5">
            <Users size={14} />
            12,400+ websites built
          </span>
          <span className="w-1 h-1 bg-paper/20 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            Avg. 42 second build time
          </span>
          <span className="w-1 h-1 bg-paper/20 rounded-full" />
          <span className="flex items-center gap-1.5">
            <TrendingUp size={14} />
            4.9★ from 800+ reviews
          </span>
        </motion.div>

        {/* Hero preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="preview-glow rounded-2xl overflow-hidden border border-white/10 bg-ink-soft">
            {/* Browser chrome */}
            <div className="bg-ink-muted px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 bg-ink/60 rounded-md px-3 py-1 text-xs text-paper/30 font-mono">
                glowbeauty.siteforge.app
              </div>
              <div className="tag">Live</div>
            </div>
            {/* Site preview */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-pink-950 via-rose-900 to-pink-800 overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl md:text-5xl font-display font-800 text-white mb-2">Glow Beauty</div>
                  <div className="text-pink-200 text-sm md:text-base font-body">Premier Salon & Spa in Austin, TX</div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white text-pink-900 px-4 py-2 rounded-lg text-sm font-600 font-display">Book Appointment</div>
                  <div className="border border-white/40 text-white px-4 py-2 rounded-lg text-sm font-body">Our Services</div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur rounded-lg p-2 text-xs text-white/70 font-mono">
                ✨ AI Generated
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {['Hair', 'Nails', 'Facial', 'Massage'].map(s => (
                  <span key={s} className="bg-white/10 backdrop-blur text-white/80 text-xs px-2 py-1 rounded font-body">{s}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Generated label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 pill bg-electric/10 border border-electric/30 text-electric text-xs">
            <Check size={10} />
            Generated in 38 seconds
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/30"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  )
}

function MarqueeSection() {
  return (
    <div className="border-y border-white/5 bg-ink-soft py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="mx-6 text-paper/20 font-display font-700 text-sm tracking-[0.3em] uppercase">
            {item} <span className="text-amber-500 mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function BusinessTypesSection() {
  const [selected, setSelected] = useState<number | null>(null)
  const [inputVal, setInputVal] = useState('')

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 pill bg-sky/10 border border-sky/20 text-sky mb-4"
          >
            <Globe size={12} />
            Works for any business
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-800 leading-tight tracking-tight"
          >
            Pick your business type,<br />
            <span className="text-gradient-amber">we handle the rest.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {BUSINESS_TYPES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`business-card rounded-xl p-4 ${selected === i ? 'selected' : ''}`}
              onClick={() => { setSelected(i); setInputVal(b.label) }}
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-display font-600 text-sm text-paper">{b.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Or type custom */}
        <div className="max-w-xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Or type your business — e.g. 'Italian restaurant, Miami'"
              className="flex-1 bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3 text-paper placeholder-paper/30 outline-none transition-colors font-body text-sm"
            />
            <Link href={`/onboarding?type=${encodeURIComponent(inputVal || 'business')}`}
              className="bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              Build It <Zap size={16} fill="currentColor" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-ink-soft/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-800 leading-tight tracking-tight mb-4"
          >
            From idea to live site<br />
            <span className="text-gradient-cool">in four simple steps.</span>
          </motion.h2>
          <p className="text-paper/40 text-lg max-w-xl mx-auto font-body">
            No designers. No developers. No waiting. Just you and AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/30 to-transparent z-0" />
              )}
              <div className="card-hover bg-ink-muted border border-white/5 rounded-2xl p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="step-number text-amber-500">{step.num}</div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-display font-700 text-lg mb-2 text-paper">{step.title}</h3>
                <p className="text-paper/50 text-sm leading-relaxed font-body">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 pill bg-electric/10 border border-electric/20 text-electric mb-6"
            >
              <Sparkles size={12} />
              Everything included
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-800 leading-tight tracking-tight mb-6"
            >
              Not just a website.<br />
              <span className="text-gradient-amber">A growth engine.</span>
            </motion.h2>
            <p className="text-paper/50 leading-relaxed mb-10 font-body">
              Every site ships with booking, SEO infrastructure, analytics, and fast global hosting.
              The kind of setup that used to require a team and months of work.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-ink-soft rounded-xl p-3 border border-white/5"
                >
                  <div style={{ color: f.color }}>{f.icon}</div>
                  <span className="text-sm text-paper/80 font-body">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SEO visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-ink-muted border border-white/5 rounded-2xl p-6 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Search size={16} className="text-amber-400" />
              <span className="text-paper/60 text-xs">SEO Pages Auto-Generated</span>
            </div>
            {[
              { url: '/hvac-repair-austin-tx', status: '✅', traffic: '+340/mo' },
              { url: '/ac-installation-round-rock', status: '✅', traffic: '+210/mo' },
              { url: '/emergency-hvac-service', status: '✅', traffic: '+180/mo' },
              { url: '/heating-repair-near-me', status: '✅', traffic: '+290/mo' },
              { url: '/commercial-hvac-austin', status: '⏳', traffic: 'Indexing...' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="text-sky text-xs">{item.url}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-electric">{item.traffic}</span>
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-paper/30 text-xs">Estimated monthly organic traffic</span>
              <span className="text-electric font-600">+1,220/mo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-ink-soft/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-800 leading-tight tracking-tight"
          >
            Loved by small business owners<br />
            <span className="text-gradient-amber">who stopped waiting.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover bg-ink-muted border border-white/5 rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-paper/70 text-sm leading-relaxed mb-6 font-body">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-display font-700">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-600 text-sm text-paper">{t.name}</div>
                  <div className="text-paper/40 text-xs font-body">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-800 leading-tight tracking-tight mb-4"
          >
            Simple, honest pricing.
          </motion.h2>
          <p className="text-paper/40 font-body">14-day free trial. No credit card required.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border ${
                plan.highlight
                  ? 'bg-amber-500/5 border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.1)]'
                  : 'bg-ink-muted border-white/5'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 pill bg-amber-500 text-ink text-xs font-700">
                  {plan.badge}
                </div>
              )}
              <div className="mb-4">
                <div className="font-display font-700 text-lg text-paper mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-800 text-4xl text-paper">${plan.price}</span>
                  <span className="text-paper/40 font-body">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-paper/70 font-body">
                    <Check size={14} className={plan.highlight ? 'text-amber-400 mt-0.5 shrink-0' : 'text-electric mt-0.5 shrink-0'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding"
                className={`block text-center py-3 rounded-xl font-display font-600 text-sm transition-all ${
                  plan.highlight
                    ? 'bg-amber-500 hover:bg-amber-400 text-ink hover:scale-105'
                    : 'border border-white/10 text-paper hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/20 p-12 md:p-16 text-center"
        >
          <div className="orb absolute w-64 h-64 bg-amber-500/20 -top-20 -left-20" />
          <div className="orb absolute w-48 h-48 bg-electric/10 -bottom-10 -right-10" />
          <div className="relative z-10">
            <div className="font-display text-4xl md:text-6xl font-800 leading-tight mb-6">
              Your competitors already<br />
              <span className="text-gradient-amber">have a website.</span>
            </div>
            <p className="text-paper/50 text-lg mb-8 max-w-xl mx-auto font-body">
              Join 12,000+ small business owners who built their online presence in the time it takes to make coffee.
            </p>
            <Link href="/onboarding"
              className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
            >
              Start Building Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-paper/25 text-xs mt-4 font-body">No credit card · 14-day trial · Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-ink" fill="currentColor" />
            </div>
            <span className="font-display font-700 text-paper">Siteforge</span>
          </div>
          <div className="flex flex-wrap gap-6 text-paper/40 text-sm font-body">
            {['Privacy Policy', 'Terms of Service', 'Documentation', 'Blog', 'Status'].map(l => (
              <a key={l} href="#" className="hover:text-paper/70 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-paper/25 text-xs font-body">© 2025 Siteforge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main className="noise">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <BusinessTypesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}

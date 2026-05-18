'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Zap, ArrowRight, ArrowLeft, Check, Sparkles, MapPin,
  Globe, Phone, Clock, Image, Palette, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

const BUSINESS_ICONS: Record<string, string> = {
  salon: '💇', spa: '🧖', restaurant: '🍕', hvac: '🔧', dental: '🦷',
  gym: '🏋️', fitness: '💪', pet: '🐾', photography: '📸', real: '🏠',
  law: '⚖️', auto: '🚗', tech: '💻', creative: '🎨', bakery: '🥐',
  plumbing: '🔩', electrical: '⚡', landscaping: '🌿', default: '🏢',
}

function getIcon(type: string): string {
  const lower = type.toLowerCase()
  for (const [key, icon] of Object.entries(BUSINESS_ICONS)) {
    if (lower.includes(key)) return icon
  }
  return BUSINESS_ICONS.default
}

const COLORS = [
  { name: 'Amber', hex: '#F59E0B', class: 'bg-amber-500' },
  { name: 'Slate', hex: '#64748B', class: 'bg-slate-500' },
  { name: 'Rose', hex: '#F43F5E', class: 'bg-rose-500' },
  { name: 'Sky', hex: '#0EA5E9', class: 'bg-sky-500' },
  { name: 'Emerald', hex: '#10B981', class: 'bg-emerald-500' },
  { name: 'Violet', hex: '#8B5CF6', class: 'bg-violet-500' },
  { name: 'Orange', hex: '#F97316', class: 'bg-orange-500' },
  { name: 'Pink', hex: '#EC4899', class: 'bg-pink-500' },
]

const STYLES = [
  { name: 'Modern & Clean', desc: 'Minimal, professional', emoji: '✦' },
  { name: 'Bold & Vibrant', desc: 'High contrast, energetic', emoji: '◆' },
  { name: 'Warm & Friendly', desc: 'Inviting, approachable', emoji: '◉' },
  { name: 'Luxury & Premium', desc: 'Elegant, sophisticated', emoji: '◇' },
]

const PAGES = ['Home', 'About Us', 'Services', 'Gallery', 'Contact', 'Book Now', 'FAQ', 'Blog', 'Testimonials', 'Pricing']

interface FormData {
  businessType: string
  businessName: string
  location: string
  phone: string
  hours: string
  color: string
  style: string
  pages: string[]
  features: string[]
}

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') || ''

  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    businessType: initialType,
    businessName: '',
    location: '',
    phone: '',
    hours: 'Mon-Fri 9am-6pm',
    color: '#F59E0B',
    style: 'Modern & Clean',
    pages: ['Home', 'Services', 'About Us', 'Contact', 'Book Now'],
    features: ['Online Booking', 'Contact Form'],
  })

  const GENERATION_STEPS = [
    { label: 'Analyzing your business type...', icon: '🔍' },
    { label: 'Writing homepage copy...', icon: '✍️' },
    { label: 'Generating service pages...', icon: '📄' },
    { label: 'Building SEO structure...', icon: '🔎' },
    { label: 'Creating booking integration...', icon: '📅' },
    { label: 'Optimizing for mobile...', icon: '📱' },
    { label: 'Deploying to CDN...', icon: '🚀' },
    { label: 'Your site is ready!', icon: '✅' },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    for (let i = 0; i < GENERATION_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
      setGenerationStep(i)
    }
    await new Promise(r => setTimeout(r, 500))
    router.push(`/dashboard?generated=true&type=${encodeURIComponent(form.businessType)}&name=${encodeURIComponent(form.businessName)}`)
  }

  const progress = ((step + 1) / 4) * 100

  const steps = [
    {
      title: 'Tell us about your business',
      subtitle: 'This powers your AI-generated content',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-paper/50 text-sm mb-2 font-body">Business Type *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">{getIcon(form.businessType)}</span>
              <input
                type="text"
                value={form.businessType}
                onChange={e => setForm(p => ({ ...p, businessType: e.target.value }))}
                placeholder="e.g., Hair salon, HVAC company, Italian restaurant..."
                className="w-full bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl pl-12 pr-4 py-3.5 text-paper placeholder-paper/20 outline-none transition-colors font-body"
              />
            </div>
          </div>
          <div>
            <label className="block text-paper/50 text-sm mb-2 font-body">Business Name</label>
            <input
              type="text"
              value={form.businessName}
              onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))}
              placeholder="e.g., Glow Beauty Studio"
              className="w-full bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3.5 text-paper placeholder-paper/20 outline-none transition-colors font-body"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-paper/50 text-sm mb-2 font-body flex items-center gap-1.5">
                <MapPin size={12} /> Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                placeholder="City, State"
                className="w-full bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3.5 text-paper placeholder-paper/20 outline-none transition-colors font-body"
              />
            </div>
            <div>
              <label className="block text-paper/50 text-sm mb-2 font-body flex items-center gap-1.5">
                <Phone size={12} /> Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="(555) 000-0000"
                className="w-full bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3.5 text-paper placeholder-paper/20 outline-none transition-colors font-body"
              />
            </div>
          </div>
          <div>
            <label className="block text-paper/50 text-sm mb-2 font-body flex items-center gap-1.5">
              <Clock size={12} /> Business Hours
            </label>
            <input
              type="text"
              value={form.hours}
              onChange={e => setForm(p => ({ ...p, hours: e.target.value }))}
              placeholder="Mon-Fri 9am-6pm, Sat 10am-4pm"
              className="w-full bg-ink-soft border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3.5 text-paper placeholder-paper/20 outline-none transition-colors font-body"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Choose your style',
      subtitle: 'Pick colors and design aesthetic',
      content: (
        <div className="space-y-8">
          <div>
            <label className="block text-paper/50 text-sm mb-3 font-body flex items-center gap-1.5">
              <Palette size={12} /> Brand Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map(c => (
                <button
                  key={c.name}
                  onClick={() => setForm(p => ({ ...p, color: c.hex }))}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    form.color === c.hex ? 'border-white/40 bg-white/5' : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: c.hex }} />
                  {form.color === c.hex && <Check size={10} className="text-paper/60" />}
                  <span className="text-paper/50 text-xs font-body">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-paper/50 text-sm mb-3 font-body">Design Style</label>
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map(s => (
                <button
                  key={s.name}
                  onClick={() => setForm(p => ({ ...p, style: s.name }))}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                    form.style === s.name ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/5 hover:border-white/15 bg-ink-soft'
                  }`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <div>
                    <div className="font-display font-600 text-sm text-paper">{s.name}</div>
                    <div className="text-paper/40 text-xs font-body">{s.desc}</div>
                  </div>
                  {form.style === s.name && (
                    <Check size={14} className="text-amber-400 ml-auto shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Select your pages',
      subtitle: 'Choose which pages to generate',
      content: (
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {PAGES.map(page => {
                const selected = form.pages.includes(page)
                return (
                  <button
                    key={page}
                    onClick={() => setForm(p => ({
                      ...p,
                      pages: selected ? p.pages.filter(pg => pg !== page) : [...p.pages, page]
                    }))}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm transition-all font-body ${
                      selected
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                        : 'border-white/5 bg-ink-soft text-paper/50 hover:border-white/15 hover:text-paper/70'
                    }`}
                  >
                    {selected && <Check size={12} />}
                    {page}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="bg-ink-soft rounded-xl p-4 border border-white/5">
            <div className="text-paper/40 text-xs font-mono mb-2">ALSO AUTO-GENERATING</div>
            {['SEO landing page for main service', 'Location-specific city pages', 'Google Business schema markup', 'Sitemap.xml & robots.txt'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 text-sm text-paper/60 font-body">
                <span className="text-electric text-xs">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Review & Generate',
      subtitle: 'Everything looks good? Let\'s build it.',
      content: (
        <div className="space-y-4">
          {[
            { label: 'Business', value: `${getIcon(form.businessType)} ${form.businessName || form.businessType}` },
            { label: 'Location', value: form.location || 'Not specified' },
            { label: 'Style', value: `${STYLES.find(s => s.name === form.style)?.emoji} ${form.style}` },
            { label: 'Pages', value: `${form.pages.length} pages` },
            { label: 'Color', value: form.color },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-paper/40 text-sm font-body">{item.label}</span>
              <span className="text-paper font-display font-600 text-sm flex items-center gap-2">
                {item.label === 'Color' && (
                  <span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: item.value }} />
                )}
                {item.value}
              </span>
            </div>
          ))}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-paper/60 text-sm font-body leading-relaxed">
                AI will generate a complete website with custom copy, SEO pages, and mobile-optimized design in approximately <span className="text-amber-400 font-600">45 seconds</span>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  if (isGenerating) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-8"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Zap size={32} className="text-amber-400" />
            </motion.div>
          </motion.div>
          <h2 className="font-display text-3xl font-800 mb-2">Building your website</h2>
          <p className="text-paper/40 font-body mb-12">Powered by AI · Takes about 45 seconds</p>

          <div className="space-y-3 mb-10 text-left">
            {GENERATION_STEPS.map((gs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= generationStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 py-2 ${i <= generationStep ? 'text-paper' : 'text-paper/30'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  i < generationStep ? 'bg-electric/20 text-electric' : i === generationStep ? 'bg-amber-500/20 text-amber-400 animate-pulse' : 'bg-white/5'
                }`}>
                  {i < generationStep ? <Check size={12} /> : <span>{gs.icon}</span>}
                </div>
                <span className="text-sm font-body">{gs.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-electric rounded-full"
              animate={{ width: `${((generationStep + 1) / GENERATION_STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mesh-bg flex items-start justify-center p-6 pt-20">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-ink" fill="currentColor" />
            </div>
            <span className="font-display font-700 text-lg text-paper">Siteforge</span>
          </Link>
          <div className="flex items-center gap-2 justify-center mb-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all ${
                i <= step ? 'bg-amber-500' : 'bg-white/10'
              } ${i === step ? 'w-8' : 'w-4'}`} />
            ))}
          </div>
          <span className="text-paper/30 text-xs font-mono">STEP {step + 1} OF 4</span>
        </div>

        {/* Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-ink-muted border border-white/5 rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-800 mb-1">{steps[step].title}</h2>
          <p className="text-paper/40 text-sm font-body mb-8">{steps[step].subtitle}</p>
          {steps[step].content}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep(p => Math.max(0, p - 1))}
            className={`flex items-center gap-2 text-paper/40 hover:text-paper transition-colors font-body text-sm ${step === 0 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(p => p + 1)}
              disabled={step === 0 && !form.businessType}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-ink font-display font-700 px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 px-8 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              <Sparkles size={18} />
              Generate My Website
              <Zap size={16} fill="currentColor" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen mesh-bg flex items-center justify-center"><div className="text-paper/40">Loading...</div></div>}>
      <OnboardingContent />
    </Suspense>
  )
}

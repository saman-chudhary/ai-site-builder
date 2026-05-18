'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import {
  Zap, Globe, BarChart3, Search, Calendar, Settings, Plus,
  ExternalLink, Edit3, Trash2, TrendingUp, Users, Eye,
  ArrowUpRight, RefreshCw, Shield, Sparkles, ChevronRight,
  Bell, LogOut, Copy, Check
} from 'lucide-react'
import Link from 'next/link'

const MOCK_SITES = [
  {
    id: 1,
    name: 'Glow Beauty Studio',
    type: 'Hair Salon',
    url: 'glowbeauty.siteforge.app',
    customDomain: 'glowbeautystudio.com',
    status: 'live',
    visitors: 1240,
    bookings: 34,
    seoPages: 12,
    rank: '#4 on Google',
    lastUpdated: '2 hours ago',
    color: '#F43F5E',
    emoji: '💇',
    thumbnail: 'from-rose-900 to-pink-800',
  },
  {
    id: 2,
    name: 'CoolFlow HVAC',
    type: 'HVAC Service',
    url: 'coolflow.siteforge.app',
    customDomain: null,
    status: 'live',
    visitors: 890,
    bookings: 18,
    seoPages: 8,
    rank: '#7 on Google',
    lastUpdated: '1 day ago',
    color: '#0EA5E9',
    emoji: '🔧',
    thumbnail: 'from-sky-900 to-blue-800',
  },
]

const SEO_PAGES = [
  { title: 'Hair salon Austin TX', rank: 4, traffic: 340, status: 'ranking' },
  { title: 'Best salon near me Austin', rank: 7, traffic: 210, status: 'ranking' },
  { title: 'Balayage highlights Austin', rank: 11, traffic: 95, status: 'improving' },
  { title: 'Keratin treatment Austin TX', rank: 14, traffic: 76, status: 'improving' },
  { title: 'Hair coloring salon Austin', rank: 3, traffic: 410, status: 'ranking' },
]

const ACTIVITY = [
  { action: 'New booking received', detail: 'Hair coloring · $120', time: '5m ago', type: 'booking' },
  { action: 'Page ranked #3 on Google', detail: '"hair coloring salon Austin"', time: '2h ago', type: 'seo' },
  { action: 'Contact form submission', detail: 'Jennifer K. — appointment inquiry', time: '4h ago', type: 'contact' },
  { action: 'SEO page updated', detail: 'Balayage highlights Austin', time: '1d ago', type: 'update' },
]

function StatCard({ label, value, change, icon, color }: any) {
  return (
    <div className="bg-ink-muted border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-paper/40 text-sm font-body">{label}</span>
        <div style={{ color }} className="opacity-70">{icon}</div>
      </div>
      <div className="font-display font-800 text-3xl text-paper mb-1">{value}</div>
      {change && (
        <div className="flex items-center gap-1 text-electric text-xs font-body">
          <TrendingUp size={10} />
          {change} this month
        </div>
      )}
    </div>
  )
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const justGenerated = searchParams.get('generated') === 'true'
  const generatedType = searchParams.get('type') || ''
  const generatedName = searchParams.get('name') || generatedType

  const [activeSite, setActiveSite] = useState(MOCK_SITES[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSite.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-ink text-paper flex">
      {/* Sidebar */}
      <div className="w-60 border-r border-white/5 flex flex-col shrink-0 hidden lg:flex">
        <div className="p-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-ink" fill="currentColor" />
            </div>
            <span className="font-display font-700 text-lg text-paper">Siteforge</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: <Globe size={16} />, label: 'My Sites', active: true },
            { icon: <BarChart3 size={16} />, label: 'Analytics' },
            { icon: <Search size={16} />, label: 'SEO Pages' },
            { icon: <Calendar size={16} />, label: 'Bookings' },
            { icon: <Settings size={16} />, label: 'Settings' },
          ].map(item => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-colors ${
                item.active ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-paper/50 hover:text-paper hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 mb-4">
            <div className="text-amber-400 text-xs font-display font-700 mb-1">Growth Plan</div>
            <div className="text-paper/40 text-xs font-body">2 of 3 sites used</div>
            <div className="mt-2 h-1 bg-white/5 rounded-full">
              <div className="h-full w-2/3 bg-amber-500 rounded-full" />
            </div>
          </div>
          <button className="flex items-center gap-2 text-paper/30 hover:text-paper/60 text-sm transition-colors font-body w-full">
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 bg-ink/90 backdrop-blur border-b border-white/5 px-8 h-16 flex items-center justify-between z-10">
          <h1 className="font-display font-700 text-lg">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-paper/40 hover:text-paper transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full" />
            </button>
            <Link href="/onboarding"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-ink font-display font-700 text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={14} />
              New Site
            </Link>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Success banner */}
          {justGenerated && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-electric/5 border border-electric/20 rounded-2xl p-5 flex items-start justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center text-electric shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <div className="font-display font-700 text-paper mb-0.5">
                    Your website is live! 🎉
                  </div>
                  <div className="text-paper/50 text-sm font-body">
                    "{generatedName}" was generated and deployed in 42 seconds. SEO pages are being indexed.
                  </div>
                </div>
              </div>
              <a href="#" className="flex items-center gap-1.5 text-electric text-sm font-body shrink-0 mt-1">
                View site <ExternalLink size={12} />
              </a>
            </motion.div>
          )}

          {/* Sites */}
          <div>
            <h2 className="font-display font-700 text-lg mb-4">My Websites</h2>
            <div className="grid lg:grid-cols-2 gap-4 mb-8">
              {MOCK_SITES.map((site, i) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`card-hover bg-ink-muted border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    activeSite.id === site.id ? 'border-amber-500/30' : 'border-white/5'
                  }`}
                  onClick={() => setActiveSite(site)}
                >
                  {/* Thumbnail */}
                  <div className={`h-28 bg-gradient-to-br ${site.thumbnail} flex items-end p-4 relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">{site.emoji}</span>
                    </div>
                    <div className="relative z-10 bg-black/40 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
                      <span className="text-white/80 text-xs font-mono">Live</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-display font-700 text-paper">{site.name}</div>
                        <div className="text-paper/40 text-xs font-body">{site.type}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-paper/30 hover:text-paper transition-colors"><Edit3 size={13} /></button>
                        <a href="#" className="p-1.5 text-paper/30 hover:text-paper transition-colors"><ExternalLink size={13} /></a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sky text-xs font-mono">{site.url}</span>
                      <button onClick={handleCopy} className="text-paper/20 hover:text-paper/60 transition-colors">
                        {copied ? <Check size={11} className="text-electric" /> : <Copy size={11} />}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Visitors', value: site.visitors.toLocaleString() },
                        { label: 'Bookings', value: site.bookings },
                        { label: 'SEO Pages', value: site.seoPages },
                      ].map(stat => (
                        <div key={stat.label} className="text-center">
                          <div className="font-display font-700 text-paper text-lg">{stat.value}</div>
                          <div className="text-paper/30 text-xs font-body">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add new site card */}
              <Link href="/onboarding"
                className="border border-dashed border-white/10 hover:border-amber-500/30 rounded-2xl flex flex-col items-center justify-center gap-3 p-8 min-h-48 transition-all hover:bg-amber-500/3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-amber-500/10 border border-white/5 group-hover:border-amber-500/20 flex items-center justify-center transition-all">
                  <Plus size={18} className="text-paper/30 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-paper/30 group-hover:text-paper/60 text-sm font-body transition-colors">Add new website</span>
              </Link>
            </div>

            {/* Stats for active site */}
            <div className="mb-6">
              <h3 className="font-display font-600 text-base mb-4 text-paper/70">
                Stats for: <span className="text-paper">{activeSite.name}</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Monthly Visitors" value="1,240" change="+18%" icon={<Users size={16} />} color="var(--electric)" />
                <StatCard label="Page Views" value="4,120" change="+22%" icon={<Eye size={16} />} color="var(--sky)" />
                <StatCard label="Bookings" value="34" change="+9%" icon={<Calendar size={16} />} color="var(--amber)" />
                <StatCard label="Google Rank" value="#4" change="↑2 spots" icon={<Search size={16} />} color="var(--coral)" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* SEO Pages */}
            <div className="bg-ink-muted border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-700 text-base">SEO Pages</h3>
                <button className="text-paper/40 hover:text-paper text-sm font-body transition-colors flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {SEO_PAGES.map((page, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-paper/80 text-sm font-body truncate">{page.title}</div>
                      <div className="text-paper/30 text-xs font-mono">{page.traffic} visitors/mo</div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`text-xs font-mono ${page.rank <= 5 ? 'text-electric' : page.rank <= 10 ? 'text-amber-400' : 'text-paper/40'}`}>
                        #{page.rank}
                      </span>
                      <div className={`tag text-xs ${page.status === 'ranking' ? 'bg-electric/10 text-electric' : 'bg-amber-500/10 text-amber-400'}`}>
                        {page.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-ink-muted border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-700 text-base">Recent Activity</h3>
                <button className="p-1.5 text-paper/30 hover:text-paper transition-colors">
                  <RefreshCw size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                      item.type === 'booking' ? 'bg-amber-500/10 text-amber-400' :
                      item.type === 'seo' ? 'bg-electric/10 text-electric' :
                      item.type === 'contact' ? 'bg-sky/10 text-sky' :
                      'bg-white/5 text-paper/40'
                    }`}>
                      {item.type === 'booking' ? '📅' : item.type === 'seo' ? '🔎' : item.type === 'contact' ? '✉️' : '✦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-paper/80 text-sm font-body">{item.action}</div>
                      <div className="text-paper/30 text-xs font-body truncate">{item.detail}</div>
                    </div>
                    <span className="text-paper/20 text-xs font-mono shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI actions */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-900/5 border border-amber-500/15 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-amber-400" />
              <h3 className="font-display font-700 text-base">AI Suggestions</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: 'Add summer promo page', desc: 'Seasonal content drives 40% more clicks', icon: '🌞' },
                { label: 'Update business hours', desc: 'Holiday hours are 2 weeks away', icon: '⏰' },
                { label: 'Add 3 more SEO pages', desc: 'Competitors ranking for "nail art Austin"', icon: '📈' },
              ].map((s, i) => (
                <button key={i} className="flex items-start gap-3 bg-ink-muted border border-white/5 hover:border-amber-500/20 rounded-xl p-3 text-left transition-all group">
                  <span className="text-lg shrink-0">{s.icon}</span>
                  <div>
                    <div className="font-display font-600 text-sm text-paper group-hover:text-amber-300 transition-colors">{s.label}</div>
                    <div className="text-paper/40 text-xs font-body mt-0.5">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center text-paper/40">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

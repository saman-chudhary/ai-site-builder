'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SiteContent() {
  const searchParams = useSearchParams()
  const siteId = searchParams.get('id')
  const [siteData, setSiteData] = useState<any>(null)

  useEffect(() => {
    if (siteId) {
      const stored = localStorage.getItem(`site_${siteId}`)
      if (stored) setSiteData(JSON.parse(stored))
    }
  }, [siteId])

  if (!siteData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p style={{ color: '#9ca3af', fontFamily: 'sans-serif' }}>Loading your site...</p>
      </div>
    )
  }

  const brand = siteData.color || '#F59E0B'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111', fontFamily: 'sans-serif' }}>
      <nav style={{ background: brand, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem' }}>{siteData.businessName}</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Services', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>{l}</a>
          ))}
        </div>
        <a href="#contact" style={{ background: '#fff', color: brand, padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
          Book Now
        </a>
      </nav>

      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', background: `linear-gradient(135deg, ${brand}18 0%, #fff 70%)` }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{ display: 'inline-block', background: `${brand}20`, color: brand, padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            {siteData.businessType}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', color: '#111' }}>
            {siteData.hero?.headline}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            {siteData.hero?.subheadline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" style={{ background: brand, color: '#fff', padding: '1rem 2.5rem', borderRadius: '12px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
              {siteData.hero?.cta || 'Get Started'}
            </a>
            <a href="#services" style={{ border: `2px solid ${brand}`, color: '#111', padding: '1rem 2.5rem', borderRadius: '12px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
              Our Services
            </a>
          </div>
          {siteData.trustSignals && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '3rem' }}>
              {siteData.trustSignals.map((t: string, i: number) => (
                <span key={i} style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  <span style={{ color: brand }}>✓</span> {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="services" style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Our Services</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>Everything you need, all in one place</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {siteData.services?.map((s: any, i: number) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                <div style={{ width: '40px', height: '40px', background: brand, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>{i + 1}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{s.description}</p>
                <div style={{ color: brand, fontWeight: 700, fontSize: '0.875rem' }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>{siteData.about?.headline}</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '2rem' }}>{siteData.about?.body}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {siteData.about?.highlights?.map((h: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: brand, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', flexShrink: 0 }}>✓</div>
                  <span style={{ color: '#374151', fontSize: '0.9rem' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${brand}, ${brand}88)`, borderRadius: '24px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🏢</div>
        </div>
      </section>

      {siteData.faqs && siteData.faqs.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {siteData.faqs.map((faq: any, i: number) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #f3f4f6' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{faq.question}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>{siteData.contactCTA || 'Get In Touch'}</h2>
          <p style={{ color: '#6b7280', marginBottom: '2.5rem' }}>Ready to get started? We respond within 24 hours.</p>
          <div style={{ background: '#f9fafb', borderRadius: '20px', padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Your Name', 'Your Email'].map(p => (
              <input key={p} type="text" placeholder={p} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.875rem 1rem', fontSize: '0.95rem', color: '#111', outline: 'none', boxSizing: 'border-box' }} />
            ))}
            <textarea placeholder="Your Message" rows={4} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.875rem 1rem', fontSize: '0.95rem', color: '#111', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            <button style={{ width: '100%', background: brand, color: '#fff', padding: '1rem', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
              Send Message
            </button>
          </div>
          {siteData.location && <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1.5rem' }}>📍 {siteData.location}</p>}
          {siteData.phone && <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>📞 {siteData.phone}</p>}
        </div>
      </section>

      <footer style={{ background: brand, padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{siteData.businessName}</div>
        <div>© {new Date().getFullYear()} {siteData.businessName}. All rights reserved.</div>
        <div style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Built with Siteforge AI</div>
      </footer>
    </div>
  )
}

export default function SitePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#9ca3af' }}>Loading...</p></div>}>
      <SiteContent />
    </Suspense>
  )
}
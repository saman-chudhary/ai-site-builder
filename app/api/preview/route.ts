import { NextRequest, NextResponse } from 'next/server'

// Mock data for preview - in production this would fetch from your DB
const PREVIEW_TEMPLATES: Record<string, string> = {
  salon: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glow Beauty Studio - Hair Salon in Austin, TX</title>
  <meta name="description" content="Premier hair salon in Austin, TX. Expert coloring, cuts, and styling. Book your appointment today.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --brand: #F43F5E; --dark: #1a0a0f; --text: #fff; }
    body { font-family: 'Georgia', serif; background: var(--dark); color: var(--text); }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .logo { font-size: 1.5rem; font-weight: 700; color: var(--brand); }
    .nav-links { display: flex; gap: 1.5rem; font-size: 0.875rem; opacity: 0.6; }
    .hero { min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; background: radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.2) 0%, transparent 60%); }
    h1 { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 1rem; }
    .accent { color: var(--brand); }
    .subtitle { font-size: 1.2rem; opacity: 0.6; max-width: 500px; margin: 0 auto 2rem; font-family: sans-serif; }
    .btn { display: inline-block; background: var(--brand); color: white; padding: 1rem 2.5rem; border-radius: 50px; font-family: sans-serif; font-weight: 600; text-decoration: none; }
    .services { padding: 5rem 2rem; max-width: 1000px; margin: 0 auto; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
    .service-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.5rem; }
    .service-card h3 { color: var(--brand); margin-bottom: 0.5rem; }
    .service-card p { font-size: 0.875rem; opacity: 0.6; font-family: sans-serif; }
    .price { font-size: 0.8rem; opacity: 0.4; font-family: sans-serif; margin-top: 0.5rem; }
    section h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .footer { padding: 2rem; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; opacity: 0.4; font-family: sans-serif; font-size: 0.875rem; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">✦ Glow Beauty</div>
    <div class="nav-links">
      <span>Services</span>
      <span>Gallery</span>
      <span>About</span>
      <span>Contact</span>
    </div>
    <a href="#" class="btn" style="padding: 0.5rem 1.25rem; font-size: 0.875rem;">Book Now</a>
  </nav>
  <div class="hero">
    <div>
      <h1>Your best hair<br><span class="accent">starts here.</span></h1>
      <p class="subtitle">Premier salon & spa in Austin, TX. Expert coloring, cuts, and styling by certified professionals.</p>
      <a href="#" class="btn">Book Your Appointment →</a>
    </div>
  </div>
  <div class="services">
    <h2>Our Services</h2>
    <p style="opacity:0.5; font-family: sans-serif;">Crafted for every hair type and style</p>
    <div class="services-grid">
      ${['Hair Coloring', 'Balayage', 'Haircut & Style', 'Keratin Treatment', 'Highlights', 'Blowout'].map(s => `
      <div class="service-card">
        <h3>${s}</h3>
        <p>Professional ${s.toLowerCase()} by certified stylists with premium products.</p>
        <div class="price">From $65</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="footer">© 2025 Glow Beauty Studio · Austin, TX · (512) 555-0100</div>
</body>
</html>`,
  restaurant: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>La Cucina - Authentic Italian Restaurant</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #0d0905; color: #f5ede0; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; }
    .logo { font-size: 1.75rem; color: #e8a96a; }
    .hero { min-height: 90vh; display: grid; place-items: center; text-align: center; background: radial-gradient(ellipse at top, rgba(232,169,106,0.15), transparent 60%); padding: 2rem; }
    h1 { font-size: clamp(3rem, 7vw, 6rem); line-height: 1.05; }
    .gold { color: #e8a96a; font-style: italic; }
    .subtitle { font-size: 1.1rem; opacity: 0.55; margin: 1.5rem 0 2.5rem; max-width: 460px; font-family: sans-serif; }
    .btn { background: #e8a96a; color: #0d0905; padding: 0.875rem 2.5rem; border-radius: 4px; font-family: sans-serif; font-weight: 700; display: inline-block; letter-spacing: 0.05em; }
    .menu-section { padding: 5rem 2rem; max-width: 800px; margin: 0 auto; }
    .divider { width: 60px; height: 2px; background: #e8a96a; margin: 1rem auto; }
    .menu-grid { display: grid; gap: 1rem; margin-top: 2rem; }
    .menu-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .item-name { font-size: 1.05rem; }
    .item-desc { font-size: 0.8rem; opacity: 0.4; font-family: sans-serif; }
    .item-price { color: #e8a96a; font-family: sans-serif; }
    .footer { text-align: center; padding: 2rem; opacity: 0.3; font-family: sans-serif; font-size: 0.875rem; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <nav>
    <div class="logo">La Cucina</div>
    <div style="display:flex;gap:2rem;opacity:0.5;font-family:sans-serif;font-size:0.9rem;">
      <span>Menu</span><span>Reservations</span><span>About</span><span>Contact</span>
    </div>
    <a href="#" class="btn" style="padding: 0.5rem 1.25rem; font-size: 0.875rem;">Reserve Table</a>
  </nav>
  <div class="hero">
    <div>
      <h1>Authentic Italian,<br><span class="gold">made with love.</span></h1>
      <p class="subtitle">Handmade pasta, wood-fired pizza, and recipes passed down through generations — right in your neighborhood.</p>
      <a href="#" class="btn">Make a Reservation →</a>
    </div>
  </div>
  <div class="menu-section">
    <h2 style="text-align:center;font-size:2rem;">Our Menu</h2>
    <div class="divider"></div>
    <div class="menu-grid">
      ${[
        ['Cacio e Pepe', 'Handmade tonnarelli, Pecorino Romano, black pepper', '$22'],
        ['Margherita Pizza', 'San Marzano tomatoes, fior di latte, fresh basil', '$18'],
        ['Osso Buco', 'Braised veal shank, gremolata, saffron risotto', '$38'],
        ['Tiramisu', 'House-made, mascarpone, Savoiardi, espresso', '$12'],
      ].map(([name, desc, price]) => `
      <div class="menu-item">
        <div><div class="item-name">${name}</div><div class="item-desc">${desc}</div></div>
        <div class="item-price">${price}</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="footer">© 2025 La Cucina · Open Tue–Sun 5pm–10pm · (555) 123-4567</div>
</body>
</html>`,
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'salon'

  const normalizedType = type.toLowerCase()
  let template = PREVIEW_TEMPLATES.salon // default

  if (normalizedType.includes('restaurant') || normalizedType.includes('food') || normalizedType.includes('cafe')) {
    template = PREVIEW_TEMPLATES.restaurant
  }

  return new NextResponse(template, {
    headers: {
      'Content-Type': 'text/html',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  })
}

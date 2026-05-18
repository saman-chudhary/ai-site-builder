import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessType, businessName, location, style, color, pages } = body

    if (!businessType) {
      return NextResponse.json({ error: 'Business type is required' }, { status: 400 })
    }

    const prompt = `You are an expert web copywriter and SEO specialist. Generate complete website content for a small business.

Business Details:
- Type: ${businessType}
- Name: ${businessName || `${businessType} Business`}
- Location: ${location || 'Local Area'}
- Design Style: ${style || 'Modern & Clean'}
- Primary Color: ${color || '#F59E0B'}
- Pages Requested: ${pages?.join(', ') || 'Home, Services, About, Contact'}

Generate a complete JSON response with the following structure:

{
  "businessName": "Final business name",
  "tagline": "Compelling one-line tagline",
  "description": "2-3 sentence business description",
  "hero": {
    "headline": "Powerful homepage headline",
    "subheadline": "Supporting text that builds trust",
    "cta": "Call-to-action button text"
  },
  "services": [
    {
      "name": "Service name",
      "description": "Brief description",
      "price": "Price or starting from price"
    }
  ],
  "about": {
    "headline": "About section headline",
    "body": "2-3 paragraph about section",
    "highlights": ["Key highlight 1", "Key highlight 2", "Key highlight 3"]
  },
  "seoPages": [
    {
      "slug": "url-friendly-slug",
      "title": "SEO page title",
      "metaDescription": "150 char meta description",
      "h1": "Main heading",
      "content": "First paragraph of content"
    }
  ],
  "faqs": [
    { "question": "Common question", "answer": "Helpful answer" }
  ],
  "contactCTA": "Contact section call to action text",
  "trustSignals": ["Trust signal 1", "Trust signal 2", "Trust signal 3"]
}

Make the content feel authentic and professional for a ${businessType} in ${location || 'their local area'}. 
Generate 5 relevant SEO pages targeting location-based keywords.
Return ONLY the JSON, no markdown, no explanation.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI')
    }

    // Parse the JSON response
    let siteData
    try {
      siteData = JSON.parse(content.text)
    } catch {
      // Try to extract JSON if wrapped in markdown
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        siteData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse AI response as JSON')
      }
    }

    return NextResponse.json({
      success: true,
      data: siteData,
      meta: {
        businessType,
        businessName: siteData.businessName,
        location,
        generatedAt: new Date().toISOString(),
        pagesGenerated: pages?.length || 5,
        seoPages: siteData.seoPages?.length || 5,
      },
    })
  } catch (error) {
    console.error('Website generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate website',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Siteforge AI Generation API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/generate — Generate website content from business info',
    },
  })
}

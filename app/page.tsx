import Link from 'next/link'
import Script from 'next/script'

export default function Home() {
  // Structured Data for Google (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'My Crochet Kit',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any (Progressive Web App)',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'First Stitch - Free Plan',
      },
      {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'USD',
        name: 'Hooked - Pro Plan',
      },
      {
        '@type': 'Offer',
        price: '19.99',
        priceCurrency: 'USD',
        name: 'Master Maker - Expert Plan',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: 'The ultimate offline-first crochet companion app. Track patterns, count rows, manage yarn stash, and never lose your place. Works offline, syncs everywhere.',
    featureList: [
      'Pattern management and PDF import',
      'Smart row counter with custom alerts',
      'Yarn stash tracker with barcode scanning',
      'Offline mode - works without internet',
      'Progress photo tracking',
      'Pricing calculator for sellers',
      'Health reminders to prevent hand pain',
      'US/UK term converter',
    ],
  }

  return (
    <main className="min-h-screen">
      {/* Structured Data for Google */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-rose-light via-lavender-light to-sage-light">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-warmBrown mb-6">
              My Crochet Kit 🧶
            </h1>
            <p className="text-xl md:text-2xl text-warmBrown-dark mb-4">
              The ultimate offline-first companion for crocheters
            </p>
            <p className="text-lg text-warmBrown mb-4">
              Free crochet pattern tracker, row counter, and yarn stash organizer
            </p>
            <p className="text-base text-warmBrown-dark mb-12">
              Track patterns • Count rows • Manage your stash • Works offline • Never lose your place again
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Primary navigation">
              <Link href="/app" className="btn-primary text-lg" aria-label="Start using My Crochet Kit for free">
                Start Crocheting (Free!)
              </Link>
              <Link href="#pricing" className="btn-secondary text-lg" aria-label="View pricing plans for My Crochet Kit">
                View Plans
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-4xl font-bold text-center text-warmBrown mb-4">
          Everything You Need for Crochet Success
        </h2>
        <p className="text-center text-warmBrown-dark mb-12 max-w-2xl mx-auto">
          Professional crochet tools that work offline. Perfect for beginners and expert crocheters alike.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article key={index} className="card text-center">
              <div className="text-rose text-5xl mb-4" role="img" aria-label={feature.iconLabel}>{feature.icon}</div>
              <h3 className="text-xl font-bold text-warmBrown mb-3">
                {feature.title}
              </h3>
              <p className="text-warmBrown-dark">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-cream-dark py-16" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4">
          <h2 id="pricing-heading" className="text-4xl font-bold text-center text-warmBrown mb-4">
            Choose Your Hook - Simple, Transparent Pricing
          </h2>
          <p className="text-center text-warmBrown-dark mb-12 text-lg max-w-2xl mx-auto">
            Start with our free crochet app, upgrade when you need more features. No hidden fees. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <article
                key={index}
                className={`card ${
                  tier.featured ? 'ring-4 ring-rose shadow-2xl' : ''
                }`}
                itemScope
                itemType="https://schema.org/Product"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3" role="img" aria-label={tier.iconLabel}>{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-warmBrown mb-2" itemProp="name">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-rose mb-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span itemProp="price">{tier.price}</span>
                    <meta itemProp="priceCurrency" content="USD" />
                  </div>
                  {tier.period && (
                    <p className="text-warmBrown-dark">{tier.period}</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8" role="list">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-sage text-xl mr-2" aria-hidden="true">✓</span>
                      <span className="text-warmBrown-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={tier.featured ? 'btn-primary w-full' : 'btn-secondary w-full'} aria-label={`Get started with ${tier.name} plan`}>
                  {tier.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warmBrown text-cream py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">Made with 💜 for crocheters everywhere</p>
          <p className="text-cream-dark">© 2025 My Crochet Kit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    icon: '📝',
    iconLabel: 'Pattern document icon',
    title: 'Pattern Management & Organization',
    description: 'Import PDF patterns, organize with tags and folders, annotate with notes. Smart search finds patterns instantly. Never lose your place with persistent highlighting.',
  },
  {
    icon: '🔢',
    iconLabel: 'Number counter icon',
    title: 'Smart Row Counter with Alerts',
    description: 'Multiple counters per project with custom row alerts. Works offline and syncs everywhere. Never resets accidentally - your counts are always safe.',
  },
  {
    icon: '🧵',
    iconLabel: 'Yarn ball icon',
    title: 'Yarn Stash Tracker & Calculator',
    description: 'Know exactly what yarn you have. Track colors, weights, quantities, and costs. Barcode scanning makes adding yarn easy. Calculate if you have enough for projects.',
  },
  {
    icon: '📸',
    iconLabel: 'Camera icon',
    title: 'Progress Photos & Journey Tracking',
    description: 'Document your crochet journey from first stitch to finished piece. Track before/after photos and see your improvement over time.',
  },
  {
    icon: '💰',
    iconLabel: 'Money calculator icon',
    title: 'Pricing Calculator for Sellers',
    description: 'Price your work fairly with our built-in calculator. Automatically tracks materials, time, and overhead. Calculate profit margins instantly.',
  },
  {
    icon: '⏰',
    iconLabel: 'Clock reminder icon',
    title: 'Health Reminders & Ergonomics',
    description: 'Take breaks and prevent hand pain with gentle reminders every 20-30 minutes. Get ergonomic tips to crochet comfortably for hours.',
  },
]

const pricingTiers = [
  {
    icon: '🌱',
    iconLabel: 'Seedling icon representing beginner tier',
    name: 'First Stitch',
    price: 'Free',
    period: 'Forever',
    features: [
      'Up to 10 active projects',
      'Basic row counter with save',
      'Pattern import (PDF support)',
      'Basic yarn stash tracking',
      'Full offline mode',
      'Ad-supported experience',
    ],
    cta: 'Start Free',
    featured: false,
  },
  {
    icon: '🪝',
    iconLabel: 'Crochet hook icon representing pro tier',
    name: 'Hooked',
    price: '$9.99',
    period: '/month or $89.99/year (save $30!)',
    features: [
      'Unlimited projects',
      'Advanced counters with custom alerts',
      'Pattern annotations & highlighting',
      'Automatic time tracking',
      'Photo progress tracking',
      'Ad-free experience',
      'Priority email support',
    ],
    cta: 'Get Hooked',
    featured: true,
  },
  {
    icon: '👑',
    iconLabel: 'Crown icon representing expert tier',
    name: 'Master Maker',
    price: '$19.99',
    period: '/month or $179.99/year (save $60!)',
    features: [
      'Everything in Hooked plan',
      'Advanced pricing calculator for sellers',
      'Pattern creation & editing tools',
      'Video tutorial integration',
      'Premium community features',
      'Cloud backup with version history',
      'Export patterns to sell on Etsy',
    ],
    cta: 'Become a Master',
    featured: false,
  },
]

import { Navbar } from './Navbar'
import { Footer } from './Footer'
import SEO from './SEO'

const CATEGORY_CONFIG = {
  home:      { accent: 'var(--color-accent-home)',      name: 'Home' },
  solutions: { accent: 'var(--color-accent-solutions)',  name: 'Solutions' },
  enterprise:{ accent: 'var(--color-accent-enterprise)', name: 'Enterprise' },
  research:  { accent: 'var(--color-accent-research)',   name: 'Research' },
  blog:      { accent: 'var(--color-accent-blog)',       name: 'Blog' },
  contact:   { accent: 'var(--color-accent-contact)',    name: 'Contact' },
  about:     { accent: 'var(--color-accent-about)',      name: 'About' },
  studies:   { accent: 'var(--color-accent-studies)',    name: 'Case Studies' },
  guides:    { accent: 'var(--color-accent)',            name: 'Guides' },
}

export function PageLayout({ category = 'home', seo, schema, children }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.home

  return (
    <div className="page-dark" style={{ '--cat-accent': config.accent }}>
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          schema={schema}
        />
      )}
      <Navbar category={category} />
      <main id="main-content" style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer category={category} />
      <div className="bg-noise" aria-hidden="true" />
    </div>
  )
}

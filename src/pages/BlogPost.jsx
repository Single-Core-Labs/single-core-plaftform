import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ArrowLeft, Link2, Check } from 'lucide-react'
import SEO from '@/components/SEO'
import { SITE_URL } from '@/lib/seo'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'

function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${scrolled}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '100%',
        background: 'rgba(0,0,0,0.06)',
        zIndex: 9999,
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'var(--color-accent)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}

function CopyLinkButton({ slug }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = `${SITE_URL}/blog/${slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`blog-copy-link${copied ? ' is-copied' : ''}`}
      aria-label={copied ? 'Link copied' : 'Copy link to article'}
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}
      {copied ? 'Copied' : 'Copy Link'}
    </button>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const related = getRelatedPosts(slug)
  const Content = post?.Content

  if (!post || !Content) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="text-display">Post not found</h1>
        </main>
        <Footer />
      </>
    )
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.heroImage ? [`${SITE_URL}${post.heroImage}`] : undefined,
    "datePublished": post.published_at || post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "description": post.excerpt
  };

  return (
    <>
      <SEO 
        title={`${post.title} | Single Core Labs`}
        description={post.excerpt}
        image={post.heroImage}
        type="article"
        schema={schema}
      />
      <Navbar />
      <ProgressBar />

      <article>
        <header className="blog-hero">
          <img src={post.heroImage} alt={post.title} className="blog-hero__image" />
          <div className="blog-hero__overlay" aria-hidden="true" />
        </header>

        <div className="container-editorial blog-post-header">
          <nav className="blog-post-header__nav" aria-label="Article navigation">
            <Link to="/blog" className="blog-post-header__back">
              <ArrowLeft size={15} aria-hidden="true" />
              Blog
            </Link>
            <span className="blog-post-header__category">{post.category}</span>
          </nav>

          <h1 className="blog-post-header__title">{post.title}</h1>

          <div className="blog-post-header__meta">
            <span>
              By <strong>{post.author}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published_at}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <CopyLinkButton slug={post.slug} />
          </div>
        </div>

        <main id="main-content" style={{ paddingBottom: 'clamp(80px, 10vh, 120px)' }}>
          <div className="container-narrow" style={{ paddingTop: 'clamp(48px, 6vh, 72px)' }}>
            <motion.div
              className="blog-prose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Content />
            </motion.div>
          </div>

          <div className="container-narrow" style={{ marginTop: 'clamp(48px, 6vh, 72px)' }}>
            <div className="blog-author-card">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="blog-author-card__avatar"
                loading="lazy"
              />
              <div>
                <p className="blog-author-card__name">{post.author}</p>
                <p className="blog-author-card__bio">{post.authorBio}</p>
                <div className="blog-author-card__links">
                  {post.authorLinks?.linkedin && (
                    <a href={post.authorLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  )}
                  {post.authorLinks?.twitter && (
                    <a href={post.authorLinks.twitter} target="_blank" rel="noopener noreferrer">
                      X
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="container-editorial" style={{ marginTop: 'clamp(60px, 8vh, 96px)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(24px, 4vh, 40px)',
                }}
              >
                More from Single Core Labs
              </h2>
              <div style={{ display: 'grid', gap: 0 }}>
                {related.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="blog-card">
                    <div className="blog-card__image-wrap">
                      <img src={p.heroImage} alt={p.title} className="blog-card__image" loading="lazy" />
                    </div>
                    <div className="blog-card__body">
                      <p className="blog-card__category">{p.category}</p>
                      <h3 className="blog-card__title">{p.title}</h3>
                      <p className="blog-card__meta">
                        {p.author} · {p.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </article>

      <Footer />
    </>
  )
}

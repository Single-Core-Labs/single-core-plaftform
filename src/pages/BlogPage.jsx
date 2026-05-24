import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { usePageMeta } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card__image-wrap">
        <img
          src={post.heroImage}
          alt=""
          className="blog-card__image"
          loading="lazy"
        />
      </div>
      <div className="blog-card__body">
        <p className="blog-card__category">{post.category}</p>
        <h2 className="blog-card__title">{post.title}</h2>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <p className="blog-card__meta">
          {post.author} · {post.date} · {post.readTime}
        </p>
      </div>
    </Link>
  )
}

function BlogPage() {
  const posts = getAllPosts()
  usePageMeta('/blog')

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        <section
          className="container-editorial"
          style={{ paddingTop: 'clamp(120px, 14vh, 180px)', paddingBottom: 'clamp(48px, 6vh, 72px)' }}
        >
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Blog</p>
          </RevealText>
          <RevealText delay={1}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              Insights &{' '}
              <span className="text-italic-serif">Updates</span>
            </h1>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '520px' }}>
              AI engineering, infrastructure, and practical takes on where the field is heading.
            </p>
          </RevealText>
        </section>

        <section className="container-editorial" style={{ paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default BlogPage

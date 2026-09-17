const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_075824_7c8a2ef3-826c-43ca-81a1-162429faa306.mp4'

// Fixed background for legal pages — same hero video as HomePage, so the
// colors match by definition, with a heavy dark overlay to keep long-form
// text readable. Decorative only (aria-hidden).
export default function LegalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: '#060606',
        pointerEvents: 'none',
      }}
    >
      <video
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        src={VIDEO_SRC}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5,
        }}
      />
      {/* Readability overlay — darkens the artwork without changing its hue */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(6,6,6,0.78) 0%, rgba(6,6,6,0.82) 45%, rgba(6,6,6,0.9) 100%)',
        }}
      />
    </div>
  )
}

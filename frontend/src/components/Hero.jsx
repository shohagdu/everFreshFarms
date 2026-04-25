import { useApi } from '../hooks/useApi';
import { getHero } from '../services/api';

export default function Hero() {
  const { data: banner } = useApi(getHero);

  const stats = banner?.stats || [
    { number: '১০০%', label: 'হালাল গ্যারান্টি', icon: '✅' },
    { number: '২৪/৭', label: 'সার্ভিস সময়',    icon: '🕐' },
    { number: '৫০+',  label: 'সন্তুষ্ট গ্রাহক',  icon: '😊' },
  ];

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: banner?.background_image
        ? `url(${banner.background_image}) center/cover no-repeat`
        : 'radial-gradient(ellipse at 75% 15%, rgba(61,175,96,.18) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(212,32,22,.12) 0%, transparent 50%), linear-gradient(150deg,#0a2e15 0%,#0f4423 40%,#1e7a34 100%)',
      display: 'flex', alignItems: 'center',
      padding: '90px 5% 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative leaves */}
      <div style={{ position:'absolute', opacity:.06, fontSize:320, right:-60, top:-40, transform:'rotate(-20deg)', pointerEvents:'none', userSelect:'none' }}>🌿</div>
      <div style={{ position:'absolute', opacity:.04, fontSize:200, left:-30, bottom:60, transform:'rotate(30deg)', pointerEvents:'none' }}>🍃</div>

      {/* Two-column layout */}
      <div style={{
        width: '100%', maxWidth: 1200, margin: '0 auto', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 60,
        alignItems: 'center',
      }}>

        {/* LEFT — text content */}
        <div>
          {/* Badge */}
          {(banner?.badge_text || true) && (
            <div style={{
              display: 'inline-block',
              background: 'rgba(240,115,24,.18)',
              border: '1px solid rgba(240,115,24,.45)',
              color: '#ffb87a', fontSize: 13, fontWeight: 700,
              padding: '5px 16px', borderRadius: 20, marginBottom: 24, letterSpacing: 1,
            }}>
              {banner?.badge_text || '🌱 প্রাণীজ আমিষ উৎপাদন ও সরবরাহকারী'}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10,
          }}>
            <span className="gradient-text">
              {banner?.title || 'এভার ফ্রেশ ফার্ম'}
            </span>
            <br />
            {banner?.title_bn ? banner.title_bn.replace(banner.title || '', '').trim() : <> থেকে সরাসরি<br />তাজা ও হালাল</>}
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontStyle: 'italic', color: '#f5c842', marginBottom: 18,
          }}>
            {banner?.tagline || 'Inshaf Brings Happiness 🌿'}
          </p>

          {/* Description */}
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,.75)', marginBottom: 36, maxWidth: 520 }}>
            {banner?.description_bn || 'ফেনীর ছনুয়া থেকে সরাসরি পালিত সুস্থ ছাগল ও তাজা মাংস। আমরা নিশ্চিত করি সর্বোচ্চ মান, সম্পূর্ণ হালাল এবং সাশ্রয়ী মূল্য।'}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={banner?.primary_btn_link || '#products'} className="btn-primary">
              {banner?.primary_btn_text || '🐐 পণ্য দেখুন'}
            </a>
            <a href={banner?.secondary_btn_link || '#contact'} className="btn-outline">
              {banner?.secondary_btn_text || '📞 অর্ডার করুন'}
            </a>
          </div>
        </div>

        {/* RIGHT — stats cards */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 20,
          justifyContent: 'center',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.13)',
              borderRadius: 20,
              padding: '24px 32px',
              display: 'flex', alignItems: 'center', gap: 20,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 24px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.08)',
              transition: 'transform .25s, box-shadow .25s, border-color .25s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 36px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.14)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.13)';
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <div style={{
                  fontSize: 36, fontWeight: 800, lineHeight: 1,
                  background: 'linear-gradient(135deg, #7ee8a2 0%, #f5c842 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.number}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', fontWeight: 500, marginTop: 4, letterSpacing: .3 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

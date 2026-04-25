import { useEffect, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { getAbout } from '../services/api';

export default function About() {
  const { data: about } = useApi(getAbout);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('visible');
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const features = about?.features || [
    { icon: '✅', text: 'প্রাকৃতিক পরিবেশে পালিত ছাগল' },
    { icon: '🕌', text: 'সম্পূর্ণ হালাল প্রক্রিয়ায় জবাই' },
    { icon: '🚚', text: 'দ্রুত ও নিরাপদ ডেলিভারি সুবিধা' },
    { icon: '💰', text: 'সাশ্রয়ী ও ন্যায্য মূল্য নিশ্চিত' },
  ];

  return (
    <section id="about" style={{ background: '#fff', padding: '90px 5%' }}>
      <div
        ref={ref}
        className="fade-up"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 70, alignItems: 'center', maxWidth: 1100, margin: '0 auto',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <img
            src={about?.image || `${import.meta.env.BASE_URL}farm.jpeg`}
            alt="এভার ফ্রেশ ফার্ম"
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 20, boxShadow: '0 20px 60px rgba(10,46,21,.35)' }}
          />
          <div style={{
            position: 'absolute', bottom: -18, right: -18,
            background: 'linear-gradient(135deg,#f07318,#d42016)', color: '#fff',
            borderRadius: 16, padding: '16px 22px', textAlign: 'center',
            boxShadow: '0 8px 28px rgba(212,32,22,.45)',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{about?.badge_number || '১০০%'}</div>
            <div style={{ fontSize: 12, opacity: .85, marginTop: 3 }}>{about?.badge_label || 'অর্গানিক'}</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="section-label">আমাদের সম্পর্কে</span>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1a5c2e', marginBottom: 16, lineHeight: 1.3 }}>
            {about?.title_bn || 'বিশ্বস্ততার সাথে\nপ্রাকৃতিক খাদ্য সরবরাহ'}
          </h2>
          <p style={{ fontSize: 16, color: '#4a6a4a', lineHeight: 1.9, marginBottom: 16 }}>
            {about?.content_bn || 'Ever Fresh Farm ফেনীর ছনুয়ায় অবস্থিত একটি বিশ্বস্ত প্রাণীজ আমিষ উৎপাদন ও সরবরাহকারী প্রতিষ্ঠান। আমরা বিশ্বাস করি — সুস্থ পশু থেকেই আসে সুস্থ খাবার।'}
          </p>
          <p style={{ fontSize: 16, color: '#4a6a4a', lineHeight: 1.9 }}>
            আমাদের ছাগলগুলো প্রাকৃতিক পরিবেশে লালন-পালন করা হয়, কোনো কৃত্রিম হরমোন ব্যবহার ছাড়াই। প্রতিটি পশু নিয়মিত স্বাস্থ্য পরীক্ষার আওতায় থাকে।
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, background: 'rgba(30,122,52,.12)',
                  border: '1px solid rgba(30,122,52,.2)',
                  borderRadius: 10, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 17, flexShrink: 0,
                }}>{f.icon}</div>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#1a2e1a' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

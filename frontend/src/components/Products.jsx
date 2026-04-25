import { useEffect, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { getProducts } from '../services/api';

const colorMap = {
  green: 'linear-gradient(135deg,#0f4423,#1e7a34)',
  red:   'linear-gradient(135deg,#7a1010,#d42016)',
  gold:  'linear-gradient(135deg,#5a3800,#d4a017)',
  blue:  'linear-gradient(135deg,#1a4a5c,#2a7a8a)',
};
const emojiMap = { green: '🐐', red: '🥩', gold: '🎉', blue: '🌿' };

const defaultProducts = [
  { id:1, name_bn:'জীবন্ত ছাগল বিক্রয়', description_bn:'সুস্থ, সুন্দর ও ভালোভাবে পালিত দেশি ছাগল। কোরবানি ও পারিবারিক ব্যবহারের জন্য আদর্শ।', badge_text:'সেরা বিক্রিত', color_class:'green', tags:['দেশি জাত','সুস্থ-সবল','হালাল'] },
  { id:2, name_bn:'ছাগলের তাজা মাংস',   description_bn:'সম্পূর্ণ হালাল প্রক্রিয়ায় জবাই করা তাজা মাংস। পরিষ্কার, স্বাস্থ্যসম্মত ও সুস্বাদু।',         badge_text:'তাজা',         color_class:'red',   tags:['১০০% হালাল','তাজা','পরিষ্কার'] },
  { id:3, name_bn:'কোরবানির ছাগল',      description_bn:'ঈদুল আযহায় কোরবানির জন্য বিশেষভাবে প্রস্তুত বড় ও সুন্দর ছাগল। আগাম বুকিং করুন।',      badge_text:'বিশেষ অর্ডার', color_class:'gold',  tags:['আগাম বুকিং','কোরবানি উপযোগী'] },
];

function useFadeUp() {
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
  return ref;
}

export default function Products() {
  const { data: products } = useApi(getProducts);
  const items = products?.length ? products : defaultProducts;
  const headerRef = useFadeUp();

  return (
    <section id="products" style={{ background: '#fdf8f0', padding: '90px 5%' }}>
      {/* Header */}
      <div ref={headerRef} className="fade-up" style={{ textAlign: 'center', marginBottom: 60 }}>
        <span className="section-label">আমাদের পণ্য</span>
        <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, color: '#1a5c2e', marginBottom: 14 }}>
          তাজা ও হালাল পণ্যসমূহ
        </h2>
        <p style={{ fontSize: 16, color: '#4a6a4a', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          সরাসরি ফার্ম থেকে আপনার দরজায় — সর্বোচ্চ মান নিশ্চিত করে
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 28, maxWidth: 1100, margin: '0 auto',
      }}>
        {items.map((p) => (
          <div key={p.id} className="product-card">
            {/* Image area */}
            <div style={{
              height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80, position: 'relative', overflow: 'hidden',
              background: colorMap[p.color_class] || colorMap.green,
            }}>
              {p.image
                ? <img src={p.image} alt={p.name_bn} style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} />
                : <span>{emojiMap[p.color_class] || '🐐'}</span>
              }
              {p.badge_text && (
                <span style={{
                  position:'absolute', top:14, right:14,
                  background:'rgba(255,255,255,.2)', backdropFilter:'blur(6px)',
                  color:'#fff', fontSize:12, fontWeight:600,
                  padding:'4px 12px', borderRadius:20, letterSpacing:.5,
                }}>{p.badge_text}</span>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: '22px 24px 26px' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a5c2e', marginBottom: 8 }}>{p.name_bn}</h3>
              <p style={{ fontSize: 14, color: '#4a6a4a', lineHeight: 1.7, marginBottom: 18 }}>{p.description_bn}</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {(p.tags || []).map((tag, i) => (
                  <span key={i} style={{
                    fontSize:12, fontWeight:600, padding:'4px 12px',
                    borderRadius:20, background:'rgba(30,122,52,.1)', color:'#1e7a34',
                    border: '1px solid rgba(30,122,52,.18)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

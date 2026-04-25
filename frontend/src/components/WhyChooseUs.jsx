import { useEffect, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { getWhyChooseUs } from '../services/api';

const defaultItems = [
  { id:1, icon:'🌿', title_bn:'প্রাকৃতিক লালন-পালন', description_bn:'কোনো ক্ষতিকর কেমিক্যাল বা কৃত্রিম হরমোন ছাড়াই প্রাকৃতিক পরিবেশে পশু পালন করা হয়।' },
  { id:2, icon:'🕌', title_bn:'সম্পূর্ণ হালাল',       description_bn:'ইসলামিক নিয়ম মেনে সম্পূর্ণ হালাল প্রক্রিয়ায় পশু জবাই ও মাংস সরবরাহ করা হয়।' },
  { id:3, icon:'💰', title_bn:'ন্যায্য মূল্য',        description_bn:'বাজার মূল্যের তুলনায় সাশ্রয়ী ও সম্পূর্ণ ন্যায্য মূল্যে মানসম্পন্ন পণ্য সরবরাহ।' },
  { id:4, icon:'🚚', title_bn:'দ্রুত ডেলিভারি',       description_bn:'অর্ডার করলে দ্রুততম সময়ের মধ্যে আপনার পছন্দের স্থানে পৌঁছে দেওয়া হয়।' },
  { id:5, icon:'🤝', title_bn:'বিশ্বস্ততা',           description_bn:'প্রতিটি লেনদেনে সততা ও স্বচ্ছতা — আমাদের দীর্ঘদিনের গ্রাহকরাই আমাদের পরিচয়।' },
  { id:6, icon:'📞', title_bn:'সার্বক্ষণিক সেবা',     description_bn:'যেকোনো প্রশ্ন বা অর্ডারের জন্য আমরা সবসময় আপনার পাশে আছি।' },
];

export default function WhyChooseUs() {
  const { data: items } = useApi(getWhyChooseUs);
  const cards = items?.length ? items : defaultItems;
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

  return (
    <section id="why" style={{
      padding: '90px 5%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(150deg,#0a2e15 0%,#0f4423 50%,#1e7a34 100%)',
    }}>
      <div style={{ position:'absolute', fontSize:400, right:-80, top:-80, opacity:.04, pointerEvents:'none' }}>🌿</div>

      <div ref={ref} className="fade-up" style={{ textAlign:'center', marginBottom:60 }}>
        <span className="section-label">কেন আমরা?</span>
        <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#fff', marginBottom:14 }}>
          আমাদের বেছে নেওয়ার কারণ
        </h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,.6)', maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
          গ্রাহকের বিশ্বাসই আমাদের সবচেয়ে বড় পুরস্কার
        </p>
      </div>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))',
        gap:24, maxWidth:1100, margin:'0 auto',
      }}>
        {cards.map(item => (
          <div key={item.id} className="why-card">
            <span style={{ fontSize:38, marginBottom:18, display:'block' }}>{item.icon}</span>
            <h3 style={{ fontSize:18, fontWeight:700, color:'#fff', marginBottom:10 }}>{item.title_bn}</h3>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.6)', lineHeight:1.75 }}>{item.description_bn}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

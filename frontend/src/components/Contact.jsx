import { useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { getContactInfo, sendContactMessage } from '../services/api';

export default function Contact() {
  const { data: info } = useApi(getContactInfo);
  const ref = useRef(null);
  const [form, setForm]     = useState({ name:'', phone:'', product_type:'ছাগল ক্রয়', message:'' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('visible');
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus('');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name:'', phone:'', product_type:'ছাগল ক্রয়', message:'' });
    } catch { setStatus('error'); }
    finally { setLoading(false); }
  };

  const infoItems = [
    { icon:'📞', label:'ফোন নম্বর', value: [info?.phone_primary, info?.phone_secondary].filter(Boolean).join(', ') || '01718-867657, 01829-544486' },
    { icon:'📧', label:'ইমেইল',     value: info?.email || 'everfreshfarmbd@gmail.com' },
    { icon:'📍', label:'ঠিকানা',    value: info?.address_bn || 'পূর্ব ছিলোনিয়া, ছনুয়া, ফেনী' },
    { icon:'🕐', label:'সেবার সময়', value: info?.working_hours_bn || 'সকাল ৮টা – রাত ৯টা (প্রতিদিন)' },
  ];

  return (
    <section id="contact" style={{ background:'#fdf8f0', padding:'90px 5%' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <span className="section-label">যোগাযোগ</span>
        <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#1a5c2e', marginBottom:14 }}>আজই অর্ডার করুন</h2>
        <p style={{ fontSize:16, color:'#4a6a4a', maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>আমাদের সাথে যোগাযোগ করুন, আমরা সর্বদা প্রস্তুত</p>
      </div>

      <div
        ref={ref}
        className="fade-up"
        style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
          gap:60, maxWidth:1100, margin:'0 auto', alignItems:'start',
        }}
      >
        {/* Info column */}
        <div>
          <h2 style={{ fontSize:28, fontWeight:700, color:'#1a5c2e', marginBottom:14 }}>সরাসরি যোগাযোগ করুন</h2>
          <p style={{ fontSize:15, color:'#4a6a4a', lineHeight:1.8, marginBottom:30 }}>
            অর্ডার বা যেকোনো তথ্যের জন্য নিচের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।
          </p>
          {infoItems.map((item, i) => (
            <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:20 }}>
              <div style={{
                width:44, height:44, flexShrink:0, background:'#1a5c2e',
                borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
              }}>{item.icon}</div>
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#e8620a', letterSpacing:1, marginBottom:3, textTransform:'uppercase' }}>
                  {item.label}
                </label>
                <span style={{ fontSize:15, color:'#1a2e1a', fontWeight:500 }}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background:'#fff', borderRadius:20, padding:36, boxShadow:'0 4px 30px rgba(0,0,0,.07)' }}>
          <h3 style={{ fontSize:20, fontWeight:700, color:'#1a5c2e', marginBottom:24 }}>✉️ মেসেজ পাঠান</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1a2e1a', marginBottom:7 }}>আপনার নাম</label>
                <input type="text" className="form-input" placeholder="নাম লিখুন"
                  value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1a2e1a', marginBottom:7 }}>ফোন নম্বর</label>
                <input type="tel" className="form-input" placeholder="01XXXXXXXXX"
                  value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} required />
              </div>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1a2e1a', marginBottom:7 }}>পণ্যের ধরন</label>
              <select className="form-input" value={form.product_type} onChange={e => setForm({...form, product_type:e.target.value})}>
                <option>ছাগল ক্রয়</option>
                <option>মাংস ক্রয়</option>
                <option>কোরবানির ছাগল বুকিং</option>
                <option>অন্যান্য</option>
              </select>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1a2e1a', marginBottom:7 }}>বার্তা</label>
              <textarea className="form-input" placeholder="আপনার প্রয়োজনীয়তা জানান..." rows={4}
                value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                style={{ resize:'vertical', minHeight:110 }} />
            </div>

            {status === 'success' && (
              <div style={{ marginBottom:16, padding:12, borderRadius:8, fontSize:14, fontWeight:500, background:'#dcfce7', color:'#166534' }}>
                ✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!
              </div>
            )}
            {status === 'error' && (
              <div style={{ marginBottom:16, padding:12, borderRadius:8, fontSize:14, fontWeight:500, background:'#fee2e2', color:'#991b1b' }}>
                ❌ বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:'100%', padding:14, border:'none', borderRadius:10, cursor:'pointer',
              background:'linear-gradient(135deg,#2a8a45,#1a5c2e)',
              color:'#fff', fontSize:16, fontWeight:600,
              fontFamily:'inherit', boxShadow:'0 8px 24px rgba(26,92,46,.3)',
              transition:'transform .2s, box-shadow .2s',
              opacity: loading ? .7 : 1,
            }}>
              {loading ? '⏳ পাঠানো হচ্ছে...' : '📨 মেসেজ পাঠান'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useApi } from '../hooks/useApi';
import { getSiteSettings, getContactInfo } from '../services/api';

export default function Footer() {
  const { data: settings } = useApi(getSiteSettings);
  const { data: info }     = useApi(getContactInfo);

  return (
    <footer id="footer" style={{ background:'linear-gradient(160deg,#0a2e15 0%,#0f4423 100%)', padding:'60px 5% 30px', borderTop:'3px solid transparent', borderImage:'linear-gradient(90deg,#d42016,#f07318,#3daf60) 1' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:50, maxWidth:1100, margin:'0 auto 40px', flexWrap:'wrap' }}>

        {/* Brand */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
            <img
              src={settings?.logo || `${import.meta.env.BASE_URL}logo.png`}
              alt="এভার ফ্রেশ ফার্ম"
              style={{ height:86, width:'auto', maxWidth:220, objectFit:'contain', display:'block', filter:'drop-shadow(0 2px 10px rgba(0,0,0,.4))' }}
            />
            <div style={{ lineHeight:1.3 }}>
              <div style={{ color:'#fff', fontSize:20, fontWeight:700, fontFamily:"'Hind Siliguri', sans-serif" }}>
                এভার ফ্রেশ ফার্ম
              </div>
              <small style={{ color:'rgba(255,255,255,.45)', fontSize:11, letterSpacing:1 }}>
                EVER FRESH FARM
              </small>
            </div>
          </div>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.8, maxWidth:300 }}>
            {settings?.footer_text || 'বিসমিল্লাহির রাহমানির রাহিম। প্রাণীজ আমিষ উৎপাদন ও সরবরাহে বিশ্বস্ততার নাম — এভার ফ্রেশ ফার্ম। Inshaf Brings Happiness 🌿'}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize:14, fontWeight:700, color:'#fff', letterSpacing:1, textTransform:'uppercase', marginBottom:18, paddingBottom:10, borderBottom:'2px solid rgba(255,255,255,.1)' }}>
            দ্রুত লিংক
          </h4>
          <ul style={{ listStyle:'none', margin:0, padding:0 }}>
            {[['#hero','🏠 হোম'],['#about','ℹ️ আমাদের সম্পর্কে'],['#products','🐐 পণ্যসমূহ'],['#gallery','🖼️ গ্যালারি'],['#contact','📞 যোগাযোগ']].map(([href,label]) => (
              <li key={href} style={{ marginBottom:10 }}>
                <a href={href} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none', fontSize:14, transition:'color .2s' }}
                  onMouseEnter={e => e.target.style.color='#e8620a'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,.55)'}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize:14, fontWeight:700, color:'#fff', letterSpacing:1, textTransform:'uppercase', marginBottom:18, paddingBottom:10, borderBottom:'2px solid rgba(255,255,255,.1)' }}>
            যোগাযোগ
          </h4>
          <ul style={{ listStyle:'none', margin:0, padding:0 }}>
            {info?.phone_primary && (
              <li style={{ marginBottom:10 }}>
                <a href={`tel:${info.phone_primary}`} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none', fontSize:14 }}>📞 {info.phone_primary}</a>
              </li>
            )}
            {info?.phone_secondary && (
              <li style={{ marginBottom:10 }}>
                <a href={`tel:${info.phone_secondary}`} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none', fontSize:14 }}>📞 {info.phone_secondary}</a>
              </li>
            )}
            {info?.email && (
              <li style={{ marginBottom:10 }}>
                <a href={`mailto:${info.email}`} style={{ color:'rgba(255,255,255,.55)', textDecoration:'none', fontSize:14 }}>📧 Gmail</a>
              </li>
            )}
            <li>
              <span style={{ color:'rgba(255,255,255,.55)', fontSize:14 }}>📍 ফেনী, বাংলাদেশ</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:24,
        display:'flex', justifyContent:'space-between', alignItems:'center',
        flexWrap:'wrap', gap:12, maxWidth:1100, margin:'0 auto',
      }}>
        <p style={{ fontSize:13, color:'rgba(255,255,255,.4)' }}>
          © ২০২৫ এভার ফ্রেশ ফার্ম। সর্বস্বত্ব সংরক্ষিত। Inshaf Brings Happiness 🌿{' '}|{' '}
          Design & Developed by{' '}
          <a href="https://www.shohozit.com" target="_blank" rel="noopener noreferrer" style={{ color:'#f07318', textDecoration:'none', fontWeight:600 }}>shohozit.com</a>
        </p>
        <div style={{ display:'flex', gap:10 }}>
          {[
            { href: settings?.facebook_url  || '#', e:'📘' },
            { href: settings?.whatsapp_url  || '#', e:'💬' },
            { href: settings?.instagram_url || '#', e:'📸' },
          ].map((s, i) => (
            <a key={i} href={s.href} style={{
              width:36, height:36, background:'rgba(255,255,255,.08)',
              borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, textDecoration:'none', transition:'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#e8620a'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.08)'}
            >{s.e}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

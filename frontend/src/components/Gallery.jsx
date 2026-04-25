import { useState, useEffect, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { getGalleryImages, getGalleryVideos } from '../services/api';

const bgColors = [
  'linear-gradient(135deg,#1a5c2e,#3aaa5e)',
  'linear-gradient(135deg,#5a3800,#c09000)',
  'linear-gradient(135deg,#8b1a1a,#c0271a)',
  'linear-gradient(135deg,#1a4a5c,#2a7a8a)',
  'linear-gradient(135deg,#3a2a1a,#7a5a3a)',
];
const defaultEmojis = ['🐐','🌾','🥩','🌿','🏡'];
const defaultCaptions = ['ছাগলের পাল','প্রাকৃতিক পরিবেশ','তাজা মাংস','সবুজ ফার্ম','ফার্মহাউস'];

function getYouTubeEmbed(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default function Gallery() {
  const { data: images } = useApi(getGalleryImages);
  const { data: videos } = useApi(getGalleryVideos);
  const [lightbox, setLightbox] = useState(null);
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

  const galleryItems = images?.length
    ? images
    : Array.from({ length: 5 }, (_, i) => ({ id: i, image: null, caption_bn: defaultCaptions[i] }));

  return (
    <section id="gallery" style={{ background: '#fff', padding: '90px 5%' }}>
      <div ref={ref} className="fade-up" style={{ textAlign:'center', marginBottom:60 }}>
        <span className="section-label">গ্যালারি</span>
        <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#1a5c2e', marginBottom:14 }}>ফার্মের দৃশ্য</h2>
        <p style={{ fontSize:16, color:'#4a6a4a', maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>আমাদের ফার্ম ও পণ্যের একটি ঝলক</p>
      </div>

      {/* Image Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 200px)',
        gap: 16, maxWidth: 1100, margin: '0 auto 48px',
      }}>
        {galleryItems.map((img, i) => (
          <div
            key={img.id ?? i}
            className="gallery-item"
            style={{
              gridRow: i === 0 ? 'span 2' : undefined,
              background: bgColors[i % bgColors.length],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: i === 0 ? 72 : 48,
            }}
            onClick={() => img.image && setLightbox({ type: 'image', src: img.image })}
          >
            {img.image
              ? <img src={img.image} alt={img.caption_bn || ''} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              : <span>{defaultEmojis[i % defaultEmojis.length]}</span>
            }
            <div className="gallery-overlay">
              <span className="gallery-label">{img.caption_bn}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Gallery */}
      {videos?.length > 0 && (
        <>
          <h3 style={{ textAlign:'center', fontSize:24, fontWeight:700, color:'#1a5c2e', marginBottom:24 }}>ভিডিও গ্যালারি</h3>
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
            gap:24, maxWidth:1100, margin:'0 auto',
          }}>
            {videos.map(v => {
              const embedUrl = getYouTubeEmbed(v.video_url);
              return (
                <div
                  key={v.id}
                  className="gallery-item"
                  style={{ background:'#1a5c2e', minHeight:200, display:'flex', flexDirection:'column' }}
                  onClick={() => embedUrl && setLightbox({ type:'video', src:embedUrl })}
                >
                  {v.thumbnail
                    ? <img src={v.thumbnail} alt={v.title_bn} style={{ width:'100%', height:200, objectFit:'cover' }} />
                    : <div style={{ height:200, display:'flex', alignItems:'center', justifyContent:'center', fontSize:60 }}>🎥</div>
                  }
                  <div className="gallery-overlay" style={{ alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:48 }}>▶️</span>
                  </div>
                  {v.title_bn && (
                    <div style={{ padding:12, background:'#fff' }}>
                      <p style={{ fontSize:14, fontWeight:500, color:'#1a5c2e' }}>{v.title_bn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:'fixed', inset:0, zIndex:9999,
            background:'rgba(0,0,0,.92)',
            display:'flex', alignItems:'center', justifyContent:'center', padding:16,
          }}
        >
          <button onClick={() => setLightbox(null)} style={{
            position:'absolute', top:20, right:20, color:'#fff',
            fontSize:40, background:'none', border:0, cursor:'pointer', lineHeight:1,
          }}>×</button>
          {lightbox.type === 'image'
            ? <img src={lightbox.src} onClick={e => e.stopPropagation()}
                style={{ maxWidth:'100%', maxHeight:'90vh', borderRadius:12 }} />
            : <iframe src={lightbox.src} onClick={e => e.stopPropagation()}
                style={{ width:'min(800px,100%)', aspectRatio:'16/9', borderRadius:12, border:0 }}
                allow="autoplay; fullscreen" allowFullScreen />
          }
        </div>
      )}
    </section>
  );
}

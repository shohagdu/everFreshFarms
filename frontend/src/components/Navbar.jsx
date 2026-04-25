import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { getSiteSettings } from '../services/api';

export default function Navbar() {
  const { data: settings } = useApi(getSiteSettings);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#hero',     label: 'হোম' },
    { href: '#about',    label: 'আমাদের সম্পর্কে' },
    { href: '#products', label: 'পণ্যসমূহ' },
    { href: '#why',      label: 'কেন আমরা?' },
    { href: '#gallery',  label: 'গ্যালারি' },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(10,46,21,0.98)' : 'rgba(10,46,21,0.92)',
        backdropFilter: 'blur(14px)',
        padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? '58px' : '72px',
        boxShadow: scrolled ? '0 6px 30px rgba(0,0,0,.4)' : '0 4px 20px rgba(0,0,0,.2)',
        borderBottom: '1px solid rgba(61,175,96,.2)',
        transition: 'height .3s, box-shadow .3s, background .3s',
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img
          src={settings?.logo || `${import.meta.env.BASE_URL}logo.png`}
          alt="এভার ফ্রেশ ফার্ম"
          style={{ height: 68, width: 'auto', maxWidth: 200, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.35))' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Hind Siliguri', sans-serif" }}>
            এভার ফ্রেশ ফার্ম
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: 1 }}>
            EVER FRESH FARM
          </span>
        </div>
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', alignItems: 'center', gap: 6, listStyle: 'none', margin: 0 }}
          className="hidden-mobile">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className="nav-link">{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{
            background: 'linear-gradient(135deg,#f07318,#d42016)',
            color: '#fff', textDecoration: 'none',
            borderRadius: 10, padding: '8px 20px', fontWeight: 700, fontSize: 15,
            boxShadow: '0 4px 16px rgba(212,32,22,.4)',
            transition: 'transform .2s, box-shadow .2s',
          }}>যোগাযোগ করুন</a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="show-mobile"
        style={{ display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: 4, background: 'none', border: 0 }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2 }} />
        <span style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2 }} />
        <span style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2 }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#1a5c2e', padding: 20, display: 'flex',
          flexDirection: 'column', gap: 4, zIndex: 999,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 15, padding: '8px 12px', borderRadius: 6 }}
              onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact"
            style={{ background: '#e8620a', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 600, fontSize: 15, padding: '10px 12px', borderRadius: 8, marginTop: 4 }}
            onClick={() => setMenuOpen(false)}>যোগাযোগ করুন</a>
        </div>
      )}
    </nav>
  );
}

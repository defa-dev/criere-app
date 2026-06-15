'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`header ${hasScrolled ? 'header-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#FFFFFF',
        boxShadow: hasScrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
        padding: 'var(--space-sm) var(--space-md)',
        transition: 'box-shadow 0.2s ease'
      }}
    >
      {/* Logo */}
      <div className="logo" style={{ marginLeft: 'var(--space-md)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-adumu)',
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--color-primary)',
            letterSpacing: '0.06em'
          }}>
            CRIERÊ
          </span>
        </Link>
      </div>

      {/* Navigation - Desktop */}
      <nav className="nav-desktop" style={{ display: 'none' }}>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: pathname === item.href ? '600' : '400',
                  color: pathname === item.href ? 'var(--color-primary)' : 'var(--color-text-body)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.label}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: '400',
                  color: 'var(--color-text-body)',
                  opacity: 0.35,
                  cursor: 'default',
                }}
              >
                {item.label}
              </span>
            )
          )}
        </div>
      </nav>

      {/* CTAs - Desktop */}
      <div className="nav-ctas" style={{ display: 'none', gap: 'var(--space-sm)' }}>
        <Link href="/doacao" className="btn btn-primary">
          Doe agora
        </Link>
        <Link href="/participe" className="btn btn-ghost-blue">
          Participe
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '22px',
          color: 'var(--color-text-body)'
        }}
      >
        <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--color-trust)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: 'var(--space-xs)',
            padding: 'var(--space-xl) var(--space-lg)',
            zIndex: 1000
          }}
        >
          <button
            onClick={toggleMenu}
            aria-label="Fechar menu"
            style={{
              position: 'absolute',
              top: 'var(--space-sm)',
              right: 'var(--space-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>

          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '52px', fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: '600', color: 'white', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '52px', fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: '600', color: 'white', opacity: 0.35 }}
              >
                {item.label}
              </span>
            )
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
            <Link href="/doacao" className="btn btn-primary btn-block-mobile" onClick={() => setIsMenuOpen(false)}>
              Doe agora
            </Link>
            <Link href="/participe" className="btn btn-ghost-white btn-block-mobile" onClick={() => setIsMenuOpen(false)}>
              Participe
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .nav-desktop {
            display: flex !important;
          }

          .nav-ctas {
            display: flex !important;
          }

          .mobile-menu-btn {
            display: none !important;
          }
        }

        .nav-link:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </header>
  )
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Faça Parte', href: '/participe' },
  { label: 'Blog', href: null },
  { label: 'Contribua', href: '/doacao' },
]

'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-trust)', color: '#FFFFFF' }}>
      <div className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        {/* Grid principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-lg)'
        }}>
          {/* Coluna 1 - Identidade */}
          <div>
            <span style={{
              fontFamily: 'var(--font-adumu)',
              fontSize: '36px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '0.06em',
              display: 'block',
              marginBottom: 'var(--space-sm)'
            }}>
              CRIERÊ
            </span>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              marginBottom: 'var(--space-md)',
              fontStyle: 'italic',
              opacity: 0.85
            }}>
              &ldquo;Vem sonhar com a gente&rdquo;
            </p>

            {/* Redes Sociais */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://instagram.com/projeto.criere"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <img src="/images/hero/ig.png" alt="Instagram" style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
              </a>
              <a
                href="https://wa.me/5511947481846"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <img src="/images/hero/wpp.png" alt="WhatsApp" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Navegação */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-adumu)',
              fontSize: 'var(--text-h4)',
              fontWeight: '600',
              marginBottom: 'var(--space-md)'
            }}>
              Navegação
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}>
                Home
              </Link>
              <Link href="/#sobre" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}>
                Sobre
              </Link>
              <Link href="/participe" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}>
                Faça Parte
              </Link>
            </nav>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-adumu)',
              fontSize: 'var(--text-h4)',
              fontWeight: '600',
              marginBottom: 'var(--space-md)'
            }}>
              Contato
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div>
                <a
                  href="mailto:projeto.criere@gmail.com"
                  style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}
                >
                  projeto.criere@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+5511947481846"
                  style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}
                >
                  (11) 94748-1846
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/projeto.criere"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}
                >
                  @projeto.criere
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
                <span style={{ fontSize: '16px' }}>📍</span>
                <address style={{
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body)',
                  fontStyle: 'normal',
                  lineHeight: '1.4',
                  opacity: 0.85
                }}>
                  CEU Butantã<br />
                  São Paulo — SP
                </address>
              </div>
            </div>
          </div>

          {/* Coluna 4 - CTA Final */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-adumu)',
              fontSize: 'var(--text-h4)',
              fontWeight: '600',
              marginBottom: 'var(--space-md)'
            }}>
              Faça a diferença
            </h4>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              marginBottom: 'var(--space-md)',
              lineHeight: '1.5',
              opacity: 0.85
            }}>
              Cada doação, cada hora voluntária, cada sorriso — tudo isso é Crierê.
            </p>
            <Link
              href="/participe"
              className="btn btn-ghost-white"
            >
              Seja voluntário
            </Link>
          </div>
        </div>

        {/* Separator */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.2)',
          margin: 'var(--space-lg) 0'
        }}></div>

        {/* Rodapé inferior */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', margin: 0, opacity: 0.7 }}>
            © {new Date().getFullYear()} Projeto Crierê. Todos os direitos reservados.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', margin: 0, opacity: 0.7 }}>
            Feito com ♥ em São Paulo
          </p>
        </div>
      </div>

      <style jsx>{`
        footer a:hover {
          opacity: 1 !important;
          color: var(--color-primary) !important;
        }
      `}</style>
    </footer>
  )
}

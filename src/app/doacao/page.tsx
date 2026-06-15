'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import FooterNew from '@/components/FooterNew'
import { redirect } from '@/lib/navigate'

const VALORES = [30, 50, 100]
const WA = '5511947481846'

function waLink(valor: number | string) {
  const msg = `Olá! Quero fazer uma doação mensal de R$${valor} para o Crierê.`
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        marginLeft: 'auto',
        flexShrink: 0,
        background: copied ? 'var(--color-primary)' : '#ffffff',
        color: copied ? '#ffffff' : 'var(--color-trust)',
        border: '1px solid',
        borderColor: copied ? 'var(--color-primary)' : 'var(--color-trust)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px 10px',
        fontSize: 'var(--text-small)',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}

const STATUS_MSG = {
  sucesso: { bg: '#d1fae5', cor: '#065f46', texto: '🎉 Doação confirmada! Muito obrigado pelo seu apoio ao Crierê.' },
  pendente: { bg: '#fef9c3', cor: '#854d0e', texto: '⏳ Pagamento em processamento. Te avisamos assim que confirmar.' },
  erro:    { bg: '#fee2e2', cor: '#991b1b', texto: '❌ Algo deu errado no pagamento. Tente novamente ou use o PIX.' },
}

function StatusBanner() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status') as keyof typeof STATUS_MSG | null
  if (!status || !STATUS_MSG[status]) return null
  const { bg, cor, texto } = STATUS_MSG[status]
  return (
    <div style={{ background: bg, color: cor, padding: 'var(--space-sm) var(--space-md)', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: '500' }}>
      {texto}
    </div>
  )
}

export default function DoeAgora() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [tipo, setTipo] = useState<'pontual' | 'mensal'>('pontual')
  const [valorCustom, setValorCustom] = useState('')
  const [mostrarCustom, setMostrarCustom] = useState(false)
  const [loadingValor, setLoadingValor] = useState<number | string | null>(null)

  async function iniciarPagamento(valor: number | string) {
    setLoadingValor(valor)
    try {
      const res = await fetch('/api/criar-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: Number(valor) }),
      })
      const data = await res.json()
      redirect(data.url)
    } catch {
      setLoadingValor(null)
    }
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Suspense>
        <StatusBanner />
      </Suspense>

      {/* Barra de aviso */}
      {bannerVisible && (
        <div style={{
          background: 'var(--color-primary)',
          color: '#ffffff',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '8px 48px',
          flexShrink: 0,
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: '500', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
            🎉 Campanha de Festa Junina em andamento — cada doação leva alegria para nossas crianças
          </p>
          <button
            onClick={() => setBannerVisible(false)}
            aria-label="Fechar aviso"
            style={{
              position: 'absolute',
              right: 'var(--space-md)',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <Header />

      {/* Hero Split */}
      <section className="doe-section">

        {/* Esquerda: título e contexto */}
        <div className="doe-text">
          <p className="doe-eyebrow">Faça a diferença</p>
          <h1 className="doe-h1">
            Cada criança<br />merece um<br />sonho real.
          </h1>
          <p className="doe-sub">
            O Crierê oferece reforço escolar, oficinas de cultura e afeto para crianças em vulnerabilidade em São Paulo. Sua doação sustenta tudo isso.
          </p>
        </div>

        {/* Direita: imagem emocional */}
        <div className="doe-media">
          <div className="doe-frame">
            <div className="doe-frame-back" />
            <img
              src="/images/galeria/yuri.jpeg"
              alt="Criança participando do projeto Crierê"
              className="doe-frame-img"
            />
          </div>
        </div>

        {/* Botões de doação rápida */}
        <div className="doe-buttons">

          {/* Toggle Mensal / Pontual */}
          <div style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: '999px', padding: '4px', gap: '4px', alignSelf: 'flex-start', marginBottom: 'var(--space-md)' }}>
            {(['pontual', 'mensal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { if (t === 'mensal') return; setTipo(t); setMostrarCustom(false); setValorCustom('') }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  fontWeight: tipo === t ? '600' : '400',
                  padding: '6px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: t === 'mensal' ? 'not-allowed' : 'pointer',
                  background: tipo === t ? '#ffffff' : 'transparent',
                  color: tipo === t ? 'var(--color-trust)' : 'var(--color-text-secondary)',
                  boxShadow: tipo === t ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                  opacity: t === 'mensal' ? 0.4 : 1,
                  transition: 'all 0.18s ease',
                }}
              >
                {t === 'pontual' ? 'Pontual' : 'Mensal'}
              </button>
            ))}
          </div>

          {tipo === 'pontual' ? (
            <>
              {/* Valores pré-definidos — MP Checkout */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                {VALORES.map((v) => (
                  <button
                    key={v}
                    onClick={() => iniciarPagamento(v)}
                    disabled={loadingValor !== null}
                    className="btn btn-primary doe-pick"
                    style={{ opacity: loadingValor !== null && loadingValor !== v ? 0.5 : 1 }}
                  >
                    {loadingValor === v ? '...' : `R$${v}`}
                  </button>
                ))}
                <button
                  onClick={() => setMostrarCustom(!mostrarCustom)}
                  disabled={loadingValor !== null}
                  className="btn btn-ghost-blue doe-pick"
                >
                  Outro valor
                </button>
              </div>

              {mostrarCustom && (
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: '600', fontSize: 'var(--text-body)' }}>R$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Valor"
                      value={valorCustom}
                      onChange={(e) => setValorCustom(e.target.value)}
                      className="input"
                      style={{ width: '110px' }}
                    />
                  </div>
                  <button
                    onClick={() => valorCustom && iniciarPagamento(valorCustom)}
                    disabled={!valorCustom || loadingValor !== null}
                    className="btn btn-primary"
                    style={{ opacity: valorCustom ? 1 : 0.4 }}
                  >
                    {loadingValor === valorCustom ? '...' : 'Continuar'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Mensal — via WhatsApp por enquanto */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                {VALORES.map((v) => (
                  <a
                    key={v}
                    href={waLink(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary doe-pick"
                  >
                    R${v}
                  </a>
                ))}
                <button
                  onClick={() => setMostrarCustom(!mostrarCustom)}
                  className="btn btn-ghost-blue doe-pick"
                >
                  Outro valor
                </button>
              </div>

              {mostrarCustom && (
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: '600', fontSize: 'var(--text-body)' }}>R$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Valor"
                      value={valorCustom}
                      onChange={(e) => setValorCustom(e.target.value)}
                      className="input"
                      style={{ width: '110px' }}
                    />
                  </div>
                  <a
                    href={valorCustom ? waLink(valorCustom) : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ opacity: valorCustom ? 1 : 0.4, pointerEvents: valorCustom ? 'auto' : 'none' }}
                  >
                    Continuar
                  </a>
                </div>
              )}

              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-sm) 0' }}>
                Você será redirecionado ao WhatsApp para combinarmos os detalhes da doação recorrente.
              </p>
            </>
          )}

          {/* PIX inline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-sm) var(--space-md)',
            marginTop: 'var(--space-sm)',
            maxWidth: '380px',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🏦</span>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: '600', color: 'var(--color-trust)', margin: '0 0 2px 0' }}>
                Chave PIX
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-secondary)', margin: 0, wordBreak: 'break-all' }}>
                projeto.criere@gmail.com
              </p>
            </div>
            <CopyButton text="projeto.criere@gmail.com" />
          </div>

        </div>
      </section>

      {/* Por que o Crierê? */}
      <section style={{ background: 'var(--color-surface)', padding: 'var(--space-xl) 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', color: 'var(--color-trust)', textAlign: 'center', margin: '0 0 var(--space-xl) 0' }}>
            Por que o Crierê?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-lg)', maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                icon: '📊',
                titulo: 'Impacto real e mensurável',
                texto: '85% dos responsáveis relatam melhora no desempenho escolar. Cada tutor acompanha o mesmo aluno ao longo do tempo — e isso faz toda a diferença.',
              },
              {
                icon: '🥁',
                titulo: 'Educação e cultura, juntas',
                texto: 'Não é só reforço escolar. São oficinas de capoeira, rap, teatro e arte que dizem para cada criança: a sua história importa.',
              },
              {
                icon: '🤝',
                titulo: 'Para quem mais precisa',
                texto: 'Atendemos crianças da rede pública em áreas de vulnerabilidade em São Paulo — de graça, com cuidado, com afeto.',
              },
            ].map((item) => (
              <div key={item.titulo} style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-sm)' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h4)', color: 'var(--color-trust)', margin: '0 0 var(--space-sm) 0' }}>
                  {item.titulo}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {item.texto}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
            <a
              href="https://docs.google.com/spreadsheets/d/1vxpflwV6guXpSQv4_x0SKsg4X_PWNEUM/edit?usp=sharing&ouid=104496602751597600494&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="doe-link"
            >
              Veja como usamos cada centavo →
            </a>
          </div>
        </div>
      </section>

      <FooterNew />

      <style jsx>{`
        .doe-section {
          display: grid;
          grid-template-areas:
            "text  media"
            "buttons media";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr;
          flex: 1;
          min-height: calc(100svh - 57px);
        }
        .doe-text {
          grid-area: text;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-xl) var(--space-xl) var(--space-lg) var(--space-xl);
        }
        .doe-media {
          grid-area: media;
          background: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl);
        }
        .doe-frame {
          position: relative;
          width: 100%;
          max-width: 540px;
        }
        .doe-frame-back {
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          border-radius: var(--radius-lg);
          transform: rotate(5deg);
          opacity: 0.35;
        }
        .doe-frame-img {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: center 20%;
          border-radius: var(--radius-lg);
          transform: rotate(-2deg);
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          display: block;
        }
        .doe-buttons {
          grid-area: buttons;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: var(--space-lg) var(--space-xl) var(--space-xl) var(--space-xl);
        }
        .doe-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-eyebrow);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-primary);
          font-weight: 600;
          margin: 0 0 var(--space-sm) 0;
        }
        .doe-h1 {
          font-family: var(--font-adumu);
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          font-weight: 700;
          color: var(--color-trust);
          line-height: 1.15;
          margin: 0 0 var(--space-md) 0;
        }
        .doe-sub {
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
          max-width: 440px;
        }
        .doe-pick {
          font-size: 1.05rem;
          min-width: 88px;
          text-align: center;
        }
        .doe-link {
          display: inline-block;
          margin-top: var(--space-sm);
          font-family: var(--font-body);
          font-size: var(--text-small);
          color: var(--color-text-secondary);
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .doe-link:hover {
          opacity: 1;
        }
        @media (max-width: 767px) {
          .doe-section {
            grid-template-areas:
              "text"
              "media"
              "buttons";
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: auto;
          }
          .doe-text {
            padding: var(--space-lg) var(--space-md) var(--space-md);
            justify-content: flex-start;
          }
          .doe-media {
            padding: var(--space-lg) var(--space-md);
          }
          .doe-frame {
            width: 92%;
            max-width: 440px;
          }
          .doe-buttons {
            padding: var(--space-md) var(--space-md) var(--space-xl);
          }
          .doe-h1 {
            font-size: clamp(1.75rem, 8vw, 2.5rem);
          }
        }
      `}</style>
    </div>
  )
}

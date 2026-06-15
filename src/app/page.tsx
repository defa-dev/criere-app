'use client'

import Header from '@/components/Header'
import FooterNew from '@/components/FooterNew'
import Carousel from '@/components/Carousel'

const CAROUSEL_SLIDES = [
  { foto: '/images/galeria/capuera.png',      titulo: 'Acolhimento e escuta' },
  { foto: '/images/galeria/bibi-miguel.jpeg', titulo: 'Reforço individual' },
  { foto: '/images/galeria/pedron.jpeg',      titulo: 'Cultura e celebrações' },
  { foto: '/images/galeria/vero.jpeg',        titulo: 'Melhoria escolar' },
]

function MobileCarousel() {
  return (
    <div className="mobile-carousel">
      <Carousel ariaLabel="Galeria de atividades do Crierê" autoPlayMs={4000}>
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div key={i} className="bento-carousel-card">
            <img
              src={slide.foto}
              alt={slide.titulo}
              className="bento-carousel-img"
              style={{ objectPosition: slide.foto.includes('pedron') ? 'center 20%' : 'center' }}
            />
            <div className="bento-carousel-overlay" />
            <h3 className="bento-carousel-title">{slide.titulo}</h3>
          </div>
        ))}
      </Carousel>

      <style jsx>{`
        .mobile-carousel {
          display: none;
          width: 100%;
          margin-top: var(--space-md);
        }

        @media (max-width: 767px) {
          .mobile-carousel { display: block; }
        }

        .bento-carousel-card {
          position: relative;
          width: min(82vw, 340px);
          height: 380px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bento-carousel-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .bento-carousel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
          z-index: 1;
        }

        .bento-carousel-title {
          position: relative;
          z-index: 2;
          font-family: var(--font-body);
          font-size: var(--text-h4);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 var(--space-lg) 0;
          text-align: center;
          padding: 0 var(--space-sm);
        }
      `}</style>
    </div>
  )
}

function BentoCard({ foto, cor, flex, children, padding = 'var(--space-md)', bgSize = 'cover', bgPosition = 'center' }: {
  foto?: string
  cor: string
  flex: number
  children: React.ReactNode
  padding?: string
  bgSize?: string
  bgPosition?: string
}) {
  return (
    <div className="bento-card" style={{
      flex,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: foto ? 'flex-end' : 'center',
      alignItems: 'center',
      padding,
      textAlign: 'center',
      background: foto ? 'transparent' : cor,
      backgroundImage: foto ? `url(${foto})` : undefined,
      backgroundSize: bgSize,
      backgroundPosition: bgPosition,
    }}>
      {foto && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      )}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {children}
      </div>

      <style jsx>{`
        .bento-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        @media (min-width: 768px) {
          .bento-card:hover {
            transform: scale(1.05);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
            z-index: 5;
          }
        }
      `}</style>
    </div>
  )
}

export default function Home() {
  const testimonials = [
    {
      text: 'O projeto tem trazido muitos benefícios para o meu filho. Percebo avanços na confiança, na socialização e na forma como ele se expressa. Agradecemos o time Crierê por tudo e por tanto.',
      author: 'Mãe do Miguel Rodrigues',
      initial: 'M',
      color: 'var(--color-trust)'
    },
    {
      text: 'Minha filha é autista e sempre retorna das atividades do Crierê mais feliz e sociável. Melhorou muito na escola. Os tutores são maravilhosos.',
      author: 'Mãe da Melina Ramos',
      initial: 'M',
      color: 'var(--color-primary)'
    },
    {
      text: 'O projeto incentiva os estudos e fica nas dificuldades do aluno sem deixar de destacar também seus pontos fortes.',
      author: 'Pai do Arthur Camargo',
      initial: 'A',
      color: 'var(--color-accent)'
    },
    {
      text: 'Observei uma melhora nas matérias no geral. Ele está mais empenhado e participativo.',
      author: 'Mãe do Lucas Figueiredo',
      initial: 'L',
      color: 'var(--color-trust)'
    },
    {
      text: 'O Crierê sempre ajudou Yuri. Não só em disciplina, mas também na área comportamental.',
      author: 'Tia do Yuri Brandão',
      initial: 'Y',
      color: 'var(--color-primary)'
    },
    {
      text: 'O cuidado com as crianças é sem comentários. Sou muito grata — minha filha teve um desempenho escolar maravilhoso.',
      author: 'Mãe da Sarah Bispo',
      initial: 'S',
      color: 'var(--color-accent)'
    }
  ]

  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      lineHeight: 1.6,
      color: 'var(--color-text-body)'
    }}>
      <Header />

      {/* Hero Section with Bento Grid */}
      <section style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-xl) 0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header Content - Ocupa 55% */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'var(--space-lg)',
            maxWidth: '900px',
            margin: '0 auto var(--space-lg) auto',
            flex: '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
           
            {/* H1 */}
            <h1 className="text-display" style={{
              marginBottom: 'var(--space-md)',
              color: 'var(--color-trust)',
              fontFamily: 'var(--font-adumu)'
            }}>
              Vem sonhar com a gente!
            </h1>

            {/* Parágrafo de apoio */}
            <p className="text-body" style={{
              marginBottom: 'var(--space-lg)',
              maxWidth: '1000px',
              margin: '0 auto var(--space-sm) auto'
            }}>
              Nos ajude a oferecer um espaço seguro, acolhedor e inspirador onde crianças e adolescentes têm acesso gratuito a reforço escolar, oficinas de cultura e atividades de reflexão, conduzidas por uma equipe comprometida com a transformação social por meio do conhecimento, da escuta e do cuidado.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-sm)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="/participe" className="btn btn-primary btn-block-mobile">
                Participe
              </a>
            </div>
          </div>

          {/* Bento Grid em formato U */}
          <div className="bento-grid-u" style={{
            display: 'flex',
            gap: 'var(--space-md)',
            height: '440px',
            maxWidth: '960px',
            margin: '0 auto',
            width: '100%'
          }}>

            {/* Coluna 1 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <BentoCard flex={2} cor="var(--color-trust)" foto="/images/galeria/capuera.png">
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-h4)', fontWeight: '600', color: '#ffffff', margin: 0 }}>
                  Acolhimento e escuta
                </h3>
              </BentoCard>
              <BentoCard flex={1} cor="var(--color-trust)" padding="var(--space-sm)">
                <div style={{ fontSize: '24px', marginBottom: 'var(--space-xs)' }}>📍</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: '#ffffff', margin: 0, fontWeight: '600' }}>Gratuito no CEU Butantã</p>
              </BentoCard>
            </div>

            {/* Coluna 2 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ flex: 1 }}></div>
              <BentoCard flex={2} cor="var(--color-primary)" foto="/images/galeria/bibi-miguel.jpeg">
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-h4)', fontWeight: '600', color: '#ffffff', margin: 0 }}>
                  Reforço individual
                </h3>
              </BentoCard>
            </div>

            {/* Coluna 3 - só card no fundo */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '60%' }}>
                <span style={{
                  fontFamily: 'var(--font-adumu)',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.08em',
                  userSelect: 'none',
                }}>CRIERÊ</span>
              </div>
              <BentoCard flex={1} cor="var(--color-accent)" padding="var(--space-sm)">
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-h4)', fontWeight: '700', color: '#ffffff', marginBottom: 'var(--space-xs)', marginTop: 0 }}>
                  Junte-se a nós
                </h3>
                <a href="/participe" className="btn btn-ghost-white" style={{ fontSize: '13px', padding: '7px 16px' }}>Participe</a>
              </BentoCard>
            </div>

            {/* Coluna 4 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ flex: 1 }}></div>
              <BentoCard flex={2} cor="var(--color-accent)" foto="/images/galeria/pedron.jpeg">
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-h4)', fontWeight: '600', color: '#ffffff', margin: 0 }}>
                  Cultura e celebrações
                </h3>
              </BentoCard>
            </div>

            {/* Coluna 5 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <BentoCard flex={2} cor="var(--color-trust)">
                <p style={{
                  fontFamily: 'var(--font-adumu)',
                  fontSize: 'var(--text-h3)',
                  fontWeight: '400',
                  color: '#ffffff',
                  margin: 0,
                  textAlign: 'right',
                  lineHeight: 1.25,
                  width: '100%'
                }}>
                  um{' '}
                  <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>SONHO</span>
                  <br />que precisa<br />ser vivido
                </p>
              </BentoCard>
              <BentoCard flex={1} cor="var(--color-primary)" foto="/images/galeria/vero.jpeg">
                <div className="text-metric" style={{ color: '#ffffff', marginBottom: 'var(--space-xs)' }}>↑</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: '#ffffff', margin: 0 }}>Melhoria escolar</p>
              </BentoCard>
            </div>

          </div>

          <MobileCarousel />
        </div>
      </section>


      {/* Imagem Impacto - Tela Completa (Quem Somos) */}
      <section id="sobre" style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-lg) 0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="fullbleed-img" style={{
          maxWidth: '1200px',
          width: '100%'
        }}>
          <img
            src="/images/hero/fazemos-impacto.svg"
            alt="Quem somos, o que fazemos e nosso impacto social"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 'var(--radius-lg)'
            }}
          />
        </div>
      </section>
      

      {/* Missão, Visão e Valores - Seção Simples */}
      <section style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-lg) 0'
      }}>
        <div className="container">
          <div className="mvv-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: 'var(--space-lg)',
            maxWidth: '1100px',
            margin: '0 auto',
            alignItems: 'center'
          }}>
            {/* Missão */}
            <div style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
              <h3 style={{
                fontFamily: 'var(--font-adumu)',
                fontSize: 'var(--text-h3)',
                fontWeight: '600',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-trust)'
              }}>
                Missão
              </h3>
              <p className="mobile-text-left" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                lineHeight: '1.6',
                margin: 0,
                color: 'var(--color-text-body)'
              }}>
                Promover o desenvolvimento integral de crianças e adolescentes em situação de vulnerabilidade por meio da educação, da cultura e do afeto, criando oportunidades para o aprendizado, a autoestima e o protagonismo juvenil.
              </p>
            </div>

            {/* Separador */}
            <div className="mvv-sep" style={{ fontSize: '28px', color: 'var(--color-text-body)', lineHeight: 1, userSelect: 'none' }}>•</div>

            {/* Visão */}
            <div style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
              <h3 style={{
                fontFamily: 'var(--font-adumu)',
                fontSize: 'var(--text-h3)',
                fontWeight: '600',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-primary)'
              }}>
                Visão
              </h3>
              <p className="mobile-text-left" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                lineHeight: '1.6',
                margin: 0,
                color: 'var(--color-text-body)'
              }}>
                Ser referência na formação complementar de crianças e adolescentes com um modelo sustentável, afetivo e transformador de educação e cidadania.
              </p>
            </div>

            {/* Separador */}
            <div className="mvv-sep" style={{ fontSize: '28px', color: 'var(--color-text-body)', lineHeight: 1, userSelect: 'none' }}>•</div>

            {/* Valores */}
            <div style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
              <h3 style={{
                fontFamily: 'var(--font-adumu)',
                fontSize: 'var(--text-h3)',
                fontWeight: '600',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-accent)'
              }}>
                Valores
              </h3>
              <div className="mobile-text-left" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                lineHeight: '1.6',
                color: 'var(--color-text-body)'
              }}>
                Educação como ferramenta de transformação - Acolhimento e afeto - Valorização da cultura e identidade - Protagonismo infantojuvenil - Inclusão e equidade - Colaboração e voluntariado - Respeito e ética
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ODS - Objetivos de Desenvolvimento Sustentável */}
      <section style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-lg) 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="text-h2" style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-adumu)' }}>
              <a
                href="https://brasil.un.org/pt-br/sdgs"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text-heading)', textDecoration: 'none' }}
              >
                Objetivos de Desenvolvimento Sustentável
              </a>
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              Agenda global da ONU com 17 objetivos para um mundo mais justo e sustentável até 2030. O Crierê orienta suas ações em torno de três deles:
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-lg)',
              flexWrap: 'wrap'
            }}>
              {/* ODS 1 */}
              <a
                href="https://brasil.un.org/pt-br/sdgs/1/key-activities"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="/images/hero/SDG-1.svg"
                  alt="ODS 1 - Erradicação da pobreza"
                  style={{
                    height: '120px',
                    width: 'auto',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                />
              </a>

              {/* ODS 4 */}
              <a
                href="https://brasil.un.org/pt-br/sdgs/4/key-activities"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="/images/hero/SDG-4.svg"
                  alt="ODS 4 - Educação de qualidade"
                  style={{
                    height: '120px',
                    width: 'auto',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                />
              </a>

              {/* ODS 10 */}
              <a
                href="https://brasil.un.org/pt-br/sdgs/10/key-activities"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="/images/hero/SDG-10.svg"
                  alt="ODS 10 - Redução das desigualdades"
                  style={{
                    height: '120px',
                    width: 'auto',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Depoimentos Section - Carrossel */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            <h2 className="text-h2" style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-adumu)' }}>
              O que dizem sobre nós
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              Entre pais e alunos, voluntários e parceiros, o Projeto Crierê tem deixado marcas positivas. Veja alguns depoimentos que refletem a importância do nosso trabalho na vida de quem participa dessa jornada de aprendizado, cultura e transformação social.
            </p>
          </div>

          {/* Carrossel de depoimentos — com controles de voltar/avançar/pausar */}
          <Carousel ariaLabel="Depoimentos de famílias e parceiros" autoPlayMs={5000}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', width: 'min(80vw, 300px)', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '40px', color: 'var(--color-primary)', lineHeight: 1, marginBottom: 'var(--space-xs)' }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', lineHeight: '1.5', marginBottom: 'var(--space-md)', color: 'var(--color-text-body)', textAlign: 'left' }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: '600', margin: 0 }}>{t.author}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Responsável</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Imagem Apoiar - Tela Completa */}
      <section style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-lg) 0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="fullbleed-img" style={{
          maxWidth: '1200px',
          width: '100%'
        }}>
          <img
            src="/images/hero/apoiar-contatos-qr.svg"
            alt="Como apoiar, QR Code e contatos do Projeto Crierê"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 'var(--radius-lg)'
            }}
          />
        </div>
      </section>

      <FooterNew />

      <style jsx>{`
        /* Imagens full-bleed: margens menores no mobile para ganhar área útil */
        .fullbleed-img {
          margin: 0 var(--space-md);
        }

        @media (max-width: 767px) {
          .fullbleed-img {
            margin: 0 var(--space-xs);
          }
        }

        /* Bento Grid — oculto em mobile */
        @media (max-width: 767px) {
          .bento-grid-u { display: none !important; }
          .mvv-grid { grid-template-columns: 1fr !important; }
          .mvv-sep { display: none !important; }
        }

      `}</style>
    </div>
  )
}

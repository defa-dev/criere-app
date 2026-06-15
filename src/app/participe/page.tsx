'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import FooterNew from '@/components/FooterNew'

const funcoes = [
  {
    titulo: 'Tutor Fixo',
    descricao: 'Dê reforço escolar, planeje atividades e acompanhe o desenvolvimento acadêmico de um aluno.',
    foto: '/images/galeria/volei.jpeg',
    emoji: null,
  },
  {
    titulo: 'Coordenador',
    descricao: 'Acompanhe o desenvolvimento pedagógico dos alunos e apoie tutores na organização das tutorias.',
    foto: null,
    emoji: '💬',
    detalhe: 'Trabalho remoto',
  },
  {
    titulo: 'Oficineiro',
    descricao: 'Traga sua arte e realize uma oficina de cultura!',
    foto: '/images/galeria/pedron.jpeg',
    emoji: null,
  },
  {
    titulo: 'Operacional',
    descricao: 'Atividades administrativas como organização de eventos, escala de tutores, divulgação e comunicação.',
    foto: null,
    emoji: '⚙️',
    detalhe: 'Apoio geral',
  },
]

export default function Participe() {
  const [aba, setAba] = useState<'voluntario' | 'parceiro'>('voluntario')

  const [formVol, setFormVol] = useState({ nome: '', email: '', telefone: '', funcao: '', motivo: '' })
  const [formPar, setFormPar] = useState({ nome: '', email: '', telefone: '', contribuicao: '', comentarios: '' })
  const [enviadoVol, setEnviadoVol] = useState(false)
  const [enviadoPar, setEnviadoPar] = useState(false)

  function handleVol(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormVol({ ...formVol, [e.target.name]: e.target.value })
  }
  function handlePar(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormPar({ ...formPar, [e.target.name]: e.target.value })
  }

  async function submitPar(e: React.FormEvent) {
    e.preventDefault()
    const body = new URLSearchParams({
      'entry.1701372806': formPar.nome,
      'entry.28781093': formPar.email,
      'entry.84504438': formPar.telefone,
      'entry.1352065301': formPar.contribuicao,
      'entry.2022623379': formPar.comentarios,
    })
    await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSd7zjJnfHynvzn8Xw5WPxsSlY7Ns0fvDCMBJ5xA0PWDPerFnw/formResponse',
      { method: 'POST', body, mode: 'no-cors' }
    )
    setEnviadoPar(true)
  }

  async function submitVol(e: React.FormEvent) {
    e.preventDefault()
    const body = new URLSearchParams({
      'entry.1701372806': formVol.nome,
      'entry.28781093': formVol.email,
      'entry.84504438': formVol.telefone,
      'entry.1352065301': formVol.funcao,
      'entry.2022623379': formVol.motivo,
    })
    await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSdqMyTL3f5fifiHv19bGKM3zfJzIla6o-qJhsU5kfzsOSNjjg/formResponse',
      { method: 'POST', body, mode: 'no-cors' }
    )
    setEnviadoVol(true)
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-body)' }}>
      <Header />

      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/galeria/rap.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 var(--space-md)' }}>
          <h1 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', fontWeight: '700', color: '#ffffff', margin: '0 0 var(--space-md) 0', lineHeight: 1.2 }}>
            Sonhando com a gente
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'rgba(255,255,255,0.88)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Seja como voluntário ou parceiro, há espaço para quem quer transformar vidas através da educação e da cultura.
          </p>
        </div>
      </section>

      {/* Abas */}
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid rgba(0,0,0,0.07)', position: 'sticky', top: '57px', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          {(['voluntario', 'parceiro'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setAba(tab)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                fontWeight: aba === tab ? '600' : '400',
                color: aba === tab ? 'var(--color-trust)' : 'var(--color-text-secondary)',
                background: 'none',
                border: 'none',
                borderBottom: aba === tab ? '3px solid var(--color-primary)' : '3px solid transparent',
                padding: 'var(--space-md) var(--space-lg)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'voluntario' ? 'Seja voluntário' : 'Seja parceiro'}
            </button>
          ))}
        </div>
      </div>

      {/* --- ABA VOLUNTÁRIO --- */}
      {aba === 'voluntario' && (
        <>
          <section style={{ background: 'var(--color-bg)', padding: 'var(--space-xl) 0' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                <h2 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', color: 'var(--color-trust)', margin: '0 0 var(--space-sm) 0' }}>
                  Nossas funções
                </h2>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
                  Temos espaço para diferentes perfis e disponibilidades.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', maxWidth: '960px', margin: '0 auto' }}>
                {funcoes.map((f) => (
                  <div key={f.titulo} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                    {f.foto ? (
                      <div style={{ height: '160px', backgroundImage: `url(${f.foto})`, backgroundSize: 'cover', backgroundPosition: f.foto.includes('pedron') ? 'center 30%' : 'center' }} />
                    ) : (
                      <div style={{ height: '160px', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}>
                        <span style={{ fontSize: '48px' }}>{f.emoji}</span>
                        {f.detalhe && <span style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{f.detalhe}</span>}
                      </div>
                    )}
                    <div style={{ padding: 'var(--space-md)', flex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h4)', color: 'var(--color-trust)', margin: '0 0 var(--space-xs) 0' }}>
                        {f.titulo}
                      </h3>
                      <p style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-body)', lineHeight: '1.5', margin: 0 }}>
                        {f.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ background: 'var(--color-surface)', padding: 'var(--space-xl) 0' }}>
            <div className="container">
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                  <h2 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', color: 'var(--color-trust)', margin: '0 0 var(--space-sm) 0' }}>
                    Quero me inscrever
                  </h2>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>
                    Preencha o formulário e entraremos em contato em breve.
                  </p>
                </div>

                {enviadoVol ? (
                  <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>🎉</div>
                    <h3 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h3)', color: 'var(--color-trust)', marginBottom: 'var(--space-sm)' }}>
                      Recebemos sua inscrição!
                    </h3>
                    <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>
                      Obrigado por querer fazer parte do Crierê. Em breve entraremos em contato.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitVol} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div>
                      <label className="label" htmlFor="vol-nome">Nome completo</label>
                      <input className="input" id="vol-nome" name="nome" type="text" placeholder="Seu nome" required value={formVol.nome} onChange={handleVol} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                      <div>
                        <label className="label" htmlFor="vol-email">E-mail</label>
                        <input className="input" id="vol-email" name="email" type="email" placeholder="seu@email.com" required value={formVol.email} onChange={handleVol} />
                      </div>
                      <div>
                        <label className="label" htmlFor="vol-telefone">Telefone</label>
                        <input className="input" id="vol-telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" value={formVol.telefone} onChange={handleVol} />
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="vol-funcao">Como quer ajudar?</label>
                      <select className="input" id="vol-funcao" name="funcao" required value={formVol.funcao} onChange={handleVol} style={{ cursor: 'pointer' }}>
                        <option value="">Selecione uma opção</option>
                        <option value="Tutoria">Tutoria</option>
                        <option value="Oficina de cultura">Oficina de cultura</option>
                        <option value="Apoio operacional">Apoio operacional</option>
                        <option value="Pau pra toda obra">Pau pra toda obra</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="vol-motivo">Por que quer fazer parte do Crierê?</label>
                      <textarea className="input" id="vol-motivo" name="motivo" rows={4} placeholder="Conte um pouco sobre você e sua motivação..." required value={formVol.motivo} onChange={handleVol} style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                      Enviar inscrição
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- ABA PARCEIRO --- */}
      {aba === 'parceiro' && (
        <>
          <section style={{ background: 'var(--color-bg)', padding: 'var(--space-xl) 0' }}>
            <div className="container">
              <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', color: 'var(--color-trust)', margin: '0 0 var(--space-md) 0' }}>
                  Parceiros que transformam
                </h2>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
                  Empresas, coletivos e pessoas físicas que apoiam o Crierê contribuem diretamente com a formação de crianças e adolescentes em situação de vulnerabilidade — e alinham suas ações aos Objetivos de Desenvolvimento Sustentável da ONU.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', textAlign: 'left' }}>
                  {[
                    { emoji: '🎯', titulo: 'Impacto real', desc: 'Acompanhe indicadores concretos: frequência, desempenho escolar e oficinas realizadas.' },
                    { emoji: '🤝', titulo: 'Alinhamento ODS', desc: 'Contribua com os objetivos 4, 10 e 16 da Agenda 2030 da ONU.' },
                    { emoji: '📣', titulo: 'Visibilidade', desc: 'Sua marca associada a educação, cultura e transformação social em São Paulo.' },
                    { emoji: '💛', titulo: 'Flexibilidade', desc: 'Patrocínio, materiais, cessão de espaço — do jeito que faz sentido pra você.' },
                  ].map((item) => (
                    <div key={item.titulo} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
                      <div style={{ fontSize: '28px', marginBottom: 'var(--space-xs)' }}>{item.emoji}</div>
                      <h4 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h4)', color: 'var(--color-trust)', margin: '0 0 var(--space-xs) 0' }}>{item.titulo}</h4>
                      <p style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ background: 'var(--color-surface)', padding: 'var(--space-xl) 0' }}>
            <div className="container">
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                  <h2 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h2)', color: 'var(--color-trust)', margin: '0 0 var(--space-sm) 0' }}>
                    Quero ser parceiro
                  </h2>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>
                    Deixe seu contato e conversamos sobre como colaborar.
                  </p>
                </div>

                {enviadoPar ? (
                  <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>🤝</div>
                    <h3 style={{ fontFamily: 'var(--font-adumu)', fontSize: 'var(--text-h3)', color: 'var(--color-trust)', marginBottom: 'var(--space-sm)' }}>
                      Mensagem recebida!
                    </h3>
                    <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>
                      Obrigado pelo interesse em apoiar o Crierê. Entraremos em contato em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitPar} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div>
                      <label className="label" htmlFor="par-nome">Nome</label>
                      <input className="input" id="par-nome" name="nome" type="text" placeholder="Seu nome" required value={formPar.nome} onChange={handlePar} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                      <div>
                        <label className="label" htmlFor="par-email">E-mail</label>
                        <input className="input" id="par-email" name="email" type="email" placeholder="seu@email.com" required value={formPar.email} onChange={handlePar} />
                      </div>
                      <div>
                        <label className="label" htmlFor="par-telefone">Telefone</label>
                        <input className="input" id="par-telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" value={formPar.telefone} onChange={handlePar} />
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="par-contribuicao">Como quer contribuir?</label>
                      <select className="input" id="par-contribuicao" name="contribuicao" required value={formPar.contribuicao} onChange={handlePar} style={{ cursor: 'pointer' }}>
                        <option value="">Selecione uma opção</option>
                        <option value="Patrocínio financeiro">Patrocínio financeiro</option>
                        <option value="Doação de materiais">Doação de materiais</option>
                        <option value="Cessão de espaço">Cessão de espaço</option>
                        <option value="Prestação de serviços">Prestação de serviços</option>
                        <option value="Pau pra toda obra">Pau pra toda obra</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="par-comentarios">Comentários (opcional)</label>
                      <textarea className="input" id="par-comentarios" name="comentarios" rows={3} placeholder="Conte mais sobre sua ideia de parceria..." value={formPar.comentarios} onChange={handlePar} style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                      Enviar mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <FooterNew />
    </div>
  )
}

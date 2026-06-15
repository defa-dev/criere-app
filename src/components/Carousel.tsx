'use client'

import { Children, useCallback, useEffect, useRef, useState } from 'react'

interface CarouselProps {
  children: React.ReactNode
  /** Rótulo acessível do carrossel (ex.: "Depoimentos das famílias"). */
  ariaLabel: string
  /** Intervalo do avanço automático em ms. */
  autoPlayMs?: number
}

/**
 * Carrossel acessível: avança/volta/pausa por botões, aceita swipe (scroll-snap),
 * pausa ao passar o mouse ou focar e respeita prefers-reduced-motion.
 */
export default function Carousel({ children, ariaLabel, autoPlayMs = 4500 }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const slides = Children.toArray(children)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isInteracting, setIsInteracting] = useState(false)

  // Largura de um "passo" = distância entre o início de dois slides (inclui o gap).
  const step = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return 0
    const slideEls = scroller.querySelectorAll<HTMLElement>('.carousel-slide')
    if (slideEls.length > 1) return slideEls[1].offsetLeft - slideEls[0].offsetLeft
    return scroller.clientWidth
  }, [])

  const goNext = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4
    if (atEnd) scroller.scrollTo({ left: 0, behavior: 'smooth' })
    else scroller.scrollBy({ left: step(), behavior: 'smooth' })
  }, [step])

  const goPrev = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const atStart = scroller.scrollLeft <= 4
    if (atStart) scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' })
    else scroller.scrollBy({ left: -step(), behavior: 'smooth' })
  }, [step])

  // Quem prefere menos movimento não tem avanço automático.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying || isInteracting) return
    const id = window.setInterval(goNext, autoPlayMs)
    return () => window.clearInterval(id)
  }, [isPlaying, isInteracting, autoPlayMs, goNext])

  return (
    <section
      className="carousel"
      role="group"
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
    >
      <div className="carousel-scroller" ref={scrollerRef}>
        {slides.map((child, i) => (
          <div className="carousel-slide" key={i}>
            {child}
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button type="button" className="carousel-btn" aria-label="Anterior" onClick={goPrev}>
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="carousel-btn"
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((p) => !p)}
        >
          <span aria-hidden="true">{isPlaying ? '❚❚' : '►'}</span>
        </button>
        <button type="button" className="carousel-btn" aria-label="Próximo" onClick={goNext}>
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <style jsx>{`
        .carousel {
          width: 100%;
        }

        .carousel-scroller {
          display: flex;
          gap: var(--space-md);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: var(--space-xs);
        }

        .carousel-scroller::-webkit-scrollbar {
          display: none;
        }

        .carousel-slide {
          flex: 0 0 auto;
          scroll-snap-align: start;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin-top: var(--space-md);
        }

        .carousel-btn {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-trust);
          background: #ffffff;
          color: var(--color-trust);
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .carousel-btn:hover {
          background: var(--color-trust);
          color: #ffffff;
        }

        .carousel-btn:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}

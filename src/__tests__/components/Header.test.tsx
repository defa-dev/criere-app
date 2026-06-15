import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/Header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('next/link', () =>
  function MockLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
)

describe('Header', () => {
  it('renders the CRIERÊ logo linking to home', () => {
    render(<Header />)
    const logo = screen.getByText('CRIERÊ')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders "Contribua" as a link to /doacao (including hidden nav)', () => {
    render(<Header />)
    // nav-desktop has display:none so we use hidden:true to include it
    const links = screen.getAllByRole('link', { name: 'Contribua', hidden: true })
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => expect(link).toHaveAttribute('href', '/doacao'))
  })

  it('renders "Blog" as a disabled span — never a link', () => {
    render(<Header />)
    const blogEls = screen.getAllByText('Blog')
    blogEls.forEach((el) => {
      expect(el.tagName.toLowerCase()).toBe('span')
      expect(el.closest('a')).toBeNull()
    })
  })

  it('renders the "Doe agora" CTA linking to /doacao', () => {
    render(<Header />)
    const ctas = screen.getAllByRole('link', { name: 'Doe agora', hidden: true })
    expect(ctas.length).toBeGreaterThan(0)
    ctas.forEach((cta) => expect(cta).toHaveAttribute('href', '/doacao'))
  })

  it('opens the mobile menu on hamburger click and shows nav links', async () => {
    render(<Header />)
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    // "Contribua" link should now be visible inside the overlay
    const contribuaLinks = screen.getAllByRole('link', { name: 'Contribua' })
    expect(contribuaLinks.length).toBeGreaterThan(0)
  })

  it('closes the mobile menu when the close button is clicked', async () => {
    render(<Header />)
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    // Two "Fechar menu" buttons exist while open: the main toggle and the overlay close
    const closeBtns = screen.getAllByRole('button', { name: 'Fechar menu' })
    await userEvent.click(closeBtns[0])
    // Mobile menu content disappears (overlay not rendered)
    expect(screen.queryByText('Faça Parte')).not.toBeVisible()
  })
})

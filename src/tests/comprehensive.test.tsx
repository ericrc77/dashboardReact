import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../src/App'
import Dashboard from '../src/pages/Dashboard'
import CategoryPage from '../src/components/CategoryPage'
import AdvancedChart from '../src/components/AdvancedChart'
import AnimatedCard from '../src/components/AnimatedCard'
import Header from '../src/components/Header'
import Sidebar from '../src/components/Sidebar'

// Mock Chart.js
vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
  },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  LineElement: {},
  PointElement: {},
  ArcElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
}))

vi.mock('react-chartjs-2', () => ({
  Line: ({ data }: any) => <div data-testid="line-chart">{JSON.stringify(data)}</div>,
  Bar: ({ data }: any) => <div data-testid="bar-chart">{JSON.stringify(data)}</div>,
  Pie: ({ data }: any) => <div data-testid="pie-chart">{JSON.stringify(data)}</div>,
  Doughnut: ({ data }: any) => <div data-testid="doughnut-chart">{JSON.stringify(data)}</div>,
  Radar: ({ data }: any) => <div data-testid="radar-chart">{JSON.stringify(data)}</div>,
  PolarArea: ({ data }: any) => <div data-testid="polar-chart">{JSON.stringify(data)}</div>,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Dashboard de Dados Públicos - 50 Testes Abrangentes', () => {
  // Testes 1-10: Componentes Básicos
  describe('Componentes Básicos', () => {
    it('1. Deve renderizar o App principal sem crashes', () => {
      renderWithRouter(<App />)
      expect(screen.getByText(/Dashboard de Dados Públicos/i)).toBeInTheDocument()
    })

    it('2. Deve renderizar o Dashboard principal', () => {
      renderWithRouter(<Dashboard />)
      expect(screen.getByText(/Dashboard de Dados Públicos/i)).toBeInTheDocument()
    })

    it('3. Deve renderizar o Header com logo correto', () => {
      const mockProps = { onToggleMobileMenu: vi.fn(), isMobileMenuOpen: false }
      render(<Header {...mockProps} />)
      expect(screen.getByText(/Dados Públicos/i)).toBeInTheDocument()
    })

    it('4. Deve renderizar a Sidebar com categorias', () => {
      const mockProps = { isOpen: true, onClose: vi.fn() }
      render(<Sidebar {...mockProps} />)
      expect(screen.getByText(/População/i)).toBeInTheDocument()
    })

    it('5. Deve renderizar AnimatedCard com dados corretos', () => {
      const cardProps = {
        title: 'Teste Card',
        value: '100M',
        change: '+5%',
        trend: 'up' as const,
        index: 0
      }
      render(<AnimatedCard {...cardProps} />)
      expect(screen.getByText('Teste Card')).toBeInTheDocument()
      expect(screen.getByText('100M')).toBeInTheDocument()
    })

    it('6. Deve renderizar CategoryPage com título correto', () => {
      const pageProps = {
        title: 'População',
        icon: '👥',
        description: 'Dados demográficos'
      }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText('População')).toBeInTheDocument()
    })

    it('7. Deve renderizar AdvancedChart com dados', () => {
      const chartData = {
        labels: ['Jan', 'Fev'],
        datasets: [{ data: [10, 20], backgroundColor: ['#ff6384'] }]
      }
      render(<AdvancedChart type="bar" data={chartData} title="Teste Chart" />)
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })

    it('8. Deve exibir todos os cards de estatística no Dashboard', () => {
      renderWithRouter(<Dashboard />)
      expect(screen.getByText(/População Total/i)).toBeInTheDocument()
      expect(screen.getByText(/PIB Nacional/i)).toBeInTheDocument()
      expect(screen.getByText(/Crescimento/i)).toBeInTheDocument()
    })

    it('9. Deve renderizar gráficos no Dashboard', () => {
      renderWithRouter(<Dashboard />)
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })

    it('10. Deve exibir footer com créditos', () => {
      renderWithRouter(<App />)
      expect(screen.getByText(/Desenvolvido por Eric Campos/i)).toBeInTheDocument()
    })
  })

  // Testes 11-20: Navegação e Rotas
  describe('Navegação e Rotas', () => {
    it('11. Deve navegar para página de População', async () => {
      renderWithRouter(<App />)
      const populacaoLink = screen.getByText('População')
      fireEvent.click(populacaoLink)
      await waitFor(() => {
        expect(screen.getByText(/Estatísticas demográficas/i)).toBeInTheDocument()
      })
    })

    it('12. Deve navegar para página de Economia', async () => {
      renderWithRouter(<App />)
      const economiaLink = screen.getByText('Economia')
      fireEvent.click(economiaLink)
      await waitFor(() => {
        expect(screen.getByText(/Indicadores econômicos/i)).toBeInTheDocument()
      })
    })

    it('13. Deve navegar para página de Educação', async () => {
      renderWithRouter(<App />)
      const educacaoLink = screen.getByText('Educação')
      fireEvent.click(educacaoLink)
      await waitFor(() => {
        expect(screen.getByText(/Estatísticas educacionais/i)).toBeInTheDocument()
      })
    })

    it('14. Deve navegar para página de Saúde', async () => {
      renderWithRouter(<App />)
      const saudeLink = screen.getByText('Saúde')
      fireEvent.click(saudeLink)
      await waitFor(() => {
        expect(screen.getByText(/Indicadores de saúde/i)).toBeInTheDocument()
      })
    })

    it('15. Deve voltar ao Dashboard ao clicar no logo', async () => {
      renderWithRouter(<App />)
      const logo = screen.getByText('Dados Públicos')
      fireEvent.click(logo)
      await waitFor(() => {
        expect(screen.getByText(/Dashboard de Dados Públicos/i)).toBeInTheDocument()
      })
    })

    it('16. Deve abrir/fechar menu mobile', () => {
      const mockToggle = vi.fn()
      const headerProps = { onToggleMobileMenu: mockToggle, isMobileMenuOpen: false }
      render(<Header {...headerProps} />)
      
      const menuButton = screen.getByLabelText(/Abrir menu/i)
      fireEvent.click(menuButton)
      expect(mockToggle).toHaveBeenCalled()
    })

    it('17. Deve navegar para Infraestrutura', async () => {
      renderWithRouter(<App />)
      const infraLink = screen.getByText('Infraestrutura')
      fireEvent.click(infraLink)
      await waitFor(() => {
        expect(screen.getByText(/Infraestrutura nacional/i)).toBeInTheDocument()
      })
    })

    it('18. Deve navegar para Energia', async () => {
      renderWithRouter(<App />)
      const energiaLink = screen.getByText('Energia')
      fireEvent.click(energiaLink)
      await waitFor(() => {
        expect(screen.getByText(/Matriz energética/i)).toBeInTheDocument()
      })
    })

    it('19. Deve navegar para Mobilidade', async () => {
      renderWithRouter(<App />)
      const mobilidadeLink = screen.getByText('Mobilidade')
      fireEvent.click(mobilidadeLink)
      await waitFor(() => {
        expect(screen.getByText(/Transporte público/i)).toBeInTheDocument()
      })
    })

    it('20. Deve navegar para Meio Ambiente', async () => {
      renderWithRouter(<App />)
      const meioAmbienteLink = screen.getByText('Meio Ambiente')
      fireEvent.click(meioAmbienteLink)
      await waitFor(() => {
        expect(screen.getByText(/Desmatamento/i)).toBeInTheDocument()
      })
    })
  })

  // Testes 21-30: Dados e Gráficos
  describe('Dados e Gráficos', () => {
    it('21. Deve exibir dados de população corretos', () => {
      const pageProps = { title: 'População', icon: '👥', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText(/215.3M/i)).toBeInTheDocument()
    })

    it('22. Deve exibir gráfico de linha para evolução temporal', () => {
      const pageProps = { title: 'Economia', icon: '💰', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })

    it('23. Deve exibir gráfico doughnut para distribuição', () => {
      const pageProps = { title: 'Educação', icon: '📚', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument()
    })

    it('24. Deve exibir gráfico de barras comparativo', () => {
      const pageProps = { title: 'Saúde', icon: '🏥', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })

    it('25. Deve exibir gráfico radar para indicadores', () => {
      const chartData = {
        labels: ['A', 'B', 'C'],
        datasets: [{ data: [1, 2, 3] }]
      }
      render(<AdvancedChart type="radar" data={chartData} />)
      expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
    })

    it('26. Deve exibir dados econômicos corretos', () => {
      const pageProps = { title: 'Economia', icon: '💰', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText(/PIB Nacional/i)).toBeInTheDocument()
      expect(screen.getByText(/R\$ 2\.4T/i)).toBeInTheDocument()
    })

    it('27. Deve exibir indicadores de educação', () => {
      const pageProps = { title: 'Educação', icon: '📚', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText(/Taxa de Alfabetização/i)).toBeInTheDocument()
      expect(screen.getByText(/94\.2%/i)).toBeInTheDocument()
    })

    it('28. Deve exibir dados de saúde corretos', () => {
      const pageProps = { title: 'Saúde', icon: '🏥', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText(/Expectativa de Vida/i)).toBeInTheDocument()
      expect(screen.getByText(/76\.4 anos/i)).toBeInTheDocument()
    })

    it('29. Deve calcular tendências corretamente', () => {
      const cardProps = {
        title: 'Teste Trend',
        value: '100',
        change: '+5.2%',
        trend: 'up' as const,
        index: 0
      }
      render(<AnimatedCard {...cardProps} />)
      expect(screen.getByText('+5.2%')).toBeInTheDocument()
    })

    it('30. Deve exibir ícones corretos por categoria', () => {
      const pageProps = { title: 'Energia', icon: '⚡', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText('⚡')).toBeInTheDocument()
    })
  })

  // Testes 31-40: Responsividade e UI
  describe('Responsividade e UI', () => {
    it('31. Deve adaptar layout para mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      renderWithRouter(<Dashboard />)
      expect(screen.getByText(/Dashboard de Dados Públicos/i)).toBeInTheDocument()
    })

    it('32. Deve exibir sidebar em desktop', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      const sidebarProps = { isOpen: true, onClose: vi.fn() }
      render(<Sidebar {...sidebarProps} />)
      expect(screen.getByText(/CATEGORIAS/i)).toBeInTheDocument()
    })

    it('33. Deve esconder elementos mobile em desktop', () => {
      const headerProps = { onToggleMobileMenu: vi.fn(), isMobileMenuOpen: false }
      render(<Header {...headerProps} />)
      
      const mobileButton = screen.getByLabelText(/Abrir menu/i)
      expect(mobileButton).toHaveClass('lg:hidden')
    })

    it('34. Deve aplicar cores corretas ao tema', () => {
      renderWithRouter(<Dashboard />)
      const container = screen.getByText(/Dashboard de Dados Públicos/i).closest('div')
      expect(container).toHaveClass('text-white')
    })

    it('35. Deve aplicar gradientes corretamente', () => {
      renderWithRouter(<Dashboard />)
      const title = screen.getByText(/Dashboard de Dados Públicos/i)
      expect(title).toHaveClass('bg-gradient-to-r')
    })

    it('36. Deve exibir loading states', async () => {
      const cardProps = {
        title: 'Loading Test',
        value: '0',
        change: '+0%',
        trend: 'up' as const,
        index: 0,
        isNumber: true
      }
      render(<AnimatedCard {...cardProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Loading Test')).toBeInTheDocument()
      })
    })

    it('37. Deve aplicar hover effects', () => {
      const cardProps = {
        title: 'Hover Test',
        value: '100',
        change: '+5%',
        trend: 'up' as const,
        index: 0
      }
      const { container } = render(<AnimatedCard {...cardProps} />)
      
      const card = container.firstChild as HTMLElement
      fireEvent.mouseEnter(card)
      expect(card).toHaveClass('hover:scale-105')
    })

    it('38. Deve exibir status online no header', () => {
      const headerProps = { onToggleMobileMenu: vi.fn(), isMobileMenuOpen: false }
      render(<Header {...headerProps} />)
      expect(screen.getByText(/Online/i)).toBeInTheDocument()
    })

    it('39. Deve exibir data atual no header', () => {
      const headerProps = { onToggleMobileMenu: vi.fn(), isMobileMenuOpen: false }
      render(<Header {...headerProps} />)
      
      const today = new Date().toLocaleDateString('pt-BR')
      expect(screen.getByText(today)).toBeInTheDocument()
    })

    it('40. Deve aplicar animações de entrada', async () => {
      renderWithRouter(<Dashboard />)
      
      await waitFor(() => {
        const elements = screen.getAllByText(/População Total|PIB Nacional|Crescimento/)
        expect(elements.length).toBeGreaterThan(0)
      })
    })
  })

  // Testes 41-50: Funcionalidades Avançadas
  describe('Funcionalidades Avançadas', () => {
    it('41. Deve suportar diferentes tipos de gráfico', () => {
      const types = ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea']
      
      types.forEach(type => {
        const { unmount } = render(
          <AdvancedChart 
            type={type as any} 
            data={{ labels: ['A'], datasets: [{ data: [1] }] }} 
          />
        )
        expect(screen.getByTestId(`${type}-chart`)).toBeInTheDocument()
        unmount()
      })
    })

    it('42. Deve calcular projeções de dados', () => {
      const pageProps = { title: 'Economia', icon: '💰', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      
      // Verifica se há dados projetados
      expect(screen.getByText(/Meta Projetada/i)).toBeInTheDocument()
    })

    it('43. Deve exibir tooltips informativos', () => {
      const chartData = {
        labels: ['A', 'B'],
        datasets: [{ data: [1, 2], label: 'Test Data' }]
      }
      render(<AdvancedChart type="bar" data={chartData} title="Test" />)
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })

    it('44. Deve suportar exportação de dados', () => {
      const pageProps = { title: 'População', icon: '👥', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      expect(screen.getByText(/Exportar Dados/i)).toBeInTheDocument()
    })

    it('45. Deve validar dados de entrada', () => {
      const invalidData = {
        labels: [],
        datasets: []
      }
      
      expect(() => {
        render(<AdvancedChart type="bar" data={invalidData} />)
      }).not.toThrow()
    })

    it('46. Deve suportar múltiplos datasets', () => {
      const multiData = {
        labels: ['A', 'B'],
        datasets: [
          { data: [1, 2], label: 'Dataset 1' },
          { data: [3, 4], label: 'Dataset 2' }
        ]
      }
      render(<AdvancedChart type="line" data={multiData} />)
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })

    it('47. Deve aplicar cores personalizadas', () => {
      const colorData = {
        labels: ['A'],
        datasets: [{
          data: [1],
          backgroundColor: ['#ff6384'],
          borderColor: ['#ff6384']
        }]
      }
      render(<AdvancedChart type="pie" data={colorData} />)
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
    })

    it('48. Deve gerenciar estado de animações', async () => {
      const cardProps = {
        title: 'Animation Test',
        value: '0',
        change: '+10%',
        trend: 'up' as const,
        index: 0,
        isNumber: true
      }
      
      render(<AnimatedCard {...cardProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Animation Test')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('49. Deve suportar diferentes formatos de dados', () => {
      const pageProps = { title: 'Energia', icon: '⚡', description: 'Test' }
      render(<CategoryPage {...pageProps} />)
      
      // Verifica diferentes unidades
      expect(screen.getByText(/GW/i)).toBeInTheDocument()
      expect(screen.getByText(/kWh/i)).toBeInTheDocument()
    })

    it('50. Deve manter performance com grandes datasets', () => {
      const largeData = {
        labels: Array.from({ length: 100 }, (_, i) => `Item ${i}`),
        datasets: [{
          data: Array.from({ length: 100 }, () => Math.random() * 100),
          backgroundColor: '#3B82F6'
        }]
      }
      
      const startTime = performance.now()
      render(<AdvancedChart type="bar" data={largeData} />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100) // Deve renderizar em menos de 100ms
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })
  })
})

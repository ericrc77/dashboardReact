import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale, Filler } from 'chart.js'
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2'
import React from 'react'

// Register Chart.js components (inclui escalas e plugins necessários para radar/polar e fill)
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AdvancedChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea'
  data: any
  options?: any
  height?: number
  title?: string
  description?: string
  category?: string
}

export default function AdvancedChart({ 
  type, 
  data, 
  options, 
  height = 300, 
  title, 
  description,
  category 
}: AdvancedChartProps) {
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#ffffff',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    scales: type !== 'pie' && type !== 'doughnut' && type !== 'radar' && type !== 'polarArea' ? {
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#e2e8f0',
        },
        beginAtZero: true
      },
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#e2e8f0',
        }
      }
    } : undefined
  }

  const mergedOptions = React.useMemo(() => {
    const base = { ...defaultOptions, ...options }
    const norm = (s?: string) => (s || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
  const cat = norm(category)
  const hideCats = ['seguranca','economia','educacao']
  const shouldHideAxis = hideCats.includes(cat)
  // Para line/bar
  if (shouldHideAxis && (type === 'line' || type === 'bar')) {
      base.scales = base.scales || {}
      base.scales.y = { ...(base.scales.y || {}), ticks: { ...(base.scales.y?.ticks || {}), display: false }, grid: { ...(base.scales.y?.grid || {}), drawBorder: false, display: false } }
    }
  // Para radar: remover números e linhas internas
  if (shouldHideAxis && type === 'radar') {
      base.scales = base.scales || {}
      base.scales.r = {
        ...(base.scales.r || {}),
        angleLines: { display: false },
        grid: { circular: true, color: 'rgba(255,255,255,0.05)' },
        pointLabels: { color: '#e2e8f0', font: { size: 11 } },
        ticks: { display: false }
      }
    }
  // Para polarArea: remover números e linhas radiais
  if (shouldHideAxis && type === 'polarArea') {
      base.scales = base.scales || {}
      base.scales.r = {
        ...(base.scales.r || {}),
        angleLines: { display: false },
        grid: { circular: true, color: 'rgba(255,255,255,0.05)' },
        pointLabels: { display: false },
        ticks: { display: false }
      }
    }
    return base
  }, [JSON.stringify(options), type, category])

  // Sanitização simples para evitar dados inválidos causarem exceptions
  const safeData = () => {
    try {
      if (!data || typeof data !== 'object') return { labels: [], datasets: [] }
      if (!Array.isArray(data.labels)) return { labels: [], datasets: [] }
      if (!Array.isArray(data.datasets)) return { labels: data.labels, datasets: [] }
      return data
    } catch (e) {
      return { labels: [], datasets: [] }
    }
  }

  const renderChart = () => {
    const chartData = safeData()
    // Evita renderização de gráfico vazio causando erros de dimensionamento
    if (!chartData.labels.length || !chartData.datasets.length) {
      return <div className="text-xs text-gray-500 h-full flex items-center justify-center">Sem dados</div>
    }
    switch (type) {
      case 'line':
        return <Line data={chartData} options={mergedOptions} redraw />
      case 'bar':
        return <Bar data={chartData} options={mergedOptions} redraw />
      case 'pie':
        return <Pie data={chartData} options={mergedOptions} />
      case 'doughnut':
        return <Doughnut data={chartData} options={mergedOptions} />
      case 'radar':
        return <Radar data={chartData} options={mergedOptions} redraw />
      case 'polarArea':
        return <PolarArea data={chartData} options={mergedOptions} />
      default:
        return <Bar data={chartData} options={mergedOptions} redraw />
    }
  }

  return (
    <div className="card-gradient rounded-xl p-6 border border-dark-600/30 hover:border-primary-500/30 transition-all duration-300">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            {category && getCategoryIcon(category)}
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      )}
      
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  )
}

function getCategoryIcon(category: string) {
  const icons: { [key: string]: string } = {
    'populacao': '👥',
    'economia': '💰',
    'educacao': '📚',
    'saude': '🏥',
    'infraestrutura': '🏗️',
    'energia': '⚡',
    'mobilidade': '🚗',
    'meio-ambiente': '🌱',
    'seguranca': '🛡️'
  }
  
  return <span className="text-xl">{icons[category] || '📊'}</span>
}

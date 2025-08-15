import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import AnimatedCard from '../components/AnimatedCard'
import { useIntersectionObserver } from '../hooks/useAnimations'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function Dashboard() {
  const { ref: heroRef, hasIntersected: heroVisible } = useIntersectionObserver(0.3)

  // Dados principais do dashboard
  const mainStats = [
    {
      title: 'População Total',
      value: '215.3M',
      change: '+0.77%',
      trend: 'up' as const,
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'PIB Nacional',
      value: 'R$ 2.4T',
      change: '+2.9%',
      trend: 'up' as const,
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Crescimento',
      value: '2.9%',
      change: '+0.3%',
      trend: 'up' as const,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Índice de Atividade',
      value: '98.4',
      change: '+1.2%',
      trend: 'up' as const,
      icon: <Activity className="w-5 h-5" />
    }
  ]

  const pieData = {
    labels: ['Sudeste', 'Nordeste', 'Sul', 'Norte', 'Centro-Oeste'],
    datasets: [
      {
        data: [42.0, 27.8, 14.4, 8.8, 7.0],
        backgroundColor: [
          '#0ea5e9',
          '#06b6d4',
          '#14b8a6',
          '#10b981',
          '#22c55e'
        ],
        borderWidth: 0
      }
    ]
  }

  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Crescimento (%)',
        data: [2.1, 2.5, 2.8, 2.9, 3.1, 2.9],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div 
        ref={heroRef} 
        className={`text-center mb-12 transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Dashboard de Dados Públicos
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Visualize dados governamentais brasileiros com gráficos interativos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {mainStats.map((stat, index) => (
          <AnimatedCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            index={index}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-gradient rounded-xl p-6 border border-dark-600/30 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-semibold text-white mb-6">
            Distribuição Regional da População
          </h3>
          <div className="h-80">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="card-gradient rounded-xl p-6 border border-dark-600/30 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-semibold text-white mb-6">
            Crescimento Econômico Mensal
          </h3>
          <div className="h-80">
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  )
}

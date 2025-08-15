import { useMemo } from 'react'
import AdvancedChart from './AdvancedChart'
import AnimatedCard from './AnimatedCard'
import { useIntersectionObserver } from '../hooks/useAnimations'
// Removido LoadingSpinner (não utilizado)

interface CategoryPageProps {
  title: string
  icon: string
  description: string
}

const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

// Dados específicos para cada categoria
const getCategoryData = (category: string) => {
  const dataMap: Record<string, any> = {
    'Economia': {
      cards: [
        { title: 'PIB Nacional', value: 'R$ 2.4T', change: '+2.9%', trend: 'up' },
        { title: 'Inflação (IPCA)', value: '4.62%', change: '-0.3%', trend: 'down' },
        { title: 'Taxa SELIC', value: '11.75%', change: '0%', trend: 'stable' },
        { title: 'Desemprego', value: '8.5%', change: '-0.7%', trend: 'down' },
      ],
      chartData: [
        { name: 'Jan', value: 2300 },
        { name: 'Fev', value: 2400 },
        { name: 'Mar', value: 2200 },
        { name: 'Abr', value: 2500 },
        { name: 'Mai', value: 2600 },
        { name: 'Jun', value: 2400 },
      ],
      pieData: [
        { name: 'Agricultura', value: 8.2, color: '#10B981' },
        { name: 'Indústria', value: 22.1, color: '#3B82F6' },
        { name: 'Serviços', value: 69.7, color: '#F59E0B' },
      ]
    },
    'Educação': {
      cards: [
        { title: 'Taxa de Alfabetização', value: '94.2%', change: '+1.1%', trend: 'up' },
        { title: 'Matrículas Ensino Médio', value: '7.6M', change: '+2.3%', trend: 'up' },
        { title: 'IDEB Anos Iniciais', value: '6.0', change: '+0.2%', trend: 'up' },
        { title: 'Evasão Escolar', value: '11.2%', change: '-1.8%', trend: 'down' },
      ],
      chartData: [
        { name: '2018', value: 92.8 },
        { name: '2019', value: 93.1 },
        { name: '2020', value: 93.5 },
        { name: '2021', value: 93.8 },
        { name: '2022', value: 94.0 },
        { name: '2023', value: 94.2 },
      ],
      pieData: [
        { name: 'Fundamental I', value: 33.2, color: '#3B82F6' },
        { name: 'Fundamental II', value: 28.5, color: '#10B981' },
        { name: 'Ensino Médio', value: 23.8, color: '#F59E0B' },
        { name: 'Superior', value: 14.5, color: '#EF4444' },
      ]
    },
    'Saúde': {
      cards: [
        { title: 'Expectativa de Vida', value: '76.4 anos', change: '+0.3%', trend: 'up' },
        { title: 'Mortalidade Infantil', value: '12.4‰', change: '-2.1%', trend: 'down' },
        { title: 'Cobertura Vacinal', value: '87.3%', change: '+5.2%', trend: 'up' },
        { title: 'Leitos SUS', value: '2.1/1000', change: '+1.8%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 75.8 },
        { name: '2019', value: 76.0 },
        { name: '2020', value: 75.9 },
        { name: '2021', value: 76.1 },
        { name: '2022', value: 76.3 },
        { name: '2023', value: 76.4 },
      ],
      pieData: [
        { name: 'Atenção Básica', value: 45.2, color: '#10B981' },
        { name: 'Média Complexidade', value: 32.8, color: '#3B82F6' },
        { name: 'Alta Complexidade', value: 22.0, color: '#F59E0B' },
      ]
    },
    'População': {
      cards: [
        { title: 'População Total', value: '215.3M', change: '+0.77%', trend: 'up' },
        { title: 'Densidade Demográfica', value: '25.3 hab/km²', change: '+0.8%', trend: 'up' },
        { title: 'Taxa de Natalidade', value: '13.4‰', change: '-1.2%', trend: 'down' },
        { title: 'Expectativa de Vida', value: '76.4 anos', change: '+0.3%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 208.5 },
        { name: '2019', value: 210.1 },
        { name: '2020', value: 211.8 },
        { name: '2021', value: 213.3 },
        { name: '2022', value: 214.3 },
        { name: '2023', value: 215.3 },
      ],
      pieData: [
        { name: '0-14 anos', value: 21.1, color: '#3B82F6' },
        { name: '15-64 anos', value: 69.6, color: '#10B981' },
        { name: '65+ anos', value: 9.3, color: '#F59E0B' },
      ]
    },
    'Energia': {
      cards: [
        { title: 'Capacidade Instalada', value: '181.5 GW', change: '+3.2%', trend: 'up' },
        { title: 'Energia Renovável', value: '83.1%', change: '+1.8%', trend: 'up' },
        { title: 'Consumo per capita', value: '2.280 kWh', change: '+2.1%', trend: 'up' },
        { title: 'Perdas na Transmissão', value: '13.8%', change: '-0.5%', trend: 'down' },
      ],
      chartData: [
        { name: '2018', value: 168.1 },
        { name: '2019', value: 172.5 },
        { name: '2020', value: 175.2 },
        { name: '2021', value: 177.8 },
        { name: '2022', value: 179.4 },
        { name: '2023', value: 181.5 },
      ],
      pieData: [
        { name: 'Hidrelétrica', value: 63.8, color: '#3B82F6' },
        { name: 'Eólica', value: 11.6, color: '#10B981' },
        { name: 'Solar', value: 4.0, color: '#F59E0B' },
        { name: 'Biomassa', value: 8.2, color: '#8B5CF6' },
        { name: 'Térmica', value: 12.4, color: '#EF4444' },
      ]
    },
    'Meio Ambiente': {
      cards: [
        { title: 'Desmatamento Amazônia', value: '8.038 km²', change: '-11.3%', trend: 'down' },
        { title: 'Área Protegida', value: '334.4M ha', change: '+0.2%', trend: 'up' },
        { title: 'Emissões CO2', value: '2.16 GtCO2', change: '-1.8%', trend: 'down' },
        { title: 'Reciclagem', value: '3.1%', change: '+0.5%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 11568 },
        { name: '2019', value: 10129 },
        { name: '2020', value: 10851 },
        { name: '2021', value: 13038 },
        { name: '2022', value: 9050 },
        { name: '2023', value: 8038 },
      ],
      pieData: [
        { name: 'Amazônia', value: 68.4, color: '#10B981' },
        { name: 'Cerrado', value: 18.2, color: '#F59E0B' },
        { name: 'Mata Atlântica', value: 8.1, color: '#3B82F6' },
        { name: 'Outros', value: 5.3, color: '#8B5CF6' },
      ]
    },
    'Infraestrutura': {
      cards: [
        { title: 'Rodovias Pavimentadas', value: '213.4 mil km', change: '+2.8%', trend: 'up' },
        { title: 'Acesso à Internet', value: '84.7%', change: '+3.1%', trend: 'up' },
        { title: 'Saneamento Básico', value: '84.2%', change: '+1.9%', trend: 'up' },
        { title: 'Energia Elétrica', value: '99.8%', change: '+0.1%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 78.2 },
        { name: '2019', value: 80.1 },
        { name: '2020', value: 81.8 },
        { name: '2021', value: 82.9 },
        { name: '2022', value: 83.7 },
        { name: '2023', value: 84.7 },
      ],
      pieData: [
        { name: 'Urbano', value: 94.1, color: '#3B82F6' },
        { name: 'Rural', value: 5.9, color: '#10B981' },
      ]
    },
    'Mobilidade': {
      cards: [
        { title: 'Frota de Veículos', value: '109.8M', change: '+2.1%', trend: 'up' },
        { title: 'Transporte Público', value: '18.2%', change: '-0.8%', trend: 'down' },
        { title: 'Acidentes de Trânsito', value: '32.7 mil', change: '-3.2%', trend: 'down' },
        { title: 'Ciclofaixas', value: '4.2 mil km', change: '+12.8%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 101.2 },
        { name: '2019', value: 103.8 },
        { name: '2020', value: 105.1 },
        { name: '2021', value: 106.9 },
        { name: '2022', value: 108.4 },
        { name: '2023', value: 109.8 },
      ],
      pieData: [
        { name: 'Automóveis', value: 56.8, color: '#3B82F6' },
        { name: 'Motocicletas', value: 23.4, color: '#10B981' },
        { name: 'Comerciais', value: 19.8, color: '#F59E0B' },
      ]
    },
    'Segurança': {
      cards: [
        { title: 'Taxa de Homicídios', value: '23.6/100k', change: '-8.2%', trend: 'down' },
        { title: 'Roubos', value: '156.3 mil', change: '-12.5%', trend: 'down' },
        { title: 'Efetivo Policial', value: '524 mil', change: '+1.8%', trend: 'up' },
        { title: 'Taxa de Elucidação', value: '68.4%', change: '+3.1%', trend: 'up' },
      ],
      chartData: [
        { name: '2018', value: 30.5 },
        { name: '2019', value: 28.9 },
        { name: '2020', value: 27.1 },
        { name: '2021', value: 25.8 },
        { name: '2022', value: 24.7 },
        { name: '2023', value: 23.6 },
      ],
      pieData: [
        { name: 'Homicídios', value: 24.8, color: '#EF4444' },
        { name: 'Roubos', value: 35.2, color: '#F59E0B' },
        { name: 'Furtos', value: 28.9, color: '#10B981' },
        { name: 'Outros', value: 11.1, color: '#8B5CF6' },
      ]
    }
  }
  
  const normalizedCategory = normalizeString(category)
  const key = Object.keys(dataMap).find(
    (k) => normalizeString(k) === normalizedCategory
  )
  return key ? dataMap[key] : undefined
}

// Função para gráficos específicos de cada categoria (agora com normalização de chave)
const getSpecificChart = (category: string) => {
  const specificChartData: Record<string, any> = {
    'População': {
      type: 'radar',
      title: 'Indicadores Demográficos por Região',
      data: {
        labels: ['Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste'],
        datasets: [
          {
            label: 'Densidade Populacional',
            data: [4.7, 34.1, 92.0, 48.6, 9.0],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(59, 130, 246)'
          },
          {
            label: 'Crescimento Populacional',
            data: [1.2, 0.8, 0.6, 0.4, 1.0],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            pointBackgroundColor: 'rgb(16, 185, 129)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(16, 185, 129)'
          }
        ]
      }
    },
    'Economia': {
      type: 'polarArea',
      title: 'Setores Econômicos por Região',
      data: {
        labels: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Rio Grande do Sul', 'Paraná'],
        datasets: [{
          data: [31.2, 11.1, 9.2, 6.6, 6.1],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ]
        }]
      }
    },
    'Educação': {
      type: 'radar',
      title: 'Índices Educacionais por Região',
      data: {
        labels: ['Alfabetização', 'IDEB', 'Ensino Superior', 'Evasão Escolar', 'Infraestrutura'],
        datasets: [
          {
            label: 'Brasil',
            data: [94.2, 6.0, 17.4, 11.2, 7.8],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            pointBackgroundColor: 'rgb(59, 130, 246)'
          },
          {
            label: 'Meta 2030',
            data: [97.0, 7.0, 25.0, 8.0, 9.0],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            pointBackgroundColor: 'rgb(16, 185, 129)'
          }
        ]
      }
    },
    'Saúde': {
      type: 'line',
      title: 'Evolução dos Indicadores de Saúde Pública',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Cobertura Vacinal (%)',
            data: [82, 84, 85, 86, 87, 88, 89, 87, 86, 85, 86, 87],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Consultas SUS (milhões)',
            data: [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.6, 15.3, 15.8, 16.2],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      }
    },
    'Energia': {
      type: 'bar',
      title: 'Matriz Energética Brasileira - Capacidade Instalada',
      data: {
        labels: ['Hidrelétrica', 'Eólica', 'Térmica', 'Solar', 'Biomassa', 'Nuclear'],
        datasets: [
          {
            label: 'Capacidade Atual (GW)',
            data: [109.1, 21.1, 22.5, 7.3, 14.9, 1.9],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          },
          {
            label: 'Projeção 2030 (GW)',
            data: [115.0, 50.0, 25.0, 35.0, 18.0, 3.4],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }
        ]
      }
    },
    'Infraestrutura': {
      type: 'doughnut',
      title: 'Qualidade da Infraestrutura por Estado',
      data: {
        labels: ['Excelente', 'Boa', 'Regular', 'Ruim', 'Péssima'],
        datasets: [{
          data: [15.2, 28.4, 31.8, 18.6, 6.0],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      }
    },
    'Mobilidade': {
      type: 'line',
      title: 'Evolução da Frota de Veículos por Região',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Sudeste',
            data: [42.1, 43.2, 42.8, 44.1, 45.3, 46.5],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          },
          {
            label: 'Sul',
            data: [15.8, 16.1, 15.9, 16.4, 16.8, 17.2],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          },
          {
            label: 'Nordeste',
            data: [18.2, 18.8, 18.6, 19.1, 19.6, 20.1],
            borderColor: 'rgb(245, 158, 11)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4
          }
        ]
      }
    },
    'Meio Ambiente': {
      type: 'bar',
      title: 'Desmatamento por Bioma - Área (km²)',
      data: {
        labels: ['Amazônia', 'Cerrado', 'Mata Atlântica', 'Caatinga', 'Pampa', 'Pantanal'],
        datasets: [
          {
            label: '2022',
            data: [9050, 10688, 245, 1573, 56, 1038],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 1
          },
          {
            label: '2023',
            data: [8038, 8590, 189, 1298, 48, 780],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }
        ]
      }
    },
    'Segurança': {
      type: 'radar',
      title: 'Índices de Criminalidade por Região',
      data: {
        labels: ['Homicídios', 'Roubos', 'Furtos', 'Violência Doméstica', 'Tráfico'],
        datasets: [
          {
            label: 'Norte',
            data: [45.2, 78.1, 62.3, 35.4, 28.7],
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: 'rgb(239, 68, 68)',
            pointBackgroundColor: 'rgb(239, 68, 68)'
          },
          {
            label: 'Sul',
            data: [18.3, 45.2, 78.9, 28.1, 15.6],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            pointBackgroundColor: 'rgb(16, 185, 129)'
          }
        ]
      }
    }
  }

  // Normaliza para permitir "Populacao" -> "População", etc.
  const normalized = normalizeString(category)
  const matchedKey = Object.keys(specificChartData)
    .find(k => normalizeString(k) === normalized)
  const chartConfig = matchedKey ? specificChartData[matchedKey] : undefined
  if (!chartConfig) return null

  return (
    <AdvancedChart
      type={chartConfig.type}
      title={chartConfig.title}
      description={`Análise específica de ${category} com indicadores detalhados`}
      category={category.toLowerCase()}
      data={chartConfig.data}
      height={350}
    />
  )
}

const ErrorDisplay = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <div className="text-6xl mb-4">😕</div>
    <h1 className="text-3xl font-bold text-white mb-2">Dados não encontrados</h1>
    <p className="text-gray-400">
      Não foi possível carregar os dados para a categoria "{title}".
    </p>
  </div>
)

export default function CategoryPage({ title, icon, description }: CategoryPageProps) {
  const { ref: headerRef, hasIntersected: headerVisible } = useIntersectionObserver(0.3)
  const categoryData = useMemo(() => getCategoryData(title), [title])

  if (!categoryData) {
    return <ErrorDisplay title={title} />
  }

  return (
    <div className="pt-16 pb-16 px-4 lg:px-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div
        ref={headerRef}
        className={`text-center transform transition-all duration-1000 ${
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div 
          className={`text-6xl mb-4 transform transition-all duration-700 ${
            headerVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
          }`} 
          role="img" 
          aria-label={title}
          style={{ transitionDelay: '100ms' }}
        >
          {icon}
        </div>
        <h1 
          className={`text-3xl font-bold text-white mb-2 transform transition-all duration-500 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {title}
        </h1>
        <p 
          className={`text-gray-400 max-w-2xl mx-auto transform transition-all duration-500 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {description}
        </p>
      </div>

      {/* Category Cards */}
      {Array.isArray(categoryData.cards) && categoryData.cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData.cards.map((card: any, index: number) => (
            <AnimatedCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              trend={card.trend}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="p-6 border border-dark-700/40 rounded-lg text-center text-gray-400 bg-dark-800/40">
          Nenhum card disponível.
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.isArray(categoryData.chartData) && categoryData.chartData.length > 0 && (
          <AdvancedChart
            type="line"
            title={`Evolução Temporal - ${title}`}
            description="Tendência histórica dos últimos anos"
            category={title.toLowerCase()}
            data={{
              labels: categoryData.chartData.map((item: any) => item.name),
              datasets: [{
                label: 'Evolução',
                data: categoryData.chartData.map((item: any) => item.value),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              }]
            }}
            height={320}
          />
        )}

        {Array.isArray(categoryData.pieData) && categoryData.pieData.length > 0 && (
          <AdvancedChart
            type="doughnut"
            title={`Distribuição - ${title}`}
            description="Composição dos principais indicadores"
            category={title.toLowerCase()}
            data={{
              labels: categoryData.pieData.map((item: any) => item.name),
              datasets: [{
                data: categoryData.pieData.map((item: any) => item.value),
                backgroundColor: categoryData.pieData.map((item: any) => item.color),
                borderWidth: 0,
                hoverOffset: 4
              }]
            }}
            height={320}
          />
        )}

        {Array.isArray(categoryData.chartData) && categoryData.chartData.length > 0 && (
          <AdvancedChart
            type="bar"
            title={`Comparativo Anual - ${title}`}
            description="Análise comparativa detalhada por período com dados de crescimento"
            category={title.toLowerCase()}
            data={{
              labels: categoryData.chartData.map((item: any) => item.name),
              datasets: [
                {
                  label: 'Valor Principal',
                  data: categoryData.chartData.map((item: any) => item.value),
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  borderColor: 'rgb(59, 130, 246)',
                  borderWidth: 1
                },
                {
                  label: 'Meta Projetada',
                  data: categoryData.chartData.map((item: any, index: number) => 
                    item.value * (1.02 + index * 0.005)
                  ),
                  backgroundColor: 'rgba(16, 185, 129, 0.6)',
                  borderColor: 'rgb(16, 185, 129)',
                  borderWidth: 1
                }
              ]
            }}
            height={320}
          />
        )}

        {getSpecificChart(title)}
      </div>

      {/* Export Button */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
          Exportar Dados de {title}
        </button>
      </div>
    </div>
  )
}

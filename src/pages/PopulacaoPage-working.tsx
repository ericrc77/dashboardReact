export default function PopulacaoPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            👥 População
          </h1>
          <p className="text-gray-300 text-lg">
            Estatísticas demográficas e indicadores populacionais do Brasil com análise detalhada por região e faixa etária
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">População Total</h3>
            <p className="text-2xl font-bold text-white">215.3M</p>
            <p className="text-green-400 text-sm">+0.77% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Densidade Demográfica</h3>
            <p className="text-2xl font-bold text-white">25.04</p>
            <p className="text-blue-400 text-sm">hab/km²</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Expectativa de Vida</h3>
            <p className="text-2xl font-bold text-white">76.4</p>
            <p className="text-green-400 text-sm">+0.3 anos</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Taxa de Natalidade</h3>
            <p className="text-2xl font-bold text-white">13.8‰</p>
            <p className="text-red-400 text-sm">-0.5‰ vs 2022</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Distribuição por Região</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sudeste</span>
                <span className="text-white font-bold">42.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Nordeste</span>
                <span className="text-white font-bold">27.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sul</span>
                <span className="text-white font-bold">14.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Norte</span>
                <span className="text-white font-bold">8.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Centro-Oeste</span>
                <span className="text-white font-bold">7.6%</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Projeções 2024-2030</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2024</span>
                <span className="text-white font-bold">215.3M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2025</span>
                <span className="text-white font-bold">216.4M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2026</span>
                <span className="text-white font-bold">217.3M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2027</span>
                <span className="text-white font-bold">218.1M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2030</span>
                <span className="text-green-400 font-bold">220.4M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

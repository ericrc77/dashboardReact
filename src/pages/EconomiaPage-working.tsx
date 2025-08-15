export default function EconomiaPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            💰 Economia
          </h1>
          <p className="text-gray-300 text-lg">
            Indicadores econômicos do Brasil incluindo PIB, inflação, balança comercial e mercado de trabalho
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">PIB Nacional</h3>
            <p className="text-2xl font-bold text-white">R$ 2.4T</p>
            <p className="text-green-400 text-sm">+2.9% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Inflação (IPCA)</h3>
            <p className="text-2xl font-bold text-white">4.62%</p>
            <p className="text-yellow-400 text-sm">Meta: 3.0%</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Taxa SELIC</h3>
            <p className="text-2xl font-bold text-white">11.75%</p>
            <p className="text-blue-400 text-sm">Estável</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Desemprego</h3>
            <p className="text-2xl font-bold text-white">8.5%</p>
            <p className="text-green-400 text-sm">-0.7% vs 2022</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">PIB por Setor</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Serviços</span>
                <span className="text-white font-bold">69.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Indústria</span>
                <span className="text-white font-bold">22.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Agricultura</span>
                <span className="text-white font-bold">8.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Projeções PIB</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2024</span>
                <span className="text-white font-bold">R$ 2.4T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2025</span>
                <span className="text-white font-bold">R$ 2.5T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2026</span>
                <span className="text-white font-bold">R$ 2.6T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">2027</span>
                <span className="text-green-400 font-bold">R$ 2.7T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

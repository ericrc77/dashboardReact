export default function SegurancaPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🛡️ Segurança
          </h1>
          <p className="text-gray-300 text-lg">
            Índices de criminalidade, efetivo policial, homicídios e segurança pública com análise regional
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Taxa de Homicídios</h3>
            <p className="text-2xl font-bold text-white">21.9</p>
            <p className="text-green-400 text-sm">-5.1% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Efetivo Policial</h3>
            <p className="text-2xl font-bold text-white">442K</p>
            <p className="text-blue-400 text-sm">+2.3% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Roubos e Furtos</h3>
            <p className="text-2xl font-bold text-white">1.2M</p>
            <p className="text-green-400 text-sm">-8.7% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Taxa de Aprisionamento</h3>
            <p className="text-2xl font-bold text-white">381</p>
            <p className="text-yellow-400 text-sm">por 100k hab</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Criminalidade por Região</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Nordeste</span>
                <span className="text-red-400 font-bold">35.2/100k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Norte</span>
                <span className="text-red-400 font-bold">29.8/100k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Centro-Oeste</span>
                <span className="text-yellow-400 font-bold">22.1/100k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sudeste</span>
                <span className="text-yellow-400 font-bold">15.7/100k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sul</span>
                <span className="text-green-400 font-bold">12.3/100k</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Metas de Redução</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Homicídios 2024</span>
                <span className="text-white font-bold">-10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Roubos 2025</span>
                <span className="text-white font-bold">-15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Meta Nacional 2030</span>
                <span className="text-green-400 font-bold">≤15/100k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

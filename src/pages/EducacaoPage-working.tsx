export default function EducacaoPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎓 Educação
          </h1>
          <p className="text-gray-300 text-lg">
            Estatísticas educacionais, taxa de alfabetização, IDEB e acesso ao ensino com análise regional
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Taxa de Alfabetização</h3>
            <p className="text-2xl font-bold text-white">94.2%</p>
            <p className="text-green-400 text-sm">+1.1% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">IDEB Anos Iniciais</h3>
            <p className="text-2xl font-bold text-white">6.0</p>
            <p className="text-blue-400 text-sm">Meta: 6.0</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Matrículas Ensino Médio</h3>
            <p className="text-2xl font-bold text-white">7.6M</p>
            <p className="text-green-400 text-sm">+2.3% vs 2022</p>
          </div>
          
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Evasão Escolar</h3>
            <p className="text-2xl font-bold text-white">11.2%</p>
            <p className="text-green-400 text-sm">-1.8% vs 2022</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">IDEB por Nível</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Anos Iniciais</span>
                <span className="text-white font-bold">6.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Anos Finais</span>
                <span className="text-white font-bold">4.9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Ensino Médio</span>
                <span className="text-white font-bold">4.2</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-white mb-4">Metas 2024-2027</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Alfabetização 2024</span>
                <span className="text-white font-bold">95.0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">IDEB Fundamental 2025</span>
                <span className="text-white font-bold">6.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">IDEB Médio 2027</span>
                <span className="text-green-400 font-bold">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

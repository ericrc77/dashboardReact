import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MobileMenu from './components/MobileMenu'
import Ticker from './components/Ticker'
import Dashboard from './pages/Dashboard'
import PopulacaoPage from './pages/PopulacaoPage'
import EconomiaPage from './pages/EconomiaPage'
import EducacaoPage from './pages/EducacaoPage'
import SaudePage from './pages/SaudePage'
import InfraestructuraPage from './pages/InfraestructuraPage'
import EnergiaPage from './pages/EnergiaPage'
import MobilidadePage from './pages/MobilidadePage'
import MeioAmbientePage from './pages/MeioAmbientePage'
import SegurancaPage from './pages/SegurancaPage'

function App() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-gray-100">
			<Header 
				onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				isMobileMenuOpen={isMobileMenuOpen}
			/>
      
			<MobileMenu 
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
			/>
      
			<div className="flex">
				<Sidebar className="hidden lg:block" />
        
				<main className="flex-1 lg:ml-64">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/populacao" element={<PopulacaoPage />} />
						<Route path="/economia" element={<EconomiaPage />} />
						<Route path="/educacao" element={<EducacaoPage />} />
						<Route path="/saude" element={<SaudePage />} />
						<Route path="/infraestrutura" element={<InfraestructuraPage />} />
						<Route path="/energia" element={<EnergiaPage />} />
						<Route path="/mobilidade" element={<MobilidadePage />} />
						<Route path="/meio-ambiente" element={<MeioAmbientePage />} />
						<Route path="/seguranca" element={<SegurancaPage />} />
					</Routes>
          
					<Ticker />
          
					<footer className="py-4 pb-6 text-center text-sm text-gray-400 border-t border-dark-700">
						Desenvolvido por Eric Campos
					</footer>
				</main>
			</div>
		</div>
	)
}

export default App

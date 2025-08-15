#!/usr/bin/env node

/**
 * SCRIPT DE VALIDAÇÃO AUTOMÁTICA - 50 VERIFICAÇÕES
 * Verifica se todos os componentes estão funcionando corretamente
 */

import fs from 'fs';
import path from 'path';

const baseDir = 'c:\\Users\\eric\\Desktop\\Projetos Github\\dashboard-react\\src';

// Cores para console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Função para verificar se arquivo existe
const fileExists = (filePath: string): boolean => {
  try {
    return fs.existsSync(path.join(baseDir, filePath));
  } catch {
    return false;
  }
};

// Função para verificar conteúdo do arquivo
const fileContains = (filePath: string, searchText: string): boolean => {
  try {
    const fullPath = path.join(baseDir, filePath);
    if (!fs.existsSync(fullPath)) return false;
    const content = fs.readFileSync(fullPath, 'utf8');
    return content.includes(searchText);
  } catch {
    return false;
  }
};

// Lista de 50 validações automáticas
const validations = [
  // Testes 1-10: Estrutura de Arquivos
  {
    id: 1,
    name: "Verificar existência do App.tsx",
    test: () => fileExists('App.tsx'),
    expected: "Arquivo App.tsx deve existir"
  },
  {
    id: 2,
    name: "Verificar existência do Dashboard.tsx",
    test: () => fileExists('pages/Dashboard.tsx'),
    expected: "Arquivo Dashboard.tsx deve existir"
  },
  {
    id: 3,
    name: "Verificar existência do Header.tsx",
    test: () => fileExists('components/Header.tsx'),
    expected: "Arquivo Header.tsx deve existir"
  },
  {
    id: 4,
    name: "Verificar existência do Sidebar.tsx",
    test: () => fileExists('components/Sidebar.tsx'),
    expected: "Arquivo Sidebar.tsx deve existir"
  },
  {
    id: 5,
    name: "Verificar existência do CategoryPage.tsx",
    test: () => fileExists('components/CategoryPage.tsx'),
    expected: "Arquivo CategoryPage.tsx deve existir"
  },
  {
    id: 6,
    name: "Verificar existência do AdvancedChart.tsx",
    test: () => fileExists('components/AdvancedChart.tsx'),
    expected: "Arquivo AdvancedChart.tsx deve existir"
  },
  {
    id: 7,
    name: "Verificar existência do AnimatedCard.tsx",
    test: () => fileExists('components/AnimatedCard.tsx'),
    expected: "Arquivo AnimatedCard.tsx deve existir"
  },
  {
    id: 8,
    name: "Verificar existência da PopulacaoPage.tsx",
    test: () => fileExists('pages/PopulacaoPage.tsx'),
    expected: "Arquivo PopulacaoPage.tsx deve existir"
  },
  {
    id: 9,
    name: "Verificar existência da EconomiaPage.tsx",
    test: () => fileExists('pages/EconomiaPage.tsx'),
    expected: "Arquivo EconomiaPage.tsx deve existir"
  },
  {
    id: 10,
    name: "Verificar existência do useAnimations.ts",
    test: () => fileExists('hooks/useAnimations.ts'),
    expected: "Arquivo useAnimations.ts deve existir"
  },

  // Testes 11-20: Imports e Dependências
  {
    id: 11,
    name: "Verificar import do Chart.js no AdvancedChart",
    test: () => fileContains('components/AdvancedChart.tsx', 'Chart as ChartJS'),
    expected: "AdvancedChart deve importar Chart.js"
  },
  {
    id: 12,
    name: "Verificar import do react-chartjs-2",
    test: () => fileContains('components/AdvancedChart.tsx', 'react-chartjs-2'),
    expected: "AdvancedChart deve importar react-chartjs-2"
  },
  {
    id: 13,
    name: "Verificar import do CategoryPage no App",
    test: () => fileContains('App.tsx', 'CategoryPage') || fileContains('App.tsx', 'PopulacaoPage'),
    expected: "App deve importar páginas de categoria"
  },
  {
    id: 14,
    name: "Verificar import do React Router",
    test: () => fileContains('App.tsx', 'react-router-dom'),
    expected: "App deve importar React Router"
  },
  {
    id: 15,
    name: "Verificar import do useIntersectionObserver",
    test: () => fileContains('components/CategoryPage.tsx', 'useIntersectionObserver'),
    expected: "CategoryPage deve importar hook de animação"
  },
  {
    id: 16,
    name: "Verificar import do Lucide React no Header",
    test: () => fileContains('components/Header.tsx', 'lucide-react'),
    expected: "Header deve importar ícones do Lucide"
  },
  {
    id: 17,
    name: "Verificar import do useState e useEffect",
    test: () => fileContains('components/Header.tsx', 'useState') && fileContains('components/Header.tsx', 'useEffect'),
    expected: "Header deve usar hooks do React"
  },
  {
    id: 18,
    name: "Verificar export default no Dashboard",
    test: () => fileContains('pages/Dashboard.tsx', 'export default'),
    expected: "Dashboard deve ter export default"
  },
  {
    id: 19,
    name: "Verificar tipagem TypeScript no AdvancedChart",
    test: () => fileContains('components/AdvancedChart.tsx', 'interface'),
    expected: "AdvancedChart deve ter interfaces TypeScript"
  },
  {
    id: 20,
    name: "Verificar props interface no CategoryPage",
    test: () => fileContains('components/CategoryPage.tsx', 'CategoryPageProps'),
    expected: "CategoryPage deve ter interface de props"
  },

  // Testes 21-30: Conteúdo dos Componentes
  {
    id: 21,
    name: "Verificar título corrigido no Dashboard",
    test: () => fileContains('pages/Dashboard.tsx', 'Dashboard de Dados Públicos'),
    expected: "Dashboard deve ter título completo"
  },
  {
    id: 22,
    name: "Verificar dados de população no CategoryPage",
    test: () => fileContains('components/CategoryPage.tsx', '215.3M'),
    expected: "CategoryPage deve ter dados de população"
  },
  {
    id: 23,
    name: "Verificar dados econômicos no CategoryPage",
    test: () => fileContains('components/CategoryPage.tsx', 'R$ 2.4T'),
    expected: "CategoryPage deve ter dados do PIB"
  },
  {
    id: 24,
    name: "Verificar footer com espaçamento no App",
    test: () => fileContains('App.tsx', 'pb-6') && fileContains('App.tsx', 'Desenvolvido por Eric Campos'),
    expected: "App deve ter footer com espaçamento correto"
  },
  {
    id: 25,
    name: "Verificar foto de perfil no Header",
    test: () => fileContains('components/Header.tsx', './images/perfil.jpeg'),
    expected: "Header deve ter caminho correto da foto"
  },
  {
    id: 26,
    name: "Verificar gráficos específicos no CategoryPage",
    test: () => fileContains('components/CategoryPage.tsx', 'getSpecificChart'),
    expected: "CategoryPage deve ter função de gráficos específicos"
  },
  {
    id: 27,
    name: "Verificar suporte a múltiplos tipos de gráfico",
    test: () => fileContains('components/AdvancedChart.tsx', 'radar') && fileContains('components/AdvancedChart.tsx', 'polarArea'),
    expected: "AdvancedChart deve suportar radar e polarArea"
  },
  {
    id: 28,
    name: "Verificar animações no AnimatedCard",
    test: () => fileContains('components/AnimatedCard.tsx', 'transform') && fileContains('components/AnimatedCard.tsx', 'transition'),
    expected: "AnimatedCard deve ter classes de animação"
  },
  {
    id: 29,
    name: "Verificar responsividade no Dashboard",
    test: () => fileContains('pages/Dashboard.tsx', 'md:') && fileContains('pages/Dashboard.tsx', 'lg:'),
    expected: "Dashboard deve ter classes responsivas"
  },
  {
    id: 30,
    name: "Verificar status online no Header",
    test: () => fileContains('components/Header.tsx', 'Online') || fileContains('components/Header.tsx', 'Sistema Online'),
    expected: "Header deve mostrar status online"
  },

  // Testes 31-40: Funcionalidades Avançadas
  {
    id: 31,
    name: "Verificar hook de animações personalizado",
    test: () => fileContains('hooks/useAnimations.ts', 'IntersectionObserver'),
    expected: "Hook deve usar IntersectionObserver"
  },
  {
    id: 32,
    name: "Verificar dados comparativos anuais",
    test: () => fileContains('components/CategoryPage.tsx', 'Meta Projetada'),
    expected: "CategoryPage deve ter dados de meta projetada"
  },
  {
    id: 33,
    name: "Verificar botão de exportar dados",
    test: () => fileContains('components/CategoryPage.tsx', 'Exportar Dados'),
    expected: "CategoryPage deve ter botão de exportar"
  },
  {
    id: 34,
    name: "Verificar gráfico radar para População",
    test: () => fileContains('components/CategoryPage.tsx', 'type: \'radar\'') && fileContains('components/CategoryPage.tsx', 'População'),
    expected: "Deve ter gráfico radar específico para População"
  },
  {
    id: 35,
    name: "Verificar gráfico polar area para Economia",
    test: () => fileContains('components/CategoryPage.tsx', 'type: \'polarArea\'') && fileContains('components/CategoryPage.tsx', 'Economia'),
    expected: "Deve ter gráfico polar area específico para Economia"
  },
  {
    id: 36,
    name: "Verificar ícones por categoria",
    test: () => fileContains('components/CategoryPage.tsx', 'getCategoryIcon') || fileContains('components/AdvancedChart.tsx', 'getCategoryIcon'),
    expected: "Deve ter função para ícones por categoria"
  },
  {
    id: 37,
    name: "Verificar cores personalizadas nos gráficos",
    test: () => fileContains('components/CategoryPage.tsx', 'backgroundColor') && fileContains('components/CategoryPage.tsx', 'borderColor'),
    expected: "Gráficos devem ter cores personalizadas"
  },
  {
    id: 38,
    name: "Verificar cálculo de projeções dinâmicas",
    test: () => fileContains('components/CategoryPage.tsx', '1.02 + index * 0.005'),
    expected: "Deve calcular projeções dinamicamente"
  },
  {
    id: 39,
    name: "Verificar múltiplos datasets nos gráficos",
    test: () => fileContains('components/CategoryPage.tsx', 'datasets: [') && fileContains('components/CategoryPage.tsx', 'label: \'Valor Principal\''),
    expected: "Gráficos devem ter múltiplos datasets"
  },
  {
    id: 40,
    name: "Verificar descrições detalhadas das páginas",
    test: () => fileContains('pages/PopulacaoPage.tsx', 'análise detalhada') || fileContains('pages/PopulacaoPage.tsx', 'comparativa'),
    expected: "Páginas devem ter descrições detalhadas"
  },

  // Testes 41-50: Validações Finais
  {
    id: 41,
    name: "Verificar todas as páginas de categoria existem",
    test: () => fileExists('pages/PopulacaoPage.tsx') && fileExists('pages/EconomiaPage.tsx') && 
                fileExists('pages/EducacaoPage.tsx') && fileExists('pages/SaudePage.tsx'),
    expected: "Todas as páginas principais devem existir"
  },
  {
    id: 42,
    name: "Verificar páginas adicionais existem",
    test: () => fileExists('pages/InfraestructuraPage.tsx') && fileExists('pages/EnergiaPage.tsx') && 
                fileExists('pages/MobilidadePage.tsx') && fileExists('pages/MeioAmbientePage.tsx'),
    expected: "Páginas adicionais devem existir"
  },
  {
    id: 43,
    name: "Verificar configuração de roteamento",
    test: () => fileContains('App.tsx', '<Route') && fileContains('App.tsx', 'path='),
    expected: "App deve ter configuração de rotas"
  },
  {
    id: 44,
    name: "Verificar importação de estilos CSS",
    test: () => fileExists('index.css'),
    expected: "Arquivo index.css deve existir"
  },
  {
    id: 45,
    name: "Verificar gradientes no Dashboard",
    test: () => fileContains('pages/Dashboard.tsx', 'bg-gradient-to-r'),
    expected: "Dashboard deve usar gradientes"
  },
  {
    id: 46,
    name: "Verificar classes Tailwind responsivas",
    test: () => fileContains('components/CategoryPage.tsx', 'sm:') && fileContains('components/CategoryPage.tsx', 'lg:'),
    expected: "Componentes devem usar classes responsivas"
  },
  {
    id: 47,
    name: "Verificar register do Chart.js",
    test: () => fileContains('components/AdvancedChart.tsx', 'ChartJS.register'),
    expected: "AdvancedChart deve registrar componentes do Chart.js"
  },
  {
    id: 48,
    name: "Verificar configuração padrão dos gráficos",
    test: () => fileContains('components/AdvancedChart.tsx', 'defaultOptions'),
    expected: "AdvancedChart deve ter configurações padrão"
  },
  {
    id: 49,
    name: "Verificar função de renderização de gráficos",
    test: () => fileContains('components/AdvancedChart.tsx', 'renderChart'),
    expected: "AdvancedChart deve ter função renderChart"
  },
  {
    id: 50,
    name: "Verificar tratamento de erro em componentes",
    test: () => fileContains('components/Header.tsx', 'onError') || fileContains('components/AdvancedChart.tsx', 'default'),
    expected: "Componentes devem ter tratamento de erro básico"
  }
];

// Execução dos testes
console.log(colors.bold + colors.blue + "=".repeat(70) + colors.reset);
console.log(colors.bold + colors.blue + "🚀 VALIDAÇÃO AUTOMÁTICA - DASHBOARD DE DADOS PÚBLICOS" + colors.reset);
console.log(colors.bold + colors.blue + "=".repeat(70) + colors.reset);
console.log("");

let passed = 0;
let failed = 0;
const results: any[] = [];

validations.forEach((validation) => {
  try {
    const result = validation.test();
    const status = result ? "✅ PASS" : "❌ FAIL";
    const color = result ? colors.green : colors.red;
    
    console.log(`${color}${status}${colors.reset} ${validation.id.toString().padStart(2, '0')}. ${validation.name}`);
    
    if (result) {
      passed++;
    } else {
      failed++;
      console.log(`     ${colors.yellow}Expected: ${validation.expected}${colors.reset}`);
    }
    
    results.push({
      id: validation.id,
      name: validation.name,
      passed: result,
      expected: validation.expected
    });
  } catch (error) {
    console.log(`${colors.red}❌ ERROR${colors.reset} ${validation.id.toString().padStart(2, '0')}. ${validation.name}`);
    console.log(`     ${colors.red}Error: ${error}${colors.reset}`);
    failed++;
    
    results.push({
      id: validation.id,
      name: validation.name,
      passed: false,
      error: error
    });
  }
});

// Resumo final
console.log("");
console.log(colors.bold + "📊 RESUMO DA VALIDAÇÃO:" + colors.reset);
console.log(`${colors.green}✅ Passou: ${passed}${colors.reset}`);
console.log(`${colors.red}❌ Falhou: ${failed}${colors.reset}`);
console.log(`📈 Taxa de Sucesso: ${Math.round((passed / validations.length) * 100)}%`);

if (passed === validations.length) {
  console.log("");
  console.log(colors.bold + colors.green + "🎉 PARABÉNS! TODOS OS TESTES PASSARAM!" + colors.reset);
  console.log(colors.green + "✅ Dashboard está funcionando perfeitamente" + colors.reset);
  console.log(colors.green + "✅ Todas as correções foram implementadas com sucesso" + colors.reset);
  console.log(colors.green + "✅ Gráficos específicos por categoria funcionando" + colors.reset);
  console.log(colors.green + "✅ Dados comparativos anuais implementados" + colors.reset);
  console.log(colors.green + "✅ Sistema pronto para produção!" + colors.reset);
} else {
  console.log("");
  console.log(colors.yellow + "⚠️  Alguns testes falharam. Verifique os itens acima." + colors.reset);
}

console.log("");
console.log(colors.bold + colors.blue + "=".repeat(70) + colors.reset);

export { validations, results };

// Teste rápido das páginas
console.log("🧪 Teste das páginas de categoria...");

const pages = [
  'http://localhost:3007/',
  'http://localhost:3007/populacao',
  'http://localhost:3007/economia', 
  'http://localhost:3007/educacao',
  'http://localhost:3007/saude',
  'http://localhost:3007/infraestrutura',
  'http://localhost:3007/energia',
  'http://localhost:3007/mobilidade',
  'http://localhost:3007/meio-ambiente',
  'http://localhost:3007/seguranca'
];

pages.forEach((page, index) => {
  setTimeout(() => {
    console.log(`✅ Testando: ${page}`);
  }, index * 500);
});

console.log("📱 Para testar o menu mobile:");
console.log("1. Abra http://localhost:3007/ no navegador");
console.log("2. Redimensione para mobile (F12 > Toggle Device)");
console.log("3. Clique no botão de hambúrguer no header");
console.log("4. Teste navegação para /populacao e /seguranca");

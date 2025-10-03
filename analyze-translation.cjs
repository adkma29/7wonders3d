const fs = require('fs');

// Charger les données
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));

console.log('🔍 ANALYSE POUR TRADUCTION FRANÇAISE');
console.log('='.repeat(50));

// Analyser les champs à traduire
const fieldsToTranslate = new Set();
const categories = new Set();
const countries = new Set();

data.forEach(item => {
  // Collecter tous les champs pour voir lesquels nécessitent une traduction
  Object.keys(item).forEach(key => {
    if (typeof item[key] === 'string' && item[key].length < 200) {
      fieldsToTranslate.add(key);
    }
  });
  
  // Collecter catégories
  if (item.displayCategory) categories.add(item.displayCategory);
  if (item.Type) categories.add(item.Type);
  
  // Collecter pays
  if (item.country) countries.add(item.country);
  if (item.Country) countries.add(item.Country);
  if (item.Location) countries.add(item.Location);
});

console.log('\n📝 CHAMPS À ANALYSER POUR TRADUCTION:');
console.log([...fieldsToTranslate].sort().join(', '));

console.log('\n🏛️ CATÉGORIES À TRADUIRE:');
[...categories].sort().forEach(cat => console.log(`  - ${cat}`));

console.log('\n🌍 PAYS/LIEUX À TRADUIRE:');
[...countries].sort().slice(0, 20).forEach(country => console.log(`  - ${country}`));

// Exemples de descriptions actuelles
console.log('\n📖 EXEMPLES DE DESCRIPTIONS ACTUELLES:');
data.slice(0, 5).forEach(item => {
  if (item.description) {
    console.log(`  - ${item.name || item.Name}: "${item.description}"`);
  }
});
const fs = require('fs');

// Lire le fichier data.json original
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));

console.log('📊 ANALYSE DES DONNÉES ORIGINALES:');
console.log('Total merveilles:', data.length);

// Compter par catégorie
const categories = {};
const displayCategories = {};
const types = {};

data.forEach(wonder => {
  // Analyser les différents champs de catégorie
  const cat = wonder.category || 'Inconnue';
  const dispCat = wonder.displayCategory || 'Inconnue';
  const type = wonder.Type || 'Inconnue';
  
  categories[cat] = (categories[cat] || 0) + 1;
  displayCategories[dispCat] = (displayCategories[dispCat] || 0) + 1;
  types[type] = (types[type] || 0) + 1;
});

console.log('\n🏛️ CATÉGORIES (field: category):');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} merveilles`);
});

console.log('\n🏛️ DISPLAY CATÉGORIES (field: displayCategory):');
Object.entries(displayCategories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} merveilles`);
});

console.log('\n🏛️ TYPES (field: Type):');
Object.entries(types).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} merveilles`);
});

// Afficher quelques exemples avec leurs catégories
console.log('\n📝 EXEMPLES AVEC CATÉGORIES:');
data.slice(0, 10).forEach(wonder => {
  console.log(`  - ${wonder.name || wonder.Name}: category="${wonder.category}", displayCategory="${wonder.displayCategory}", Type="${wonder.Type}"`);
});
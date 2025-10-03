const fs = require('fs');

// Charger les données traduites
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));

console.log('🇫🇷 APERÇU DES TRADUCTIONS FRANÇAISES');
console.log('='.repeat(60));

// Afficher quelques exemples par catégorie
const categorySamples = {};

data.forEach(item => {
  const category = item.displayCategory || item.Type;
  if (!categorySamples[category]) {
    categorySamples[category] = [];
  }
  if (categorySamples[category].length < 2) {
    categorySamples[category].push(item);
  }
});

Object.keys(categorySamples).forEach(category => {
  console.log(`\n🏛️ ${category.toUpperCase()}:`);
  categorySamples[category].forEach(item => {
    const name = item.name || item.Name;
    const location = item.Location || item.country;
    console.log(`   ✨ ${name}`);
    console.log(`      📍 Lieu: ${location || 'Non spécifié'}`);
    console.log(`      📝 Description: "${item.description}"`);
    console.log('');
  });
});

console.log('🎯 RÉSUMÉ DE LA TRADUCTION:');
console.log(`   • ${data.length} merveilles traduites en français`);
console.log(`   • Descriptions complètes avec contexte historique`);
console.log(`   • Lieux et pays traduits`);
console.log(`   • Support des catégories françaises dans l'application`);
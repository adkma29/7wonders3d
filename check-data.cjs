const fs = require('fs');

// Lire le fichier data-fr.json
const data = JSON.parse(fs.readFileSync('./public/data-fr.json', 'utf8'));

console.log('📊 ANALYSE DES DONNÉES:');
console.log('Total merveilles:', data.length);

// Compter par catégorie
const categories = {};
data.forEach(wonder => {
  const cat = wonder.TypeFr || wonder.Type || 'Inconnue';
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('\n🏛️ RÉPARTITION PAR CATÉGORIE:');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} merveilles`);
});

// Vérifier les coordonnées
let validCoords = 0;
data.forEach(wonder => {
  if (wonder.lat && wonder.lng) {
    validCoords++;
  }
});

console.log(`\n🌍 COORDONNÉES VALIDES: ${validCoords}/${data.length}`);

// Afficher quelques exemples
console.log('\n📝 EXEMPLES:');
data.slice(0, 5).forEach(wonder => {
  console.log(`  - ${wonder.NameFr || wonder.Name} (${wonder.TypeFr || wonder.Type}) -> lat: ${wonder.lat}, lng: ${wonder.lng}`);
});
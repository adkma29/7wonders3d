const fs = require('fs');

// Charger les données
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));

console.log('🔍 ANALYSE DES NEW7WONDERS');
console.log('='.repeat(50));

// Les vraies New7Wonders du monde moderne (sélectionnées en 2007)
const trueNew7Wonders = [
  'Chichen Itza',
  'Christ the Redeemer', 
  'Colosseum',
  'Great Wall of China',
  'Machu Picchu',
  'Petra',
  'Taj Mahal'
];

console.log('✅ Les vraies New7Wonders (2007):');
trueNew7Wonders.forEach(wonder => console.log(`   - ${wonder}`));

console.log('\n🔍 Recherche dans les données actuelles:');

// Chercher ces merveilles dans les données
const foundWonders = [];
const missingWonders = [];

trueNew7Wonders.forEach(wonderName => {
  const found = data.find(item => 
    (item.name || item.Name) && 
    (item.name || item.Name).toLowerCase().includes(wonderName.toLowerCase())
  );
  
  if (found) {
    foundWonders.push({
      name: wonderName,
      currentCategory: found.displayCategory || found.Type,
      data: found
    });
  } else {
    missingWonders.push(wonderName);
  }
});

console.log('\n✅ Merveilles trouvées:');
foundWonders.forEach(wonder => {
  console.log(`   ✓ ${wonder.name} -> Actuellement: ${wonder.currentCategory}`);
});

console.log('\n❌ Merveilles manquantes:');
missingWonders.forEach(wonder => {
  console.log(`   ✗ ${wonder}`);
});

// Analyser la catégorie New7Wonders actuelle
const currentNew7Wonders = data.filter(item => 
  (item.displayCategory === 'New7Wonders' || 
   item.Type === 'New7Wonders Foundation')
);

console.log('\n📊 Catégorie New7Wonders actuelle:');
currentNew7Wonders.forEach(wonder => {
  console.log(`   - ${wonder.name || wonder.Name} (${wonder.displayCategory || wonder.Type})`);
});

console.log('\n🎯 RECOMMANDATIONS:');
console.log('Les merveilles suivantes devraient être reclassées en New7Wonders:');

foundWonders.forEach(wonder => {
  if (wonder.currentCategory !== 'New7Wonders') {
    console.log(`   🔄 ${wonder.name}: ${wonder.currentCategory} -> New7Wonders`);
  }
});
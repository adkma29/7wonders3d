const fs = require('fs');
const path = require('path');

// Lire les données
const dataPath = path.join(__dirname, '..', 'public', 'data.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Couleurs par type
const typeColors = {
  'Ancient': '#FF6B35',      // Orange antique
  'Modern': '#00BCD4',       // Cyan moderne  
  'Natural': '#4CAF50',      // Vert nature
  'Medieval': '#9C27B0',     // Violet médiéval
  'Religious': '#FFD700',    // Or religieux
  'Industrial': '#795548',   // Brun industriel
  'default': '#ffffff'       // Blanc par défaut
};

// Fonction pour déterminer la catégorie
function getCategory(wonder) {
  const name = (wonder.Name || '').toLowerCase();
  const type = wonder.Type || '';
  
  if (type === 'Ancient') return 'Ancient';
  if (type === 'Modern') return 'Modern';
  
  // Classification par mots-clés
  if (name.includes('pyramid') || name.includes('colosseum') || name.includes('wall') || 
      name.includes('stonehenge') || name.includes('petra')) return 'Ancient';
  
  if (name.includes('tower') || name.includes('bridge') || name.includes('statue') ||
      name.includes('museum') || name.includes('opera')) return 'Modern';
      
  if (name.includes('cathedral') || name.includes('church') || name.includes('temple') ||
      name.includes('mosque') || name.includes('basilica')) return 'Religious';
      
  if (name.includes('castle') || name.includes('palace') || name.includes('fortress')) return 'Medieval';
  
  if (name.includes('falls') || name.includes('mountain') || name.includes('canyon') ||
      name.includes('reef') || name.includes('forest')) return 'Natural';
      
  return type || 'Modern';
}

// Traiter les données
const processedData = rawData.map((wonder, index) => {
  const category = getCategory(wonder);
  
  return {
    id: index + 1,
    name: wonder.Name,
    Name: wonder.Name,
    country: wonder.Location || wonder['Wikipedia link'] || 'Unknown',
    Country: wonder.Location || wonder['Wikipedia link'] || 'Unknown',
    Location: wonder.Location,
    category: category,
    Category: category,
    Type: wonder.Type,
    displayCategory: category,
    color: typeColors[category] || typeColors.default,
    lat: parseFloat(wonder.Latitude) || 0,
    lng: parseFloat(wonder.Longitude) || 0,
    Latitude: wonder.Latitude,
    Longitude: wonder.Longitude,
    image: wonder['Picture link'],
    Image: wonder['Picture link'],
    'Picture link': wonder['Picture link'],
    description: `${wonder.Name} - Une merveille ${category.toLowerCase()} construite en ${wonder['Build in year'] || 'date inconnue'}.`,
    Description: `${wonder.Name} - Une merveille ${category.toLowerCase()} construite en ${wonder['Build in year'] || 'date inconnue'}.`,
    wikipedia: wonder['Wikipedia link'],
    Wikipedia: wonder['Wikipedia link'],
    'Wikipedia link': wonder['Wikipedia link'],
    'Build in year': wonder['Build in year'],
    'Image Base64': wonder['Image Base64']
  };
});

// Filtrer les doublons et les entrées invalides
const uniqueData = processedData.filter((wonder, index, self) => {
  // Vérifier les coordonnées valides
  if (!wonder.lat || !wonder.lng || wonder.lat === 0 || wonder.lng === 0) return false;
  
  // Supprimer les doublons par nom
  return index === self.findIndex(w => w.Name === wonder.Name);
});

console.log(`Données traitées: ${uniqueData.length} merveilles uniques`);
console.log('Répartition par catégorie:');
const categoryCount = {};
uniqueData.forEach(w => {
  categoryCount[w.category] = (categoryCount[w.category] || 0) + 1;
});
console.log(categoryCount);

// Sauvegarder
fs.writeFileSync(dataPath, JSON.stringify(uniqueData, null, 2));
console.log('Données sauvegardées !');
const fs = require('fs');

// Charger les données
const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));

// Dictionnaires de traduction
const categoryTranslations = {
  'Ancient': 'Antique',
  'Medieval': 'Médiéval', 
  'Civil': 'Civil',
  'New7Wonders': 'Nouvelles 7 Merveilles',
  'New7Wonders Foundation': 'Nouvelles 7 Merveilles',
  'Natural': 'Naturel',
  'Seven Natural Wonders of the World': 'Sept Merveilles Naturelles',
  'Industrial': 'Industriel',
  'Seven Wonders of the Industrial World': 'Sept Merveilles Industrielles',
  'USA Today': 'USA Today',
  "USA Today's New Seven Wonders": 'Nouvelles Sept Merveilles USA Today'
};

const countryTranslations = {
  'Egypt': 'Égypte',
  'England': 'Angleterre',
  'Greece': 'Grèce',
  'Turkey': 'Turquie',
  'Iraq': 'Irak',
  'Jordan': 'Jordanie',
  'India': 'Inde',
  'Peru': 'Pérou',
  'Brazil': 'Brésil',
  'Mexico': 'Mexique',
  'Italy': 'Italie',
  'China': 'Chine',
  'France': 'France',
  'Japan': 'Japon',
  'USA': 'États-Unis',
  'United States': 'États-Unis',
  'Australia': 'Australie',
  'Russia': 'Russie',
  'Canada': 'Canada',
  'Chile': 'Chili',
  'Argentina': 'Argentine',
  'Zimbabwe': 'Zimbabwe',
  'Zambia': 'Zambie',
  'Tanzania': 'Tanzanie',
  'Nepal': 'Népal',
  'England': 'Angleterre',
  'Scotland': 'Écosse',
  'Ireland': 'Irlande',
  'Spain': 'Espagne',
  'Portugal': 'Portugal',
  'Germany': 'Allemagne',
  'Netherlands': 'Pays-Bas',
  'Belgium': 'Belgique',
  'Switzerland': 'Suisse',
  'Austria': 'Autriche'
};

const locationTranslations = {
  'Giza Necropolis': 'Nécropole de Gizeh',
  'Amesbury': 'Amesbury',
  'Alexandria': 'Alexandrie',
  'Istanbul': 'Istanbul',
  'Babylon': 'Babylone',
  'Bodrum': 'Bodrum',
  'Olympia': 'Olympie',
  'Ephesus': 'Éphèse',
  'Agra': 'Agra',
  'Cuzco Region': 'Région de Cuzco',
  'Rio de Janeiro': 'Rio de Janeiro',
  'Yucatán': 'Yucatán',
  'Rome': 'Rome',
  'Pisa PI': 'Pise',
  'Arizona': 'Arizona',
  'Honolulu County': 'Comté d\'Honolulu',
  'Hawaii': 'Hawaï',
  'English Channel': 'Manche',
  'San Francisco': 'San Francisco',
  'New York': 'New York',
  'Paris': 'Paris',
  'London': 'Londres'
};

// Fonction pour traduire les descriptions
function translateDescription(description, wonderName, category, location, buildYear) {
  if (!description) return '';
  
  const categoryFr = categoryTranslations[category] || category;
  const locationFr = locationTranslations[location] || location;
  
  // Template de base en français
  let translatedDesc = `Merveille ${categoryFr.toLowerCase()}`;
  
  if (locationFr) {
    translatedDesc += ` située à ${locationFr}`;
  }
  
  if (buildYear) {
    translatedDesc += `. Construite en ${buildYear}`;
  }
  
  // Ajouter des descriptions spécifiques selon la catégorie
  if (category === 'Ancient') {
    translatedDesc += '. Cette merveille antique représente l\'un des premiers chefs-d\'œuvre architecturaux de l\'humanité';
  } else if (category === 'New7Wonders' || category === 'New7Wonders Foundation') {
    translatedDesc += '. Sélectionnée parmi les Nouvelles 7 Merveilles du Monde moderne en 2007';
  } else if (category === 'Natural' || category === 'Seven Natural Wonders of the World') {
    translatedDesc += '. Une des merveilles naturelles les plus spectaculaires de notre planète';
  } else if (category === 'Industrial' || category === 'Seven Wonders of the Industrial World') {
    translatedDesc += '. Témoin remarquable de l\'ingéniosité industrielle humaine';
  } else if (category === 'Civil') {
    translatedDesc += '. Prouesse remarquable de l\'ingénierie civile moderne';
  }
  
  return translatedDesc;
}

// Fonction pour extraire l'année de construction
function extractBuildYear(item) {
  const buildYear = item['Build in year'] || item['Image Base64'];
  if (buildYear && typeof buildYear === 'string') {
    // Chercher un pattern d'année (ex: "2560 BC", "80 AD", "1173")
    const yearMatch = buildYear.match(/(\d{1,4})\s*(BC|AD|)/i);
    if (yearMatch) {
      const year = yearMatch[1];
      const era = yearMatch[2];
      if (era && era.toUpperCase() === 'BC') {
        return `${year} av. J.-C.`;
      } else if (era && era.toUpperCase() === 'AD') {
        return `${year} ap. J.-C.`;
      } else {
        return year;
      }
    }
  }
  return '';
}

console.log('🔄 TRADUCTION EN COURS...');
console.log('='.repeat(50));

// Traduire chaque élément
const translatedData = data.map((item, index) => {
  const wonderName = item.name || item.Name;
  const category = item.displayCategory || item.Type;
  const location = item.Location || item.country || item.Country;
  const buildYear = extractBuildYear(item);
  
  const translatedItem = { ...item };
  
  // Traduire la description
  translatedItem.description = translateDescription(
    item.description, 
    wonderName, 
    category, 
    location, 
    buildYear
  );
  
  // Traduire le pays/lieu si possible
  if (translatedItem.country && countryTranslations[translatedItem.country]) {
    translatedItem.country = countryTranslations[translatedItem.country];
  }
  
  // Traduire la localisation
  if (translatedItem.Location && locationTranslations[translatedItem.Location]) {
    translatedItem.Location = locationTranslations[translatedItem.Location];
  }
  
  console.log(`✅ ${index + 1}/43: ${wonderName} - ${category}`);
  
  return translatedItem;
});

// Sauvegarder le fichier traduit
fs.writeFileSync('./public/data-french.json', JSON.stringify(translatedData, null, 2));

console.log('\n🎉 TRADUCTION TERMINÉE!');
console.log('Fichier sauvegardé: data-french.json');
console.log(`${translatedData.length} merveilles traduites en français`);

// Afficher quelques exemples
console.log('\n📖 EXEMPLES DE TRADUCTIONS:');
translatedData.slice(0, 3).forEach(item => {
  const name = item.name || item.Name;
  console.log(`\n🏛️ ${name}:`);
  console.log(`   Description: "${item.description}"`);
});
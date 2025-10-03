interface Wonder {
  id?: number;
  name?: string;
  Name?: string;
  NameFr?: string;
  country?: string;
  Country?: string;
  CountryFr?: string;
  Location?: string;
  LocationFr?: string;
  category?: string;
  Category?: string;
  Type?: string;
  TypeFr?: string;
  displayCategory?: string;
  icon?: string;
  color?: string;
  lat?: number;
  lng?: number;
  Latitude?: string;
  Longitude?: string;
  image?: string;
  Image?: string;
  'Picture link'?: string;
  description?: string;
  Description?: string;
  wikipedia?: string;
  Wikipedia?: string;
  'Wikipedia link'?: string;
  googleMaps?: string;
  'Google Maps'?: string;
}

interface WonderDetailProps {
  wonder: Wonder | null;
  onClose: () => void;
}

export function WonderDetail({ wonder, onClose }: WonderDetailProps) {
  if (!wonder) {
    return null;
  }

  // Gérer les différents formats de champs avec priorité aux traductions françaises
  const name = wonder.NameFr || wonder.Name || wonder.name || 'Merveille inconnue';
  const country = wonder.CountryFr || wonder.Country || wonder.country || wonder.LocationFr || wonder.Location || 'Pays inconnu';
  const category = wonder.TypeFr || wonder.displayCategory || wonder.Category || wonder.category || wonder.Type || 'Catégorie inconnue';
  const image = wonder['Picture link'] || wonder.image || wonder.Image || '/placeholder-image.jpg';
  const description = wonder.Description || wonder.description || 'Description non disponible';
  const wikipediaLink = wonder.wikipedia || wonder.Wikipedia || wonder['Wikipedia link'] || '#';
  const mapsLink = wonder.googleMaps || wonder['Google Maps'] || `https://www.google.com/maps/@${wonder.lat},${wonder.lng},15z`;

  return (
    <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 text-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out"
           style={{ transform: wonder ? 'translateX(0)' : 'translateX(100%)' }}>
      
      <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold hover:text-red-400">&times;</button>
      
      <div className="p-6 pt-12 overflow-y-auto h-full">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
        
        <h2 className="text-3xl font-bold mb-1">{name}</h2>
        <p className="text-lg text-yellow-400 mb-2">{country} • {category}</p>
        <p className="text-sm text-gray-400 mb-4">
          Coordonnées : {(wonder.lat || 0).toFixed(4)}, {(wonder.lng || 0).toFixed(4)}
        </p>
        
        <p className="text-base mb-6 leading-relaxed">{description}</p>
        
        <div className="flex space-x-4">
          <a href={wikipediaLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full text-center transition-colors">
            📖 En savoir plus
          </a>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded w-full text-center transition-colors">
            🗺️ Localiser
          </a>
        </div>
      </div>
    </aside>
  );
}
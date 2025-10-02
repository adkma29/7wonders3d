interface Wonder {
  id: number;
  name: string;
  country: string;
  category: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  wikipedia: string;
  googleMaps: string;
}

interface WonderDetailProps {
  wonder: Wonder | null;
  onClose: () => void;
}

export function WonderDetail({ wonder, onClose }: WonderDetailProps) {
  if (!wonder) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 text-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out"
           style={{ transform: wonder ? 'translateX(0)' : 'translateX(100%)' }}>
      
      <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold hover:text-red-400">&times;</button>
      
      <div className="p-6 pt-12 overflow-y-auto h-full">
        <img src={wonder.image} alt={wonder.name} className="w-full h-48 object-cover rounded-md mb-4" />
        
        <h2 className="text-3xl font-bold mb-1">{wonder.name}</h2>
        <p className="text-lg text-yellow-400 mb-2">{wonder.country} • {wonder.category}</p>
        <p className="text-sm text-gray-400 mb-4">Coordonnées : {wonder.lat.toFixed(4)}, {wonder.lng.toFixed(4)}</p>
        
        <p className="text-base mb-6 leading-relaxed">{wonder.description}</p>
        
        <div className="flex space-x-4">
          <a href={wonder.wikipedia} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full text-center transition-colors">
            Wikipedia
          </a>
          <a href={wonder.googleMaps} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded w-full text-center transition-colors">
            Google Maps
          </a>
        </div>
      </div>
    </aside>
  );
}
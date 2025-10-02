import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { WonderDetail } from './components/WonderDetail';

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

function App() {
  const [wonders, setWonders] = useState<Wonder[]>([]);
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);

  // Charger les données au montage du composant
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setWonders);
  }, []);

  const handlePointClick = (wonder: Wonder) => {
    setSelectedWonder(wonder);
  };

  return (
    <main className="w-full h-screen bg-gray-900 text-white relative">
      <header className="absolute top-0 left-0 w-full p-4 z-10 text-center pointer-events-none">
        <h1 className="text-3xl font-bold">7 Wonders 3D</h1>
        <p className="text-gray-400">Globe interactif des merveilles du monde</p>
      </header>

      <div className="absolute inset-0">
        <Globe
          // Texture du globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          // Données pour les points
          pointsData={wonders}
          pointLat="lat"
          pointLng="lng"
          pointLabel={(obj: any) => {
            const wonder = obj as Wonder;
            return `
              <div class="bg-gray-800 text-white p-2 rounded">
                <b>${wonder.name}</b><br/>
                ${wonder.country}
              </div>
            `;
          }}
          pointColor={() => '#ffd700'} // Or
          pointAltitude={0.01}
          pointRadius={0.5}

          // Gérer l'événement de clic
          onPointClick={handlePointClick as (point: object) => void}

          // Options de contrôle
          enablePointerInteraction={true}
        />
      </div>

      <WonderDetail 
        wonder={selectedWonder} 
        onClose={() => setSelectedWonder(null)} 
      />
      
      <footer className="absolute bottom-0 left-0 w-full p-2 z-10 text-center text-xs text-gray-500 pointer-events-none">
        <p>Crédits : Données fusionnées (API World Wonders, Kaggle) | Images : Wikimedia Commons | Globe : NASA Blue Marble</p>
      </footer>
    </main>
  );
}

export default App;

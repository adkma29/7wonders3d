import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
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

  // Fonction pour créer des objets 3D personnalisés - Vraies étoiles à 5 branches
  const createWonderObject = (obj: any) => {
    const wonder = obj as Wonder;
    
    // Créer une vraie forme d'étoile avec des points personnalisés
    const starShape = new THREE.Shape();
    const outerRadius = 0.8;
    const innerRadius = 0.3;
    const spikes = 5;
    
    // Dessiner la forme d'étoile
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i / (spikes * 2)) * Math.PI * 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        starShape.moveTo(x, y);
      } else {
        starShape.lineTo(x, y);
      }
    }
    starShape.closePath();
    
    // Extruder la forme pour créer une étoile 3D
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 8
    };
    
    const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    const starMaterial = new THREE.MeshLambertMaterial({
      color: '#ffd700', // Jaune doré
      emissive: '#333333',
      transparent: true,
      opacity: 0.9
    });
    
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.userData = wonder;
    
    // Incliner l'étoile davantage pour un angle plus dynamique
    star.rotation.x = Math.PI / 3; // 60 degrés au lieu de 90
    star.rotation.z = Math.PI / 6; // Ajout d'une rotation sur Z pour plus de dynamisme
    
    return star;
  };

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
          
          // Données pour les points avec objets 3D personnalisés
          objectsData={wonders}
          objectLat="lat"
          objectLng="lng"
          objectLabel={(obj: any) => {
            const wonder = obj as Wonder;
            return `
              <div class="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-yellow-400">
                <b class="text-yellow-400">${wonder.name}</b><br/>
                <span class="text-gray-300">${wonder.country}</span>
              </div>
            `;
          }}
          objectThreeObject={createWonderObject}
          objectAltitude={0.02}

          // Gérer l'événement de clic sur les objets 3D
          onObjectClick={handlePointClick as (point: object) => void}

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

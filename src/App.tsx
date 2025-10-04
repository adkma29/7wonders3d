import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { WonderDetail } from './components/WonderDetail';
import { LoadingScreen } from './components/LoadingScreen';
import { Legend } from './components/Legend';
import { SearchAndFilter } from './components/SearchAndFilter';

interface Wonder {
  id: number;
  name?: string;
  Name?: string;
  NameFr?: string;
  country?: string;
  Country?: string;
  CountryFr?: string;
  category?: string;
  Category?: string;
  Type?: string;
  TypeFr?: string;
  displayCategory?: string;
  icon?: string;
  color?: string;
  lat: number;
  lng: number;
  image?: string;
  Image?: string;
  description?: string;
  Description?: string;
  wikipedia?: string;
  Wikipedia?: string;
  googleMaps?: string;
  'Google Maps'?: string;
}

function App() {
  const [wonders, setWonders] = useState<Wonder[]>([]);
  const [filteredWonders, setFilteredWonders] = useState<Wonder[]>([]);
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const globeRef = useRef<any>(null);

  // 🌟 SYSTÈME DE FORMES GÉOMÉTRIQUES SIMPLES ET COLORÉES 🌟

  // Obtenir la couleur selon la catégorie
  const getCategoryColor = (wonder: Wonder): string => {
    const category = wonder.displayCategory || wonder.Type || wonder.TypeFr || wonder.category;
    switch (category) {
      case 'Ancient': 
      case 'Antique': return '#FFD700'; // Or - Merveilles antiques
      case 'Medieval': 
      case 'Médiéval': return '#8B4513'; // Marron - Merveilles médiévales
      case 'Civil': return '#FF4444'; // Rouge - Ouvrages civils
      case 'New7Wonders': 
      case 'New7Wonders Foundation': 
      case 'Nouvelles 7 Merveilles': return '#FF6B35'; // Orange - Nouvelles 7 merveilles
      case 'Natural':
      case 'Seven Natural Wonders of the World': 
      case 'Naturel':
      case 'Sept Merveilles Naturelles': return '#44FF44'; // Vert - Merveilles naturelles
      case 'Industrial':
      case 'Seven Wonders of the Industrial World': 
      case 'Industriel':
      case 'Sept Merveilles Industrielles': return '#666666'; // Gris - Merveilles industrielles
      case 'USA Today':
      case "USA Today's New Seven Wonders": 
      case 'Nouvelles Sept Merveilles USA Today': return '#0066CC'; // Bleu - USA Today
      default: return '#9966FF'; // Violet - Autres/Non catégorisées
    }
  };

  // Créer une forme géométrique simple selon la catégorie
  const createSimpleShape = (wonder: Wonder) => {
    const color = getCategoryColor(wonder);
    const category = wonder.displayCategory || wonder.Type || wonder.TypeFr || wonder.category;
    
    // Debug : vérifier les catégories
    console.log(`Merveille: ${wonder.name || wonder.Name}, Catégorie: ${category}, Couleur: ${color}`);
    
    let geometry: THREE.BufferGeometry;
    
    // Forme selon la catégorie
    switch (category) {
      case 'Ancient':
      case 'Antique':
        // Pyramides (cônes) pour les merveilles antiques - OR
        geometry = new THREE.ConeGeometry(0.5, 1.5, 4); // 4 faces = pyramide
        break;
      case 'Medieval':
      case 'Médiéval':
        // Tours (cylindres allongés) pour les merveilles médiévales - MARRON
        geometry = new THREE.CylinderGeometry(0.3, 0.4, 1.8, 8);
        break;
      case 'Civil':
        // Cubes pour les ouvrages civils - ROUGE
        geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        break;
      case 'New7Wonders':
      case 'New7Wonders Foundation':
      case 'Nouvelles 7 Merveilles':
        // Étoiles (cônes à 5 faces) pour les nouvelles 7 merveilles - ORANGE
        geometry = new THREE.ConeGeometry(0.6, 1.2, 5);
        break;
      case 'Natural':
      case 'Seven Natural Wonders of the World':
      case 'Naturel':
      case 'Sept Merveilles Naturelles':
        // Sphères pour les merveilles naturelles - VERT
        geometry = new THREE.SphereGeometry(0.6, 12, 8);
        break;
      case 'Industrial':
      case 'Seven Wonders of the Industrial World':
      case 'Industriel':
      case 'Sept Merveilles Industrielles':
        // Octaèdres pour les merveilles industrielles - GRIS
        geometry = new THREE.OctahedronGeometry(0.7);
        break;
      case 'USA Today':
      case "USA Today's New Seven Wonders":
      case 'Nouvelles Sept Merveilles USA Today':
        // Diamants (double pyramide) pour USA Today - BLEU
        geometry = new THREE.ConeGeometry(0.5, 0.8, 6);
        break;
      default:
        // Dodécaèdres pour les autres - VIOLET
        console.log(`ATTENTION: Catégorie non reconnue pour ${wonder.name || wonder.Name}: ${category}`);
        geometry = new THREE.DodecahedronGeometry(0.6);
    }
    
    const material = new THREE.MeshLambertMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.6 // Plus intense pour une meilleure visibilité
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.8; // Élever plus haut pour une meilleure visibilité
    
    return mesh;
  };

  const createWonderObject = (obj: any) => {
    const wonder = obj as Wonder;
    
    console.log('🎨 Création d\'un objet 3D pour:', wonder.NameFr || wonder.Name);
    
    // 🌟 FORMES GÉOMÉTRIQUES SIMPLES ET COLORÉES 🌟
    const shape = createSimpleShape(wonder);
    
    // Animation simple de rotation
    const animate = () => {
      const time = Date.now() * 0.001;
      shape.rotation.y = time;
      requestAnimationFrame(animate);
    };
    animate();
    
    console.log('✅ Objet 3D créé avec succès');
    return shape;
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        console.log(`✅ ${data.length} merveilles chargées:`, data);
        setWonders(data);
        setFilteredWonders(data); // Initialiser avec toutes les merveilles
      })
      .catch(err => {
        console.error('❌ Erreur lors du chargement des données:', err);
      });
  }, []);

  // Gestionnaire de changement de filtres
  const handleFilterChange = (filtered: Wonder[]) => {
    setFilteredWonders(filtered);
    console.log(`🔍 Filtrage: ${filtered.length}/${wonders.length} merveilles affichées`);
  };

  // Gestionnaire de sélection de merveille depuis la recherche
  const handleWonderSelect = (wonder: Wonder) => {
    setSelectedWonder(wonder);
    
    // Zoom automatique vers la merveille sélectionnée
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: wonder.lat,
        lng: wonder.lng,
        altitude: 1.5
      }, 1000);
    }
  };

  // Gestionnaire de filtrage par catégorie depuis la légende
  const handleCategoryFilter = (category: string) => {
    if (activeCategoryFilter === category) {
      // Si la même catégorie est cliquée, désactiver le filtre
      setActiveCategoryFilter(null);
      setFilteredWonders(wonders);
    } else {
      // Filtrer par la nouvelle catégorie
      setActiveCategoryFilter(category);
      const filtered = wonders.filter(wonder => {
        const wonderCategory = wonder.displayCategory || wonder.Type;
        return wonderCategory === category;
      });
      setFilteredWonders(filtered);
      console.log(`🏛️ Filtrage par catégorie "${category}": ${filtered.length} merveilles`);
    }
  };

  // Gestionnaire pour voir toutes les merveilles filtrées
  const handleShowAllFiltered = () => {
    if (filteredWonders.length > 0 && globeRef.current) {
      // Calculer le centre géographique des merveilles filtrées
      const avgLat = filteredWonders.reduce((sum, w) => sum + w.lat, 0) / filteredWonders.length;
      const avgLng = filteredWonders.reduce((sum, w) => sum + w.lng, 0) / filteredWonders.length;
      
      // Zoomer vers le centre avec une altitude appropriée selon le nombre de merveilles
      const altitude = Math.max(2, Math.min(4, filteredWonders.length / 10));
      
      globeRef.current.pointOfView({
        lat: avgLat,
        lng: avgLng,
        altitude: altitude
      }, 1500);
      
      console.log(`🌍 Vue d'ensemble de ${filteredWonders.length} merveilles`);
    }
  };

  if (showLoading) {
    return <LoadingScreen onStart={() => setShowLoading(false)} />;
  }

  console.log('🌍 Rendu du Globe avec', filteredWonders.length, 'merveilles visibles sur', wonders.length, 'total');

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Titre principal */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-2xl">
          ✨ 7 Wonders 3D ✨
        </h1>
        <p className="text-white mt-2 text-lg drop-shadow-lg">
          Explorez les merveilles du monde en 3D
        </p>
      </div>

      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width={window.innerWidth}
        height={window.innerHeight}
        objectsData={filteredWonders}
        objectThreeObject={createWonderObject}
        onObjectClick={(obj) => setSelectedWonder(obj as Wonder)}
      />

      <SearchAndFilter
        wonders={wonders}
        onFilterChange={handleFilterChange}
        onWonderSelect={handleWonderSelect}
        onShowAllFiltered={handleShowAllFiltered}
      />

      <Legend 
        isVisible={showLegend}
        onToggle={() => setShowLegend(!showLegend)}
        onCategoryFilter={handleCategoryFilter}
        activeCategoryFilter={activeCategoryFilter}
      />

      <WonderDetail
        wonder={selectedWonder}
        onClose={() => setSelectedWonder(null)}
      />
    </div>
  );
}

export default App;
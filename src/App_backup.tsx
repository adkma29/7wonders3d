import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { WonderDetail } from './components/WonderDetail';
import { LoadingScreen } from './components/LoadingScreen';

interface Wonder {
  id: number;
  name?: string;
  Name?: string;
  country?: string;
  Country?: string;
  category?: string;
  Category?: string;
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
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  // 🌟 SYSTÈME DE FAISCEAUX LUMINEUX ULTRA-VISIBLES 🌟

  // 🌀 Créer un faisceau lumineux principal (large et visible)
  const createMainLightBeam = (color: string, wonder: Wonder) => {
    // Hauteur variable selon l'importance de la merveille
    const height = getBeamHeight(wonder);
    
    const beamGeometry = new THREE.CylinderGeometry(0.2, 0.8, height, 12, 1, true);
    const beamMaterial = new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      emissive: color,
      emissiveIntensity: 0.3
    });
    
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.y = height / 2;
    
    return beam;
  };

  // ⚡ Créer un faisceau d'énergie secondaire (plus fin, plus haut)
  const createEnergyBeam = (color: string) => {
    const energyGeometry = new THREE.CylinderGeometry(0.05, 0.15, 8, 8, 1, true);
    const energyMaterial = new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      emissive: color,
      emissiveIntensity: 0.5
    });
    
    const energy = new THREE.Mesh(energyGeometry, energyMaterial);
    energy.position.y = 4;
    
    return energy;
  };

  // 💫 Créer une base lumineuse au sol
  const createBaseGlow = (color: string) => {
    const glowGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 16);
    const glowMaterial = new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      emissive: color,
      emissiveIntensity: 0.6
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = 0.05;
    
    return glow;
  };

  // 📏 Déterminer la hauteur du faisceau selon la merveille
  const getBeamHeight = (wonder: Wonder) => {
    const name = (wonder.name || wonder.Name || '').toLowerCase();
    
    // Faisceaux plus hauts pour les merveilles iconiques
    if (name.includes('pyramid') || name.includes('tower') || name.includes('lighthouse')) return 6;
    if (name.includes('statue') || name.includes('colossus')) return 7;
    if (name.includes('bridge') || name.includes('wall')) return 4;
    
    // Hauteur par catégorie
    switch (wonder.displayCategory) {
      case 'Ancient': return 5.5;
      case 'Modern': return 6.5;
      case 'Natural': return 4.5;
      default: return 5;
    }
  };

  // 🔄 Animations des faisceaux (simples mais efficaces)
  const setupBeamAnimations = (group: THREE.Group, mainBeam: THREE.Mesh, energyBeam: THREE.Mesh, baseGlow: THREE.Mesh) => {
    const animate = () => {
      const time = Date.now() * 0.002;
      
      // Pulsation du faisceau principal
      const pulsation = 1 + Math.sin(time) * 0.2;
      mainBeam.scale.set(pulsation, 1, pulsation);
      
      // Rotation du faisceau d'énergie
      energyBeam.rotation.y += 0.02;
      
      // Pulsation de la base
      const glowPulse = 1 + Math.sin(time * 1.5) * 0.3;
      baseGlow.scale.set(glowPulse, 1, glowPulse);
      
      // Variation d'opacité pour un effet "vivant"
      (mainBeam.material as THREE.MeshLambertMaterial).opacity = 0.6 + Math.sin(time * 2) * 0.2;
      (energyBeam.material as THREE.MeshLambertMaterial).opacity = 0.8 + Math.sin(time * 3) * 0.2;
      
      requestAnimationFrame(animate);
    };
    animate();
  };

  const createWonderObject = (obj: any) => {
    const wonder = obj as Wonder;
    
    // 🌟 SYSTÈME DE FAISCEAUX LUMINEUX SPECTACULAIRES 🌟
    const group = new THREE.Group();
    const color = wonder.color || '#ffffff';
    
    // 🌀 Faisceau lumineux principal (plus grand et plus visible)
    const mainBeam = createMainLightBeam(color, wonder);
    
    // ✨ Faisceau d'énergie secondaire (plus fin, plus haut)
    const energyBeam = createEnergyBeam(color);
    
    // 💫 Base lumineuse au sol
    const baseGlow = createBaseGlow(color);
    
    // Assembler tous les éléments
    group.add(mainBeam);
    group.add(energyBeam);
    group.add(baseGlow);
    
    // 🔄 Animation simple mais efficace
    setupBeamAnimations(group, mainBeam, energyBeam, baseGlow);
    
    return group;
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setWonders);
  }, []);

  // Masquer l'écran de chargement après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={wonders}
        objectLat="lat"
        objectLng="lng"
        objectAltitude={0}
        objectThreeObject={createWonderObject}
        onObjectClick={(obj) => setSelectedWonder(obj as Wonder)}
        showAtmosphere={true}
        atmosphereColor="#46a3ff"
        atmosphereAltitude={0.25}
        enablePointerInteraction={true}
      />
      
      {selectedWonder && (
        <WonderDetail 
          wonder={selectedWonder} 
          onClose={() => setSelectedWonder(null)} 
        />
      )}
    </div>
  );
}

export default App;
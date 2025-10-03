interface LoadingScreenProps {
  onStart: () => void;
}

export function LoadingScreen({ onStart }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center z-50 overflow-hidden">
      {/* Étoiles de fond animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="text-center z-10 px-6 max-w-2xl mx-auto">
        {/* Globe stylisé avec animation - Version simplifiée */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-2xl relative overflow-hidden">
            {/* Surface du globe avec animation de rotation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 via-green-400/50 to-blue-500/50 rounded-full animate-spin-slow"></div>
            
            {/* Continents stylisés */}
            <div className="absolute top-1/4 left-1/4 w-8 h-6 bg-green-600 rounded-lg opacity-80"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-4 bg-green-600 rounded opacity-70"></div>
            <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-green-600 rounded-full opacity-60"></div>
            
            {/* Étoiles dorées représentant les merveilles */}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${25 + Math.sin(i) * 15}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          
          {/* Halo lumineux */}
          <div className="absolute -inset-8 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent rounded-full animate-pulse"></div>
        </div>

        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 mb-4 animate-fade-in">
          7 Wonders 3D
        </h1>
        
        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay-1">
          Explorez les merveilles du monde dans un globe interactif
        </p>

        {/* Liste des merveilles avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 text-sm text-gray-400 animate-fade-in-delay-2">
          {[
            "Grande Muraille de Chine",
            "Pétra, Jordanie", 
            "Le Colisée, Italie",
            "Chichén Itzá, Mexique",
            "Machu Picchu, Pérou",
            "Christ Rédempteur, Brésil",
            "Taj Mahal, Inde"
          ].map((wonder, i) => (
            <div key={i} className="flex items-center justify-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <span>{wonder}</span>
            </div>
          ))}
        </div>

        {/* Bouton principal */}
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/25 animate-fade-in-delay-3"
        >
          <span className="relative z-10">
            🌍 Prêt à découvrir les 7 merveilles du monde
          </span>
          
          {/* Effet de brillance */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
        </button>

        {/* Instructions */}
        <p className="text-xs text-gray-500 mt-6 animate-fade-in-delay-4">
          Cliquez sur les étoiles dorées pour découvrir chaque merveille
        </p>
      </div>
    </div>
  );
}
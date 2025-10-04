interface LoadingScreenProps {
  onStart: () => void;
}

export function LoadingScreen({ onStart }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Particules d'étoiles animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        {/* Globe 3D modernisé avec formes géométriques */}
        <div className="mb-8 relative">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-2xl relative overflow-hidden border-4 border-white/20">
            {/* Rotation du globe */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-green-400/30 to-blue-500/30 rounded-full animate-spin-slow"></div>
            
            {/* Continents avec relief */}
            <div className="absolute top-1/4 left-1/4 w-10 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-lg opacity-90 shadow-lg"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-6 bg-gradient-to-br from-green-600 to-green-800 rounded opacity-80 shadow-lg"></div>
            <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-green-600 to-green-800 rounded-full opacity-70 shadow-lg"></div>
            
            {/* Formes géométriques représentant les 7 catégories */}
            <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 transform rotate-45 animate-pulse" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute bottom-1/2 right-1/3 w-3 h-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-600 clip-path-star animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 transform rotate-45 animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-sm animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-600 transform rotate-45 animate-pulse" style={{animationDelay: '1.2s'}}></div>
          </div>
          
          {/* Orbites lumineuses */}
          <div className="absolute -inset-12 border-2 border-yellow-400/20 rounded-full animate-spin-slow"></div>
          <div className="absolute -inset-16 border border-orange-400/10 rounded-full animate-spin-reverse"></div>
        </div>

        {/* Titre principal avec effet holographique */}
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 mb-4 animate-fade-in relative">
          7 Wonders 3D
          <div className="absolute inset-0 text-6xl md:text-7xl font-bold text-yellow-400/20 blur-sm">
            7 Wonders 3D
          </div>
        </h1>
        
        {/* Sous-titre modernisé */}
        <p className="text-2xl md:text-3xl text-gray-200 mb-4 animate-fade-in-delay-1 font-light">
          Exploration Interactive des Merveilles du Monde
        </p>

        <p className="text-lg text-gray-400 mb-8 animate-fade-in-delay-1">
          Globe 3D • Recherche Avancée • 43 Merveilles • 7 Catégories
        </p>

        {/* Fonctionnalités avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-delay-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-white font-semibold mb-1">Recherche Intelligente</h3>
            <p className="text-gray-300 text-sm">Autocomplétion et filtres multi-critères</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="text-white font-semibold mb-1">Globe 3D Interactif</h3>
            <p className="text-gray-300 text-sm">Navigation libre et formes géométriques</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-white font-semibold mb-1">Interface Française</h3>
            <p className="text-gray-300 text-sm">Descriptions enrichies et navigation intuitive</p>
          </div>
        </div>

        {/* Statistiques du projet */}
        <div className="flex justify-center space-x-8 mb-8 animate-fade-in-delay-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">43</div>
            <div className="text-sm text-gray-400">Merveilles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">7</div>
            <div className="text-sm text-gray-400">Catégories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">6</div>
            <div className="text-sm text-gray-400">Continents</div>
          </div>
        </div>

        {/* Bouton principal modernisé */}
        <button
          onClick={onStart}
          className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-600 to-orange-500 hover:from-blue-400 hover:via-purple-500 hover:to-orange-400 text-white font-bold text-xl rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-purple-500/25 animate-fade-in-delay-4 border border-white/20"
        >
          <span className="relative z-10 flex items-center justify-center space-x-3">
            <span>🚀</span>
            <span>Commencer l'Exploration</span>
            <span>✨</span>
          </span>
          
          {/* Effet de brillance avancé */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Particules au hover */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </button>

        {/* Instructions mises à jour */}
        <div className="text-center mt-8 animate-fade-in-delay-5">
          <p className="text-sm text-gray-400 mb-2">
            🎯 Cliquez sur les formes géométriques • 🔍 Utilisez la recherche avancée • ℹ️ Explorez par catégories
          </p>
          <p className="text-xs text-gray-500">
            Projet développé avec React + Three.js + TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}
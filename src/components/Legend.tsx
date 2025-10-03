interface LegendProps {
  isVisible: boolean;
  onToggle: () => void;
  onCategoryFilter?: (category: string) => void;
  activeCategoryFilter?: string | null;
}

export function Legend({ isVisible, onToggle, onCategoryFilter, activeCategoryFilter }: LegendProps) {
  return (
    <>
      {/* Bouton pour ouvrir/fermer la légende avec design amélioré */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white p-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        title="📖 Légende des Merveilles du Monde"
      >
        <span className="text-2xl relative z-10">ℹ️</span>
        {/* Badge avec nombre de catégories */}
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          7
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Panneau de la légende */}
      <div className={`fixed top-4 left-20 z-20 bg-gray-800/95 backdrop-blur-sm text-white rounded-lg shadow-2xl transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
      }`}>
        <div className="p-6 max-w-sm">
          {/* Titre */}
          <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
            🌍 Légende des Merveilles
          </h3>
          
          {/* Liste des catégories */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {/* Merveilles Antiques */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('Ancient')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'Ancient' ? 'bg-gray-600 ring-2 ring-yellow-400' : ''
              }`}
              title="Cliquez pour filtrer les merveilles antiques"
            >
              <div className="w-6 h-6 bg-yellow-500 relative" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              </div>
              <div>
                <div className="font-semibold text-yellow-400">Ancient (7)</div>
                <div className="text-xs text-gray-300">Pyramides dorées</div>
              </div>
            </button>

            {/* Merveilles Médiévales */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('Medieval')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'Medieval' ? 'bg-gray-600 ring-2 ring-amber-600' : ''
              }`}
              title="Cliquez pour filtrer les merveilles médiévales"
            >
              <div className="w-4 h-8 bg-amber-700 rounded-sm shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-sm animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold text-amber-600">Medieval (5)</div>
                <div className="text-xs text-gray-300">Tours marron</div>
              </div>
            </button>

            {/* Ouvrages Civils */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('Civil')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'Civil' ? 'bg-gray-600 ring-2 ring-red-400' : ''
              }`}
              title="Cliquez pour filtrer les ouvrages civils"
            >
              <div className="w-6 h-6 bg-red-500 rounded shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold text-red-400">Civil (7)</div>
                <div className="text-xs text-gray-300">Cubes rouges</div>
              </div>
            </button>

            {/* New7Wonders */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('New7Wonders')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'New7Wonders' ? 'bg-gray-600 ring-2 ring-orange-400' : ''
              }`}
              title="Cliquez pour filtrer les New7Wonders"
            >
              <div className="w-6 h-6 bg-orange-500 relative" style={{ clipPath: 'polygon(50% 0%, 20% 35%, 0% 35%, 30% 57%, 20% 100%, 50% 75%, 80% 100%, 70% 57%, 100% 35%, 80% 35%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 20% 35%, 0% 35%, 30% 57%, 20% 100%, 50% 75%, 80% 100%, 70% 57%, 100% 35%, 80% 35%)' }}></div>
              </div>
              <div>
                <div className="font-semibold text-orange-400">New7Wonders (7)</div>
                <div className="text-xs text-gray-300">Étoiles orange</div>
              </div>
            </button>

            {/* Merveilles Naturelles */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('Natural')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'Natural' ? 'bg-gray-600 ring-2 ring-green-400' : ''
              }`}
              title="Cliquez pour filtrer les merveilles naturelles"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold text-green-400">Natural (6)</div>
                <div className="text-xs text-gray-300">Sphères vertes</div>
              </div>
            </button>

            {/* Merveilles Industrielles */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('Industrial')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'Industrial' ? 'bg-gray-600 ring-2 ring-gray-400' : ''
              }`}
              title="Cliquez pour filtrer les merveilles industrielles"
            >
              <div className="w-6 h-6 bg-gray-500 relative transform rotate-45">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-400">Industrial (6)</div>
                <div className="text-xs text-gray-300">Octaèdres gris</div>
              </div>
            </button>

            {/* USA Today */}
            <button
              onClick={() => onCategoryFilter && onCategoryFilter('USA Today')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded transition-all hover:bg-gray-700 ${
                activeCategoryFilter === 'USA Today' ? 'bg-gray-600 ring-2 ring-blue-400' : ''
              }`}
              title="Cliquez pour filtrer les merveilles USA Today"
            >
              <div className="w-6 h-6 bg-blue-500 relative" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              </div>
              <div>
                <div className="font-semibold text-blue-400">USA Today (5)</div>
                <div className="text-xs text-gray-300">Diamants bleus</div>
              </div>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 pt-4 border-t border-gray-600">
            <p className="text-xs text-gray-400 text-center">
              💡 <strong>Astuce :</strong> Cliquez sur une catégorie pour la filtrer !
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              🔍 Utilisez la recherche en haut à droite pour plus d'options
            </p>
          </div>

          {/* Statistiques */}
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="text-xs text-center">
              <div className="text-yellow-400 font-semibold">43 Merveilles du Monde</div>
              <div className="text-gray-400 mt-1">
                7 catégories • Antiquité à nos jours
              </div>
              <div className="text-gray-400 mt-1">
                Explorez les trésors de notre planète en 3D
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
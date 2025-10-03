import { useState, useEffect } from 'react';

interface Wonder {
  id: number;
  name?: string;
  Name?: string;
  country?: string;
  Country?: string;
  Location?: string;
  displayCategory?: string;
  Type?: string;
  description?: string;
  lat: number;
  lng: number;
}

interface SearchAndFilterProps {
  wonders: Wonder[];
  onFilterChange: (filteredWonders: Wonder[]) => void;
  onWonderSelect: (wonder: Wonder) => void;
  onShowAllFiltered?: () => void;
}

interface Filters {
  search: string;
  categories: string[];
  epochs: string[];
  regions: string[];
}

export function SearchAndFilter({ wonders, onFilterChange, onWonderSelect, onShowAllFiltered }: SearchAndFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    epochs: [],
    regions: []
  });
  const [searchSuggestions, setSearchSuggestions] = useState<Wonder[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Définition des époques
  const epochs = [
    { id: 'antiquity', name: 'Antiquité', categories: ['Ancient', 'Antique'] },
    { id: 'medieval', name: 'Moyen Âge', categories: ['Medieval', 'Médiéval'] },
    { id: 'modern', name: 'Époque Moderne', categories: ['New7Wonders', 'Nouvelles 7 Merveilles'] },
    { id: 'contemporary', name: 'Époque Contemporaine', categories: ['Civil', 'Industrial', 'Industriel'] },
    { id: 'natural', name: 'Formations Naturelles', categories: ['Natural', 'Naturel'] },
    { id: 'recent', name: 'XXe-XXIe siècle', categories: ['USA Today'] }
  ];

  // Définition des régions
  const regions = [
    { id: 'europe', name: 'Europe', countries: ['Angleterre', 'Italy', 'Italie', 'France', 'England', 'Greece', 'Grèce'] },
    { id: 'asia', name: 'Asie', countries: ['China', 'Chine', 'India', 'Inde', 'Japan', 'Japon', 'Turkey', 'Turquie'] },
    { id: 'africa', name: 'Afrique', countries: ['Egypt', 'Égypte', 'Zimbabwe', 'Zambie', 'Tanzania'] },
    { id: 'americas', name: 'Amériques', countries: ['USA', 'États-Unis', 'Brazil', 'Brésil', 'Mexico', 'Mexique', 'Peru', 'Pérou', 'Canada', 'Chile', 'Argentina'] },
    { id: 'oceania', name: 'Océanie', countries: ['Australia', 'Australie'] },
    { id: 'middle-east', name: 'Moyen-Orient', countries: ['Jordan', 'Jordanie', 'Iraq', 'Irak'] }
  ];

  // Obtenir toutes les catégories uniques
  const categories = [...new Set(wonders.map(w => w.displayCategory || w.Type).filter(Boolean))] as string[];

  // Fonction de filtrage principale
  const applyFilters = (newFilters: Filters) => {
    let filtered = [...wonders];

    // Filtrage par recherche
    if (newFilters.search.trim()) {
      const searchTerm = newFilters.search.toLowerCase();
      filtered = filtered.filter(wonder => {
        const name = (wonder.name || wonder.Name || '').toLowerCase();
        const country = (wonder.country || wonder.Country || wonder.Location || '').toLowerCase();
        const description = (wonder.description || '').toLowerCase();
        return name.includes(searchTerm) || country.includes(searchTerm) || description.includes(searchTerm);
      });
    }

    // Filtrage par catégories
    if (newFilters.categories.length > 0) {
      filtered = filtered.filter(wonder => {
        const category = wonder.displayCategory || wonder.Type;
        return newFilters.categories.includes(category || '');
      });
    }

    // Filtrage par époques
    if (newFilters.epochs.length > 0) {
      filtered = filtered.filter(wonder => {
        const category = wonder.displayCategory || wonder.Type;
        return newFilters.epochs.some(epochId => {
          const epoch = epochs.find(e => e.id === epochId);
          return epoch?.categories.includes(category || '');
        });
      });
    }

    // Filtrage par régions
    if (newFilters.regions.length > 0) {
      filtered = filtered.filter(wonder => {
        const country = wonder.country || wonder.Country || wonder.Location || '';
        return newFilters.regions.some(regionId => {
          const region = regions.find(r => r.id === regionId);
          return region?.countries.some(c => country.includes(c));
        });
      });
    }

    onFilterChange(filtered);
  };

  // Mise à jour des filtres
  const updateFilters = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Autocomplétion de recherche
  useEffect(() => {
    if (filters.search.length > 1) {
      const searchTerm = filters.search.toLowerCase();
      const suggestions = wonders.filter(wonder => {
        const name = (wonder.name || wonder.Name || '').toLowerCase();
        return name.includes(searchTerm);
      }).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.search, wonders]);

  // Toggle de catégorie
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  // Toggle d'époque
  const toggleEpoch = (epochId: string) => {
    const newEpoques = filters.epochs.includes(epochId)
      ? filters.epochs.filter(e => e !== epochId)
      : [...filters.epochs, epochId];
    updateFilters({ epochs: newEpoques });
  };

  // Toggle de région
  const toggleRegion = (regionId: string) => {
    const newRegions = filters.regions.includes(regionId)
      ? filters.regions.filter(r => r !== regionId)
      : [...filters.regions, regionId];
    updateFilters({ regions: newRegions });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    const resetFilters = { search: '', categories: [], epochs: [], regions: [] };
    setFilters(resetFilters);
    applyFilters(resetFilters);
    setShowSuggestions(false);
  };

  return (
    <div className="fixed top-24 left-4 z-30">
      {/* Bouton d'ouverture/fermeture avec design amélioré */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl mb-2 relative group"
        title="🔍 Rechercher et Filtrer les Merveilles"
      >
        <span className="text-2xl">🔍</span>
        {/* Badge avec nombre de filtres actifs */}
        {(filters.search || filters.categories.length > 0 || filters.epochs.length > 0 || filters.regions.length > 0) && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
            {filters.categories.length + filters.epochs.length + filters.regions.length + (filters.search ? 1 : 0)}
          </div>
        )}
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Panneau de recherche et filtrage */}
      <div className={`bg-gray-800/95 backdrop-blur-sm text-white rounded-lg shadow-2xl transition-all duration-300 w-80 max-h-96 overflow-y-auto ${
        isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
      }`}>
        <div className="p-4">
          {/* Titre */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-400">🔍 Recherche & Filtres</h3>
            <button
              onClick={resetFilters}
              className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-colors"
              title="Réinitialiser tous les filtres"
            >
              Reset
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher une merveille..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            
            {/* Suggestions d'autocomplétion */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-700 border border-gray-600 rounded-lg mt-1 z-50">
                {searchSuggestions.map(wonder => (
                  <button
                    key={wonder.id}
                    onClick={() => {
                      onWonderSelect(wonder);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-600 text-sm"
                  >
                    <div className="font-medium">{wonder.name || wonder.Name}</div>
                    <div className="text-xs text-gray-400">{wonder.country || wonder.Country || wonder.Location}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtres par catégorie */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">📂 Catégories</h4>
            <div className="flex flex-wrap gap-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres par époque */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">⏰ Époques</h4>
            <div className="flex flex-wrap gap-1">
              {epochs.map(epoch => (
                <button
                  key={epoch.id}
                  onClick={() => toggleEpoch(epoch.id)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    filters.epochs.includes(epoch.id)
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {epoch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres par région */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">🌍 Régions</h4>
            <div className="flex flex-wrap gap-1">
              {regions.map(region => (
                <button
                  key={region.id}
                  onClick={() => toggleRegion(region.id)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    filters.regions.includes(region.id)
                      ? 'bg-purple-500 text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Compteur de résultats et bouton "Voir toutes" */}
          <div className="text-xs text-gray-400 text-center mt-4">
            {filters.search || filters.categories.length > 0 || filters.epochs.length > 0 || filters.regions.length > 0 ? (
              <div>
                <div className="mb-2">Filtres actifs • Cliquez sur une merveille pour la voir</div>
                {onShowAllFiltered && (
                  <button
                    onClick={onShowAllFiltered}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                    title="Voir toutes les merveilles filtrées en vue d'ensemble"
                  >
                    🌍 Voir toutes
                  </button>
                )}
              </div>
            ) : (
              '43 merveilles disponibles'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
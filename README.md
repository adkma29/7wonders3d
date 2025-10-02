# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# 7Wonders 3D — Globe interactif des merveilles du monde

Une application web interactive affichant un globe en 3D où chaque merveille du monde est représentée par un point cliquable.

**Lien de l'application déployée :** [À AJOUTER APRÈS DÉPLOIEMENT]

---

## 1. Contexte & Intention

Le projet consiste à créer une application web interactive affichant un globe en 3D. L'utilisateur peut cliquer sur une merveille pour ouvrir une fiche détaillée. L'objectif est de proposer une expérience immersive, pédagogique et intuitive.

## 2. Fonctionnalités

* Globe 3D interactif (rotation, zoom, clic).
* Points représentant les 7 nouvelles merveilles du monde.
* Tooltip au survol (nom, pays).
* Fiche détaillée au clic dans un panneau latéral.
* Liens directs vers Wikipedia et Google Maps.

## 3. Stack Technique

* **Frontend :** React + Vite (TypeScript)
* **3D :** `react-globe.gl` (basé sur Three.js)
* **UI :** Tailwind CSS
* **Données :** Fichier `data.json` local (créé manuellement pour le prototype).
* **Déploiement :** Netlify

## 4. Sources et Crédits

* **Données :** Les informations sont inspirées de l'API [World Wonders](https://github.com/Rolv-Apneseth/World-Wonders-API) et du dataset [Wonders of the World](https://www.kaggle.com/datasets/karnikakapoor/wonders-of-the-world). Le fichier `data.json` a été compilé manuellement pour ce projet.
* **Textures du Globe :** [NASA Blue Marble](https://visibleearth.nasa.gov/collection/1484/blue-marble).
* **Images des Merveilles :** Wikimedia Commons (sous licence libre).

## 5. Installation & Lancement Local

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/VOTRE_NOM/7wonders-3d.git
   cd 7wonders-3d
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
L'application sera accessible sur `http://localhost:5173`.

## 6. Structure du Projet

```
7wonders-3d/
├── public/
│   ├── data.json              # Données des 7 merveilles
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── WonderDetail.tsx   # Composant du panneau de détail  
│   ├── scripts/
│   │   ├── data/
│   │   │   ├── wonders.json   # Données générées par le script
│   │   │   └── WondersOfWorld_24.csv
│   │   └── build-data.js      # Script de traitement des données
│   ├── App.tsx                # Composant principal avec le globe
│   ├── main.tsx
│   └── index.css              # Styles Tailwind
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 7. Développement

Le projet utilise :
- **Vite** pour le build et le dev server
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **React Globe GL** pour la visualisation 3D

### Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `node scripts/build-data.js` - Traitement des données CSV

## 8. Déploiement

L'application est conçue pour être déployée sur des plateformes comme Netlify ou Vercel. Les fichiers statiques sont générés dans le dossier `dist/` après le build.
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

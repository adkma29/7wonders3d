#!/usr/bin/env node

/**
 * Script pour traiter et convertir les données CSV en JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Début du traitement des données...');

// Chemin vers le fichier CSV
const csvPath = path.join(__dirname, '..', 'src', 'scripts', 'data', 'WondersOfWorld_24.csv');
const outputPath = path.join(__dirname, '..', 'src', 'scripts', 'data', 'wonders.json');

// Vérifier si le fichier CSV existe
if (!fs.existsSync(csvPath)) {
    console.error('❌ Fichier CSV non trouvé:', csvPath);
    process.exit(1);
}

console.log('📄 Fichier CSV trouvé:', csvPath);

try {
    // Lire le fichier CSV
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Traitement basique du CSV (vous pouvez adapter selon vos besoins)
    const lines = csvContent.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });

    // Écrire le fichier JSON
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    console.log('✅ Données converties avec succès!');
    console.log('📁 Fichier de sortie:', outputPath);
    console.log('📊 Nombre d\'entrées:', data.length);

} catch (error) {
    console.error('❌ Erreur lors du traitement:', error.message);
    process.exit(1);
}
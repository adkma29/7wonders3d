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
const outputPath = path.join(__dirname, '..', 'public', 'data.json');

// Vérifier si le fichier CSV existe
if (!fs.existsSync(csvPath)) {
    console.error('❌ Fichier CSV non trouvé:', csvPath);
    process.exit(1);
}

console.log('📄 Fichier CSV trouvé:', csvPath);

try {
    // Lire le fichier CSV
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Traitement du CSV avec catégorisation
    const lines = csvContent.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const data = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        
        // Ajouter un ID unique et déterminer la catégorie
        obj.id = index + 1;
        
        // Déterminer la catégorie basée sur les données (utilise le champ "Type")
        const type = obj.Type || obj.Category || '';
        switch(type.toLowerCase()) {
            case 'ancient':
                obj.displayCategory = 'Ancient';
                obj.icon = 'star';
                obj.color = '#dc2626'; // Rouge
                break;
            case 'medieval':
                obj.displayCategory = 'Medieval';
                obj.icon = 'castle';
                obj.color = '#7c3aed'; // Violet
                break;
            case 'civil':
                obj.displayCategory = 'Civil';
                obj.icon = 'cube';
                obj.color = '#0891b2'; // Cyan
                break;
            case 'new7wonders foundation':
                obj.displayCategory = 'New7Wonders';
                obj.icon = 'star';
                obj.color = '#ffd700'; // Or
                break;
            case 'seven natural wonders of the world':
                obj.displayCategory = 'Natural';
                obj.icon = 'sphere';
                obj.color = '#16a34a'; // Vert
                break;
            case 'seven wonders of the industrial world':
                obj.displayCategory = 'Industrial';
                obj.icon = 'gear';
                obj.color = '#ea580c'; // Orange
                break;
            case "usa today's new seven wonders":
                obj.displayCategory = 'USA Today';
                obj.icon = 'diamond';
                obj.color = '#2563eb'; // Bleu
                break;
            default:
                obj.displayCategory = type || 'Other';
                obj.icon = 'cube';
                obj.color = '#6b7280'; // Gris
        }
        
        // Normaliser les champs pour compatibilité
        obj.name = obj.Name || obj.name || 'Unknown';
        obj.country = obj['Wikipedia link'] || obj.Location || obj.country || 'Unknown';
        
        // Pour l'image, utiliser Picture link ou Build in year si c'est une URL
        obj.image = obj['Picture link'] || obj.image || '';
        if (!obj.image && obj['Build in year'] && obj['Build in year'].includes('http')) {
            obj.image = obj['Build in year'];
        }
        
        // Créer une description riche avec toutes les informations disponibles
        // Note: Dans le CSV, certaines colonnes semblent être mélangées
        // "Build in year" peut contenir l'URL, et "Image Base64" peut contenir la date
        let buildYear = obj['Build in year'] || '';
        
        // Si "Build in year" contient une URL, chercher la date ailleurs
        if (buildYear.includes('http') || buildYear.includes('www')) {
            buildYear = obj['Image Base64'] || '';
            // Si c'est encore une image base64, essayer d'extraire une date du nom ou autre
            if (buildYear.startsWith('iVBORw0KGgo')) {
                buildYear = ''; // Pas de date disponible
            }
        }
        
        const location = obj.Location || 'unknown location';
        const originalType = obj.Type || obj.displayCategory || 'wonder';
        
        let description = `${obj.displayCategory} wonder located in ${location}`;
        
        // Ajouter l'année de construction si disponible
        if (buildYear && buildYear.trim() !== '' && !buildYear.includes('http') && !buildYear.startsWith('iVBORw0KGgo')) {
            const yearText = buildYear.includes('BC') ? buildYear : 
                           buildYear.includes('AD') ? buildYear :
                           buildYear.match(/^\d+$/) ? `${buildYear} AD` : buildYear;
            description += `. Built in ${yearText}`;
        }
        
        // Ajouter le type si différent de la catégorie
        if (originalType && originalType !== obj.displayCategory) {
            description += `. Originally classified as ${originalType}`;
        }
        
        // Ajouter une note sur son importance historique
        if (obj.displayCategory === 'Ancient') {
            description += '. This ancient wonder represents one of humanity\'s earliest architectural achievements';
        } else if (obj.displayCategory === 'Modern') {
            description += '. This modern wonder showcases contemporary engineering excellence';
        } else if (obj.displayCategory === 'Natural') {
            description += '. This natural wonder demonstrates the extraordinary power and beauty of nature';
        }
        
        obj.description = obj.Description || obj.description || description;
        obj.wikipedia = obj['Wikipedia link'] || obj.wikipedia || '';
        obj.googleMaps = obj['Google Maps'] || obj.googleMaps || `https://www.google.com/maps/@${obj.lat},${obj.lng},15z`;
        
        // S'assurer que lat et lng sont des nombres
        if (obj.Latitude) obj.lat = parseFloat(obj.Latitude);
        if (obj.Longitude) obj.lng = parseFloat(obj.Longitude);
        
        return obj;
    }).filter(item => item.lat && item.lng && !isNaN(item.lat) && !isNaN(item.lng));

    // Fonction pour supprimer les vrais doublons
    const removeDuplicates = (wonders) => {
        const seen = new Set();
        return wonders.filter(wonder => {
            const name = (wonder.name || wonder.Name || '').toLowerCase().trim();
            const lat = parseFloat(wonder.lat).toFixed(3);
            const lng = parseFloat(wonder.lng).toFixed(3);
            const key = `${name}-${lat}-${lng}`;
            
            if (seen.has(key)) {
                console.log(`🗑️ Suppression du doublon: "${wonder.name || wonder.Name}"`);
                return false;
            }
            seen.add(key);
            return true;
        });
    };

    // Fonction supplémentaire pour identifier les doublons "proches" (même nom, coordonnées très proches)
    const removeNearDuplicates = (wonders) => {
        const processed = [];
        const threshold = 0.01; // 0.01 degré = environ 1km
        
        for (const wonder of wonders) {
            const name = (wonder.name || wonder.Name || '').toLowerCase().trim();
            const existing = processed.find(p => {
                const existingName = (p.name || p.Name || '').toLowerCase().trim();
                const latDiff = Math.abs(p.lat - wonder.lat);
                const lngDiff = Math.abs(p.lng - wonder.lng);
                
                return (existingName === name || 
                        existingName.includes(name) || 
                        name.includes(existingName)) && 
                       latDiff < threshold && 
                       lngDiff < threshold;
            });
            
            if (existing) {
                console.log(`🗑️ Suppression du doublon proche: "${wonder.name || wonder.Name}" (proche de "${existing.name || existing.Name}")`);
            } else {
                processed.push(wonder);
            }
        }
        
        return processed;
    };

    // Fonction pour éviter les superpositions de merveilles proches
    const declutterWonders = (wonders) => {
        const minDistance = 0.5; // Distance minimale en degrés (environ 55km)
        const maxOffset = 0.3; // Décalage maximum en degrés
        
        const processed = [...wonders];
        
        for (let i = 0; i < processed.length; i++) {
            for (let j = i + 1; j < processed.length; j++) {
                const wonder1 = processed[i];
                const wonder2 = processed[j];
                
                // Calculer la distance entre les deux merveilles
                const latDiff = Math.abs(wonder1.lat - wonder2.lat);
                const lngDiff = Math.abs(wonder1.lng - wonder2.lng);
                const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                
                // Si elles sont trop proches, les décaler
                if (distance < minDistance) {
                    const name1 = wonder1.name || wonder1.Name;
                    const name2 = wonder2.name || wonder2.Name;
                    console.log(`🔄 Décollement de "${name1}" et "${name2}" (distance: ${distance.toFixed(3)}°)`);
                    
                    // Calculer un vecteur de décalage basé sur l'index pour la consistance
                    const angle1 = (i * 137.5) % 360; // Nombre d'or pour répartition uniforme
                    const angle2 = (j * 137.5) % 360;
                    
                    const offset1 = maxOffset * 0.7;
                    const offset2 = maxOffset;
                    
                    // Appliquer le décalage en coordonnées polaires
                    wonder1.lat += Math.sin(angle1 * Math.PI / 180) * offset1;
                    wonder1.lng += Math.cos(angle1 * Math.PI / 180) * offset1;
                    
                    wonder2.lat += Math.sin(angle2 * Math.PI / 180) * offset2;
                    wonder2.lng += Math.cos(angle2 * Math.PI / 180) * offset2;
                    
                    // Stocker les coordonnées originales pour référence
                    if (!wonder1.originalLat) {
                        wonder1.originalLat = wonder1.lat - Math.sin(angle1 * Math.PI / 180) * offset1;
                        wonder1.originalLng = wonder1.lng - Math.cos(angle1 * Math.PI / 180) * offset1;
                    }
                    if (!wonder2.originalLat) {
                        wonder2.originalLat = wonder2.lat - Math.sin(angle2 * Math.PI / 180) * offset2;
                        wonder2.originalLng = wonder2.lng - Math.cos(angle2 * Math.PI / 180) * offset2;
                    }
                }
            }
        }
        
        return processed;
    };

    // Supprimer d'abord les vrais doublons
    let uniqueData = removeDuplicates(data);
    console.log(`🔄 ${data.length - uniqueData.length} doublons exacts supprimés`);
    
    // Puis supprimer les doublons "proches"
    uniqueData = removeNearDuplicates(uniqueData);
    console.log(`🔄 Données finales après nettoyage: ${uniqueData.length} merveilles`);
    
    // Puis appliquer le décollement des merveilles restantes
    const declutteredData = declutterWonders(uniqueData);

    // Écrire le fichier JSON
    fs.writeFileSync(outputPath, JSON.stringify(declutteredData, null, 2));
    
    console.log('✅ Données converties avec succès!');
    console.log('📁 Fichier de sortie:', outputPath);
    console.log('📊 Nombre d\'entrées originales:', data.length);
    console.log('📊 Nombre d\'entrées finales:', declutteredData.length);

} catch (error) {
    console.error('❌ Erreur lors du traitement:', error.message);
    process.exit(1);
}
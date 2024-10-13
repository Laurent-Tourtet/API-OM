import { promises as fs } from 'fs'; // Assurez-vous d'importer fs de manière asynchrone
import path from 'path'; // Importer path pour gérer les chemins de fichier
import { insertData } from '$lib/api/players.js'; // Assurez-vous que l'importation est correcte
import { json } from '@sveltejs/kit'; // Importer json pour renvoyer une réponse

// Endpoint pour importer les données
export async function POST() {
    try {
        // Résoudre le chemin vers le fichier JSON
        const filePath = path.resolve('src/data/resultats_saisons.json');
        const fileData = await fs.readFile(filePath, 'utf-8'); // Lire le fichier de manière asynchrone
        const jsonData = JSON.parse(fileData); // Analyser le JSON

        await insertData(jsonData); // Appel à la fonction insertData

        return json({ message: 'Données insérées avec succès' }); // Réponse JSON
    } catch (error) {
        console.error('Erreur lors de l\'importation :', error); // Afficher l'erreur dans la console
        return json({ message: 'Erreur lors de l\'importation', error }, { status: 500 }); // Réponse en cas d'erreur
    }
}

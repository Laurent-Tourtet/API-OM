import { json } from '@sveltejs/kit';
import { pool } from '$lib/db.js';
import fs from 'fs';

// Lire le fichier JSON
const jsonData = JSON.parse(fs.readFileSync('src/data/players_images.json', 'utf-8')); // Assurez-vous que le chemin est correct

export async function updatePlayerImages() {
    const client = await pool.connect();
    try {
        for (const player of jsonData) {
            const { name, image_url } = player;
            // Mettre à jour l'URL de l'image dans la table player
            await client.query(
                `UPDATE my_schema.player 
                 SET photo_url = $1 
                 WHERE name = $2`,
                [image_url, name]
            );
        }
        return json({ message: 'Images mises à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des images:', error);
        return json({ message: 'Erreur lors de la mise à jour des images' }, { status: 500 });
    } finally {
        client.release();
    }
}

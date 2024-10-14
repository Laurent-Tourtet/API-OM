import { json } from '@sveltejs/kit';
import { pool } from '$lib/db.js';

export async function GET() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM my_schema.player');
        console.log('Joueurs récupérés:', result.rows); // Ajoutons un log pour vérifier les données
        return json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
        return json({ message: 'Erreur lors de la récupération des joueurs' }, { status: 500 });
    } finally {
        client.release();
    }
}

import { json } from '@sveltejs/kit';
import { pool } from '$lib/db.js';

// Fonction pour insérer des données
export async function insertData(data) {
    const client = await pool.connect();
    try {
        const { team_name } = data; // Vérifiez que data est bien défini
        const teamResult = await client.query(
            'INSERT INTO my_schema.team(team_name) VALUES($1) RETURNING id',
            [team_name]
        );
        const teamId = teamResult.rows[0].id;

        for (const season in data.players_by_season) {
            for (const player of data.players_by_season[season]) {
                await client.query(
                    `INSERT INTO my_schema.player (name, position, age, profile_link, market_value, photo_url, season, team_id)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [ 
                        player.name,
                        player.position,
                        player.age, 
                        player.profile_link, 
                        player.market_value, 
                        player.photo_url, 
                        season, 
                        teamId
                    ]
                );
            }
        }
    } finally {
        client.release();
    }
}

import pkg from 'pg';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Vérifier les configurations de la base de données
console.log('Configuration BD:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Créer un nouveau pool de connexions
const { Pool } = pkg;
let pool;

try {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    console.log('Pool de connexions créé avec succès.');
} catch (error) {
    console.error('Erreur lors de la création du pool de connexions :', error);
}

// Ajouter un gestionnaire d'erreurs pour les erreurs inattendues sur le pool
pool.on('error', (err) => { // Supprimez 'client' ici
    console.error('Erreur inattendue sur le pool de connexions', err);
    process.exit(-1);
});

// Test de connexion à la base de données
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur lors de la requête de test :', err);
    } else {
        console.log('Résultat de la requête de test :', res.rows);
    }
});

// Exporter le pool pour utilisation dans d'autres fichiers
export { pool };

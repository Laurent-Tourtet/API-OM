<script>
    import { onMount } from 'svelte';
    import ProfileImage from '$lib/components/ProfileImage.svelte';

    let players = []; // Les joueurs récupérés
    let selectedPlayer = null; // Le joueur sélectionné

    async function fetchPlayers() {
        console.log('Fonction fetchPlayers appelée'); // Ajout d'un log
        const response = await fetch('/api/get-players');

        if (!response.ok) {
            console.error('Erreur de récupération des joueurs:', response.statusText);
            return []; // Retourne un tableau vide en cas d'erreur
        }

        const data = await response.json();
        console.log("joueurs récupérés:", data); // Log des joueurs récupérés
        return Array.isArray(data) ? data : []; // Assurer que c'est un tableau
    }

    onMount(async () => {
        players = await fetchPlayers(); // Récupérer les joueurs lors du montage
        console.log('Joueurs après récupération:', players); // Log pour vérifier les joueurs
    });

    function handlePlayerChange(event) {
        const playerId = event.target.value; // Récupérer l'ID du joueur sélectionné
        selectedPlayer = players.find(player => player.id == playerId); // Trouver le joueur dans le tableau
    }
</script>

<h1>Liste des joueurs</h1>

<!-- Menu déroulant pour sélectionner un joueur -->
<select on:change={handlePlayerChange}>
    <option value="">Sélectionnez un joueur</option>
    {#each players as player}
        <option value={player.id}>{player.name}</option>
    {/each}
</select>

{#if selectedPlayer}
    <ProfileImage player={selectedPlayer} /> <!-- Corriger l'utilisation du prop ici -->
{:else}
    <p>Aucun joueur sélectionné.</p>
{/if}

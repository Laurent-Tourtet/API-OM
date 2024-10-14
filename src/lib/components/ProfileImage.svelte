<script>
    export let player; // Recevoir les données du joueur comme prop
</script>

<div class="profile-image">
    <img src={player.photo_url} alt={player.name} />
    <h3>{player.name}</h3>
    <p>Position: {player.position}</p>
    <p>Âge: {player.age}</p>
    <p>Valeur de marché: {player.market_value}</p>
    <a href={player.profile_link} target="_blank">Profil</a>
</div>

<style>
    .profile-image {
        border: 1px solid #ccc;
        padding: 16px;
        text-align: center;
        margin: 16px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    h3 {
        margin: 8px 0;
    }
</style>

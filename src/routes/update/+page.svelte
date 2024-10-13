<script>
    async function updateImages() {
        const response = await fetch('/api/update-images', {
            method: 'POST',
        });
        const data = await response.json();
        console.log(data.message);
    }

    // Appeler la fonction lors de l'initialisation du composant, par exemple, lorsque le composant est monté
    import { onMount } from 'svelte';
    
    onMount(() => {
        updateImages();
    });
</script>

<h1>Mettre à jour les images des joueurs</h1>
<button on:click={updateImages}>Mettre à jour les images</button>

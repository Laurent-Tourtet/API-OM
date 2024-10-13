<script>
   let responseData;
   let errorMessage = '';

   async function sendData() {
        try {
            const response = await fetch('/api/import', {
                method: 'POST'
            });

            if (response.ok) {
                responseData = await response.json();
            } else {
                throw new Error('L\'importation a échoué');
            }
        } catch (error) {
            errorMessage = error.message;
        }
    }

    
</script>

<button on:click={sendData}>Importer les données</button>

{#if responseData}
    <p>Données importées avec succès :</p>
    <pre>{JSON.stringify(responseData, null, 2)}</pre>
{/if}

{#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
{/if}
<script lang="ts">
    import Contract from "$lib/classes/Utilities";
    import { Provider } from "$lib/classes/Provider";
    import { PlatformStore } from "$lib/classes/UtilsStore";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let usersCount: number = 0;
    let dialogMessage: string = "";

    async function performRegistration() {
        // check if we've been previously registered
        const response = await Contract.registerNewUser()
        if (response) {
            console.log("New user registered !");

            dialogMessage = "Успешно сте се пријавили на платформу !";
            
            // update other platform fields
            await fetchPlatformInfo(true);
        } else {
            dialogMessage = "Дошло је до грешке приликом регистрације. Покушајте поново.";
        }

        // in any case, show result dialog
        showDialog();
    }

    async function fetchPlatformInfo(fetchBalance?: boolean, retryOnFailure?: boolean = true) {
        try {
            await Contract.questionsCount();
            usersCount = await Contract.totalUsers();
            if(fetchBalance) { await Contract.getUserBalance(); }
        } catch (contract_error) {
            // just print base error anyhow
            console.log(contract_error);

            // check if we're just dealing with internal blockchain issues
            if (contract_error.data.code === -32005 ) {
                // check if we should retry (beware of endless recursion)
                if(retryOnFailure) {
                    console.log("Internal RPC problems. Attempting to fetchPlatformInfo again...");
                    fetchPlatformInfo(fetchBalance, false);
                }
            }
        }
    }

    function showDialog() {
        const dialog = document.getElementById("dialogBox");
        dialog.showModal();
    }

    onMount(async () => {
        //get basics at the page load
        fetchPlatformInfo();
    });
</script>

<dialog id="dialogBox">
    {dialogMessage}
    <button on:click={() => goto('/list')}>Close</button>
</dialog>

<page-container>
    {#await Contract.isRegisteredUser() then success }
        {#if success}
            <h1>Добродошли назад !</h1>
            <button class="main-button" on:click={() => goto("/list")}>🔍 Погледај листу питања</button>
            <p>Број постављених питања: {$PlatformStore.totalQuestions}</p>
        {:else}
            <!-- <p>Регистрованих корисникa: {usersCount}</p> -->
            {#await Provider.signerAddress() then address}
                <div>Новчаник: <code>{address}</code></div>
            {/await}
            <button class="main-button" on:click={performRegistration}>
                Хоћу и ја ✌️
            </button>
            <p>Регистрованих корисникa: {usersCount}</p>
            {#await Provider.signerAddress() then address}
                <div>Новчаник: <code>{address}</code></div>
            {/await}
        {/if}
    {/await}
</page-container>

<style>
    page-container {
        flex-grow: 1;
        display: inherit;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    div {
        padding: 1em;
        text-align: center;
    }

    code {
        color: yellow;
        padding: 1.5px;
        background-color: rgba(159, 159, 159, 0.8);
        border-radius: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        /* font-size: 14px; */
    }

    .main-button {
        min-width: 130px;
        height: 40px;
        color: #fff;
        outline: none;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #43cea2 0%, #185a9d 75%);
        transition: all 0.3s ease;
    }
    .main-button:hover {
        background-position: right center;
        color: #fff9;
        font-weight: bold;
    }
    .main-button:active {
        top: 2px;
    }
</style>
<svelte:head>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->
    <!-- <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" as="style" /> -->
</svelte:head>

<script lang="ts">
    import { Provider } from "$lib/classes/Provider";
    import { PlatformStore } from "$lib/classes/UtilsStore";
    import Contract from "$lib/classes/Utilities";
    import { goto } from "$app/navigation";
    
    async function disconnect() {
        Provider.disconnect();
        goto("/connect", {invalidateAll: true});  //go back to root
    }
</script>

<platform-popup id="popup" popover="auto">
    <popup-body>
        <header>Инфопортал статус</header>

        <!-- PLATFORM INFO -->
        {#if $PlatformStore.isRegistered}
            {#await Contract.getUserBalance()}
                <span>...3...6...9...</span>
            {:then totalPoints}
                <span>Број поена</span>
                <code>{Number(totalPoints).toLocaleString()}</code> 
            {/await}
            <section>
                {#await Contract.totalUsers()}
                    <span>...</span>
                {:then usersCount}
                    <span>Укупан број корисника: {usersCount}</span>
                {/await}
                {#await Contract.questionsCount()}
                    <i>0101010101</i>
                {:then totalQuestions} 
                    <span>Укупан број питања: {totalQuestions}</span>
                {/await}
            </section>
        {:else}
            <i style="padding: 1rem">Региструј се за детаље...</i>
        {/if}

        <!-- WALLET INFO -->
        {#await Provider.signerAddress()}
            <span>.|.|.|.</span>
        {:then address}
            <span>Новчаник</span>
            <code>{address}</code>
        {/await}

        <p><a href="/terms" target="_blank">Услови коришћења</a></p>
        
        <footer>
            <button class="dialog-close-button" popovertarget="popup" popovertargetaction="hide">Затвори</button>
        </footer>
    </popup-body>
</platform-popup>

<nav>
    <button class="disconnect-button" on:click={disconnect}>
        <span class="material-symbols-outlined">
            power_settings_new
        </span>
        <span-block>Одјави се</span-block>
    </button>

    <button class="status-button" popovertarget="popup" popovertargetaction="toggle">
        Инфопортал
    </button>

    <button class="add-new-question" on:click={() => goto("/newquestion")} >
        <span class="material-symbols-outlined">
            post_add
            <!-- add_notes -->
        </span>
        <span-block>Додај питање</span-block>
    </button>
</nav>

<style>
    nav {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding: 5px;
        background-image: linear-gradient(to bottom, #8AD0F2 0%, #7b8ad5 100%, #8AF2E0 100%);
        box-shadow: #fff 1px 1px 2.5px 0.25px;
    }

    platform-popup {
        padding: 0.75em;
        border: none;
        border-radius: 1em 2em;
        background-color: #cbf4ed;
        box-shadow: 0.5px 0px 3px 1px rgba(213, 213, 213, 0.597);
    }
    platform-popup::backdrop {
        backdrop-filter: blur(3px);
    }
    platform-popup:popover-open {
        animation: popupFade 50ms ease-in-out
    }

    popup-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        gap: 0.35em;
    }
    popup-body header {
        font-size: 1.5em;
        padding-bottom: 0.5em;
    }
    popup-body section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-block: 0.25em;
    }
    popup-body code {
        background-color: yellow;
        border-radius: 1em;
        padding: 0.35em;
        color: #fa5ac3;
        text-overflow: ellipsis;
    }

    popup-body footer {
        padding-top: 1em;
    }

    .status-button {
        border: none;
        background-color: transparent;
        color: #4560e6;
        text-shadow: 1px 1px 1px #29843e;
        font-size: 18px;
    }
    .status-button:hover {
        scale: 1.15;
        color: #29843e;
        text-shadow: 1px 1px 1px #4560e6;
    }

    .add-new-question {
        display: flex;
        align-items: center;
        height: 35px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;        
        border-radius: 5px;
        gap: 2.5px;
        border: none;
        background: #29843e;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        transition: all 0.3s ease;
    }
    .add-new-question:hover {
        background-color: #53b86a;
    }
    .add-new-question:active {
        box-shadow: 0 0 #57cc99;
        top: 5px;
    }

    .disconnect-button {
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        background: #d90427d6;
        transition: all 0.3s ease;
    }

    .disconnect-button:hover {
        background-color: #ef233c;
        font-size: small;
    }

    .disconnect-button:active {
        top: 2px;
    }

    @keyframes popupFade {
        0% {
            scale: 0.65;
            opacity: 0;
        }
        100% {
            scale: 1;
            opacity: 1;
        }
    }

    @media (min-width: 640px) {
		span-block {
			display: block;
		}
	}

	@media (max-width: 440px) {
		span-block {
            display: none;
        }
	}
</style>
<svelte:head>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->
    <!-- <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" as="style" /> -->
</svelte:head>

<script lang="ts">
    import Contract from "$lib/classes/Utilities";
    import { Provider } from "$lib/classes/Provider";
    import { PlatformStore } from "$lib/classes/UtilsStore";
    import { goto } from "$app/navigation";

    async function disconnect() {
        Provider.disconnect();
        goto("/connect", {invalidateAll: true});  //go back to root
    }
</script>


{#if $PlatformStore.isConnected}
    <nav>
        <button class="quit-question" on:click={disconnect}>
            <span class="material-symbols-outlined">
                power_settings_new
            </span>
            <span-block>Одјави се</span-block>
        </button>

        {#if $PlatformStore.isRegistered}
            <points-block>
                {#await Contract.getUserBalance() then totalPoints}
                    <span>Број поена</span>
                    <span><code>{Number(totalPoints).toLocaleString()}</code></span> 
                {/await}
            </points-block>
            <button class="addquestion" on:click={() => goto("/newquestion")} >
                <span class="material-symbols-outlined">
                    post_add
                    <!-- add_notes -->
                </span>
                <span-block>Додај питање</span-block>
            </button>
        {:else}
            <div><i>Регистрyj се за детаље</i></div>
        {/if}
    </nav>
{:else}
    <h1><a href="/" >Инфопортал</a></h1>
{/if}

<style>
    nav {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding: 5px;
        background: #C3613C;
        background-image: linear-gradient(to bottom, #8AD0F2 0%, #8A9CF2 100%, #8AF2E0 100%);
        box-shadow: #fff 1px 1px 2.5px 0.25px;
    }

    h1 {
		font-size: 2.15rem;
        text-align: center;
		text-transform: uppercase;
		color: #031c35;
		box-shadow: 0px 7px 5px -10px #f5f5f5;
		/* background-color: #c2e59c; */
    }

    h1:hover {
        font-weight: bolder;
        background-image: linear-gradient(to top, rgba(200, 200, 200, 0.7) 25%, #0c57a1 80%);
        background-clip: text;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
		box-shadow: none;

		transition: all 0.5s ease-out;
    }

	a { text-decoration: none; } 
	a:visited { color: #031c35;}

    points-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div {
        border: none;
        border-radius: 5px;
        /* background-color: #d6d5d4; */
        color: rgb(121, 49, 0);
        overflow: hidden;
        white-space: nowrap;
    }

    code {
        color: yellow;
        padding: 1.5px;
        background-color: rgb(172, 171, 171);
        border-radius: 5px;
        width: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .addquestion {
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
    .addquestion:hover {
        background-color: #53b86a;
    }
    .addquestion:active {
        box-shadow: 0 0 #57cc99;
        top: 5px;
    }

    .quit-question {
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

    .quit-question:hover {
        background-color: #ef233c;
        font-size: small;
    }

    .quit-question:active {
        top: 2px;
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

        code {
            text-overflow: ellipsis;
        }
	}
</style>
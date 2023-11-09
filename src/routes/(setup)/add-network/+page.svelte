<script lang="ts">
    import { ProviderCommons } from "$lib/classes/Provider";
    import { showDialog, DialogData } from "$lib/classes/DialogUtilities";
    import NetworkParameters from "$lib/components/NetworkParameters.svelte";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";

    // UI assets
    import polygon_logo from "$lib/assets/polygon.png";

    //UI flags
    let showParameters = false;

    async function configureMumbai() {
        try {
            await ProviderCommons.configureMumbaiNetwork();
            showDialog(true);
        } catch(e) {
            alert("Automatic configuration not possible.");
            console.log("Errored: ", e);
        }
    }
    
    async function nextStep() {
        goto('/get-tokens');
    }
    async function previousStep() {
        goto('/get-wallet');
    }

    async function openMetamaskFAQ() {
        window.open('https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC', '_blank');
    }
</script>

<dialog id="dialogBox">
    <header>Аутоматско подешавање</header>

    <section>
      <span>Параметри <i>Polygon Mumbai</i> мреже су успешно додати у Ваш <i>Metamask</i> новчаник.</span><br><br>
      <span>Ваш новчаник би требало да је сада подешен на Mumbai мрежу. У колико није, промените тренутно активну мрежу ручно.</span>
    </section>

    <footer>
      <button class="dialog-close-button" on:click={() => {showDialog(false)}} >Затвори</button>
    </footer>
</dialog>

<h2>Корак 2 од 3</h2>
<sup>(прескочите овај корак у колико сте већ подесили параметре Mumbai мреже)</sup>
    
<p>Подесите параметре <i>Polygon Mumbai</i> мреже у MetaMask подешавањима</p>
<button class="setup-polygon-button" on:click={() => {showParameters = !showParameters}}>
    <!-- <span class="material-symbols-outlined" style="color: #ad5f1c;">
        build_circle
    </span> -->
    <img src={polygon_logo} height="15" alt="polygon_logo" />
    <span>Параметри приступа</span>
</button>

{#if showParameters}
    <div in:fade={{duration: 900, delay: 150}}>
        <NetworkParameters />
    </div>
{/if}

    
<!-- <p>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</p> -->
<button class="setup-polygon-button" on:click={configureMumbai}>
    <img src={polygon_logo} height="15" alt="polygon_logo" />
    <span>Аутоматско подешавање</span>
</button>
<sup>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</sup>
<actions>
    <button class="onboard-button" on:click={previousStep}>Претходни корак</button>
    <button class="onboard-button" on:click={nextStep}>Следећи корак</button>
</actions>

<style>
    p, sup { text-align: center; }
    p {
        color: #cbdcbd;
    }

    sup {
        font-size: 11px;
        font-style: italic;
        padding: 1em;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* overflow-y: auto; */
    }

    actions {
        display: flex;
        width: 75%;
        flex-direction: row;
        justify-content: space-around;
    }

    .setup-polygon-button {
        display: flex;
        align-items: center;
        padding: 0.75em;
        gap: 0.5em;
        border-radius: 7px;
        border: none;
        margin: 1em;
        background: linear-gradient(to left, rgb(162, 72, 235), #e4c1f5);
        transition: all 0.65s ease-out;
    }
    .setup-polygon-button:hover {
        background: linear-gradient(to right, rgb(122, 55, 176), #ba95cd);
        color: #cbdcbd;
    }
</style>
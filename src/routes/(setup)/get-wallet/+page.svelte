<script lang="ts">
    import { goto } from "$app/navigation";
    // import type { PageData } from './$types';    
    // export let data: PageData;
    import metamask_logo from "$lib/assets/metamask.svg";

    async function downloadMetamask() {
        window.open('https://metamask.io/download', '_blank', 'noreferrer');
    }

    async function nextStep() {
        goto('/add-network');
    }
</script>

<h2>Корак 1 од 3</h2>
<sup>(прескочите овај корак у колико већ поседујете MetaMask новчаник)</sup>
<!-- <h3>Инсталација MetaMask новчаника</h3> -->

<card>
    <p>Преузмите MetaMask новчаник, кликом на дугме испод</p>
    
    <div>
        <button class="metamask-button" on:click={downloadMetamask}>
            <img src={metamask_logo} height="20" alt="metamask_logo" />
            <span>Инсталирај MetaMask</span>
        </button>
    </div>
    
    <p>Након инсталације, испратите упутства за креирање MetaMask налога и пређите на следећи корак.</p>
    <button class="onboard-button" on:click={nextStep}>Следећи корак</button>
</card>

<style>
    p, span, sup {
        text-align: center;
    }

    p {
        color: #cbdcbd;
    }

    sup {
        font-size: 11px;
        font-style: italic;    
    }

    card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 1em;
        padding: 1em;
        margin: 1em;
    }
</style>
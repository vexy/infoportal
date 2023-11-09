<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="connect, setup, configuration, blockchain, help, wallet, metamask, polygon, MATIC, mumbai">

    <title>Infoportal - connection instructions</title>
</svelte:head>
<svelte:document>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P0RR1V030Z"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'G-P0RR1V030Z');
    </script>
</svelte:document>

<script lang="ts">
    import { goto } from "$app/navigation";

    // assets import
    import metamask_logo from "$lib/assets/metamask.svg";
    import polygon_logo from "$lib/assets/polygon.png";

    async function nextStep() {
        goto('get-wallet');
    }
</script>

<p>За приступ платформи потребни су:</p>
<ol>
    <li><img src="{metamask_logo}" height="20px" alt="mm_logo"/> MetaMask новчаник</li>
    <li>Конекција на <img src="{polygon_logo}" height="20px" alt="pp_logo"/> Polygon Mumbai блокчејн мрежу</li>
    <li><code>MATIC</code> тест токени</li>
</ol>

<i>Пратите упутства са екрана како би, на једноставан начин, приступили Инфопортал платформи</i>
<button class="onboard-button" on:click={nextStep} >Погледај упутства</button>

<!-- <p>У колико је потребно, погледајте <a href="https://youtu.be/pff3fzqF6v0?t=19" target='_blank' rel="noreferrer" referrerpolicy="origin">видео упутства</a> за приступање платформи</p> -->

<style>
    li { padding: 3.5px; }

    p, i { text-align: center; }
    i { 
        padding: 1em;
        font-size: smaller;
        color: #cbdcbd;
    }
</style>
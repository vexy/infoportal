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
    import { ProviderCommons } from "$lib/classes/Provider";
    import { showDialog } from "$lib/classes/DialogUtilities";
    import { goto } from "$app/navigation";
    
    const metamask_logo = new URL('../../../assets/metamask.svg', import.meta.url).href
    const polygon_logo = new URL('../../../assets/polygon.png', import.meta.url).href

    async function downloadMetamask() {
        window.open('https://metamask.io/download', '_blank', 'noreferrer');
    }

    async function gotoParameters() {
        goto("/instructions/parameters");
    }

    async function configureMumbai() {
        try {
            await ProviderCommons.configureMumbaiNetwork();
            showDialog(true);
        } catch(e) {
            alert("Automatic configuration not possible.");
            console.log("Errored: ", e);
        }
    }
</script>

<dialog id="dialogBox">
    <header>Аутоматско подешавање</header>

    <section>
      <span>Параметри <i>Polygon Mumbai</i> мреже су успешно додати у Ваш <i>Metamask</i> новчаник.</span><br><br>
      <span>Ваш новчаник би требало да је сада подешен на Mumbai мрежу. У колико није, промените тренутно активну мрежу ручно.</span>
    </section>

    <footer>
      <button class="dialog-close-button" on:click={() => { showDialog(false)}} >Затвори</button>
    </footer>
</dialog>

<h1>Упутства за приступ платформи</h1>

<h4>1. Инсталирати <i>MetaMask</i> новчаник</h4>
<button class="metamask-button" on:click={downloadMetamask}>
    <img src={metamask_logo} height="16" alt="metamask_logo" />
    <span>Инсталирај MetaMask новчаник</span>
</button>
<divider />
    
<h4>2. Подесити приступне параметре <i>Polygon Mumbai</i> мреже</h4>
<button class="polygon-button" on:click={gotoParameters}>
    <span class="material-symbols-outlined" style="color: #ad5f1c;">
        build_circle
    </span>
    <span>Приступни параметри</span>
</button>
    
<!-- <p>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</p> -->
<button class="polygon-button" on:click={configureMumbai}>
    <img src={polygon_logo} height="12" alt="polygon_logo" />
    <span>Аутоматско подешавање</span>
</button>
<p>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</p>
<divider />

<h4>3. Преузети бесплатне <i>Matic</i> токене са официјелног сајта</h4>
<button class="polygon-button" on:click={() => ProviderCommons.getTestMATIC()}>
    <img src={polygon_logo} height="12" alt="polygon_logo" />
    <span>Набави MATIC токене</span>
</button>
<p><i>САВЕТ: копирајте адресу Вашег новчаника пре одласка на официјелни сајт</i></p>

<dots />

<p>У колико је потребно, погледајте <a href="https://youtu.be/pff3fzqF6v0?t=19" target='_blank' rel="noreferrer" referrerpolicy="origin">видео упутства</a> за приступање платформи</p>

<button class="back-button" on:click={() => { goto('/') }}>Назад</button>

<style>
    h1, h4, p {
        text-align: center;
    }

    p {
        font-size: 13px;
        color: #d5d2d2;
    }

    divider {
        width: 60%;
        border: none;
        border-top: 0.01em dashed white;
        margin: 0.5em;
    }

    dots {
        width: 90vw;
        border: none;
        border-top: 0.07em dotted white;
        margin: 1em;
    }

    .polygon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-height: 2rem;
        min-width: 200px;
        color: #fff;
        transition: 0.3s ease;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #833ab4 0%, #fa3636 50%, #fcb045);
        margin: 5px;
    }

    .polygon-button:hover {
        background-position: right center;
        padding: 5px;
    }

    @media (min-width: 640px) {
		p {
            color: #d2d2d2;
		}
	}
</style>
<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="metamask, blockchain, vote, poll, questions, opinions, infoportal">

    <title>Infoportal</title>
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
    import { Provider } from "$lib/classes/Provider";
    import { showDialog } from "$lib/classes/DialogUtilities";
    import { goto } from "$app/navigation";

    // image imports
    import metamask_logo from "$lib/assets/metamask.svg";
    import polygon_logo from "$lib/assets/polygon.png";

    // MetaMask requires requesting permission to connect users accounts
    async function connectMetamask() {
        const success = await Provider.connectToMetamask();
        if(success) {
            // goto welcome page
            goto('/welcome');
        } else {
            // Inform the user about the connection problem
            showDialog(true);
        }
    }
</script>

<dialog id="dialogBox">
    <header>Конекција не успешна</header>
    <section>
        <p>Дошло је до грешке приликом повезивања новчаника.</p>
        <p>Више детаља о повезивању на платформу можете <a href='/onboarding'>видети овде</a>.</p>
    </section>
    <footer>
        <button class="dialog-close-button" on:click={() => showDialog(false)}>
            Затвори
        </button>
    </footer>
</dialog>

<h1>100 људи 100 ћуди</h1>
<meta-data>
    <span>Извор: непознат</span>
    <span>8.000 пне</span>
</meta-data>

<button class="metamask-button" on:click={connectMetamask}>
    <img src={metamask_logo} height="23" alt="metamask_logo"/>
    <span>Повежи MetaMask</span>
</button>
    
<!-- <p>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</p> -->
<help-section>
    <span class="material-symbols-outlined">help</span>
    <a href="/onboarding">Упутства за приступање платформи</a>
</help-section>

<page-footer>
    <p>Powered by <code>blockchain</code> system</p>
    <p>Published at <img src={polygon_logo} height="10px" alt="polygon_mumbai"/> Polygon Mumbai</p>
</page-footer>

<style>
    h1 {
        margin-top: auto;
        margin-bottom: none;
        opacity: 0;
        animation: showUp;
        animation-delay: 100ms;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        -webkit-animation: showUp 1s forwards;
        -moz-animation: showUp 1s forwards;
        -o-animation: showUp 1s forwards;
        -ms-animation: showUp 1s forwards;
    }

    meta-data {
        display: flex;
        justify-content: space-evenly;
        font-size: smaller;

        opacity: 0;
        animation: showUp;
        animation-delay: 3.75s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        padding-bottom: 1rem;
        width: 90vw;
    }

    p {
        opacity: 0;
        animation: showUp 1s;
        animation-delay: 2.35s;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        margin-inline: 0.5em;
        text-align: center;
    }

    page-footer {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: auto;
    }

    page-footer p {
        font-size: 11px;
        text-shadow: 1px -1px 3px #fff;
        color: #4f4f4f;
    }

    help-section {
        display: flex;
        align-items: center;
        gap: 0.5em;
        /* border: 1.25px solid #4f4f4f;
        border-radius: 10px; */
        padding: 1.5em;
        margin-top: 2em;
        opacity: 0;
        animation-name: showUp;
        animation-delay: 2.15s;
        animation-duration: 0.65s;
        animation-fill-mode: forwards;
    }
    help-section:hover {
        color: #fff;
        /* box-shadow: 1px -1px 5px 2px #fff; */
        /* border: 1.25px solid #3c3c3c3c; */
    }

    .metamask-button {
        opacity: 0;
        animation: showUp;
        animation-delay: 1.1s;
        animation-duration: 750ms;
        animation-fill-mode: forwards;
        transition: all 0.3s ease;
    }

    @keyframes showUp {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
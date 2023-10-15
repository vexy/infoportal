<script lang="ts">
    import { Provider } from "$lib/classes/Provider";
    import { showDialog } from "$lib/classes/DialogUtilities";
    import { goto } from "$app/navigation";

    const metamask_logo = new URL('../../../assets/metamask.svg', import.meta.url).href

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
        <p>Више детаља о повезивању на платформу можете <a href='/instructions'>видети овде</a>.</p>
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
    
<p>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</p>

<div>
    <p><a href="/terms">Услови коришћења</a></p>
    <p><a href="/instructions">Упутства за употребу</a></p>
</div>

<style>
    h1 {
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
        /* font-variant: small-caps; */

        opacity: 0;
        animation: showUp;
        animation-delay: 3.75s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        /* padding: 1rem; */
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

    div {
        display: flex;
        align-content: space-between;
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
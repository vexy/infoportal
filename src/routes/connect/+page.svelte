<script lang="ts">
    import { Provider } from "$lib/classes/Provider";
    import { goto } from "$app/navigation";

    const metamask_logo = new URL('../../lib/assets/metamask.svg', import.meta.url).href

    // MetaMask requires requesting permission to connect users accounts
    async function connectMetamask() {
        const success = await Provider.connectToMetamask();
        if(success) {
            // goto welcome page
            goto('/welcome');
        } else {
            //TODO: Inform the user about the error
        }
    }
</script>

<page-container>
    <headline>
        <h1>100 људи 100 ћуди</h1>
        <div>
            <meta-data>Извор: непознат</meta-data><meta-data id="meta">8.000 пне</meta-data>
        </div>
    </headline>

    <button class="metamask-button" on:click={connectMetamask}>
        <img src={metamask_logo} height="23" alt="metamask_logo"/>
        <span>Повежи MetaMask</span>
    </button>
    <p>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</p>
</page-container>

<style>
    page-container {
        flex-grow: 1;
        display: inherit;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

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
        opacity: 0;
        animation: showUp;
        animation-delay: 3.75s;
        animation-duration: 2s;
        animation-fill-mode: forwards;
        /* padding: 1rem; */
        padding-bottom: 1rem;
    }

    headline {
        display: flex;
        flex-direction: column;
    }

    headline div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: small;
        font-variant: small-caps;
        margin: none;
    }

    p {
        opacity: 0;
        animation: showUp 1s;
        animation-delay: 2.35s;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        margin-inline: 0.5em;
    }

    .metamask-button {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 35px;
        color: #fff;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #c02425 0%, #f0cb35 75%);
        cursor: pointer;
        opacity: 0;
        animation: showUp;
        animation-delay: 1.1s;
        animation-duration: 750ms;
        animation-fill-mode: forwards;
        transition: all 0.3s ease;
    }

    .metamask-button:hover {
        background-position: right center;
        padding: 5px 10px;
        font-weight: bolder;
    }

    @keyframes showUp {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
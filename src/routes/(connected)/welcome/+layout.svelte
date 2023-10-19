<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="registration, users, mumbai, rpc, blockchain, new, signup, questions, metamask, infoportal">

    <title>Infoportal - platform registration</title>
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
    import Contract from "$lib/classes/Utilities";
    import { fade } from "svelte/transition";
</script>

<page-container>
    <h1 in:fade={{delay: 300, duration: 800}}>Три пут' мери, једном сеци...</h1>

    <!-- page slot -->
    <slot />

    {#await Contract.totalUsers()}
        <i>...3...6...9...</i>
    {:then userCount}
        <p in:fade={{delay: 900, duration: 2000}}>Регистрованих корисникa: {userCount}</p>
    {/await}
    <terms>
        <input type="checkbox" id="terms-checkbox" name="terms"/>
        <label for="terms">Слажем се са <a href="/terms">условима коришћења</a> платформе.</label>
    </terms>
</page-container>

<style>
    page-container {
        flex-grow: 1;
        display: inherit;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    terms {
        padding: 1em;
        text-align: center;
    }
</style>
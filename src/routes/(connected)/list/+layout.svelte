<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="people, question, opinion, vote, blockchain, poll, survey, results, infoportal">

    <title>Infoportal - list of questions</title>
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

<page-container>
    <slot />
</page-container>

<style>
    page-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
</style>
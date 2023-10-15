<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="polygon, question, MATIC, vote, blockchain, poll, survey, results, infoportal">

    <title>Infoportal.app | List</title>
        
    <!-- Google analytics script -->
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-P0RR1V030Z"></script>
    <script>
        // GTAG
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'G-P0RR1V030Z');
    </script> -->
</svelte:head>

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
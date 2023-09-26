<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="opinion, question, vote, blockchain, poll, survey">

    <title>Infoportal.app | Survey</title>
</svelte:head>

<page-container>
    <slot />
</page-container>

<style>
    page-container {
        display: flex;
        flex-direction: column;
    }
</style>
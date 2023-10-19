<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="terms, conditions, agreement, consent, blockchain, rules, platform, disclaimer, infoportal">

    <title>Infoportal - terms & conditions</title>
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
</script>

<h1>Infoportal.app</h1>
<h3>Услови коришћења</h3>
<ul>
    <li>
        <p>Приликом употребе, поштоваћу основна начела људских права, дефинисане законом</p>
    </li>
    <li>
        <p>Разумем да је забрањен експлицитни језик, говор мржње и ширење међурасне нетрпељивости</p>
    </li>
    <li>
        <p>Разумем да ”не адекватаним” садржајем могу окарактерисати свако питање на платформи</p>
    </li>
    <li>
        <p>Разумем да платформа нема опцију брисања нити накнадне измене једном унетих података</p>
    </li>
    <li>
        <p>Платформи приступам слободном вољом</p>
    </li>
</ul>

<hr />
<!-- <h3>Одрицање од одговорности</h3> -->
<disclaimer><i>* Аутор платформе није одговоран за садржај настао употребом платформе.</i></disclaimer>

<button class="back-button" on:click={() => goto('/welcome')}>Назад</button>

<style>
    hr {
        border: 0.5px dotted rgba(147, 147, 147, 0.5);
        width: 80%;
    }

    disclaimer {
        font-size: 0.6em;
        color: #c3c3c3d4;
        text-align: center;
        padding: 1em;
    }
</style>
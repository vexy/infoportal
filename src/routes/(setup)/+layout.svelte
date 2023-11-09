<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';

    //TODO: FIX HOOKS AND REDIRECTS TO AVOID (RE)IMPORTING CSS HERE
    import "../../styles/main.css";
    import "../../styles/buttons.css";
    import "../../styles/dialog.css";
</script>

<setup-container>
    <h1>Инфопортал - упутства за приступ</h1>

    <section>
        <slot />
    </section>

    <general-info>
        <span class="material-symbols-outlined">
            breaking_news
        </span>
        <span>Без MetaMask новчаника и подешеним параметрима, приступ <code>blockchain</code> мрежама генерално није могућ.</span>
    </general-info>
</setup-container>
<Footer />

<style>
    setup-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        /* background: #24C6DC;
        background: -webkit-linear-gradient(to top, #514A9D, #24C6DC);
        background: linear-gradient(to top, #514A9D, #24C6DC); */
        background: #005C97;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    section {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
    }

    general-info {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em;
        gap: 1em;
        color: #fff;
        font-size: x-small;
        font-style: italic;
        text-align: center;
        /* background-color: aquamarine; */
    }

</style>
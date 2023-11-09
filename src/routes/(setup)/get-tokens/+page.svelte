<script lang="ts">
    import { goto } from "$app/navigation";
    import { ProviderCommons } from "$lib/classes/Provider";

    // UI assets
    import polygon_logo from "$lib/assets/polygon.png";

    async function goPrevious() {
        goto('/add-network');
    }

    async function goHome() {
        goto('/');
    }

    async function getTokens() {
        ProviderCommons.getTestMATIC();
    }
</script>

<h2>Корак 3 од 3</h2>

<p>Преузмите бесплатне <i>Matic</i> токене са официјелног сајта, кликом на дугме испод</p>
<button class="get-tokens-button" on:click={getTokens}>
    <img src={polygon_logo} height="15" alt="polygon_logo" />
    <span>Набави MATIC токене</span>
</button>
<p>Након преузетих токена, пређите на почетну страну</p>

<button class="start-the-fun" on:click={goHome}>ИНФОПОРТАЛ</button>
<sup><i>САВЕТ: На официјелном сајту ћете бити упитани за адресу Вашег новчаника. Копирајте адресу Вашег новчаника пре одласка на официјелни сајт</i></sup>

<style>
    p {
        color: #cbdcbd;
        text-align: center;
        padding: 1em;
    }

    sup {
        text-align: center;
        padding: 0.5em;
    }

    .get-tokens-button {
        padding: 0.75em;
        border-radius: 7px;
        border: none;
        background: linear-gradient(to right, #093301, #068a81);
        color: #f0edf0;
    }
    .get-tokens-button:hover {
        background: linear-gradient(to right, #0be6d7, #093301);
        color: #cbdcbd;
    }

    .start-the-fun {
        /* margin-top: auto; */
        /* margin: 1em; */
        border: none;
        border-radius: 5px;
        padding: 1em;
        color: rgb(242, 246, 3);
        background: linear-gradient(to top, #083800a1, #093301, #cbdcbd);
        box-sizing: border-box;
        box-shadow: -1px 0px 5px 1px #81818d,
                    1px 0px 5px 1px #dbedae;
    }
    .start-the-fun:hover {
        font-weight: bolder;
        /* background: linear-gradient(to right, rgb(40, 34, 185) #e6ebbb); */
        background: linear-gradient(to top, #0a1100, #09b30a, #6b7d02);
        color: #fff;
    }
</style>
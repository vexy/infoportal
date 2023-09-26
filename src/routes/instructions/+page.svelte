<script lang="ts">
    import { goto } from "$app/navigation";
    import { ProviderCommons } from "$lib/classes/Provider";
    
    const metamask_logo = new URL('../../lib/assets/metamask.svg', import.meta.url).href
    const polygon_logo = new URL('../../lib/assets/polygon.png', import.meta.url).href

    async function downloadMetamask() {
        window.open('https://metamask.io/download', '_blank', 'noreferrer');
    }

    async function gotoParameters() {
        goto("/instructions/parameters");
    }

    async function configureMumbai() {
        try {
            await ProviderCommons.configureMumbaiNetwork();
            showDialog(true);
        } catch(e) {
            alert("Automatic configuration not possible.");
            console.log("Errored: ", e);
        }
    }

    function showDialog(flag: boolean) {
        const modalDialog = document.getElementById("dialogBox");
        if(flag) {
            modalDialog.showModal();
        } else {
            modalDialog.close();
        }
    }
</script>

<dialog id="dialogBox">
    <header>
      <h2 class="header">Аутоматско подешавање</h2>
    </header>

    <section>
      <p>Параметри <i>Polygon Mumbai</i> мреже су успешно додати у Ваш <i>Metamask</i> новчаник.</p>
      <p>Ваш новчаник би требало да је сада подешен на Mumbai мрежу. У колико није, промените тренутно активну мрежу ручно.</p>
    </section>

    <footer>
      <button id="closeDialogButton" on:click={() => { showDialog(false)}} >Затвори</button>
    </footer>
</dialog>

<container>
    <h2>Упутства за приступ платформи</h2>

    <h4>1. Инсталирати <i>MetaMask</i> новчаник</h4>
        <button class="instructions" on:click={downloadMetamask}>
            <img src={metamask_logo} height="16" alt="metamask_logo" />
            Инсталирај MetaMask новчаник
        </button>
    <divider />
    
    <h4>2. Подесити приступне параметре <i>Polygon Mumbai</i> мреже</h4>
        <button class="polygon-button" on:click={gotoParameters}>
            ⚙️ Приступни параметри
        </button>
        
        <!-- <p>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</p> -->
        <button class="polygon-button" on:click={configureMumbai}>
            <img src={polygon_logo} height="12" alt="polygon_logo" />
            <span>Аутоматско подешавање</span>
        </button>
        <p>** У колико приступате преко рачунара, можете покушати аутоматско подешавање параметара</p>
    <divider />

    <h4>3. Преузети бесплатне <i>Matic</i> токене са официјелног сајта</h4>
        <button class="polygon-button" on:click={() => ProviderCommons.getTestMATIC()}>
            <img src={polygon_logo} height="12" alt="polygon_logo" />
            <span>Набави MATIC токене</span>
        </button>
        <p><i>САВЕТ: копирајте адресу Вашег новчаника пре одласка на официјелни сајт</i></p>
    
    
    <dots />

    <p>У колико је потребно, погледајте <a href="https://youtu.be/pff3fzqF6v0?t=19" target='_blank' rel="noreferrer" referrerpolicy="origin">видео упутства</a> за приступање платформи</p>
    <button class="back-button" on:click={() => { goto('/') }}>Назад</button>
</container>

<style>
    container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        /* background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); */
    }

    p {
        font-size: 13px;
        color: #373737;
    }

    #dialogBox::backdrop {
        opacity: 1;
        background-color: #fafa1a1a;
        backdrop-filter: blur(2px);
    }
    #dialogBox {
        box-shadow: 1px 1.5px #8f8f8f;
        border-radius: 8px;
        border: none;
        max-width: 70vw;
    }
    #dialogBox header {
        display: flex;
        justify-content: center;
    }
    #dialogBox footer {
        display: flex;
        padding-top: 10px;
        justify-content: center;
    }

    #closeDialogButton {
        background-color: rgb(25, 71, 1);
        border: none;
        border-radius: 0.33em;
        color: white;
        padding: 1em;
        cursor: pointer;
    }

    divider {
        width: 65%;
        border: none;
        border-top: 0.01em dashed white;
        margin: 0.5em;
    }

    dots {
        width: 90vw;
        border: none;
        border-top: 0.07em dotted white;
        margin: 1em;
    }

    .instructions {
        display: flex;
        align-items: center;
        min-width: 130px;
        gap: 5px;
        height: 35px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #c02425 0%, #f0cb35 75%);
        margin: 2px 5px 5px 15px;
    }

    .instructions:hover {
        background-position: right center;
        padding: 5px 10px;
    }

    .polygon-button {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 170px;
        height: 35px;
        color: #fff;
        transition: 0.3s ease;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #833ab4 0%, #fa3636 50%, #fcb045);
        margin: 5px;
    }

    .polygon-button:hover {
        background-position: right center;
        padding: 5px;
    }

    .back-button {
        margin: 5px 0px 20px 0px;
        min-width: 130px;
        height: 40px;
        color: #fff;
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        border-radius: 5px;
        border: none;
        background: #3a86ff;
        box-shadow: 0 5px #4433ff;
    }

    .back-button:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }

</style>
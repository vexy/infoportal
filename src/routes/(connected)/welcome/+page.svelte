<script lang="ts">
    import Contract from "$lib/classes/Utilities";
    import { showDialog, DialogData } from "$lib/classes/DialogUtilities";
    import Loader from "$lib/components/Loader.svelte";
    import { goto } from "$app/navigation";

    let dialogMeta: DialogData = new DialogData();
    let hasErrored: boolean = false;
    let showLoader: boolean = false;

    // checks if user checked the checkbox (what a sentence !)
    function termsAccepted(): boolean {
        const termsCheckbox = document.getElementById("terms-checkbox");
        return termsCheckbox.checked ? true : false;
    }

    function handleDialogButtonClick() {
        //close dialog anyhow and navigate away if error-free
        showDialog(false);
        if(!hasErrored) {
            goto('/list');
        }
    }

    async function performRegistration() {
        hasErrored = true;  // initially
        dialogMeta.hash = "Затвори";    //using hash as button title
        
        if(!termsAccepted()){
            dialogMeta.title = "Услови коришћења";
            dialogMeta.message = `Пре регистрације, потребно је сложити се са \"Условима коришћења\" платформе.`;
        } else {
            showLoader = true;
            dialogMeta.title = "Регистрација";
            dialogMeta.message = "Дошло је до грешке приликом регистрације. Покушајте поново.";
            try { // to register new user
                await Contract.registerNewUser()
                //
                dialogMeta.title = "Добро дошли";
                dialogMeta.message = "🎉 Успешно сте се пријавили на платформу !";
                dialogMeta.hash = "Настави 👣";
                hasErrored = false;
                console.debug("New user registered !");
            } catch (err) {
                console.error("Error occured during registration: ", err);
            }
        }

        // in any case, show result dialog
        // and hide loader
        showLoader = false;
        showDialog(true);
    }
</script>

<!-- PAGE DIALOG -->
<dialog id="dialogBox">
    <header>{dialogMeta.title}</header>

    <section>
        <p>{dialogMeta.message}</p>
    </section>

    <footer>
        <button class="dialog-close-button" on:click={handleDialogButtonClick}>{dialogMeta.hash}</button>
    </footer>
</dialog>

<!-- MAIN CONTENT -->
{#if showLoader}
    <Loader />
{:else}
    <button class="main-button" on:click={performRegistration}>
        <span class="material-symbols-outlined">
            person_raised_hand
        </span>
        <span>Хоћу и ја</span>
    </button>
{/if}

<style>
    .main-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-inline: 1em;
        gap: 0.5em;
        margin: 0.25rem;
        height: 40px;
        color: #fff;
        outline: none;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #43cea2 0%, #185a9d 75%);
        transition: all 0.3s ease;
    }
    .main-button:hover {
        background-position: right center;
        color: #fff9;
        font-weight: bold;
    }
    .main-button:active {
        top: 2px;
    }
</style>
<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="question, poll, survey, opinions, infoportal, blockchain, options">

    <title>Infoportal</title>
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
    import Contract from '$lib/classes/Utilities';
    import { PlatformStore } from '$lib/classes/UtilsStore';
    import { ScoresTransformer } from '$lib/classes/Models';
    import { showDialog, DialogData } from '$lib/classes/DialogUtilities';
    import Loader from '$lib/components/Loader.svelte';
    import { onMount } from 'svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import { fade } from 'svelte/transition';

    // page data hooks and display helpers
    export let data;
    $: questionInfo = data.questionInfo;
    $: transformer = new ScoresTransformer(data.questionInfo);
    $: totalVotePercentage = ((questionInfo.totalVoters / $PlatformStore.totalUsers) * 100).toFixed(1);

    // all possible voting options
    const voteOptions: number[] = [0,1,2,3,4];
    
    // UI flags...
    const dialogMeta: DialogData = new DialogData();
    let isSavingData = false;
    let isLoadingQuestion = true;
    let showAdditionalOptions = false;

    async function performVote() {
        isSavingData = true;

        // find out which question option is selected
        const optionButtons = document.getElementsByName('voting-options');
        for(let i = 0; i < optionButtons.length; i++) {
            if(optionButtons[i].checked) {
                const optionValue = optionButtons[i].value;

                // check if we're voting or providing extra options
                // voting: optionsValue > 0 | extras: optionsValue < 0
                try {
                    let confirmationHash = '';
                    dialogMeta.title = "Резултат";
                    dialogMeta.message = `Ваш одговор је примљен.\nХвала !`;

                    if (optionValue >= 0) {
                        confirmationHash = await Contract.vote(questionInfo.id, i);
                    } else {
                        // extra option has to be transformed
                        // to suite platform contract extra options [0,1,2]
                        const transformedExtraOption = (optionValue * -1) - 1;
                        confirmationHash = await Contract.provideExtra(questionInfo.id, transformedExtraOption);
                    }
                    
                    dialogMeta.hash = confirmationHash;
                } catch (err) {
                    console.log("Vote/report process failed. Reason: ", err);
                    //
                    dialogMeta.title = "Грешка"
                    dialogMeta.message = "Дошло је до грешке, покушајте поново...";
                    dialogMeta.hash = "";
                }
                
                // whatever happened, just show popup at this point
                showDialog(true);
                break;  //no need to cycle further
            }
        }

        isSavingData = false;
    }

    async function refreshScores() {
        // close the dialog and perform page invalidation
        showAdditionalOptions = false;
        showDialog(false);
        isLoadingQuestion = true;
        await invalidateAll();
        isLoadingQuestion = false;
    }

    function shareResults() {
        console.debug(transformer.shareText);
    }

    function roundNumber(number: number): string {
        return number.toFixed(1);
    }

    onMount(async () => {
        // signal we're not loading anymore
        isLoadingQuestion = false;
    });
</script>

<dialog id="dialogBox">
    <header>{dialogMeta.title}</header>
  
    <section>
      <p>{dialogMeta.message}</p>
      {#if dialogMeta.hash}
        <span>Конфирмациони хеш трансакције:</span>
        <code>{dialogMeta.hash}</code>
      {/if}
    </section>
  
    <!-- action buttons -->
    <footer>
        {#if dialogMeta.hash}
            <button class="show-results" on:click={() => refreshScores()}>Погледај резултате</button>
        {:else}
            <button class="dialog-close-button" on:click={() => showDialog(false)}>Затвори</button>
        {/if}
    </footer>
</dialog>

{#if isLoadingQuestion}
    <Loader />
{:else}
    <h1>{questionInfo.question.title}</h1>

    <!-- QUESTIONS OPTIONS -->
    {#if !questionInfo.hasVoted}
        <question-options>
            {#each voteOptions as option }
                {#if questionInfo.question.labels[option] !== undefined }
                    <div>
                        <input type="radio" name="voting-options" value={option}/>
                        {questionInfo.question.labels[option]}
                    </div>
                {/if}
            {/each}
        </question-options>
    {:else}
        <!-- voting scores -->
        <voting-scores>
            {#each questionInfo.question.labels as caption, index}
                <section>
                    <div>
                        <label for={caption}>{caption}</label>
                        <span>{roundNumber(transformer.scoresRatio[index])} %</span>
                    </div>
                    <meter id={caption} min="0" max="100" low="30" high="75" optimum="80" value={transformer.scoresRatio[index]} />
                </section>
            {/each}
        </voting-scores>
    
        <!-- extras score -->
        <extras-score>
            <div>
                <span>Ништа од наведеног: </span>
                <span>{roundNumber(transformer.extrasRatio[0])}%</span>
            </div>
            <div>
                <span>Питање није довољно јасно: </span>
                <span>{roundNumber(transformer.extrasRatio[1])}%</span>
            </div>
            <div>
                <span>Не адекватно питање: </span>
                <span>{roundNumber(transformer.extrasRatio[2])}%</span>
            </div>
        </extras-score>

        <!-- totals -->
        <totals-panel>
            <div>
                <span class="material-symbols-outlined">
                    stacked_bar_chart
                </span>
                <span>Укупно одговора: <b>{questionInfo.totalVoters}</b></span>
            </div>
            <div>
                <span class="material-symbols-outlined">
                    clock_loader_80
                </span>
                <span><i>{totalVotePercentage}%</i></span>
                <span>корисникa платформе</span>
            </div>
        </totals-panel>
    {/if}

    <!-- ADDITIONAL OPTIONS -->
    {#if showAdditionalOptions}
        <additional-options in:fade={{duration: 200, delay: 75}}>
            <div>
                <input type="radio" name="voting-options" value=-1/>
                <span>Ништа од наведеног</span>
            </div>
            <div>
                <input type="radio" name="voting-options" value=-2/>
                <span>Питање није довољно јасно</span>
            </div>
            <div>
                <input type="radio" name="voting-options" value=-3/>
                <div>
                    <span>Не адекватно питање</span>
                    <span class="material-symbols-outlined" style="color: #b40113">
                        flag_circle
                        <!-- report -->
                    </span>
                </div>
            </div>
        </additional-options>
    {:else}
        {#if !questionInfo.hasVoted}
            <show-additionals>
                <button class="additional-options-button" on:click={() => {showAdditionalOptions = true}}>
                    <span class="material-symbols-outlined">
                        privacy_tip
                    </span>
                    <span>Додатне опције</span>
                </button>
            </show-additionals>
        {/if}
    {/if}
    
    <!-- ACTION BUTTONS -->
    <action-stack>
        {#if isSavingData}
            <Loader message="Слање одговора у току..." />
        {:else}
            <button class="back-button" on:click={() => { goto('/list') }}>Назад</button>
            {#if questionInfo.hasVoted}
                <!-- <button class="back-button" on:click={shareResults}>Подели</button> -->
            {:else}
                <button class="vote-button" on:click={performVote}>
                    <span class="material-symbols-outlined">
                        how_to_vote
                        <!-- send -->
                    </span>
                    <span>Пошаљи</span>
                </button>
            {/if}
        {/if}
    </action-stack>
{/if}

<style>
    question-options {
        display: flex;
        flex-direction: column;
        align-self: center;
        gap: 0.25em;
    }

    question-options div {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 0.5em;
    }

    meter {
        width: auto;
    }

    voting-scores {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-inline: auto;
        gap: 0.25em;
        max-width: 95vw;
    }

    voting-scores section {
        display: flex;
        flex-direction: column;
    }
    
    voting-scores section div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1.5em;
    }

    extras-score {
        padding-block: 0.5em;
        margin-block: 0.5em;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.25em;

        border-top: 0.5px dotted #c7c7c5;
        border-bottom: 0.5px dotted #f1efd3;
    }

    extras-score div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1em;
    }

    totals-panel {
        margin-block: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    totals-panel div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25em;
    }

    additional-options {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: auto;
        margin-top: 1em;
        padding: 1em;
        gap: 0.5em;
        border-top: 0.5px dotted #e2e2e2d2;
        border-bottom: 0.5px dotted #bfbfbfd2;
        /* background-color: #137a22; */
    }

    additional-options div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em
    }

    show-additionals {
        margin-top: 1em;
        padding-top: 0.5em;
        align-self: center;
        border-top: 0.5px dotted #b0b1b2;
    }

    action-stack {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .additional-options-button {
        align-self: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        outline: none;
        gap: 0.15em;
        height: 3em;
        margin-block: 0.75em;
        font-weight: bold;
        color: #fff;
        border: none;
        border-radius: 5px;
        background: #d2d81a;
        box-shadow: 0 5px #d2a101;
        transition: box-shadow 0.3s ease;
    }

    .additional-options-button:hover {
        /* linear-gradient(to top, #001061 30%, #002c01 100%); <--- NICE GRAD */
        box-shadow: 0 3px #d2a101;
        top: 1px;
    }

    .vote-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        outline: none;
        gap: 0.15em;
        height: 3em;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background: #137a22;
        box-shadow: 0 5px #163901;
        transition: all 0.3s ease;
    }

    .vote-button:hover {
        box-shadow: 0 3px #163901;
        top: 1px;
    }
    
    .vote-button:active {
        box-shadow: 0 0 #163901;
        top: 5px;
    }

    /* DIALOG STYLINGS */
    .show-results {
        display: inline-block;
        padding: 10px;
        min-width: 85px;
        min-height: 2rem;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #408852;
    }

    .show-results:hover {
        background-image: linear-gradient(to top, #7a7a77, #2d044a);
        font-weight: bolder;
    }
</style>
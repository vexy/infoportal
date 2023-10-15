<script lang="ts">
    import Contract from '$lib/classes/Utilities';
    import { PlatformStore } from '$lib/classes/UtilsStore';
    import { ScoresTransformer } from '$lib/classes/Models';
    import { showDialog, DialogData } from '$lib/classes/DialogUtilities';
    import Loader from '$lib/components/Loader.svelte';
    import { onMount } from 'svelte';
    import { goto, invalidateAll } from '$app/navigation';

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
        showDialog(false);
        isLoadingQuestion = true;
        await invalidateAll();
        isLoadingQuestion = false;
    }

    function shareResults() {
        const shareText = transformer.formulateShareText(questionInfo);
        console.debug(shareText);
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
      <button class="dialog-close-button" on:click={() => showDialog(false)}>Затвори</button>
      {#if dialogMeta.hash}
        <button class="show-results" on:click={() => refreshScores()}>Погледај резултате</button>
      {/if}
    </footer>
</dialog>

{#if isLoadingQuestion}
    <Loader />
{:else}
    <h1>{questionInfo.question.title}</h1>

    <vote-panel>
        <vstack>
            {#if questionInfo.hasVoted}
                <!-- <vstack> -->
                    {#each questionInfo.question.labels as caption, index}
                        <label for={caption}>{caption} ({roundNumber(transformer.scoresRatio[index])} %)</label>
                        <meter id={caption} min="0" max="100" low="30" high="75" optimum="80" value={transformer.scoresRatio[index]} />
                    {/each}
                <!-- </vstack> -->
            {:else}
                {#each voteOptions as option }
                    {#if questionInfo.question.labels[option] !== undefined }
                        <hstack>
                            <input type="radio" name="voting-options" value={option}/>
                            {questionInfo.question.labels[option]}
                        </hstack>
                    {/if}
                {/each}
            {/if}
        </vstack>
        <hr>
        <vstack>
            {#if questionInfo.hasVoted}
                <div style="font-size: 0.85em;">
                    <hstack>
                        <span>{roundNumber(transformer.extrasRatio[0])}%</span>
                        <span>- Ништа од наведеног</span>
                    </hstack>
                    <hstack>
                        <span>{roundNumber(transformer.extrasRatio[1])}%</span>
                        <span>- Питање није довољно јасно</span>
                    </hstack>
                    <hstack>
                        <span>{roundNumber(transformer.extrasRatio[2])}%</span>
                        <span>- Не адекватно питање</span>
                    </hstack>
                </div>
            {:else}
                {#if showAdditionalOptions}
                    <hstack>
                        <input type="radio" name="voting-options" value=-1/>
                        <span>Ништа од наведеног</span>
                    </hstack>
                    <hstack>
                        <input type="radio" name="voting-options" value=-2/>
                        <span>Питање није довољно јасно</span>
                    </hstack>
                    <hstack>
                        <input type="radio" name="voting-options" value=-3/>
                        <icon-span>
                            <span>Не адекватно питање</span>
                            <span class="material-symbols-outlined" style="color: #b40113">
                                flag_circle
                                <!-- report -->
                            </span>
                        </icon-span>
                    </hstack>
                {/if}
            {/if}
        </vstack>
        {#if questionInfo.hasVoted}
            <hr>
            <total-votes-panel>
                <div>
                    <span class="material-symbols-outlined">
                        stacked_bar_chart
                    </span>
                    <span>Укупно одговора: </span>
                    <!-- preview -->
                    <b>{questionInfo.totalVoters}</b>
                </div>
                <div>
                    <span class="material-symbols-outlined">
                        clock_loader_80
                    </span>
                    <span>Проценат корисникa платформе: </span>
                    <span><i>{totalVotePercentage}% </i></span>
                </div>
            </total-votes-panel>
        {/if}
    </vote-panel>

    <centered>
        {#if isSavingData}
            <Loader message="Слање одговора у току..." />
        {:else}
            <action-buttons>
                <button class="back-button" on:click={() => { goto('/list') }}>Назад</button>
                {#if questionInfo.hasVoted}
                    <!-- <button class="back-button" on:click={shareResults}>Подели</button> -->
                {:else}
                    <button class="additional-options-button" on:click={() => {showAdditionalOptions = !showAdditionalOptions}}>
                        <span class="material-symbols-outlined">
                            privacy_tip
                        </span>
                        <span>Додатне опције</span>
                    </button>
                    <button class="vote-button" on:click={performVote}>
                        <icon-span>
                            <span class="material-symbols-outlined">
                                <!-- how_to_vote -->
                                send
                            </span>
                            <span>Пошаљи</span>
                        </icon-span>
                    </button>
                {/if}
            </action-buttons>
        {/if}
    </centered>
{/if}

<style>
    vote-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-inline: 0.5em;
    }

    hr {
        border: none;
        width: 65vw;
        border-bottom: 1px dotted #ffffff45;
        margin: 1em;
    }

    vstack {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    hstack {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 3.5px;
    }
    
    icon-span {
        display: flex;
        align-items: center;
        gap: 0.25em;
    }
    
    centered {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
    }

    total-votes-panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    total-votes-panel div {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    total-votes-panel div span {
        margin: 5px;
    }
    
    action-buttons {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
        /* margin: 1em; */
    }

    h1 {
        font-size: 2rem;
        text-align: center;
        word-wrap: break-word;
    }

    .additional-options-button {
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
        min-width: 85px;
        height: 3em;
        margin-block: 0.75em;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        border: none;
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
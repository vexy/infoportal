<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import Contract from '$lib/classes/Utilities';
    import { PlatformStore } from '$lib/classes/UtilsStore';
    import { QuestionInfoOutput, QuestionMeta } from '$lib/classes/Models';
    import Loader from '$lib/components/Loader.svelte';
    import Popup from '$lib/components/Popup.svelte';

    // UI flags...
    let isSavingData = false;
    let isLoadingQuestion = true;
    let isShowingPopup = false;
    let hasErrored = false;
    let showAdditionalOptions = false;

    let questionInfo: QuestionInfoOutput = new QuestionInfoOutput(0, new QuestionMeta("", "", [], [], []) , 0, false);
    let voteOptions: number[] = [0,1,2,3,4];

    let meterValues: number[] = [];
    let extrasMeterValues: number[] = [];

    // percentage of total amount of users who voted on this questions
    $: totalVotePercentage = ((questionInfo.totalVoters / $PlatformStore.totalUsers) * 100).toFixed(1);

    async function performVote() {
        isSavingData = true;
        hasErrored = false; // assume no errors initially (will be set otherwise through err handlers)

        // find which user option is selected
        const optionButtons = document.getElementsByName('voting-options');
        for(let i = 0; i < optionButtons.length; i++) {
            if(optionButtons[i].checked) {
                const optionValue = optionButtons[i].value;

                // check if we're voting or providing extra options
                // voting: optionsValue > 0 | extras: optionsValue < 0
                try {
                    if (optionValue >= 0) {
                        await Contract.vote(questionInfo.id, i);
                    } else {
                        // extra option has to be transformed
                        // to suite platform contract extra options [0,1,2]
                        const transformedExtraOption = (optionValue * -1) - 1;
                        await Contract.provideExtra(questionInfo.id, transformedExtraOption);
                    }
                } catch (err) {
                    console.log("Vote/report process failed. Reason: ", err);
                    hasErrored = true;  // indicate we've errored
                }

                // whatever happened, just show popup at this point
                isShowingPopup = true;
                break;  //no need to cycle further
            }
        }

        isSavingData = false;
    }

    async function refreshScores() {
        isShowingPopup = false;
        // automatically forward us to the results page
        const redirect = `/questions/${$page.params.slug}`;
        console.log("Forwarding to: ", redirect);
        await goto(redirect, {replaceState: true, invalidateAll: true});
    }

    function roundNumber(number: number): string {
        return number.toFixed(1);
    }

    onMount(async () => {
        const questionID = Number($page.params.slug);
        questionInfo = await Contract.getQuestionInfo(questionID);
        isLoadingQuestion = false;

        //if user already provided answer, pre-calc all meter values 
        if(questionInfo.hasVoted) {
            for(let score of questionInfo.question.scores) {
                meterValues.push((score / questionInfo.totalVoters) * 100);
            }
            //
            for(let ext of questionInfo.question.extras) {
                extrasMeterValues.push((ext / questionInfo.totalVoters) * 100);
            }
        }
    });
</script>

<!-- page popup definition -->
<Popup show={isShowingPopup}>
    <div slot="header">
        {#if hasErrored}
            Дошло је до грешке, покушајте поново...
        {:else}
            Ваш одговор је примљен.<br />Хвала !
        {/if}
    </div>
    <div slot="actions">
        {#if hasErrored}
            <button class="close-button" on:click={() => {isShowingPopup = false}}>
                Затвори 🙄
            </button>
        {:else}
            <button class="show-results" on:click={() => {refreshScores()}}>
                📈 Погледај резултате
            </button>
        {/if}
    </div>
</Popup>

{#if isLoadingQuestion}
    <Loader />
{:else}
    <h1>{questionInfo.question.title}</h1>

    <vote-panel>
        <vstack>
            {#if questionInfo.hasVoted}
                <!-- <vstack> -->
                    {#each questionInfo.question.labels as caption, index}
                        <label for={caption}>{caption} ({roundNumber(meterValues[index])} %)</label>
                        <meter id={caption} min="0" max="100" low="30" high="75" optimum="80" value={meterValues[index]} />
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
                <hstack>
                    <span>{roundNumber(extrasMeterValues[0])}%</span>
                    <span>- Ништа од наведеног</span>
                </hstack>
                <hstack>
                    <span>{roundNumber(extrasMeterValues[1])}%</span>
                    <span>- Питање није довољно јасно</span>
                </hstack>
                <hstack>
                    <span>{roundNumber(extrasMeterValues[2])}%</span>
                    <span>- Не адекватно питање</span>
                </hstack>
            {:else}
                {#if showAdditionalOptions}
                    <hstack>
                        <input type="radio" name="voting-options" value=-1/>Ништа од наведеног
                    </hstack>
                    <hstack>
                        <input type="radio" name="voting-options" value=-2/>Питање није довољно јасно
                    </hstack>
                    <hstack>
                        <input type="radio" name="voting-options" value=-3/>Не адекватно питање [🚩]
                    </hstack>
                {/if}
            {/if}
        </vstack>
        {#if questionInfo.hasVoted}
            <hr>
            <vstack>
                <span-total>Укупно гласова: <b>{questionInfo.totalVoters}</b></span-total>
                <span-total-small>(<i>{totalVotePercentage}%</i> корисникa платформе)</span-total-small>
            </vstack>
        {/if}
    </vote-panel>
{/if}

<!-- show button stack only if we're not loading data -->
{#if !isLoadingQuestion}
    <centered>
        {#if isSavingData}
            <Loader message="Слање одговора у току..." />
        {:else}
            <action-buttons>
                <button class="back-button" on:click={() => { goto('/list') }}>Назад</button>
                {#if questionInfo.hasVoted}
                    <button class="back-button" disabled>Подели</button>
                {:else}
                    <button class="additional-options-button" on:click={() => {showAdditionalOptions = !showAdditionalOptions}}>
                        <span class="material-symbols-outlined">
                            privacy_tip
                        </span>
                        <span>Додатне опције</span>
                    </button>
                    <button class="vote-button" on:click={performVote}>Пошаљи</button>
                {/if}
            </action-buttons>
        {/if}
    </centered>
{/if}

<style>
    vote-panel {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
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

    vstack span-total {
        text-align: center;
    }

    vstack span-total-small {
        font-size: smaller;
    }

    hstack {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 3.5px;
    }

    centered {
        display: flex;
        flex-direction: column;
        /* background-color: #123; */
        justify-content: center;
        height: 100%;
    }


    action-buttons {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
        margin: 1em;
    }

    h1 {
        font-size: 3rem;
        text-align: center;
        word-wrap: break-word;
    }

    .additional-options-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        outline: none;
        border: none;
        border-radius: 5px;
        gap: 0.15em;
        font-weight: bold;
        color: #fff;
        background: #d2d81a;
        box-shadow: 0 5px #d2a101;
        transition: box-shadow 0.3s ease;
    }

    .additional-options-button:hover {
        /* linear-gradient(to top, #001061 30%, #002c01 100%); <--- NICE GRAD */
        box-shadow: 0 3px #735902;
        top: 1px;
    }

    .vote-button {
        min-width: 85px;
        height: 40px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background: #137a22;
        box-shadow: 0 5px #163901;
    }

    .vote-button:hover {
        box-shadow: 0 3px #163901;
        top: 1px;
    }
    
    .vote-button:active {
        box-shadow: 0 0 #163901;
        top: 5px;
    }

    .back-button {
        min-width: 85px;
        height: 40px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background: #3a86ff;
        box-shadow: 0 5px #4433ff;
    }

    .back-button:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }
    
    .back-button:active {
        box-shadow: 0 0 #4433ff;
        top: 5px;
    }

    .show-results {
        min-width: 85px;
        height: 40px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #408852;
        display: inline-block;
        color: #fff;
        padding: 10px;
    }

    .show-results:hover {
        background-image: linear-gradient(to top, #7a7a77, #2d044a);
        font-weight: bolder;
    }

    .close-button {
        padding: 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #123;
    }

    .close-button:hover {
        font-weight: bolder;
    }
</style>
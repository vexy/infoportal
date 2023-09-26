<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0" />
</svelte:head>

<script lang="ts">
    import { goto } from "$app/navigation";
    import Popup from "$lib/components/Popup.svelte";
    import Utilities from "$lib/classes/Utilities";
    import type { QuestionInfoOutput } from "$lib/classes/Models";

    export let dataSet: QuestionInfoOutput[];
    let isShowingPopup = false;

    async function performReport(questionID: number) {
        //TODO: catch any errors and show them in popups
        await Utilities.provideExtra(questionID, 2);
        isShowingPopup = true;
        goto(`/list`, {invalidateAll: true});
    }

    function openQuestion(questionID: number) {
        goto(`/questions/${questionID}`, {noScroll: true, keepFocus: true});
    }
</script>

<!-- TODO: CHANGE TO DEFAULT DIALOG -->

<Popup show={isShowingPopup}>
    <div slot="header">
        Ваш избор је сачуван. Хвала !
    </div>
    <div slot="actions">
        <button class="close-button" on:click={() => {isShowingPopup = false}}>
            Затвори
        </button>
    </div>
</Popup>

<questions_container>
    {#each dataSet as question }
        <questionbody>
            <!-- <code><u>#{question.id}</u></code> -->
            <question-stats>
                <same-row-block>
                    <span class="material-symbols-outlined">
                        bar_chart
                    </span>
                    <span>{question.totalVoters}</span>
                </same-row-block>
                <span class="title">Одговора</span>
            </question-stats>

            <question-title>
                {question.question.title}
            </question-title>

            {#if question.hasVoted }
                <button class="resultsbutton" on:click={() => openQuestion(question.id)}>
                    <same-row-block>
                        <span class="material-symbols-outlined">
                            stacked_bar_chart
                            <!-- preview -->
                        </span>
                    </same-row-block>
                </button>
            {:else}
                <questionbody>
                    <button class="votebutton" on:click={() => openQuestion(question.id)}>
                        <span class="material-symbols-outlined">
                            info
                        </span>
                        <!-- Детаљи -->
                    </button>
                    <button class="reportbutton" on:click={() => performReport(question.id)}>
                        <span class="material-symbols-outlined">
                            flag_circle
                            <!-- report -->
                        </span>
                    </button>
                </questionbody>
            {/if}
        </questionbody>
    {/each}
</questions_container>

<style>
    questions_container {
        display: flex;
        flex-direction: column;
        margin: 2.5px;
        padding: 2px;
        border-radius: 5px;
        overflow-y: scroll;
        background-color: #bbdefb43;
        /* min-height: 80vh; */
        /* min-height: 80%; */
    }

    question-stats {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3.5px;
        border: 0.5px solid rgb(125, 125, 125);
        /* align-items: stretch; */
    }

    .title {
        font-size: 9px;
        color: #797979;
    }

    same-row-block {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }

    questionbody {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    question-title {
        flex-grow: 1;
        margin: 5px;
        font-size: 18px;
        color: white;
    }
    question-title:hover {
        font-size: 20px;
        /* font-style: italic; */
        color: #3a86ff
    }

    .votebutton {
        height: 35px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background-color: #3a86ff
    }
    .votebutton:hover {
        background-color: #fff;
        color: #3a86ff;
    }
    

    .reportbutton {
        height: 35px;
        border-radius: 5px;
        border: none;
        background-color: #b40113;
        margin-left: 5px;
        color: rgb(188, 188, 188);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .reportbutton:hover {
        border: #fff1ab;
        background-color: #d80016;
        color: #fff;
        border-width: 1px;
        border-style: dotted;
    }

    .resultsbutton {
        /* min-width: 90px; */
        height: 35px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #408852;
        display: inline-block;
        color: #fff;
    }
    .resultsbutton:hover {
        background-color: #fff;
        color: #408852;
    }

    .close-button {
        padding: 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        position: relative;
        color: #fff;
        background-color: #123;
    }

    .close-button:hover {
        font-weight: bolder;
    }
</style>
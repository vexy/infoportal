<script lang="ts">
    import type { QuestionInfoOutput } from "$lib/classes/Models";
    import { createEventDispatcher } from "svelte";

    // external bindings
    export let dataSet: QuestionInfoOutput[];

    // custom event dispatcher
    const event_dispatcher = createEventDispatcher();

    function dispatchReport(questionID: number) {
        event_dispatcher('report', questionID);
    }

    function dispatchShowDetails(questionID: number) {
        event_dispatcher('details', questionID);
    }
</script>

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
                <button class="resultsbutton" on:click={dispatchShowDetails(question.id)}>
                    <same-row-block>
                        <span class="material-symbols-outlined">
                            stacked_bar_chart
                            <!-- preview -->
                        </span>
                    </same-row-block>
                </button>
            {:else}
                <questionbody>
                    <button class="votebutton" on:click={dispatchShowDetails(question.id)}>
                        <span class="material-symbols-outlined">
                            info
                        </span>
                        <!-- Детаљи -->
                    </button>
                    <button class="reportbutton" on:click={dispatchReport(question.id)}>
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
</style>
<script lang="ts">
    import QuestionsTable from "$lib/components/QuestionsTable.svelte";
    import Loader from '$lib/components/Loader.svelte';
    import Contract from "$lib/classes/Utilities";
    import { showDialog, DialogData } from "$lib/classes/DialogUtilities";
    import type { QuestionInfoOutput } from "$lib/classes/Models";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { BigNumber } from "ethers";

    // data related stuff (TODO: preload initial set)
    let allQuestions: QuestionInfoOutput[] = [];
    let tableQuestions: QuestionInfoOutput[] = [];
    
    // search related stuff
    let searchTerm: string = "";
    let questionsInSearch: QuestionInfoOutput[] = [];
    let showSearchResults: boolean = false;
    let searchResultMessage: string = "";

    // ui related stuff
    let isLoadingData: boolean = true;
    let hasErrored: boolean = false;
    let questionToReport: number = 0;
    let dialogContent: DialogData = new DialogData();

    // clear questions in search and put back all questions
    function extractEventValue(event: Event) {
        return BigNumber.from(event.detail).toNumber();
    }

    function performSearch() {
        if (searchTerm.length > 0) {
            // filter out all the questions starting with searchTerm
            // comparison rule: lowercase
            questionsInSearch = allQuestions.filter((qInfo) => {
                const lowercasedSearchTerm = searchTerm.toLowerCase();
                const lowercasedQuestionTitle = qInfo.question.title.toLowerCase();
                return lowercasedQuestionTitle.includes(lowercasedSearchTerm);
            });
            
            // checkout number of returned results
            const totalResults = questionsInSearch.length;
            if (totalResults > 0) {
                // construct search string and refresh the table
                const formalPluralPlease = totalResults > 1 ? 'питањa' : 'питањe';
                searchResultMessage = `Пронађено ${totalResults} ${formalPluralPlease}.`;
                
            } else {
                searchResultMessage = `Нису пронађена питања. Покушајте са другачијим критеријумима претраге.`
            }

            // in any case, update final table dataset
            tableQuestions = questionsInSearch;
            showSearchResults = true;
        } else {
            resetSearch();
        }
    }

    function resetSearch() {
        searchTerm = "";
        showSearchResults = false
        questionsInSearch = [];
        tableQuestions = allQuestions;
    }

    function showReportConfirmation(event: Event) {
        dialogContent.title = "Потврдите";
        dialogContent.message = "Да ли заиста желите да обележите ово питање као не адекватно ?"
        questionToReport = extractEventValue(event);
        showDialog(true);
    }

    async function performReport() {
        try {// to perform reporting
            const hashApproval = await Contract.provideExtra(questionToReport, 2);
            showDialog(false);  //close any prior instance;

            //show reporting success to the user
            dialogContent.title = "Резултат"
            dialogContent.message = "Питање је усшешно обележено као \”не адекватно\”.";
            dialogContent.hash = hashApproval;
            showDialog(true);
        } catch(err) {
            // setup dialog error object
            dialogContent.title = "Грешка";
            dialogContent.message = "Дошло је до грешке приликом пријављивања овог питања. Покушајте поново."
            dialogContent.hash = '';
            showDialog(true)
        }
    }

    async function refreshAfterReport() {
        showDialog(false);
        await fetchAllData();
    }

    function openQuestion(event: Event) {
        const questionID = extractEventValue(event);
        const questionRoute = `/questions/${questionID}`;
        goto(questionRoute);
    }

    // fetches all data from the contract
    async function fetchAllData() {
        // indicate we're loading data
        isLoadingData = true;
        hasErrored = false;

        try {
            const returnedDataSet = await Contract.getAllQuestions();

            // copy retrieved data to our references
            allQuestions = returnedDataSet;
            tableQuestions = allQuestions;
        } catch (contract_error) {
            hasErrored = true;
            console.log("Table: Unable to get data.");
            console.log("Raw error: ", contract_error);
        }

        // lastly, indicate we're not loading anymore
        isLoadingData = false;
    }

    onMount(async () => {
        fetchAllData();
    });
</script>

<dialog id="dialogBox">
    <header>{dialogContent.title}</header>
    <section>
        <p>{dialogContent.message}</p>
        {#if dialogContent.hash}
            <span>Конфирмациони хеш трансакције:</span>
            <code>{dialogContent.hash}</code>
        {/if}
    </section>
    <footer>
        {#if dialogContent.hash}
            <button class="dialog-close-button" on:click={refreshAfterReport}>
                Затвори
            </button>
        {:else}
            <button class="report-confirmation-button" on:click={performReport}>
                Да, обележи
            </button>
            <button class="dialog-close-button" on:click={() => showDialog(false)}>
                Одустани
            </button>
        {/if}
    </footer>
</dialog>

<search-area>
    <searchbar>
        <form>
            <span class="material-symbols-outlined">
                find_in_page
            </span>
            <input type="search" bind:value={searchTerm} placeholder="Претрага питања..."/>
        </form>
        <button class="search-button" on:click={performSearch}>
            <span class="material-symbols-outlined">
                mystery
            </span>
            <span-block>Пронађи</span-block>
        </button>
    </searchbar>
    {#if showSearchResults}
        <search-results>
            <p>{searchResultMessage}</p>
            <button class="cancel-button" on:click={resetSearch}>
                <span class="material-symbols-outlined">cancel</span>
                <!-- <p>Cancel</p> -->
            </button>
        </search-results>
    {/if}
</search-area>

{#if isLoadingData}
    <center-screen>
        <Loader message="Учитавање..." />
    </center-screen>
    <!-- <p>Loading</p> -->
{:else}
    {#if hasErrored}
        <center-screen>
            <span>Дошло је до грешке приликом учитавања података...</span>
            <button class="try-again-button" on:click={() => fetchAllData()}>
                <span class="material-symbols-outlined">sync</span>
                <span>Покушај поново</span>
            </button>
        </center-screen>
    {:else}
        {#if tableQuestions.length > 0}
            <QuestionsTable
                dataSet={tableQuestions} 
                on:details={openQuestion}
                on:report={showReportConfirmation}
            />
        {/if}
        <!-- <p>Data shown</p> -->
    {/if}
{/if}

<!-- <h3>Укупан број питања: <code>{$PlatformStore.totalQuestions}</code></h3> -->

<style>
    search-area {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2.5px;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }

    searchbar {
        display: flex;
        justify-content: center;
        /* margin: 2.5px; */
    }

    search-results {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-style: italic;
        font-size: 11px;
        text-align: center;
        background-color: #ffffff15;
    }

    center-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 1em;
        height: 100%;
    }

    form {
        display: flex;
        padding: 5px;
        background-color: #ffffff99;
        border-radius: 5px;
        transition: background-color 1.15s;
        transition: font-size 1.5;
        color: #757575;
    }

    form:focus-within {
        background-color: #fff;
        color: #5d5050;
    }

    input {
        min-width: 240px;
        font-size: 16px;
        border: none;
        background-color: transparent;
        color:#1700af;
        outline: none;
        font-weight: bold;
    }

    input::placeholder {
        color: #c0c0c0;
    }

    .search-button {
        display: flex;
        align-items: center;
        background-color: #e6e8e7;
        cursor: pointer;
        border: none;
        outline: none;
        margin-left: 1em;
        /* padding-right: 0.25em; */
        border-radius: 5px;
    }

    .search-button:hover {
        background-color: #10422c;
        color: #fff;
        /* font-weight: bolder; */
    }

    .search-button:active {
        font-weight: lighter;
        background-color: #57bcaa;
    }

    .cancel-button {
        display: flex;
        align-items: center;
        border: none;
        border-radius: 5px;
        margin-bottom: 0.5em;
        color: #2d6127;
    }

    .cancel-button:hover {
        color: #fff;
        background-color: #2d6127;
    }

    .report-confirmation-button {
        border: none;
        border-radius: 0.33em;
        padding: 1em;
        color: #fff;
        background-color: rgb(163, 0, 43);
        cursor: pointer;
    }

    .try-again-button {
        display: flex;
        align-items: center;
        gap: 0.1em;
        padding: 0.35em;
        padding-right: 0.7em;
        border: none;
        border-radius: 5px;
        outline: none;
        background-color: #757575;
        color: #074429;
        box-shadow: -0.1em 0.1em 0.75em #dbdad6, 0.2em -0.15em 0.75em #077371;
    }

    .try-again-button:hover {
        font-weight: bolder;
        /* padding: 0.5em; */
        background-color: #074429;
        color: #fff;
        box-shadow: 0.1em 0.1em 1em #074131;
    }

    @media (min-width: 640px) {
		span-block {
			display: block;
            margin-right: 0.5em;
		}
	}

    @media (max-width: 440px) {
        span-block {
            display: none;
        }

        searchbar {
            justify-content: space-between;
            margin-inline: 5px;
        }
    }
</style>
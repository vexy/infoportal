<script lang="ts">
  import Loader from "$lib/components/Loader.svelte";
  import Contract from "$lib/classes/Utilities";
  import { showDialog, DialogData } from "$lib/classes/DialogUtilities";
  import { goto } from "$app/navigation";

  // UI flags
  let isLoading = false;
  let dialogMeta: DialogData = new DialogData();

  // user input variables
  let title: string = "";
  let labels: string[] = [];

  async function saveQuestion() {
    // early exit if user inputs are not fine
    if (!userInputsAreFine()) {
      dialogMeta.title = "Покушајте поново";
      dialogMeta.message = "Питање мора садржати наслов и барем 2 понуђена одговора.";
      dialogMeta.hash = ""; //just in case;
      showDialog(true);
      return
    }

    // now try to add new question and catch any errors that might occur
    isLoading = true;
    try {
      const confirmationHash = await Contract.addNewQuestion(title, labels);
      // inform user of success and clear user inputs
      dialogMeta.title = "Резултат";
      dialogMeta.message = "Ново питање је успешно сачувано !";
      dialogMeta.hash = confirmationHash;
      //
      title = "";
      labels = [];
    } catch (err) {
      dialogMeta.title = "Грешка"
      dialogMeta.message = "Дошло је до грешке приликом чувања. Покушајте поново.";
      dialogMeta.hash = ""; //just in case;
    }        
    
    // in any case, as a last step, stop the loader
    // and display a popup
    isLoading = false;
    showDialog(true);
  }

  function userInputsAreFine(): boolean {
    // labels[0,1] have to be present (aka. it's mandatory to enter at least 2 questions)
    const lenghts = title.trim().length > 0;
    const labelNeeds = 
      labels[0] !== undefined && labels[1] !== undefined &&
      labels[0].trim().length > 0 && labels[1].trim().length > 0;

    return lenghts && labelNeeds;
  }
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

  <footer>
    <!-- action buttons -->
    <button class="dialog-close-button" on:click={() => showDialog(false)}>Затвори</button>
  </footer>
</dialog>

<h1>Поставите Ваше питање</h1>

<input 
  type="text"
  class="question-title-input"
  placeholder="Наслов питања..."
  bind:value={title}
/>

<span>Листа понуђених одговора (најмање 2)</span>

<input
  type="text"
  class="provided-answer"
  placeholder="Одговор 1"
  minlength="8"
  maxlength="60"
  required
  bind:value={labels[0]}
>

<input
  type="text"
  minlength="8"
  maxlength="60"
  class="provided-answer"
  placeholder="Одговор 2"
  required
  bind:value={labels[1]}
>

<input
  type="text"
  minlength="8"
  maxlength="60"
  class="provided-answer"
  placeholder="Одговор 3"
  bind:value={labels[2]}
>

<input
  type="text"
  minlength="8"
  maxlength="60"
  class="provided-answer"
  placeholder="Одговор 4"
  bind:value={labels[3]}
>

<input
  type="text"
  minlength="8"
  maxlength="60"
  class="provided-answer"
  placeholder="Одговор 5"
  bind:value={labels[4]}
>

<action-buttons>
  {#if isLoading}
    <Loader message="Комуникација са blockchain мрежом..."/>
  {:else}
    <button class="back-button" on:click={() => goto('/list')}>Назад</button>
    <button class="save-button" on:click={saveQuestion}>Сачувај</button>
  {/if}
</action-buttons>

<style>
  h1 {
    text-align: center;
    /* text-transform: uppercase; */
  }

  input::placeholder{
    color: #002e077a;
    text-transform: uppercase;
  }

  span {
    margin-block: 1em;
    /* padding: 1rem; */
  }

  action-buttons {
    flex-grow: 1;
    /* height: 100%; */
    /* align-self: stretch; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* margin-bottom: 1rem; */
  }

  .question-title-input {
    padding: 1em;
    margin-block: 1em;
    border-radius: 10px;
    border: none;
    /* font-size: larger; */
  }

  .provided-answer {
    padding: 1em;
    margin-block: 0.3em;
    border: none;
    border-radius: 0.5em;
    box-shadow: 0 0 1em 2.5px rgba(30, 90, 160, 0.5);
    background-color: inherit;
  }

  .save-button {
    min-width: 85px;
    min-height: 3em;
    margin-block: 0.75em;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    border: none;
    background: #137a22;
    box-shadow: 0 5px #163901;
  }

  .save-button:hover {
    box-shadow: 0 3px #163901;
    top: 1px;
  }
  
  .save-button:active {
    box-shadow: 0 0 #163901;
    top: 5px;
  }
</style>
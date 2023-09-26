<script lang="ts">
  import Loader from "$lib/components/Loader.svelte";
  import Popup from "$lib/components/Popup.svelte";
  import Contract from "$lib/classes/Utilities";
  import { goto } from "$app/navigation";


  // UI flags
  let isLoading = false;
  let isShowingPopup = false;
  let hasErrored = false;
  let errorMessage = "";

  let title: string = "";
  let labels: string[] = [];

  async function saveQuestion() {
    // check inputs
    if (userInputsAreFine()) {
      try {
        isLoading = true;
        const success = await Contract.addNewQuestion(title, labels);

        // check if we're clear of errors
        if(success) {
          hasErrored = false;
          title = "";
          labels = [];
        }
      } catch (err) {
        errorMessage = "Дошло је до грешке приликом чувања. Покушајте поново.";
        hasErrored = true;
      }        
    } else {
      errorMessage = "Питање мора садржати наслов и барем 2 понуђена одговора.";
      hasErrored = true;
    }

    // in any case, as a last step, stop the loader
    // and display a popup
    isShowingPopup = true
    isLoading = false;
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

<!-- page popup definition -->
<Popup show={isShowingPopup}>
  <div slot="header">
      {#if hasErrored}
        {errorMessage}
      {:else}
        Ново питање успешно сачувано !
      {/if}
  </div>
  <div slot="actions">
      <button class="close-button" on:click={() => {isShowingPopup = false}}>
          Затвори
      </button>
  </div>
</Popup>

<page-container>
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
</page-container>

<style>
  page-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
  }

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
    flex-grow: 2;
    display: inherit;
    align-items: flex-end;
    justify-content: space-around;
    margin-bottom: 1rem;
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
    min-width: 130px;
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

  .save-button:hover {
    box-shadow: 0 3px #163901;
    top: 1px;
  }
  
  .save-button:active {
    box-shadow: 0 0 #163901;
    top: 5px;
  }

  .back-button {
    margin-top: 15px;
    min-width: 130px;
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
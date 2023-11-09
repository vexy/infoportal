<script lang="ts">
    import { Provider } from "$lib/classes/Provider";
    import { PlatformStore } from "$lib/classes/UtilsStore";
    import Contract from "$lib/classes/Utilities";
    import { goto } from "$app/navigation";
    
    async function displayDropdown(show: boolean) {
        // Provider.disconnect();
        // goto("/connect", {invalidateAll: true});  //go back to root
        const drpdwn = document.getElementById("dropdown_menu");
        if(show) {
            drpdwn.style.display = "inline-flex";
        } else {
            drpdwn.style.display = "none";
        }
    }
</script>

<nav>
    <dropdown-area>
        <button class="settings-menu" on:click={() => displayDropdown(true)}>
            <span class="material-symbols-outlined">menu</span>
        </button>

        <dropdown-menu id="dropdown_menu">
            <h3>Инфопортал статус</h3>
        
            <!-- PLATFORM INFO -->
            <section>
                {#if $PlatformStore.isRegistered}
                    {#await Contract.getUserBalance()}
                        <span>...3...6...9...</span>
                    {:then totalPoints}
                        <span>Број поена: <code>{Number(totalPoints).toLocaleString()}</code></span>
                    {/await}
                    {#await Contract.totalUsers()}
                        <span>...</span>
                    {:then usersCount}
                        <span>Укупан број корисника: {usersCount}</span>
                    {/await}
                    {#await Contract.questionsCount()}
                        <i>0101010101</i>
                    {:then totalQuestions} 
                        <span>Укупан број питања: {totalQuestions}</span>
                    {/await}
                {:else}
                    <i style="padding: 1rem">Региструј се за детаље...</i>
                {/if}   
            </section>
        
            <!-- WALLET INFO -->
            {#await Provider.signerAddress()}
                <span>.|.|.|.</span>
            {:then address}
                <span>Новчаник</span>
                <code>{address}</code>
            {/await}

            <!-- <div>
                <span>
                    Прикажи одговорена питања
                    <label class="switch">
                        <input type="checkbox" />
                        <div></div>
                    </label>
                </span>
            </div> -->
            <!-- <div>
                <span>Прикажи одговорена питања</span>
                <label class="switch">
                    <input type="checkbox" />
                    <div></div>
                </label>
            </div> -->

            <a href="/terms">Услови коришћења</a>
        
            <button-area>
                <button class="disconnect-button" on:click={() => goto('/')}>
                    <span class="material-symbols-outlined">power_settings_new</span>
                    Одјави се
                </button>
                <button class="back-button" on:click={() => displayDropdown(false)}>Затвори</button>
            </button-area>
        </dropdown-menu>
    </dropdown-area>

    <span class="status-button">Инфопортал</span>

    <button class="add-new-question" on:click={() => goto("/newquestion")} >
        <span class="material-symbols-outlined">
            post_add
            <!-- add_notes -->
        </span>
        <span-block>Додај питање</span-block>
    </button>
</nav>

<style>
    nav {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding: 5px;
        background-image: linear-gradient(to bottom, #8AD0F2 0%, #7b8ad5 100%, #8AF2E0 100%);
    }

    dropdown-menu {
        display: none;
        flex-direction: column;
        align-items: center;
        padding: 0.6em;
        position: absolute;
        background-color: #bfece6;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border-radius: 0px 10px 10px 10px;
        z-index: 1;
    }

    section {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        justify-content: space-between;
        gap: 0.1em;
        margin-bottom: 0.75em;
    }

    a {
        padding: 0.75em;
    }

    code {
        /* margin: 0.5em; */
        /* max-width: 310px; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #a0a0a0;
        border-radius: 5px;
        padding: 5px;
        color: #237a8a;
    }

    button-area {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .status-button {
        border: none;
        background-color: transparent;
        color: #4560e6;
        text-shadow: 1px 1px 1px #29843e;
        font-size: 18px;
        margin: auto;
    }
    .status-button:hover {
        scale: 1.15;
        color: #29843e;
        text-shadow: 1px 1px 1px #4560e6;
    }

    .add-new-question {
        display: flex;
        align-items: center;
        height: 35px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;        
        border-radius: 5px;
        gap: 2.5px;
        border: none;
        background: #29843e;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        transition: all 0.3s ease;
    }
    .add-new-question:hover {
        background-color: #53b86a;
    }
    .add-new-question:active {
        box-shadow: 0 0 #57cc99;
        top: 5px;
    }

    .settings-menu {
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        background: #bc8701;
        height: 35px;
        transition: all 0.3s ease;
    }

    .settings-menu:focus {
        top: 2px;
        border-radius: 5px 5px 0px 0px;
        box-shadow: none;
    }
    
    .settings-menu:hover {
        background-color: #ecc814d1;
        /* font-size: small; */
    }

    .disconnect-button {
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        background: #d90427d6;
        height: 35px;
        transition: all 0.3s ease;
    }
    .disconnect-button:hover {
        background-color: #ef233c;
        font-size: small;
    }

    /* .switch {
        display: inline-block;
        font-size: 20px;
        height: 1em;
        width: 2em;
        background: #BDB9A6;
        border-radius: 1em;
    }
    
    .switch input {
        position: absolute;
        opacity: 0;
    }

    .switch div {
        height: 1em;
        width: 1em;
        border-radius: 1em;
        background: #FFF;
        box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3);
        transition: all 300ms;
        -webkit-transition: all 300ms;
        -moz-transition: all 300ms;
    }

    .switch input:checked + div {
        transform: translate3d(100%, 0, 0);
        -webkit-transform: translate3d(100%, 0, 0);
        -moz-transform: translate3d(100%, 0, 0);
        background: #4560e6;
    } */

    @media (min-width: 640px) {
        span-block {
            display: block;
        }
	}

	@media (max-width: 440px) {
        span-block {
            display: none;
        }
		code {
            max-width: 300px;
        }
	}
</style>
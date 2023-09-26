<svelte:head>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->
</svelte:head>

<script lang="ts">
    import { goto } from "$app/navigation";

    async function copyToClipboard(data: string) {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                writeToClipboard(data);
            } else {
                console.log("Clipboard permission denied by user.");
            }
        });
    }

    function writeToClipboard(data: string) {
        navigator.clipboard.writeText(data).then(
            () => {
                showToast();
            },
            () => {
                /* clipboard write failed */
                console.log(`Copy to clipboard failed. Data: ${data}`);
            },
        );
    }

    function showToast() {
        // update toast element with timeout
        const success_toast = document.getElementById("toast");
        //
        success_toast.style.visibility = "visible";
        setTimeout( () => {
            success_toast.style.visibility = "hidden";
        }, 1500 );
    }
</script>

<page-container>
    <h2>Параметри приступа Polygon Mumbai мрежи</h2>

    <table>
        <thead>
            <tr>
                <th>Параметар</th>
                <th>Конфигурација</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Network name</td>
                <td>
                    <config-cell>
                        <span>Polygon Mumbai</span>
                        <button on:click={() => copyToClipboard("Polygon Mumbai")}>
                            <span class="material-symbols-outlined">file_copy</span>
                        </button>
                    </config-cell>
                </td>
            </tr>
            <tr>
                <td>RPC URL</td>
                <td>
                    <config-cell>
                        <span>https://rpc-mumbai.maticvigil.com</span>
                        <button on:click={() => copyToClipboard("https://rpc-mumbai.maticvigil.com")}>
                            <span class="material-symbols-outlined">file_copy</span>
                        </button>
                    </config-cell>
                </td>
            </tr>
            <tr>
                <td>Chain ID</td>
                <td>
                    <config-cell>
                        <span>80001</span>
                        <button on:click={() => copyToClipboard("80001")}>
                            <span class="material-symbols-outlined">file_copy</span>
                        </button>
                    </config-cell>
                </td>
            </tr>
            <tr>
                <td>Currency symbol</td>
                <td>
                    <config-cell>
                        <span>MATIC</span>
                        <button on:click={() => copyToClipboard("MATIC")}>
                            <span class="material-symbols-outlined">file_copy</span>
                        </button>
                    </config-cell>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Copy success message -->
    <success-toast id="toast">
        <span class="material-symbols-outlined">
            done
        </span>
        <span>Параметри конфигурације успешно копирани</span>
    </success-toast>

    <button class="back-button" on:click={() => { goto('/instructions') }}>Назад</button>
</page-container>

<style>
    page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 10px 0px 10px;
        gap: 10px;
    }

    table {
        border-collapse: collapse;
        background-color: #eeeeee;
        /* background-image: linear-gradient(to bottom, #9f9e9e 5%, #c0f9da 100%); */
    }

    thead {
        background-color: #7d7d7c;
    }

    td, th {
        border: 0.5px solid;
        padding: 1em;
    }

    th {
        /* text-shadow: 1px 1px 2px gray; */
        text-shadow: #fafafa 1px 0 0.5em;
    }

    td {
        font-size: smaller;
    }

    config-cell {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    success-toast {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.6rem;
        background-color: green;
        color: white;
        font-size: smaller;
        border-radius: 5px;
        visibility: hidden;
    }

    .material-symbols-outlined {
        font-size: 14px;
        padding: 0.1rem;
        font-variation-settings:
        'FILL' 0,
        'wght' 100,
        'GRAD' 1,
        'opsz' 20,
    }


    .back-button {
        margin-bottom: 15px;
        min-width: 130px;
        height: 40px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        border-radius: 5px;
        border: none;
        background: #3a86ff;
        box-shadow: 0 5px #4433ff;
    }

    .back-button:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }
</style>
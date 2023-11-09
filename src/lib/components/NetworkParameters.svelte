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

<p>За више информација о додавању нових мрежа у MetaMask, <a href="https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC" target="_blank">погледајте официјелну документацију</a>.</p>

<style>
    table {
        border-collapse: collapse;
        background-color: #eeeeee;
        /* background-image: linear-gradient(to bottom, #9f9e9e 5%, #c0f9da 100%); */
    }

    thead {
        background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
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
        gap: 1em;
    }

    success-toast {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.5rem;
        margin: 0.5em;
        text-align: center;
        background-color: green;
        color: white;
        font-size: smaller;
        border-radius: 5px;
        visibility: hidden;
    }
</style>
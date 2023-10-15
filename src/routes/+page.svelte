<script lang="ts">
    import { ProviderCommons } from "$lib/classes/Provider";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    onMount(async () => {
        // begin checking for Metamask presence
        const walletFound = await ProviderCommons.startMetamaskCheck();
        if (walletFound) {
			console.log(`<Infoportal::start> Provider found. Redirecting to /connect page.`);
			goto('/connect');
		} else {
            console.log(`<Infoportal::start> Wallet not found. Redirecting to /instructions page.`);
            goto('/instructions');
        }
    });
</script>
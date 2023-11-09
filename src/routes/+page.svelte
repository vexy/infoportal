<script lang="ts">
    import { ProviderCommons } from "$lib/classes/Provider";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import Loader from "$lib/components/Loader.svelte";

    import "../styles/main.css";
    import "../styles/buttons.css";
    import "../styles/dialog.css";

    onMount(async () => {
        // begin checking for Metamask presence
        const walletFound = await ProviderCommons.startMetamaskCheck();
        if (walletFound) {
            //TODO: check if we're connected to Mumbai network
            //see more: https://docs.metamask.io/wallet/how-to/connect/detect-network/
            
			console.log(`<Infoportal::start> Provider found. Redirecting to /connect page.`);
			goto('/connect');
		} else {
            console.log(`<Infoportal::start> Wallet not found. Redirecting to /instructions page.`);
            goto('/onboarding');
        }
    });
</script>

<h1>Инфопортал</h1>
<Loader message="Детекција новчаника..."/>

<style>
    /* ADD SOME STYLING HERE */
</style>
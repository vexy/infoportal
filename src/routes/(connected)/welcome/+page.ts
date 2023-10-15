import { Provider } from '$lib/classes/Provider';
import Contract from '$lib/classes/Utilities';
import type { PageLoad } from './$types';
import { redirect } from "@sveltejs/kit";

export const load = (async () => {
    // check if we have provider and redirect otherwise
    if(!Provider.isConnected()) {
        console.log("Unable to access without Provider. Redirecting...");
        throw redirect(307, '/connect');
    }

    // check if user is already registered, if so redirect directly to list page
    const isRegistered = await Contract.isRegisteredUser();
    if(isRegistered) {
        console.log("Already registered, redirecting to /list");
        throw redirect(303, '/list');
    }
}) satisfies PageLoad;
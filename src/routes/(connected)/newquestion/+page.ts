import type { PageLoad } from './$types';
import { Provider } from '$lib/classes/Provider';
import { redirect } from "@sveltejs/kit";

// check if we have provider and redirect otherwise
export const load = (async () => {
    if(!Provider.isConnected()) {
        console.log("Unable to access without Provider");
        throw redirect(307, '/connect');
    }
}) satisfies PageLoad;
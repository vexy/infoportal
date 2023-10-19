import type { PageLoad } from './$types';
import { Provider } from '$lib/classes/Provider';
import Contract from '$lib/classes/Utilities';
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    // check if we have provider and redirect otherwise
    if(Provider.isConnected()) {
        // load question with ID contained in [slug]
        try {
            const questionID = Number(params.slug); //cast to number as string is not accepted
            const questionData = await Contract.getQuestionInfo(questionID);
            return { 
                questionInfo: questionData
            };
        } catch {
            //TODO: RENDER ERROR PAHE
            console.error("Error occured while loading questionID: ", params.slug);
        }
    }

    console.debug("No provider, redirecting...");
    throw redirect(307, '/connect');
}) satisfies PageLoad;
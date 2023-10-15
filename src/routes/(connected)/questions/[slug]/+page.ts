import type { PageLoad } from './$types';
import { Provider } from '$lib/classes/Provider';
import Contract from '$lib/classes/Utilities';
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    // check if we have provider and redirect otherwise
    if(!Provider.isConnected()) {
        console.log("Unable to access without Provider. Question: ", params.slug);
        throw redirect(307, '/connect');
    } else {
        // load question with ID contained in [slug]
        const questionID = Number(params.slug);
        const questionData = await Contract.getQuestionInfo(questionID);
        // TODO: Add error handling

        return { questionInfo: questionData };
    }
}) satisfies PageLoad;
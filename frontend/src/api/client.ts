import { type RequestBodies } from "../../../shared/src/request/body-types.js";
import { type ResponseBodies } from "../../../shared/dist/response/body-types.js";

import { catchBlockNotification, showNotification } from "../utils/snackbar.js";

export async function getWikiPeopleByCountry(
    countryCode: string,
): Promise<ResponseBodies.Data.GET_wikidata_people> {
    try {
        const response = await fetch(`${REST_API_URL}/wikidata/people/${countryCode}`, {
            method: "GET",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const parsedBody: ResponseBodies.GET_wikidata_people = await response.json();
        if (!parsedBody.success) throw parsedBody.error;
        // showNotification('Login successful.', 'success');
        return parsedBody.data;
    } catch (error) {
        catchBlockNotification(error);
        throw error;
    }
}
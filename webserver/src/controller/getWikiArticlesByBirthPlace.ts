import { type WikiPerson } from "../../../shared/dist/model/wikidata-person.js";

import { SparqlResults } from "./wikidata.js";

export async function getAllPeopleByBirthplace(birthplaceCountryCode: string): Promise<WikiPerson[]> {
    const limit = 5000;
    let offset = 0;
    let allResults: WikiPerson[] = [];
    let hasMore = true;

    while (hasMore) {
        const sparqlQuery =
            'SELECT ?article ?personLabel ?personDescription ?birthPlace WHERE { ' +
                // is a human (Q5)
                '?person wdt:P31 wd:Q5 . ' +
                // has a place of birth within the specified country
                '?person wdt:P19 ?birthPlace . ' +
                `?birthPlace wdt:P17 wd:${birthplaceCountryCode} . ` +
                // has a Wikipedia page about the ?person
                '?article schema:about ?person ; ' +
                    'schema:inLanguage "en" ; ' +
                    'schema:isPartOf <https://en.wikipedia.org/> . ' +
                // retrieve labels and descriptions in English
                'SERVICE wikibase:label { ' +
                    'bd:serviceParam wikibase:language "en" . ' +
                '} ' +
            '} ' +
            `LIMIT ${limit} ` +
            `OFFSET ${offset}`;

        const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparqlQuery)}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/sparql-results+json',
                    'User-Agent': 'WikidataMaps/1.0 (edan@ivytower.app)',
                },
            });

            if (!response.ok) {
                console.error(`response:`, response);
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json() as SparqlResults;
            const results: WikiPerson[] = data.results.bindings.map(item => ({
                article: item.article.value,
                name: item.personLabel.value,
                description: item.personDescription?.value || '',
                birthPlace: item.birthPlace.value,
            }));

            allResults.push(...results);
            hasMore = results.length === limit; // If we got a full page, there might be more
            offset += limit;

            console.log(`Fetched ${results.length} results, total so far: ${allResults.length}`);

            // Optional: Small delay to be kind to the server
            // if (hasMore) {
            //     await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
            // }

        } catch (error) {
            throw error;
        }
    }

    return allResults;
}
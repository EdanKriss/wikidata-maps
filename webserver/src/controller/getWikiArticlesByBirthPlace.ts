import { SparqlResults } from "./wikidata.js";

type WikiPerson = {
    article: string; // ?article
    name: string; // ?personLabel
    description: string; // ?description
    birthPlace: string; // ?birthPlace
};

export async function getAllPeopleByBirthplace(birthplaceCountryCode: string): Promise<WikiPerson[]> {
    // const countryMap = {
    //     'ireland': 'Q27',
    //     'united states': 'Q30',
    //     'united kingdom': 'Q145',
    //     'france': 'Q142',
    //     'germany': 'Q183',
    // };

    const limit = 5000;
    let offset = 0;
    let allResults: WikiPerson[] = [];
    let hasMore = true;

    while (hasMore) {
        const sparqlQuery = `
            SELECT ?article ?personLabel ?description ?birthPlace WHERE {
                ?person wdt:P31 wd:Q5;
                        wdt:P19/wdt:P17 wd:${birthplaceCountryCode};
                        wikibase:sitelinks ?sitelinks.
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
            }
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        const encodedQuery = encodeURIComponent(sparqlQuery);
        const url = `https://query.wikidata.org/sparql?format=json&query=${encodedQuery}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/sparql-results+json',
                    'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error at offset ${offset}! status: ${response.status}`);
            }

            const data = await response.json() as SparqlResults;
            const results: WikiPerson[] = data.results.bindings.map(item => ({
                article: item.article.value,
                name: item.personLabel.value,
                description: item.description.value,
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
            console.error(`Error at offset ${offset}:`, error);
            throw error;
        }
    }

    return allResults;
}